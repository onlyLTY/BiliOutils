import type { IdType } from '@/types';
import { getRandomItem, getUnixTime, logger, pushIfNotExist, random, sleep } from '@/utils';
import { joinRedPacket, checkRedPacket, sendMessage, getOnlineGoldRank } from '@/net/live.request';
import { TaskConfig } from '@/config/globalVar';
import { biliDmWs, clearWs, closeWs, wsList } from '@/utils/ws';
import { DMEmoji } from '@/constant/dm';
import { getLiveArea, getLotteryRoomList, handleFollowUps } from './live-lottery.service';
import { request } from '@/utils/request';
import { getLastFollow } from './tags.service';

// 可能是新关注的UP
let newFollowUp: (number | string)[],
  joinCount = 0,
  restCount = 0;

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
  end_time: number;
}

/**
 * 获取一个区有红包的直播间
 * @param areaId
 * @param parentId
 * @param page
 */
async function getRedPacketRoom(areaId: string, parentId: string, page = 1) {
  const roomList = await getLotteryRoomList(areaId, parentId, page, 'redPack');
  const checkedRoomList: RedPacket[] = [];
  for (const room of roomList) {
    const redPacket = await getRedPacket(room.roomid);
    if (redPacket) {
      checkedRoomList.push({
        uid: room.uid,
        uname: room.uname,
        lot_id: redPacket.lot_id,
        room_id: room.roomid,
        end_time: redPacket.end_time,
      });
      await sleep(100);
    }
  }
  return checkedRoomList;
}

/**
 * 进行一个直播间红包
 * @param redPacket
 */
async function doRedPacket(redPacket: RedPacket) {
  const { lot_id, uid, uname, room_id, end_time } = redPacket;
  const { restTime, totalNum, riskSleepTime } = TaskConfig.redPack;
  const wsTime = end_time - getUnixTime();
  if (wsTime < 4) return;
  if (joinCount >= totalNum) {
    logger.debug(`已经参与了${totalNum}次，停止运行`);
    return ReturnStatus.退出;
  }
  if (restCount >= restTime[0]) {
    restCount = 0;
    logger.debug(`中场休息时间到，暂停运行${restTime[1]}分`);
    return ReturnStatus.中场休眠;
  }
  joinCount++;
  restCount++;
  try {
    const ws = await biliDmWs(room_id, (wsTime + 20) * 1000);
    if (!ws) return;
    wsList.add(ws);
    await sleep(3000);
    const { code, message } = await joinRedPacket({
      room_id,
      lot_id,
      ruid: uid,
    });
    if (code !== 0) {
      closeWs(ws);
      return joinErrorHandle(uname, code, message);
    }
    pushIfNotExist(newFollowUp, uid);
    logger.debug(`【${uname}】红包成功 √`);
    const clearDmTimes = sendDm(room_id, wsTime);
    await sleep(5000);
    const { ownInfo } = await request(getOnlineGoldRank, undefined, uid, room_id);
    if (ownInfo?.score === 0) {
      logger.debug(`可能账号已被风控，等待${riskSleepTime}分！`);
      closeWs(ws);
      clearDmTimes();
      return ReturnStatus.风控休眠;
    }
  } catch (error) {
    logger.error(`红包异常: ${error.message}`);
  }
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
  const rooms = await getRedPacketRoom(areaId, parentId);
  for (const room of rooms) {
    await waitForWebSocket(linkRoomNum);
    const status = await doRedPacket(room);
    if (status !== undefined) return status;
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
    const last = await getLastFollow();
    if (TaskConfig.redPack.moveUpInWait) {
      const { moveTag, actFollowMsg } = TaskConfig.redPack;
      await handleFollowUps(newFollowUp, last, moveTag, actFollowMsg, false);
    }
    await sleep(time * 60000);
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
    await sleep(8000);
    // 遍历小区
    for (const area of areas) {
      await sleep(2000);
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
}
