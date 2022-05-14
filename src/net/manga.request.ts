import type { ClockInDto } from '../dto/manga.dto';
import { mangaApi } from './api';

/**
 * 漫画签到
 * @param platform 签到平台
 */
export function clockIn(platform = 'android'): Promise<ClockInDto> {
  return mangaApi.post('/twirp/activity.v1.Activity/ClockIn', {
    platform,
  });
}
