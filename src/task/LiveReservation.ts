import { reservationService } from '@/service/reservation.service';
import { logger } from '@/utils/log';

export default async function LiveReservation() {
  logger.info('----【直播预约】----');
  try {
    await reservationService();
  } catch (error) {
    logger.error(`【直播预约异常】`, error);
  }
}
