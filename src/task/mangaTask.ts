import { TaskConfig } from '@/config/globalVar';
import { mangaSign, buyMangaService } from '@/service/manga.service';
import { isTodayInTimeArr } from '@/utils';
import { logger } from '../utils/log';

export default async function mangaTask() {
  logger.info('----【漫画任务】----');
  const { manga } = TaskConfig;
  try {
    if (manga.sign) {
      logger.info('开始签到');
      await mangaSign();
    }
    const isBuy = manga.buy && isTodayInTimeArr(manga.buyPresetTime);
    if (isBuy) {
      logger.info('开始购买漫画');
      await buyMangaService();
    }
  } catch (error) {
    logger.error(`漫画任务异常: ${error}`);
  }
}
