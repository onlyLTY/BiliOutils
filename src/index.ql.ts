import { config, runTask, waitForArgs } from './util';
import { getArg, isArg } from './utils/args';

process.env.IS_QING_LONG = 'true';

(async () => {
  if (isArg('config')) {
    await waitForArgs();
    const configs = await config();
    if (!configs) {
      return;
    }
    const taskArg = getArg('task');
    if (taskArg) {
      return await runTask(configs, './bin/inputTask', taskArg);
    }
    return await runTask(configs);
  }
  await waitForArgs();
  const { getConfig } = await import('./config/setConfig');
  const configs = getConfig(true);
  return await runTask(configs);
})();
