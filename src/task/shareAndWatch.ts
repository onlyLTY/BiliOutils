import { apiDelay, random } from '../utils';
import { addShare, uploadVideoHeartbeat } from '../net/videoRequest';
import { getAidByCustomizeUp, getAidByRegionRank } from './getOneAid';
import { TaskModule } from '../config/globalVar';
import { logger } from '../utils/log';

/**
 * 每日分享/播放视频
 */
export default async function shareAndWatch() {
  logger.info('----【分享/播放视频】----');
  if (TaskModule.share && TaskModule.watch) {
    logger.info('已完成，跳过分享/播放');
    return;
  }
  let gAid: number | string = 0;
  //获取aid
  try {
    let biliav = await getAidByCustomizeUp();
    if (biliav.msg === '-1') biliav = await getAidByRegionRank();

    if (biliav.msg === '0') {
      const { aid, author, title } = biliav.data;
      gAid = aid;
      logger.info(`获取视频: ${title} --up【${author}】`);
    } else {
      logger.info(`获取视频失败 ${biliav.msg}`);
      return false;
    }
  } catch (error) {
    logger.info(`获取视频出现异常: ${error.message}`);
    return false; //不再执行
  }

  //分享
  if (!TaskModule.share) {
    await apiDelay();
    try {
      const { code, message } = await addShare(gAid);
      if (code === 0) {
        logger.info(`分享视频成功!`);
      } else {
        logger.info(`分享视频失败: ${code} ${message}`);
      }
    } catch (error) {
      logger.info(`分享视频异常: ${error.message}`);
    }
  }

  //播放视频
  if (!TaskModule.watch) {
    await apiDelay();
    try {
      //随机上传4s到60s
      const { code, message } = await uploadVideoHeartbeat(gAid, random(4, 60));
      if (code === 0) {
        logger.info(`播放视频成功!`);
      } else {
        logger.info(`播放视频失败: ${code} ${message}`);
      }
    } catch (error) {
      logger.info(`播放视频异常: ${error.message}`);
    }
  }
}
