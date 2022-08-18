import { TaskConfig } from '@/config/globalVar';
import { chargingService, exchangeBatteryService } from '@/service/balance.service';
import { logger } from '@/utils/log';

export default async function useCouponBp() {
  logger.info('----【使用b币券】----');
  try {
    // 使用方式
    const useType = TaskConfig.couponBalance.use;
    if (useType === '充电' || useType === 'charge') {
      await chargingService();
      return;
    }
    await exchangeBatteryService();
  } catch (error) {
    logger.error(`使用b币券出现异常：${error.message}`);
  }
}
