import * as crypto from 'crypto';
import type { HeartBaseDateType, DeviceType, HmacsData, LiveHeartRuleId } from '../types';
import { createUUID, apiDelay, gzipDecode, gzipEncode } from '../utils';
import { getLIVE_BUVID, getBiliJct } from '../utils/cookie';
import { TaskConfig } from '../config/globalVar';
import * as liveHeartRequest from '../net/live-heart.request';
import * as liveRequest from '../net/live.request';
import { LiveFansMedalDto, LiveFansMedalItem, LiveHeartEDto } from '../dto/live.dto';
import { getGiftBagList } from '../net/live.request';
import { logger } from '../utils/log';
import { MS2DATE } from '../constant';

const HEART_MAX_NUM = 24;
/**
 * 处理数据
 */
function hmacs(hmacsData: HmacsData, rule: LiveHeartRuleId) {
  const [parent_id, area_id, seq_id, room_id] = JSON.parse(hmacsData.id) as LiveHeartRuleId;
  const [buvid, uuid] = JSON.parse(hmacsData.device) as DeviceType;
  const { ets, time, ts } = hmacsData;

  const newData = {
    platform: 'web',
    parent_id,
    area_id,
    seq_id,
    room_id,
    buvid,
    uuid,
    ets,
    time,
    ts,
  };

  const key = hmacsData.benchmark;
  const HmacFuncString = ['MD5', 'SHA1', 'SHA256', 'SHA224', 'SHA512', 'SHA384'];
  let s = JSON.stringify(newData);

  for (const r of rule) {
    s = crypto.createHmac(HmacFuncString[r], key).update(s).digest('hex');
  }
  return s;
}

function createBaseData(
  roomid: number,
  areaid: number,
  parentid: number,
  uname: string,
  seq: number,
): HeartBaseDateType {
  const csrf_token = getBiliJct(),
    csrf = csrf_token;
  const device: DeviceType = [getLIVE_BUVID(), createUUID()];
  return {
    ua: TaskConfig.USER_AGENT,
    id: [parentid, areaid, seq, roomid],
    csrf_token,
    csrf,
    device,
    uname,
  };
}

async function heartBeat() {
  try {
    await liveHeartRequest.heartBeat();
  } catch {}
}

/** 获取今日可获取小心心数 */
async function getHeartNum() {
  let giftNum = 0;
  try {
    const { data, code } = await getGiftBagList();
    if (code !== 0 || data.list?.length <= 0) {
      return HEART_MAX_NUM;
    }
    data.list?.forEach(gift => {
      /** 30607 小星星 */
      if (gift.gift_id === 30607) {
        const expire = (gift.expire_at * 1000 - new Date().getTime()) / MS2DATE;
        if (expire > 6 && expire <= 7) giftNum += gift.gift_num;
      }
    });
    if (giftNum >= HEART_MAX_NUM) {
      return 0;
    }
    return HEART_MAX_NUM - giftNum;
  } catch (error) {}
  return HEART_MAX_NUM;
}

async function getOneRoomInfo(roomid: number) {
  const {
    data: { area_id, parent_area_id, room_id },
  } = await liveRequest.getLiveRoomInfo(roomid);
  return {
    room_id,
    area_id,
    parent_area_id,
  };
}

/**
 * 发送 E 请求
 */
async function postE(baseDate: HeartBaseDateType, seq: { v: number }) {
  const postData = {
    id: JSON.stringify(baseDate.id),
    device: JSON.stringify(baseDate.device),
    ts: new Date().getTime(),
    is_patch: 0,
    heart_beat: '[]',
    ua: baseDate.ua,
    visit_id: '',
    csrf: baseDate.csrf,
    csrf_token: baseDate.csrf_token,
  };

  try {
    const { data, code } = await liveHeartRequest.postE(postData);
    if (code === 0) {
      logger.info(`进入【${baseDate.uname}】的直播间`);
      seq.v++;
      return data;
    }
  } catch (error) {
    logger.verbose(error);
  }
}

