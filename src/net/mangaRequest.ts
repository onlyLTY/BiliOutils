import { stringify } from 'qs';
import { ClockInDto } from '../dto/Manga.dto';
import { mangaApi } from './api';

/**
 * 漫画签到
 * @param platform 签到平台
 */
export async function clockIn(platform = 'android'): Promise<ClockInDto> {
  const { data } = await mangaApi.post(
    '/twirp/activity.v1.Activity/ClockIn',
    stringify({
      platform,
    }),
  );
  return data;
}
