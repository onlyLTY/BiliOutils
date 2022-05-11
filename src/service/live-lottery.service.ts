import type { LiveCheckLotteryDto, LiveCheckLotteryRes, LiveRoomList } from '../dto/live.dto';
import { apiDelay, logger, pushIfNotExist } from '../utils';
import { checkLottery, getArea, getLiveRoom, joinLottery } from '../net/live.request';
import { RequireType, TianXuanStatus } from '../enums/live-lottery.enum';
import { TaskConfig, TaskModule } from '../config/globalVar';

interface LiveAreaType {
  areaId: string;
  parentId: string;
}

type CheckedLottery = LiveCheckLotteryDto & { uid: number; uname: string };

// 可能是新关注的UP
const newFollowUp: number[] = [];

/**
 * 获取直播分区
 * @description 之所以是二维数组，是为了方便后面的递归，如果全部数据整合到一个数组中，会导致数据量过大，天选超时了可能都没请求完
 */
async function getLiveArea(): Promise<LiveAreaType[][]> {
  try {
    const { data, code, message } = await getArea();
    if (code !== 0) {
      logger.info(`获取直播分区失败: ${code}-${message}`);
    }
    return data.data
      .map(item => item.list)
      .map(item => item.map(area => ({ areaId: area.id, parentId: area.parent_id })));
  } catch (error) {
    logger.error(`获取直播分区异常: ${error.message}`);
    throw error;
  }
}

/**
 * 获取直播间列表
 * @param areaId
 * @param parentId
 * @param page
 */
async function getLotteryRoomList(
  areaId: string,
  parentId: string,
  page = 1,
): Promise<LiveRoomList[]> {
  try {
    await apiDelay(100);
    const { data, code, message } = await getLiveRoom(parentId, areaId, page);
    if (code !== 0) {
      logger.info(`获取直播间列表失败: ${code}-${message}`);
    }
    return data.list.filter(item => {
      const num2 = item.pendant_info['2'];
      return num2 && num2.pendent_id == 504;
    });
  } catch (error) {
    logger.error(`获取直播间列表异常: ${error.message}`);
    throw error;
  }
}

/**
 * 做一个大区的直播间检测
 * @param areaId
 * @param parentId
 * @param page
 */
async function checkLotteryRoomList(areaId: string, parentId: string, page = 1) {
  const roomList = await getLotteryRoomList(areaId, parentId, page);
  const checkedRoomList: CheckedLottery[] = [];
  for (const room of roomList) {
    const data = await checkLotteryRoom(room);
    if (data) {
      checkedRoomList.push({
        ...data,
        uid: room.uid,
        uname: room.uname,
      });
      await apiDelay(100);
    }
  }
  return checkedRoomList;
}

async function checkLotteryRoom(room: LiveRoomList) {
  if (TaskConfig.LOTTERY_UP_BLACKLIST.includes(room.uid)) {
    logger.info(`跳过黑名单用户: ${room.uname}`);
    return;
  }
  let code: number, data: LiveCheckLotteryRes['data'], message: string;
  try {
    ({ data, code, message } = await checkLottery(room.roomid));
  } catch (error) {
    logger.info(`直播间${room.roomid}检测异常: ${error.message}`);
    return;
  }
  if (code !== 0) {
    logger.debug(`直播间${room.roomid}检测失败: ${code}-${message}`);
    return;
  }
  const isExclude = TaskConfig.LOTTERY_EXCLUDE.some(text => data.award_name.match(text)),
    isInclude = TaskConfig.LOTTERY_INCLUDE.some(text => data.award_name.match(text));

  if (!isInclude && isExclude) {
    logger.info(`跳过屏蔽奖品: ${data.award_name}`);
  } else if (data.status !== TianXuanStatus.Enabled) {
    // log
  } else if (data.gift_price > 0) {
    // log
  } else if (data.require_type !== RequireType.None && data.require_type !== RequireType.Follow) {
    // 主站等级足够
    if (data.require_type === RequireType.Level && TaskModule.userLevel >= data.require_value) {
      return data;
    }
    // log
  } else {
    return data;
  }
}

/**
 * 进行一次天选时刻
 */
async function doLottery(lottery: CheckedLottery) {
  try {
    const { id, gift_id, gift_num, award_name, uid, uname, require_type } = lottery;
    logger.info(`天选主播：【${uname}】`);
    logger.info(`奖品：${award_name}`);
    const { code, message } = await joinLottery({
      id,
      gift_id,
      gift_num,
    });
    if (code !== 0) {
      logger.info(`天选失败: ${code}-${message}`);
      return;
    }
    logger.info(`天选成功 √`);
    if (require_type === RequireType.Follow) {
      pushIfNotExist(newFollowUp, uid);
    }
  } catch (error) {
    logger.info(`天选异常: ${error.message}`);
  }
}

/**
 * 对一个分区进行天选
 * @param areaId
 * @param parentId
 * @param num 天选的页数
 */
async function doLotteryArea(areaId: string, parentId: string, num = 2) {
  for (let page = 1; page <= num; page++) {
    const rooms = await checkLotteryRoomList(areaId, parentId, page);
    for (const room of rooms) {
      await doLottery(room);
      await apiDelay(300);
    }
  }
}

/**
 * 进行天选
 */
export async function liveLotteryService() {
  // 获取直播分区
  const areaList = await getLiveArea();
  // 遍历大区
  for (const areas of areaList) {
    // 遍历小区
    for (const area of areas) {
      await doLotteryArea(area.areaId, area.parentId, TaskConfig.LOTTERY_PAGE_NUM);
    }
  }
  return newFollowUp;
}
