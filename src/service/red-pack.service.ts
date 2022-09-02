import type { IdType } from '@/types';
import { getRandomItem, getUnixTime, Logger, logger, pushIfNotExist, random, sleep } from '@/utils';
import { joinRedPacket, checkRedPacket, sendMessage, getOnlineGoldRank } from '@/net/live.request';
import { TaskConfig, TaskModule } from '@/config/globalVar';
import { addWs, biliDmWs, bindMessageForRedPacket, clearWs, closeWs, wsMap } from '@/utils/ws';
import { DMEmoji } from '@/constant/dm';
import { getLiveArea, getLotteryRoomList } from './live-lottery.service';
import { request } from '@/utils/request';
import { handleFollowUps } from './tags.service';
import { getRedPacketController } from '@/net/red-packet.request';
import { noWinRef } from '@/store/red-packet';
import { ReturnStatus } from '@/enums/packet.enum';

const liveLogger = new Logger(
  { console: 'debug', file: 'warn', push: 'warn', payload: TaskModule.nickname },
  'redPacket',
);

// 可能是新关注的UP
let newFollowUp: (number | string)[],
  joinCount: number,
  restCount: number,
  riskCount: number,
  riskTotalCount: number;
const waitting: Ref<boolean> = { value: false };

/**
 * 检测直播间是否有红包
 * @param roomId
 */
async function getRedPacket(roomId: IdType) {
  try {
    const { data, code } = await checkRedPacket(roomId);
    if (code !== 0) {
      return;
    }
    const { popularity_red_pocket } = data;
    if (!popularity_red_pocket) {
      return;
    }
    const { lot_status, end_time } = popularity_red_pocket[0];
    if (lot_status === 2 || end_time - getUnixTime() < 5) {
      return;
    }
    return popularity_red_pocket[0];
  } catch (error) {
    logger.debug(`检测红包异常: ${error.message}`);
  }
}

interface RedPacket {
  uid: number;
  uname: string;
  lot_id: number;
  room_id: number;
  wait_num?: number;
  end_time?: number;
  ws_time?: number;
}

/**
 * 通过活动链接获取直播间
 */
async function getRoomListByLink() {
  const roomList = await getRedPacketController();
  if (!roomList?.length) {
    return;
  }
  return roomList?.filter(room => room.countDown >= 20).reverse();
}

/**
 * 进行一个直播间红包
 * @param redPacket
 */
async function doRedPacket(redPacket: RedPacket) {
  const { end_time, ws_time } = redPacket;
  const wsTime = end_time ? end_time - getUnixTime() : ws_time;
  if (!wsTime || wsTime < 4) return;
  joinCount++;
  restCount++;
  return await joinRedPacketHandle(redPacket, wsTime);
}

function initCount() {
  restCount = 0;
  riskCount = 0;
}

/**
 * 处理 join 的返回值
 */
async function returnStatusHandle() {
  const { restTime, totalNum, riskNum, noWinNum, riskTime } = TaskConfig.redPack;
  // 中场处理
  if (totalNum > 0 && joinCount >= totalNum) {
    liveLogger.debug(`已经参与了${totalNum}次，停止运行`);
    return ReturnStatus.退出;
  }
  if (restTime[0] > 0 && restCount >= restTime[0]) {
    initCount();
    liveLogger.debug(`中场休息时间到，暂停运行${restTime[1]}分`);
    return ReturnStatus.中场休眠;
  }
  // 风控处理
  if (riskNum > 0 && riskTotalCount >= riskNum) {
    logger.warn(`疑似风控连续${riskTotalCount}次，停止运行`);
    return ReturnStatus.退出;
  }
  if (riskTime[0] > 0 && riskCount >= riskTime[0]) {
    // 当风控需要休眠时，重置中场次数
    initCount();
    liveLogger.warn(`疑似风控连续${riskCount}次，暂停运行${riskTime[1]}分`);
    return ReturnStatus.风控休眠;
  }
  // 总参与次数处理
  if (noWinNum > 0 && noWinRef.value >= noWinNum) {
    logger.warn(`连续未中奖${noWinRef.value}次，停止运行`);
    return ReturnStatus.退出;
  }
}

async function joinRedPacketHandle(redPacket: RedPacket, wsTime: number) {
  const { lot_id, uid, uname, room_id } = redPacket;
  try {
    const ws = await createRedPacketDmWs(redPacket, wsTime);
    if (!ws) return;
    addWs(room_id, ws);
    await sleep(2000);
    noWinRef.value++;
    const { code, message } = await joinRedPacket({
      room_id,
      lot_id,
      ruid: uid,
    });
    pushIfNotExist(newFollowUp, uid);
    if (code !== 0) {
      closeWs(room_id);
      return joinErrorHandle(uname, code, message);
    }
    liveLogger.debug(`【${uname}】红包成功 √`);
    return biliDmHandle(redPacket, wsTime);
  } catch (error) {
    logger.error(`红包异常: ${error.message}`);
  }
}

async function createRedPacketDmWs({ room_id, wait_num, uid, uname }: RedPacket, wsTime: number) {
  const ws = await biliDmWs(room_id, (wsTime + 20) * 1000);
  if (!ws) return;
  bindMessageForRedPacket(ws, room_id, async () => {
    if (!wait_num || wait_num > 0) return;
    await sleep(20000);
    if (waitting.value === false && wsMap.size < TaskConfig.redPack.linkRoomNum) {
      const redPacket = await getRedPacket(room_id);
      redPacket && (await doRedPacket({ ...redPacket, uid, uname, room_id }));
    }
  });
  return ws;
}

