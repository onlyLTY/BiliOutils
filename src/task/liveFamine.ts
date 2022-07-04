import { TaskConfig } from '@/config/globalVar';
import { liveAFKService } from '@/service/live-afk.service';
import { logger } from '@/utils';

export default async function liveFamine() {
  logger.info('----【饥荒直播间挂机】----');
  try {
    await liveAFKService(TaskConfig.activity.liveFamineTime);
    logger.info('饥荒直播间挂机完成');
  } catch (error) {
    logger.error(`饥荒直播间挂机: ${error.message}`);
  }
}
