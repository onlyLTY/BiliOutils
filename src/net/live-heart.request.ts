import type { LiveHeartERequest, LiveHeartXRequest } from '../types/LiveHeart';
import type { LiveHeartEDto } from '../dto/live.dto';
import { biliHttp, liveApi, liveTraceApi } from './api';
import { appSignString } from '@/utils/bili';
import { TaskConfig } from '@/config/globalVar';
import { createUUID, getUnixTime } from '@/utils';
import { LiveHeartBeatRes } from '@/dto/intimacy.dto';

/**
 * 发送 E 请求
 */
export function postE(postData: LiveHeartERequest): Promise<LiveHeartEDto> {
  return biliHttp.post('https://live-trace.bilibili.com/xlive/data-interface/v1/x25Kn/E', postData);
}

/**
 * 发送 X 请求
 */
export function postX(postData: LiveHeartXRequest): Promise<LiveHeartEDto> {
  return biliHttp.post('https://live-trace.bilibili.com/xlive/data-interface/v1/x25Kn/X', postData);
}

/**
 * 不知道有啥用
 */
export function heartBeat() {
  return biliHttp.get('https://api.live.bilibili.com/relation/v1/Feed/heartBeat');
}

/**
 * 这是啥（移动端）
 */
export function entryRoomMoblie({
  room_id,
  up_id = 0,
  parent_id = 0,
  area_id = 0,
}: {
  room_id: number;
  up_id?: number;
  parent_id?: number;
  area_id?: number;
}) {
  return liveTraceApi.post(
    'xlive/data-interface/v1/heartbeat/mobileEntry',
    appSignString({
      csrf: TaskConfig.BILIJCT,
      buvid: TaskConfig.buvid,
      client_ts: getUnixTime(),
      seq_id: 0,
      uuid: createUUID(),
      parent_id,
      room_id,
      up_id,
      is_patch: 0,
      heart_beat: [],
      area_id,
      mobi_app: 'android',
    }),
  );
}

/**
 * 进入直播间（移动端）
 */
export function entryActionMobile({
  room_id,
  jumpFrom = 1546736,
}: {
  room_id: number;
  jumpFrom?: number;
}) {
  return liveApi.post<LiveHeartBeatRes>(
    'xlive/app-room/v1/index/roomEntryAction',
    appSignString({
      csrf: TaskConfig.BILIJCT,
      jumpFrom,
      noHistory: 0,
      room_id,
    }),
  );
}

/**
 * 进入直播间（ PC 端）
 */
export function entryRoomPc(room_id: number) {
  return liveApi.post('xlive/web-room/v1/index/roomEntryAction', {
    csrf: TaskConfig.BILIJCT,
    csrf_token: TaskConfig.BILIJCT,
    room_id,
    visit_id: '',
    platform: 'pc',
  });
}

/**
 * 未知
 */
export function getAnchorInRoom(roomid: number) {
  return liveApi.get(`live_user/v1/UserInfo/get_anchor_in_room?roomid=${roomid}}`);
}
