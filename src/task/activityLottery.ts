import { activityLotteryService } from '@/service/activity-lottery.service';
import { logger } from '@/utils';

export default async function activityLottery() {
  logger.info('----【转盘抽奖】----');
  try {
    await activityLotteryService();
    logger.info('转盘抽奖完成');
  } catch (error) {
    logger.error(`转盘抽奖: ${error.message}`);
  }
}
