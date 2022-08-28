import type { IdType } from '@/types';
import { getRandomItem, getUnixTime, logger, pushIfNotExist, random, sleep } from '@/utils';
import { joinRedPacket, checkRedPacket, sendMessage, getOnlineGoldRank } from '@/net/live.request';
import { TaskConfig } from '@/config/globalVar';
import { biliDmWs, clearWs, closeWs, wsList } from '@/utils/ws';
import { DMEmoji } from '@/constant/dm';
import { getLiveArea, getLotteryRoomList } from './live-lottery.service';
import { request } from '@/utils/request';
import { handleFollowUps } from './tags.service';
import { WebSocket } from 'ws';

// 可能是新关注的UP
let newFollowUp: (number | string)[],
  joinCount = 0,
  restCount = 0,
  riskCount = 0;
const waitting: Ref<boolean> = { value: false };

/**
 * 状态枚举
 */
const ReturnStatus = {
  退出: 0,
  中场休眠: -1,
  风控休眠: -2,
};

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
  wait_num: number;
  end_time: number;
}

/**
 * 进行一个直播间红包
 * @param redPacket
 */
async function doRedPacket(redPacket: RedPacket) {
  const { end_time } = redPacket;
  const wsTime = end_time - getUnixTime();
  if (wsTime < 4) return;
  joinCount++;
  restCount++;
  return await joinRedPacketHandle(redPacket, wsTime);
}

async function returnStatusHandle() {
  const { restTime, totalNum } = TaskConfig.redPack;
  if (joinCount >= totalNum) {
    logger.debug(`已经参与了${totalNum}次，停止运行`);
    return ReturnStatus.退出;
  }
  if (restTime[0] && restCount >= restTime[0]) {
    restCount = 0;
    logger.debug(`中场休息时间到，暂停运行${restTime[1]}分`);
    return ReturnStatus.中场休眠;
  }
  if (riskCount >= 5) {
    logger.warn(`疑似风控连续出现5次，停止运行`);
    return ReturnStatus.退出;
  }
}

async function joinRedPacketHandle(redPacket: RedPacket, wsTime: number) {
  const { lot_id, uid, uname, room_id } = redPacket;
  try {
    const ws = await createBiliDmWs(redPacket, wsTime);
    if (!ws) return;
    wsList.add(ws);
    await sleep(2000);
    const { code, message } = await joinRedPacket({
      room_id,
      lot_id,
      ruid: uid,
    });
    pushIfNotExist(newFollowUp, uid);
    if (code !== 0) {
      closeWs(ws);
      return joinErrorHandle(uname, code, message);
    }
    logger.debug(`【${uname}】红包成功 √`);
    return biliDmHandle(ws, redPacket, wsTime);
  } catch (error) {
    logger.error(`红包异常: ${error.message}`);
  }
}

function createBiliDmWs({ room_id, wait_num, uid, uname }: RedPacket, wsTime: number) {
  return biliDmWs(room_id, (wsTime + 20) * 1000, async () => {
    if (wait_num > 0) return;
    await sleep(20000);
    if (waitting.value === false && wsList.size < TaskConfig.redPack.linkRoomNum) {
      const redPacket = await getRedPacket(room_id);
      redPacket && (await doRedPacket({ ...redPacket, uid, uname, room_id }));
    }
  });
}

async function biliDmHandle(ws: WebSocket, { room_id, uid }: RedPacket, wsTime: number) {
  const clearDmTimes = sendDm(room_id, wsTime);
  await sleep(5000);
  const { ownInfo } = await request(getOnlineGoldRank, undefined, uid, room_id);
  if (ownInfo?.score === 0) {
    restCount = 0;
    riskCount++;
    const { riskSleepTime } = TaskConfig.redPack;
    logger.debug(`可能账号已被风控，等待${riskSleepTime}分！`);
    closeWs(ws);
    clearDmTimes();
    return ReturnStatus.风控休眠;
  }
  riskCount = 0;
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

  for (const room of rooms) {
    await waitForWebSocket(linkRoomNum);

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
    if (returnStatus !== undefined) return returnStatus;
  }
}

/**
 * 通过 ws 数量限制红包并发数
 */
function waitForWebSocket(conditions = 2) {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (wsList.size < conditions) {
        clearInterval(timer);
        resolve(true);
      }
    }, 1000);
  });
}

async function waitForStatus(status: number | undefined) {
  const { riskSleepTime, restTime } = TaskConfig.redPack;
  switch (status) {
    case ReturnStatus.风控休眠: {
      if (riskSleepTime === -1) {
        return ReturnStatus.退出;
      }
      return await handleSleep(riskSleepTime);
    }
    case ReturnStatus.中场休眠: {
      if (restTime[1] === -1) {
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
  if (joinCount >= 100) return;
  // 获取直播分区
  const areaList = await getLiveArea();
  // 遍历大区
  for (const areas of areaList) {
    await sleep(3000);
    // 遍历小区
    for (const area of areas) {
      await sleep(1000);
      const status = await waitForStatus(await doRedPackArea(area.areaId, area.parentId));
      if (status === undefined) continue;
      if (status === ReturnStatus.退出) return;
    }
  }
  return await run();
}

function init() {
  newFollowUp = [];
  clearWs();
  joinCount = 0;
  restCount = 0;
  riskCount = 0;
  waitting.value = false;
}