/**
 * 发送 X 请求
 */
async function postX(
  rData: LiveHeartEDto['data'],
  baseData: HeartBaseDateType,
  seq: { v: number },
) {
  if (seq.v > 6) {
    return;
  }

  const postData = {
    id: JSON.stringify(baseData.id),
    device: JSON.stringify(baseData.device),
    ets: rData.timestamp,
    benchmark: rData.secret_key,
    time: 60,
    ts: new Date().getTime(),
    ua: baseData.ua,
  };

  const s = hmacs(postData, rData.secret_rule);

  try {
    const { data, code, message } = await liveHeartRequest.postX(
      Object.assign(
        {
          visit_id: '',
          csrf: baseData.csrf,
          csrf_token: baseData.csrf_token,
          s,
        },
        postData,
      ),
    );

    if (code === 0) {
      logger.info(`向【${baseData.uname}】发送第${seq.v}次心跳`);
      seq.v++;
    } else {
      logger.warn(`向【${baseData.uname}】发送第${seq.v}次心跳失败 ${code} ${message}`);
    }
    return data;
  } catch (error) {
    logger.verbose(error);
  }
}

async function getFansMeal10(page = 1, pageSize = 10): Promise<LiveFansMedalDto['data']> {
  try {
    const { code, message, data } = await liveRequest.getLiveFansMedal(page, pageSize);

    if (code !== 0) {
      logger.verbose(`获取直播间失败 ${code} ${message}`);
      return null;
    }

    return data;
  } catch (error) {
    logger.verbose(`获取直播间异常 ${error.message}`);
    return null;
  }
}

async function getMoreFansMedal() {
  const { items: fansMedalList, page_info } = await getFansMeal10();
  let { total_page: totalpages } = page_info;

  if (totalpages && totalpages > 1) {
    // 最多需要 3 页的
    totalpages = totalpages > 3 ? 3 : totalpages;
    for (let index = 2; index <= totalpages; index++) {
      const medalTemp = await getFansMeal10(index, 10);
      fansMedalList.push(...medalTemp.items);
    }
  }

  return fansMedalList;
}

async function getFansMedalList(more = true) {
  const heartNum = await getHeartNum();
  let items: LiveFansMedalItem[];
  if (more) {
    items = await getMoreFansMedal();
  } else {
    ({ items } = await getFansMeal10());
  }
  return {
    fansMedalList: items,
    heartNum,
  };
}

export default async function liveHeart() {
  logger.info('----【直播心跳】----');

  const { heartNum, fansMedalList } = await getFansMedalList();
  const length = fansMedalList && fansMedalList.length;
  if (!length) {
    logger.info('没有勋章列表');
    return;
  }
  const loopNum = Math.ceil(heartNum / length);

  for (let i = 0; i < loopNum; i++) {
    await runOneLoop(fansMedalList, heartNum);
  }
  logger.info('完成');
}

export { liveHeart };

async function runOnePost(baseData, rDataArr, j, seq) {
  if (seq.v && !rDataArr[j]) {
    return;
  }

  await heartBeat();
  await apiDelay(500);
  if (seq.v === 0) {
    rDataArr[j] = await postE(baseData, seq);
  } else {
    rDataArr[j] = await postX(rDataArr[j], baseData, seq);
  }

  return 'done';
}

