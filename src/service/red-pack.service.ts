import type { IdType } from '@/types';
import { getRandomItem, getUnixTime, logger, pushIfNotExist, sleep } from '@/utils';
import { joinRedPacket, checkRedPacket, sendMessage, getOnlineGoldRank } from '@/net/live.request';
import { TaskConfig } from '@/config/globalVar';
import { biliWS, clearWs, closeWs, wsList } from '@/utils/ws';
import { DMEmoji } from '@/constant/dm';
import { getLiveArea, getLotteryRoomList } from './live-lottery.service';
import { request } from '@/utils/request';

// 可能是新关注的UP
let newFollowUp: (number | string)[];

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
  const wsTime = end_time - getUnixTime();
  if (wsTime < 2) return;
  try {
    logger.debug(`红包主播：【${uname}】`);
    const ws = await biliWS(room_id, (wsTime + 20) * 1000);
    wsList.add(ws);
    await sleep(3000);
    const { code, message } = await joinRedPacket({
      room_id,
      lot_id,
      ruid: uid,
    });
    if (code !== 0) {
      logger.warn(`红包失败: ${code}-${message}`);
      closeWs(ws);
      return;
    }
    pushIfNotExist(newFollowUp, uid);
    logger.debug(`红包成功 √`);
    sendDm(room_id, wsTime);
    await sleep(5000);
    const { ownInfo } = await request(getOnlineGoldRank, undefined, uid, room_id);
    console.log(room_id, ownInfo.needScore, ownInfo.score, ownInfo.rank);
    if (ownInfo?.score === 0) {
      logger.warn(`score 为 0，可能账号已被风控，等待 2 分钟！`);
      closeWs(ws);
      return true;
    }
  } catch (error) {
    logger.error(`红包异常: ${error.message}`);
  }
}

/**
 * 发送直播间弹幕
 */
function sendDm(room_id: number, wsTime: number) {
  let msgTimes = Math.ceil(wsTime / 5);
  msgTimes = msgTimes > 10 ? 10 : msgTimes;
  const timers: NodeJS.Timer[] = [];
  for (let i = 0; i < msgTimes; i++) {
    timers.push(
      setTimeout(() => {
        sendMessage(room_id, getRandomItem(DMEmoji).emoticon_unique, 1).catch(err => {
          logger.warn(`发送红包消息异常: ${err.message}`);
        });
      }, i * 5000),
    );
  }
  return timers;
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
      console.log('room', room);
      await waitForRedPacket();
      if (await doRedPacket(room)) return true;
    }
  }
}

function waitForRedPacket(conditions = 2) {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      console.log('waitForRedPacket', conditions, wsList.size);
      if (wsList.size < conditions) {
        console.log('wsList.size', wsList.size);
        clearInterval(timer);
        resolve(true);
      }
    }, 1000);
  });
}

/**
 * 进行天选
 */
export async function liveRedPackService() {
  newFollowUp = [];
  clearWs();
  const { pageNum } = TaskConfig.lottery;
  // 获取直播分区
  const areaList = await getLiveArea();
  // 遍历大区
  for (const areas of areaList) {
    await sleep(8000);
    // 遍历小区
    for (const area of areas) {
      await sleep(2000);
      if (await doRedPackArea(area.areaId, area.parentId, pageNum)) {
        await sleep(200000);
      }
    }
  }
  await waitForRedPacket(1);
  return newFollowUp;
}
