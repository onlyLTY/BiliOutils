import { liveIntimacyService } from '@/service/intimacy.service';
import { logger } from '@/utils';

export default async function liveIntimacy() {
  logger.info('----【直播亲密度】----');
  try {
    await liveIntimacyService();
  } catch (error) {
    logger.error(`直播亲密度: ${error.message}`);
  }
}
