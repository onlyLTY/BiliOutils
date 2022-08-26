import { moveUsersToTag, User } from '../service/tags.service';
import { logger } from '../utils';
import { liveRedPackService } from '../service/red-pack.service';
import { getLastFollow, getTeamUsers } from '../service/tags.service';
import { updateSession } from '@/service/session.service';
import { TaskConfig } from '@/config/globalVar';

export default async function liveRedPack() {
  logger.info('----【天选红包】----');
  try {
    // 获取最后一个关注的UP
    const lastFollow = await getLastFollow();
    lastFollow && logger.info(`最后一个关注的UP: ${lastFollow.uname}`);
    const newFollowUps = await liveRedPackService();
    logger.info('扫描完成，获取新关注的UP');
    // 获取天选时刻关注的用户
    const followUps: User[] = [];
    await getTeamUsers(followUps, newFollowUps, lastFollow?.mid);
    // 读取消息
    logger.info('开始读取消息');
    await updateSession(followUps);
    // 移动关注UP到分组
    if (TaskConfig.lottery.isMoveTag) {
      logger.info('移动关注UP到分组');
      await moveUsersToTag(followUps, TaskConfig.lottery.moveTag);
      logger.info('移动关注UP到分组成功');
    }
  } catch (error) {
    logger.warn(`天选时刻异常: ${error.message}`);
    logger.debug(error);
  }
  logger.info('结束天选红包');
}

export { liveRedPack };
