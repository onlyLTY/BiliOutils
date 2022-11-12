import { TaskConfig } from '@/config/globalVar';
import { readMangaService } from '@/service/manga.service';
import { logger } from '@/utils';

export default async function noLoginTask() {
  logger.info('账号未登录，将仅执行无需登录的任务');
  // 漫画阅读任务无需登录
  if (TaskConfig.function.mangaTask) {
    logger.info('----【漫画阅读】----');
    await readMangaService(true);
  }
}
