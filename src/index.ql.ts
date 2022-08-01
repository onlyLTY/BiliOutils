import { config, runTask, waitForArgs } from './util';
import { getArg, isArg } from './utils/args';

process.env.IS_QING_LONG = 'true';

(async () => {
  if (isArg('config')) {
    const configs = await config();
    const taskArg = getArg('task');
    await waitForArgs();
    if (taskArg) {
      return await runTask(configs, './bin/inputTask', taskArg);
    }
    return await runTask(configs);
  }
  const { getConfig } = await import('./config/setConfig');
  const configs = getConfig(true);
  return await runTask(configs);
})();
