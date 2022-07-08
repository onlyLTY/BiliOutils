import { TaskConfig } from '@/config/globalVar';
import { unFollowTag } from '@/service/tags.service';
import { logger } from '@/utils';

export default async function batchUnfollow() {
  logger.info('----【批量取关】----');
  try {
    await unFollowTag(TaskConfig.lottery.moveTag);
    logger.info('批量取关完成');
  } catch (error) {
    logger.error(`批量取关: ${error.message}`);
  }
}