async function biliDmHandle({ room_id, uid }: RedPacket, wsTime: number) {
  const clearDmTimes = sendDm(room_id, wsTime);
  await sleep(5000);
  const { ownInfo } = await request(getOnlineGoldRank, undefined, uid, room_id);
  if (ownInfo?.score === 0) {
    addRiskCount();
    closeWs(room_id);
    clearDmTimes();
    return;
  }
  clearRiskCount();
}

function joinErrorHandle(uname: string, code: number, message: string) {
  switch (code) {
    case 1009109: // 今日参与次数已用完
      logger.info(message);
      return ReturnStatus.退出;
    case 1009114: // 已经参与过了
    case 1009108: // 不在时间范围内
      return;
    default:
      logger.info(`【${uname}】红包失败 ${code} ${message}`);
      return;
  }
}

/**
 * 发送直播间弹幕
 */
function sendDm(room_id: number, wsTime: number) {
  const [dm1, dm2] = TaskConfig.redPack.dmNum,
    danmuNum = dm2 ? random(dm1, dm2) : dm1,
    times = Math.min(10, Math.ceil(wsTime / 5), danmuNum);
  const timers: NodeJS.Timer[] = [];
  for (let i = 0; i < times; i++) {
    timers.push(
      setTimeout(() => {
        sendMessage(room_id, getRandomItem(DMEmoji).emoticon_unique, 1).catch(err => {
          logger.warn(`发送红包消息异常: ${err.message}`);
        });
      }, i * 5000),
    );
  }
  return () => timers.forEach(timer => timer && clearTimeout(timer));
}

/**
 * 对一个分区进行天选
 * @param areaId
 * @param parentId
 */
async function doRedPackArea(areaId: string, parentId: string) {
  const linkRoomNum = TaskConfig.redPack.linkRoomNum;
  const rooms = await getLotteryRoomList(areaId, parentId, 2, 'redPack');

  await waitForWebSocket(linkRoomNum);

  for (const room of rooms) {
    const redPacket = await getRedPacket(room.roomid);
    if (!redPacket) continue;

    const status = await doRedPacket({
      uid: room.uid,
      uname: room.uname,
      lot_id: redPacket.lot_id,
      room_id: room.roomid,
      end_time: redPacket.end_time,
      wait_num: redPacket.wait_num,
    });

    const returnStatus = status || (await returnStatusHandle());
    await waitForWebSocket(linkRoomNum);
    if (returnStatus !== undefined) return returnStatus;
  }
}

/**
 * 通过 ws 数量限制红包并发数
 */
function waitForWebSocket(conditions = 2) {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (wsMap.size < conditions) {
        clearInterval(timer);
        resolve(true);
      }
    }, 1000);
  });
}

/**
 * 根据返回状态做出相应的处理（等待/退出）
 */
async function waitForStatus(status: number | undefined) {
  const { riskTime, restTime } = TaskConfig.redPack;
  switch (status) {
    case ReturnStatus.风控休眠: {
      if (riskTime[1] < 1) {
        logger.debug(`不执行风控休眠，直接退出！`);
        return ReturnStatus.退出;
      }
      return await handleSleep(riskTime[1]);
    }
    case ReturnStatus.中场休眠: {
      if (restTime[1] < 1) {
        logger.debug(`不执行中场休眠，直接退出！`);
        return ReturnStatus.退出;
      }
      return await handleSleep(restTime[1]);
    }
    default:
      return status;
  }

  async function handleSleep(time: number) {
    if (TaskConfig.redPack.moveUpInWait) {
      const { moveTag, actFollowMsg } = TaskConfig.redPack;
      await handleFollowUps(newFollowUp, undefined, moveTag, actFollowMsg, false);
      newFollowUp = [];
    }
    waitting.value = true;
    await sleep(time * 60000);
    waitting.value = false;
  }
}

/**
 * 进行天选
 */
export async function liveRedPackService() {
  init();
  await run();
  await waitForWebSocket(1);
  return newFollowUp;
}

async function run() {
  const { source } = TaskConfig.redPack;
  switch (source) {
    case 1:
      return await runByActivity();
    case 2:
      return await runByScanArea();
    default: {
      if ((await runByActivity()) === ReturnStatus.未获取到房间) {
        return await runByScanArea();
      }
    }
  }
}

async function runByScanArea() {
  // 获取直播分区
  const areaList = await getLiveArea();
  // 遍历大区
  for (const areas of areaList) {
    await sleep(3000);
    // 遍历小区
    for (const area of areas) {
      const status = await waitForStatus(await doRedPackArea(area.areaId, area.parentId));
      if (status === undefined) continue;
      if (status === ReturnStatus.退出) return;
    }
  }
  return await runByScanArea();
}

async function runByActivity() {
  const roomList = await getRoomListByLink();
  if (!roomList || !roomList.length) {
    return ReturnStatus.未获取到房间;
  }
  const { linkRoomNum, intervalActive } = TaskConfig.redPack;

  for (const room of roomList) {
    const status = await doRedPacket({
      uid: +room.ruid,
      uname: room.runame,
      lot_id: +room.lotId,
      room_id: +room.roomId,
      ws_time: room.countDown,
    });

    const returnStatus = await waitForStatus(status || (await returnStatusHandle()));
    if (returnStatus !== undefined) return returnStatus;
    await waitForWebSocket(linkRoomNum);
  }
  await sleep(intervalActive * 1000);
  return await runByActivity();
}

function init() {
  newFollowUp = [];
  clearWs();
  joinCount = 0;
  restCount = 0;
  clearRiskCount();
  noWinRef.value = 0;
  waitting.value = false;
}

function addRiskCount() {
  riskCount++;
  riskTotalCount++;
}

function clearRiskCount() {
  riskCount = 0;
  riskTotalCount = 0;
}
