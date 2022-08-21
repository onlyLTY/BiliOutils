import type { BangumiFollowDto } from '@/dto/video.dto';
import { addBangumi, cancelBangumi } from '@/net/video.request';
import { apiDelay, logger } from '@/utils';

async function followBangumi(
  reqFunc: (season_id: number | string) => Promise<BangumiFollowDto>,
  season_id: number | string,
  name: string,
) {
  try {
    const { code, message, result } = await reqFunc(season_id);
    if (code !== 0) {
      logger.warn(`${name}失败：${code} ${message}`);
      return;
    }
    return result;
  } catch (error) {
    logger.error(error);
  }
}

/**
 * 追番
 */
export function addBangumiFollow(season_id: number | string) {
  return followBangumi(addBangumi, season_id, '追番');
}

/**
 * 取消追番
 */
export function delBangumiFollow(season_id: number | string) {
  return followBangumi(cancelBangumi, season_id, '取消追番');
}

/**
 * 追番然后取消追番
 */
export async function addAndDelBangumiFollow(season_id: number | string) {
  await addBangumiFollow(season_id);
  await apiDelay();
  await delBangumiFollow(season_id);
}
