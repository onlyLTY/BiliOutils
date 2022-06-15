import type { Config } from './types';
import { logger } from './utils/log';

/**
 * 运行任务
 */
export async function runTask(configs: Config[]) {
  const { initialize } = await import('./config/globalVar'),
    length = configs.length;
  initialize(configs[0]);
  const task = await import('./task/dailyTask');
  logger.info(`正在执行第1/${length}个配置`);
  await task.dailyTasks();
  logger.info('执行完毕\n');
  for (let index = 1; index < configs.length; index++) {
    logger.info(`正在执行第${index + 1}/${length}个配置`);
    initialize(configs[index]);
    await task.dailyTasks();
    logger.info('执行完毕\n');
  }
  return;
}
