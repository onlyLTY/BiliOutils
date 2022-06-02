import { TaskConfig } from '@/config/globalVar';
import type { ApiBaseProp } from '@/dto/bili-base-prop';
import type { ShareLiveRoomRes } from '@/dto/intimacy.dto';
import { liveApi } from './api';

/**
 * 分享直播间
 */
export function shareLiveRoom(roomid: number) {
  return liveApi.post<ShareLiveRoomRes>(`xlive/web-room/v1/index/TrigerInteract`, {
    roomid,
    interact_type: 3,
    csrf: TaskConfig.BILIJCT,
    csrf_token: TaskConfig.BILIJCT,
    visit_id: '',
  });
}

/**
 * 点赞直播间
 */
export function likeLiveRoom(roomid: number) {
  return liveApi.post<ApiBaseProp>(`xlive/web-ucenter/v1/interact/likeInteract`, {
    roomid,
    csrf: TaskConfig.BILIJCT,
    csrf_token: TaskConfig.BILIJCT,
  });
}
