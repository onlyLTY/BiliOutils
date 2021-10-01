import * as CryptoJS from 'crypto-js';
import { random } from 'lodash';

import { HeartBaseDateType, DeviceType, HmacsData, LiveHeartRuleId } from '../interface/LiveHeart';
import { getLIVE_BUVID, createUUID, getBiliJct, apiDelay } from '../utils';
import { Constant, TaskConfig } from '../config/globalVar';
import * as liveHeartRequest from '../net/liveHeartRequest';
import * as liveRequest from '../net/liveRequest';
import { LiveHeartEDto } from '../dto/Live.dto';
import { getGiftBagList } from '../net/liveRequest';

const START_MAX_NUM = 24;
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
    s = CryptoJS[`Hmac${HmacFuncString[r]}`](s, key).toString(CryptoJS.enc.Hex);
  }
  return s;
}

function createBaseData(
  roomid: number,
  areaid: number,
  parentid: number,
  uname: string,
  seq: { v: number },
): HeartBaseDateType {
  const csrf_token = getBiliJct(),
    csrf = csrf_token;
  const device: DeviceType = [getLIVE_BUVID(), createUUID()];
  return {
    ua: TaskConfig.USER_AGENT,
    id: [parentid, areaid, seq.v, roomid],
    csrf_token,
    csrf,
    device,
    uname,
  };
}

async function heartBeat(uname: string) {
  try {
    await liveHeartRequest.heartBeat();
    console.log(`向【${uname}】的直播间发送一次 heartBeat`);
  } catch {}
}

/** 获取今日可获取小心心数 */
async function getHeartNum() {
  let giftNum = 0;
  try {
    const { data, code } = await getGiftBagList();
    if (code !== 0 || data.list?.length <= 0) {
      return START_MAX_NUM;
    }
    data.list?.forEach(gift => {
      /** 30607 小星星 */
      if (gift.gift_id === 30607) {
        const expire = (gift.expire_at * 1000 - new Date().getTime()) / Constant.MS2DATE;
        if (expire > 6 && expire <= 7) giftNum += gift.gift_num;
      }
    });
    if (giftNum >= START_MAX_NUM) {
      console.log('已获取今日小心心');
      return 0;
    }
    return START_MAX_NUM - giftNum;
  } catch (error) {}
  return START_MAX_NUM;
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

  const { data, code } = await liveHeartRequest.postE(postData);
  if (code === 0) {
    console.log(`进入【${baseDate.uname}】的直播间`);
    seq.v++;
    return data;
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
    console.log(`向【${baseData.uname}】发送第${seq.v}次心跳`);
    seq.v++;
  } else {
    console.log(`向【${baseData.uname}】发送第${seq.v}次心跳失败`, code, message);
  }
  return data;
}

export default async function liveHeart() {
  console.log('----【直播心跳】----');

  const heartNum = await getHeartNum();
  const {
    data: { fansMedalList },
  } = await liveRequest.getLiveFansMedal();
  // const loopNum = Math.ceil(heartNum / fansMedalList.length);

  let count = 0;
  for (const funsMedalData of fansMedalList) {
    if (count >= heartNum) {
      break;
    }
    const { roomid, uname } = funsMedalData;
    const { room_id, area_id, parent_area_id } = await getOneRoomInfo(roomid);
    const seq = { v: 0 };
    const baseData = createBaseData(room_id, area_id, parent_area_id, uname, seq);

    const heartBeatTimer = setInterval(async () => {
      await heartBeat(uname);
    }, random(60, 200) * 1000);

    await heartBeat(uname);
    await apiDelay(500);
    let rData = await postE(baseData, seq);

    const timer = setInterval(async () => {
      await apiDelay(1000);
      rData = await postX(rData, baseData, seq);
      if (seq.v > 5) {
        clearInterval(timer);
        clearInterval(heartBeatTimer);
      }
    }, 60 * 1000);

    await apiDelay(1000);
    count++;
  }
}
