import { runTask } from './util';
process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  const { getConfig } = await import('./config/setConfig');
  const configs = getConfig(true);
  return await runTask(configs);
})();
