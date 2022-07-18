import type { Config } from './types';
import { getArg, isArg } from './utils/args';
import { runTask } from './util';

process.env.IS_QING_LONG = 'true';

(async () => {
  const { getConfig } = await import('./config/setConfig');
  if (isArg('item') || isArg('I')) {
    return oldItemArgTask(getConfig(false));
  }
  if (isArg('task')) {
    return await runCmdTask();
  }
  const configs = getConfig(true);
  return await runTask(configs);
})();

async function oldItemArgTask(config: Config) {
  const { initialize } = await import('./config/globalVar');
  initialize(config);
  if (isArg('task')) {
    return await runCmdTask();
  }
  const { dailyTasks } = await import('./task/dailyTask');
  // 手动初始化配置
  return await dailyTasks();
}

async function runCmdTask() {
  const task = getArg('task');
  const { runInputBiliTask } = await import('./task');
  await runInputBiliTask(task);
}
