import { logger } from '@/utils';
import { liveRedPackService } from '@/service/red-pack.service';
import { getLastFollow } from '@/service/tags.service';
import { handleFollowUps } from '@/service/live-lottery.service';
import { TaskConfig } from '@/config/globalVar';

export default async function liveRedPack() {
  logger.info('----【天选红包】----');
  try {
    const { moveTag } = TaskConfig.redPack;
    // 获取最后一个关注的UP
    const lastFollow = await getLastFollow();
    lastFollow && logger.verbose(`最后一个关注的UP: ${lastFollow.uname}`);
    const newFollowUps = await liveRedPackService();
    await handleFollowUps(newFollowUps, lastFollow, moveTag);
  } catch (error) {
    logger.warn(`天选时刻异常: ${error.message}`);
    logger.debug(error);
  }
  logger.info('结束天选红包');
}

export { liveRedPack };
