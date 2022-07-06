import type { Config } from './types';
import { isArg } from './utils/args';
import { runTask } from './util';

process.env.IS_QING_LONG = 'true';

(async () => {
  const { getConfig } = await import('./config/setConfig');
  if (isArg('item') || isArg('I')) {
    return oldItemArgTask(getConfig(false));
  }
  const configs = getConfig(true);
  return await runTask(configs);
})();

async function oldItemArgTask(config: Config) {
  const { initialize } = await import('./config/globalVar');
  initialize(config);
  const { dailyTasks } = await import('./task/dailyTask');
  // 手动初始化配置
  return await dailyTasks();
}
