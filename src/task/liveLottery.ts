import { moveUsersToTag, User } from '../service/tags.service';
import { logger } from '../utils';
import { liveFollowLotteryService, liveLotteryService } from '../service/live-lottery.service';
import { getLastFollow, getTeamUsers } from '../service/tags.service';
import { TaskConfig } from '@/config/globalVar';

export default async function liveLottery() {
  logger.info('----【天选时刻】----');
  const isGo = await liveFollowLotteryService();
  if (!isGo) return isGo;
  try {
    // 获取最后一个关注的UP
    const lastFollow = await getLastFollow();
    logger.info(`最后一个关注的UP: ${lastFollow.uname}`);
    const newFollowUps = await liveLotteryService();
    logger.info('扫描完成');
    // 获取天选时刻关注的用户
    const followUps: User[] = [];
    await getTeamUsers(followUps, newFollowUps, lastFollow?.mid);
    // 移动关注UP到分组
    if (TaskConfig.lottery.isMoveTag) {
      await moveUsersToTag(followUps, TaskConfig.lottery.moveTag);
      logger.info('移动关注UP到分组成功');
    }
  } catch (error) {
    logger.warn(`天选时刻异常: ${error.message}`);
    logger.debug(error);
  }
  logger.info('结束天选时刻');
}

export { liveLottery };
