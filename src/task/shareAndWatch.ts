import { apiDelay, random } from '../utils';
import { addShare, uploadVideoHeartbeat } from '../net/video.request';
import { getAidByByPriority, getAidByRecommend } from '../service/coin.service';
import { TaskModule } from '../config/globalVar';
import { logger } from '../utils/log';
import { request } from '@/utils/request';
import { checkShareAndWatch } from '@/service/reward.service';

/**
 * 每日分享/播放视频
 */
export default async function shareAndWatch() {
  logger.info('----【分享/播放视频】----');
  await checkShareAndWatch();
  if (TaskModule.share && TaskModule.watch) {
    logger.info('已完成，跳过分享/播放');
    return;
  }
  const aid = TaskModule.videoAid || (await getVideoAid());
  if (!aid) {
    return;
  }

  //分享
  if (!TaskModule.share) {
    await apiDelay();
    await request(addShare, { name: '分享视频', okMsg: '分享视频成功！' }, aid);
  }

  //播放视频
  if (!TaskModule.watch) {
    await apiDelay();
    //随机上传4s到60s
    await request(
      uploadVideoHeartbeat,
      { name: '播放视频', okMsg: '播放视频成功！' },
      aid,
      random(4, 60),
    );
  }
}

/**
 * 获取视频
 */
export async function getVideo() {
  for (let errCount = 5; errCount > 0; errCount--) {
    const biliav = await getAidByByPriority();
    if (biliav.code !== 0) {
      return await getAidByRecommend();
    }
    if (biliav && biliav.data?.coinType === '视频') {
      return biliav;
    }
  }
  return await getAidByRecommend();
}

async function getVideoAid() {
  // 获取aid
  try {
    const biliav = await getVideo();
    if (biliav.code === 0) {
      const { id, author, title } = biliav.data || {};
      logger.debug(`获取视频: ${title} --up【${author}】`);
      return id;
    } else {
      logger.warn(`获取视频失败 ${biliav.msg}`);
      return;
    }
  } catch (error) {
    logger.error(`获取视频出现异常: ${error.message}`);
    return;
  }
}
