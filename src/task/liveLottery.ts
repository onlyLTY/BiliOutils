import { logger } from '@/utils';
import {
  handleFollowUps,
  liveFollowLotteryService,
  liveLotteryService,
} from '@/service/live-lottery.service';
import { getLastFollow } from '@/service/tags.service';
import { TaskConfig } from '@/config/globalVar';
import { printLiveUserSession } from '@/service/session.service';

export default async function liveLottery() {
  logger.info('----【天选时刻】----');
  const isGo = await liveFollowLotteryService();
  if (!isGo) return isGo;
  try {
    const { moveTag, actFollowMsg, mayBeWinMsg } = TaskConfig.lottery;
    // 获取最后一个关注的UP
    const lastFollow = await getLastFollow();
    logger.verbose(`最后一个关注的UP: ${lastFollow?.uname}`);
    const newFollowUps = await liveLotteryService();
    logger.verbose('扫描完成');
    await handleFollowUps(newFollowUps, lastFollow, moveTag, actFollowMsg);
    // 打印会话
    if (mayBeWinMsg) {
      await printLiveUserSession();
    }
  } catch (error) {
    logger.warn(`天选时刻异常: ${error.message}`);
    logger.debug(error);
  }
  logger.info('结束天选时刻');
}

export { liveLottery };
