import { logger } from '../utils/log';
import { mangaSign as mangaSignService } from '../service/manga.service';

export default async function mangaSign() {
  logger.info('----【漫画签到】----');
  logger.warn('漫画签到任务移动到了漫画任务中，请修改为新的任务');
  await mangaSignService();
}
