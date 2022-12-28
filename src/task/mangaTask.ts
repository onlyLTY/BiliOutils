import {
  mangaSign,
  buyMangaService,
  takeSeasonGift,
  shareComicService,
  readMangaService,
  guessGameService,
} from '@/service/manga.service';
import { logger } from '../utils/log';

export default async function mangaTask() {
  logger.info('----【漫画任务】----');
  try {
    // 漫画签到
    await mangaSign();
    // 每日分享
    await shareComicService();
    // 每日阅读
    await readMangaService();
    // 每日游戏
    await guessGameService();
    // 领取任务奖励
    await takeSeasonGift();
    // 购买漫画
    await buyMangaService();
  } catch (error) {
    logger.error(`漫画任务异常：`, error);
  }
}
