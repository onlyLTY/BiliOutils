import type { Config } from './types';

/**
 * 运行任务
 */
export async function runTask(configs: Config[]) {
  const { logger } = await import('./utils/log');
  const length = configs.length;
  if (length === 0) {
    return Promise.reject(new Error('配置为空或者 cookie 不合法！'));
  }
  const { initialize } = await import('./config/globalVar');
  initialize(configs[0]);
  const task = await import('./task/dailyTask');
  for (let index = 0; index < configs.length; index++) {
    logger.info(`正在执行第${index + 1}/${length}个配置`);
    initialize(configs[index]);
    await task.dailyTasks();
    logger.info('执行完毕\n');
  }
}
