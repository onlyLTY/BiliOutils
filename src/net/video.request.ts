import type { ApiBaseProp } from '@/dto/bili-base-prop';
import type {
  ShareAddDto,
  RegionRankingVideosDto,
  DonatedCoinsForVideoDto,
  HeartbeatDto,
} from '../dto/video.dto';
import { biliApi } from './api';
import { TaskConfig } from '../config/globalVar';

/**
 * 分享视频
 * @param aid 分享的视频av号
 */
export function addShare(aid: number | string): Promise<ShareAddDto> {
  const reqData = {
    csrf: TaskConfig.BILIJCT,
    aid,
  };
  return biliApi.post('/x/web-interface/share/add', reqData);
}

/**
 * 获取视频分区列表
 * @param rid 分区编号
 * @param day 排行方式
 */
export function getRegionRankingVideos(rid = 1, day = 3): Promise<RegionRankingVideosDto> {
  return biliApi.get('/x/web-interface/ranking/region', {
    params: {
      rid,
      day,
    },
  });
}

/**
 * 给该视频投币数量
 * @param aid 视频av号
 */
export function donatedCoinsForVideo(aid: number): Promise<DonatedCoinsForVideoDto> {
  return biliApi.get('/x/web-interface/archive/coins', {
    params: { aid },
  });
}

/**
 * 上传视频已经观看时间
 * @param aid av号
 * @param playedTime 观看时间
 */
export function uploadVideoHeartbeat(
  aid: number | string,
  playedTime: number,
): Promise<HeartbeatDto> {
  return biliApi.post('/x/click-interface/web/heartbeat', {
    aid,
    played_time: playedTime,
  });
}

interface HeartbeatParams {
  start_ts: number;
  aid?: number;
  cid?: number;
  type?: number;
  sub_type?: number;
  dt?: number;
  play_type?: number;
  realtime?: number;
  played_time?: number;
  real_played_time?: number;
  refer_url?: string;
  sid?: number;
  epid?: number;
}

/**
 * 视频观看心跳
 */
export function videoHeartbeat({
  start_ts,
  aid = 243332804,
  cid = 209599683,
  type = 4,
  sub_type = 5,
  dt = 2,
  play_type = 0,
  realtime = 0,
  played_time = 10,
  real_played_time = 0,
  refer_url = '',
  sid = 33622,
  epid = 327107,
}: HeartbeatParams) {
  return biliApi.post<Omit<ApiBaseProp, 'data'>>('x/click-interface/web/heartbeat', {
    start_ts,
    mid: TaskConfig.USERID,
    aid,
    cid,
    type,
    sub_type,
    dt,
    play_type,
    realtime,
    played_time,
    real_played_time,
    refer_url,
    bsource: '',
    sid,
    epid,
    spmid: '666.25',
    from_spmid: '..0.0',
    csrf: TaskConfig.BILIJCT,
  });
}