export async function runOneLoop(fansMedalList: LiveFansMedalItem[], heartNum: number) {
  const apiDelayTime = 2000;
  const rDataArray = [];
  let runTime = 0;
  for (let index = 0; index < 6; index++) {
    let count = 0;
    if (count >= heartNum) {
      break;
    }
    const length = fansMedalList.length;
    runTime = 0;
    for (let j = 0; j < length; j++) {
      if (count >= heartNum) {
        break;
      }
      // 开始计时
      const runStartTime = new Date().getTime();
      const funsMedalData = fansMedalList[j];
      const { roomid, uname } = funsMedalData;
      const { room_id, area_id, parent_area_id } = await getOneRoomInfo(roomid);
      const baseData = createBaseData(room_id, area_id, parent_area_id, uname, index);
      await runOnePost(baseData, rDataArray, j, { v: index });
      await apiDelay(apiDelayTime);
      // 结束计时
      runTime += new Date().getTime() - runStartTime;
      count++;
    }
    // 最后一次不等待
    if (index < 5) {
      // 去掉部分延时，保证时间接近 1 分
      await apiDelay(60000 - runTime /** - 计时总时间 */);
    }
  }
  return 'done';
}

/**
 * 下面是云函数相关
 */

/**
 * 返回参数
 */
interface RData {
  data: LiveHeartEDto['data'];
  baseData: HeartBaseDateType;
  seq: { v: number };
}

function initData(rData: RData[]) {
  const buvid = getLIVE_BUVID();
  const bilijct = getBiliJct();
  const ua = TaskConfig.USER_AGENT;
  rData.forEach(item => {
    item.baseData.ua = ua;
    item.baseData.csrf = item.baseData.csrf_token = bilijct;
    item.baseData.device[0] = buvid;
    item.baseData.id[2] = item.seq.v;
  });
}
function simplifyData(rData: RData[]) {
  rData.forEach(item => {
    delete item.baseData.csrf;
    delete item.baseData.csrf_token;
    delete item.baseData.ua;
    // @ts-ignore
    item.baseData.device[0] = 0; // 0 比 null 和 '' 占用更少
  });
}

/**
 * scf 运行 liveHeart
 * @param argData scf 附带信息
 * @returns 0 是完成，1 是等待继续下一轮心跳，json 数据等待继续下次心跳
 */
export async function liveHeartBySCF(argData?: string) {
  let rData: RData[], heartNum: { v: number };

  if (!argData) {
    rData = [{ seq: { v: 0 } }] as RData[];
    heartNum = { v: 0 };
  } else {
    const { d, hn } = JSON.parse(argData);
    rData = typeof d === 'string' ? JSON.parse(gzipDecode(d)) : d || [{ seq: { v: 0 } }];
    heartNum = hn || { v: 0 };
  }

  let count = 0;
  // seq.v === 0 时需要发送 E
  if (rData[0] && !rData[0].seq.v) {
    // 清空数据
    rData.length = 0;
    const { heartNum: hnValue, fansMedalList } = await getFansMedalList();
    heartNum.v = hnValue;

    for (const funsMedalData of fansMedalList) {
      if (heartNum.v === 0) {
        logger.info(`今日获取小星星已经达到 ${HEART_MAX_NUM}`);
        return 0;
      }
      if (count >= heartNum.v) break;
      const { roomid, uname } = funsMedalData;
      const { room_id, area_id, parent_area_id } = await getOneRoomInfo(roomid);
      const seq = { v: 0 };
      const baseData = createBaseData(room_id, area_id, parent_area_id, uname, seq.v);

      await heartBeat();
      await apiDelay(500);
      const data = await postE(baseData, seq);
      rData.push({ data, baseData, seq });
      count++;
    }
  } else {
    // 需要发送 X
    initData(rData);
    for (const r of rData) {
      await heartBeat();
      r.data &&= await postX(r.data, r.baseData, r.seq);
      await apiDelay(1000);
      count++; // 需要放在判断上面
      if (r.seq.v > 5) {
        r.seq.v = 0;
        if (count >= heartNum.v) {
          logger.info(`今日获取小心心完成`);
          return 0;
        }
      }
    }
    if (rData.find(r => r.seq.v > 5)) {
      return 1;
    }
  }
  simplifyData(rData);
  return { d: gzipEncode(JSON.stringify(rData)), hn: heartNum, l: rData.length };
}
