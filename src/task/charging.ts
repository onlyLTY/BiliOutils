import { TaskConfig } from '@/config/globalVar';
import { chargingService } from '@/service/balance.service';
import { logger } from '@/utils/log';

export default async function charging() {
  if (TaskConfig.function.useCouponBp) {
    return;
  }
  logger.info('----【给目标充电】----');
  try {
    logger.warn('b 币券充电现在已经转移为 useCouponBp，请主动更改配置');
    await chargingService();
  } catch (error) {
    logger.error(`充电出现异常：${error.message}`);
  }
}
