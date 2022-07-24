import { exchangeCouponService } from '@/service/manga.service';
import { logger } from '../utils/log';

export default async function exchangeCoupon() {
  logger.info('----【漫画兑换任务】----');
  try {
    // 兑换漫读券
    await exchangeCouponService();
  } catch (error) {
    logger.error(`漫画兑换任务异常: ${error}`);
  }
}
