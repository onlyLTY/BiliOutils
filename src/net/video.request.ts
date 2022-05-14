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
