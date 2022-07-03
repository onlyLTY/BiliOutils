import type {
  LiveCheckLotteryDto,
  LiveCheckLotteryRes,
  LiveFollowDto,
  LiveRoomList,
} from '../dto/live.dto';
import type { IdType } from '@/types';
import { apiDelay, logger, pushIfNotExist } from '../utils';
import {
  checkLottery,
  getArea,
  getLiveRoom,
  joinLottery,
  joinRedPacket,
  checkRedPacket,
  getFollowLiveRoomList,
} from '../net/live.request';
import { PendentID, RequireType, TianXuanStatus } from '../enums/live-lottery.enum';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { liveMobileHeartBeat } from '@/net/intimacy.request';

interface LiveAreaType {
  areaId: string;
  parentId: string;
}

type CheckedLottery = LiveCheckLotteryDto & { uid: number; uname: string };

// 可能是新关注的UP
let newFollowUp: (number | string)[];

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
 * 分类检测
 */
function pendentLottery(list: LiveRoomList[]) {
  const lotteryTime: LiveRoomList[] = [],
    lotteryPacket: LiveRoomList[] = [];
  list.forEach(item => {
    const num2 = item.pendant_info['2'];
    if (!num2) {
      return;
    }
    if (num2.pendent_id === PendentID.Time) {
      lotteryTime.push(item);
    } else if (num2.pendent_id === PendentID.RedPacket) {
      lotteryPacket.push(item);
    }
  });
  return { lotteryTime, lotteryPacket };
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
  lotType: 'lottery' | 'redPack' = 'lottery',
): Promise<LiveRoomList[]> {
  try {
    await apiDelay(100);
    const { data, code, message } = await getLiveRoom(parentId, areaId, page);
    if (code !== 0) {
      logger.info(`获取直播间列表失败: ${code}-${message}`);
    }
    return pendentLottery(data.list)[lotType === 'lottery' ? 'lotteryTime' : 'lotteryPacket'];
  } catch (error) {
    logger.error(`获取直播间列表异常: ${error.message}`);
    throw error;
  }
}

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
      await apiDelay(100);
    }
  }
  return checkedRoomList;
}

async function checkLotteryRoom(room: LiveRoomList) {
  const { blackUid } = TaskConfig.lottery;
  if (blackUid.includes(room.uid)) {
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
  } else if (data === null) {
    // 可能直播间没有天选
    return;
  }
  const { excludeAward, includeAward } = TaskConfig.lottery,
    isExclude = excludeAward.some(text => data.award_name.match(text)),
    isInclude = includeAward.some(text => data.award_name.match(text));

  if (!isInclude && isExclude) {
    logger.info(`跳过屏蔽奖品: ${data.award_name}`);
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
  try {
    const { id, gift_id, gift_num, award_name, uid, uname, require_type, require_text } = lottery;
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
    if (require_type === RequireType.Follow && rememberUp) {
      pushIfNotExist(newFollowUp, uid);
      const requireTextList = getRequireUp(require_text);
      requireTextList.forEach(requireText => pushIfNotExist(newFollowUp, requireText));
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
  newFollowUp = [];
  const { pageNum } = TaskConfig.lottery;
  // 获取直播分区
  const areaList = await getLiveArea();
  // 遍历大区
  for (const areas of areaList) {
    // 遍历小区
    for (const area of areas) {
      await doLotteryArea(area.areaId, area.parentId, pageNum);
    }
  }
  return newFollowUp;
}

/**
 * 检测直播间是否有红包
 * @param roomId
 */
async function getRedPacketId(roomId: IdType) {
  try {
    const { data, code } = await checkRedPacket(roomId);
    if (code !== 0) {
      return;
    }
    const { popularity_red_pocket } = data;
    if (!popularity_red_pocket) {
      return;
    }
    const { lot_id, lot_status } = popularity_red_pocket[0];
    if (lot_status === 2) {
      return;
    }
    return lot_id;
  } catch (error) {
    logger.debug(`检测红包异常: ${error.message}`);
  }
}

interface RedPacket {
  uid: number;
  uname: string;
  lot_id: number;
  room_id: number;
}

/**
 * 获取一个区有红包的直播间
 * @param areaId
 * @param parentId
 * @param page
 */
export async function getRedPacketRoom(areaId: string, parentId: string, page = 1) {
  const roomList = await getLotteryRoomList(areaId, parentId, page, 'redPack');
  const checkedRoomList: RedPacket[] = [];
  for (const room of roomList) {
    const lotId = await getRedPacketId(room.roomid);
    if (lotId) {
      checkedRoomList.push({
        uid: room.uid,
        uname: room.uname,
        lot_id: lotId,
        room_id: room.roomid,
      });
      await apiDelay(100);
    }
  }
  return checkedRoomList;
}

/**
 * 进行一个直播间红包
 * @param redPacket
 */
async function doRedPacket(redPacket: RedPacket) {
  try {
    const { lot_id, uid, uname, room_id } = redPacket;
    logger.info(`红包主播：【${uname}】`);
    const { code, message } = await joinRedPacket({
      room_id,
      lot_id,
      ruid: uid,
    });
    if (code !== 0) {
      logger.info(`红包失败: ${code}-${message}`);
      return;
    }
    newFollowUp.push(uid);
    logger.info(`红包成功 √`);
  } catch (error) {
    logger.info(`红包异常: ${error.message}`);
  }
}

/**
 * 对一个分区进行天选
 * @param areaId
 * @param parentId
 * @param num 天选的页数
 */
async function doRedPackArea(areaId: string, parentId: string, num = 2) {
  for (let page = 1; page <= num; page++) {
    const rooms = await getRedPacketRoom(areaId, parentId, page);
    for (const room of rooms) {
      await liveMobileHeartBeat({ room_id: room.room_id, up_id: room.uid });
      await apiDelay(100);
      await doRedPacket(room);
      // 发送一次心跳
      await apiDelay(400);
    }
  }
}

/**
 * 进行天选
 */
export async function liveRedPackService() {
  newFollowUp = [];
  const { pageNum } = TaskConfig.lottery;
  // 获取直播分区
  const areaList = await getLiveArea();
  // 遍历大区
  for (const areas of areaList) {
    // 遍历小区
    for (const area of areas) {
      await doRedPackArea(area.areaId, area.parentId, pageNum);
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
        logger.info(`获取关注直播间失败: ${code}-${message}`);
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
    logger.info(`直播间${room.roomid}检测异常: ${error.message}`);
    return;
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
    await apiDelay(100);
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
    logger.info(`开始扫描关注的主播`);
    const lotteryRoomList = await checkLotteryFollowRoomList();
    for (const room of lotteryRoomList) {
      await doLottery(room, false);
      await apiDelay(300);
    }
    logger.info(`关注的主播天选完成`);
  } catch (error) {
    logger.error(`关注的主播天选异常: ${error.message}`);
  }
  if (scanFollow === 'only') {
    return false;
  }
  return true;
}
