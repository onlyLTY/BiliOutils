import type {
  LiveCheckLotteryDto,
  LiveCheckLotteryRes,
  LiveFollowDto,
  LiveRoomList,
} from '@/dto/live.dto';
import { sleep, logger, pushIfNotExist } from '@/utils';
import { checkLottery, joinLottery, getFollowLiveRoomList } from '@/net/live.request';
import { RequireType, TianXuanStatus } from '@/enums/live-lottery.enum';
import { TaskConfig, TaskModule } from '@/config/globalVar';
import { getLiveArea, getLotteryRoomList } from './live.service';
import { addWs, biliDmWs, bindMessageForLottery } from './ws.service';

type CheckedLottery = LiveCheckLotteryDto & { uid: number; uname: string };

// 可能是新关注的UP
let newFollowUp: (number | string)[];

/**
 * 做一个区的直播间检测
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
      await sleep(100);
    }
  }
  return checkedRoomList;
}

async function checkLotteryRoom(room: LiveRoomList) {
  const { blackUid } = TaskConfig.lottery;
  if (blackUid.includes(room.uid)) {
    logger.debug(`跳过黑名单用户: ${room.uname}`);
    return;
  }
  let code: number, data: LiveCheckLotteryRes['data'], message: string;
  try {
    ({ data, code, message } = await checkLottery(room.roomid));
  } catch (error) {
    logger.warn(`直播间${room.roomid}检测异常: ${error.message}`);
    return;
  }
  if (code !== 0) {
    logger.warn(`直播间${room.roomid}检测失败: ${code}-${message}`);
    return;
  } else if (data === null) {
    // 可能直播间没有天选
    return;
  }
  const { excludeAward, includeAward } = TaskConfig.lottery,
    isExclude = excludeAward.some(text => data.award_name.match(text)),
    isInclude = includeAward.some(text => data.award_name.match(text));

  if (!isInclude && isExclude) {
    logger.verbose(`跳过屏蔽奖品: ${data.award_name}`);
    return;
  }
  // 天选没有开启
  if (data.status !== TianXuanStatus.Enabled) {
    // log
    return;
  }
  // 需要赠送礼物
  if (data.gift_price > 0) {
    // log
    return;
  }
  if (data.require_type === 4) {
    logger.info(`您能反馈给作者输出了什么吗？`);
    logger.info(`${data.require_type}--${data.require_text}--${data.require_value}`);
    logger.info(`也许这正是我们想要的。`);
  }
  // 主站等级足够
  if (data.require_type === RequireType.Level && TaskModule.userLevel >= data.require_value) {
    return data;
  }
  // 无条件
  if (data.require_type === RequireType.None) {
    return data;
  }
  // 关注
  if (data.require_type === RequireType.Follow && !TaskConfig.lottery.skipNeedFollow) {
    return data;
  }
  // TODO: 粉丝牌（自己恰好有），舰长（自己恰好有）
}

/**
 * 获取需要关注主播名
 * @param requireText
 */
function getRequireUp(requireText: string) {
  requireText = requireText.replace('关注主播', '');
  const requireTextList = requireText.split(/\s*\+\s*/);
  requireTextList.shift();
  return requireTextList;
}

/**
 * 进行一次天选时刻
 */
async function doLottery(lottery: CheckedLottery, rememberUp = true) {
  const { award_name, room_id, uname } = lottery;
  try {
    // 临时增加一个弹幕测试，时间就懒得计算了，按照 66 秒算
    const ws = await biliDmWs(room_id, 66 * 1000);
    if (!ws) return;
    addWs(room_id, ws);
    bindMessageForLottery(ws);
    await sleep(2000);
    const { code, message } = await joinLottery(lottery);
    if (code !== 0) {
      logger.warn(`天选失败: ${code}-${message}`);
      return;
    }
    logger.debug(`参与【${uname}】的天选【${award_name}】`);
    rememberUp && saveRequireUp(lottery);
  } catch (error) {
    logger.error(`天选异常${uname}：`, error);
  }
}

/**
 * 保存需要关注主播名
 */
function saveRequireUp({ uid, require_text, require_type }: CheckedLottery) {
  if (require_type === RequireType.Follow) {
    pushIfNotExist(newFollowUp, uid);
    getRequireUp(require_text).forEach(requireText => pushIfNotExist(newFollowUp, requireText));
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
      await sleep(300);
    }
  }
}

/**
 * 进行天选
 */
export async function liveLotteryService() {
  newFollowUp = [];
  const { pageNum } = TaskConfig.lottery;
  // 获取直播分区
  const areaList = await getLiveArea();
  // 遍历大区
  for (const areas of areaList) {
    // 遍历小区
    for (const { areaId, parentId } of areas) {
      await doLotteryArea(areaId, parentId, pageNum);
    }
  }
  return newFollowUp;
}

/**
 * 获取正在直播的已关注的主播
 */
async function getLivingFollow() {
  const livingRoomList: LiveFollowDto[] = [];
  await getLiveRoomList();
  return livingRoomList;

  async function getLiveRoomList(page = 1) {
    try {
      const { data, code, message } = await getFollowLiveRoomList(page, 9);
      if (code !== 0) {
        logger.warn(`获取关注直播间失败: ${code}-${message}`);
        return;
      }
      const roomList = data.list?.filter(room => room.live_status === 1);
      // 如果本页都在直播，则继续获取下一页
      if (roomList.length === 9 && page < data.totalPage) {
        livingRoomList.push(...roomList);
        return getLiveRoomList(page + 1);
      }
      livingRoomList.push(...roomList);
    } catch (error) {
      logger.error(`获取关注直播间异常: ${error.message}`);
    }
  }
}

/**
 * 检测关注主播的天选时刻
 */
async function checkLotteryFollwRoom(room: LiveFollowDto) {
  try {
    const { code, message, data } = await checkLottery(room.roomid);
    if (code !== 0) {
      logger.debug(`直播间${room.roomid}检测失败: ${code}-${message}`);
      return;
    }
    // 没有天选时刻
    if (data === null) return;
    // 天选没有开启
    if (data.status !== TianXuanStatus.Enabled) return;
    // 需要赠送礼物
    if (data.gift_price > 0) return;
    return data;
  } catch (error) {
    logger.warn(`直播间${room.roomid}检测异常：${error.message}`);
  }
}

/**
 * 获取正在直播的主播的天选时刻
 */
async function checkLotteryFollowRoomList() {
  const livingRoomList = await getLivingFollow();
  const lotteryRoomList: CheckedLottery[] = [];
  for (const room of livingRoomList) {
    const lottery = await checkLotteryFollwRoom(room);
    if (lottery) {
      lotteryRoomList.push({
        ...lottery,
        uid: room.uid,
        uname: room.uname,
      });
    }
    await sleep(100);
  }
  return lotteryRoomList;
}

/**
 * 对已关注的主播进行天选
 * @returns 是否继续扫描分区
 */
export async function liveFollowLotteryService() {
  const { scanFollow } = TaskConfig.lottery;
  if (!scanFollow) {
    return true;
  }
  try {
    logger.debug(`开始扫描关注的主播`);
    const lotteryRoomList = await checkLotteryFollowRoomList();
    for (const room of lotteryRoomList) {
      await doLottery(room, false);
      await sleep(300);
    }
    logger.info(`关注的主播天选完成`);
  } catch (error) {
    logger.error(`关注的主播天选异常：`, error);
  }
  if (scanFollow === 'only') {
    return false;
  }
  return true;
}
