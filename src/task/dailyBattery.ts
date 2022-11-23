import { dailyBatteryService } from '@/service/daily-battery.service';
import { logger } from '@/utils/log';

export default async function dailyBattery() {
  logger.info('----【获取每日电池】----');
  try {
    await dailyBatteryService();
  } catch (error) {
    logger.error(`获取每日电池出现异常`, error);
  }
}
