import { TaskConfig } from '@/config/globalVar';
import { mangaSign, buyMangaService } from '@/service/manga.service';
import { logger } from '../utils/log';

function isTodayRunning() {
  const { buyWeek, buyInterval } = TaskConfig.manga;
  if (!buyWeek || buyWeek.length === 0) return false;
  if (buyInterval === 1) return true;
  const now = new Date();
  const weekDay = now.getDay();
  const today = now.getDate();
  return buyWeek.includes(weekDay) || (today % buyInterval) - 1 === 0;
}

export default async function mangaTask() {
  logger.info('----【漫画任务】----');
  const { manga } = TaskConfig;
  try {
    if (manga.sign) {
      logger.info('开始签到');
      await mangaSign();
    }
    if (!manga.buy) return;
    if (isTodayRunning()) {
      logger.info('开始购买漫画');
      await buyMangaService();
      return;
    }
    logger.info('非购买漫画时间，不购买');
  } catch (error) {
    logger.error(`漫画任务异常: ${error}`);
  }
}
