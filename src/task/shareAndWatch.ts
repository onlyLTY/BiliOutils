import { apiDelay, random } from '../utils';
import { addShare, uploadVideoHeartbeat } from '../net/video.request';
import { getAidByByPriority, getAidByRegionRank } from '../service/coin.service';
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
  let gAid: number | string = 0;
  //获取aid
  try {
    const biliav = await getVideo();
    if (biliav.code === 0) {
      const { id, author, title } = biliav.data;
      gAid = id;
      logger.info(`获取视频: ${title} --up【${author}】`);
    } else {
      logger.warn(`获取视频失败 ${biliav.msg}`);
      return false;
    }
  } catch (error) {
    logger.error(`获取视频出现异常: ${error.message}`);
    return false; //不再执行
  }

  //分享
  if (!TaskModule.share) {
    await apiDelay();
    await request(addShare, { name: '分享视频', okMsg: '分享视频成功！' }, gAid);
  }

  //播放视频
  if (!TaskModule.watch) {
    await apiDelay();
    //随机上传4s到60s
    await request(
      uploadVideoHeartbeat,
      { name: '播放视频', okMsg: '播放视频成功！' },
      gAid,
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
      return await getAidByRegionRank();
    }
    if (biliav && biliav.data.coinType === 'video') {
      return biliav;
    }
  }
  return await getAidByRegionRank();
}
