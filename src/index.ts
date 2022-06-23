import { runTask } from './util';
process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  await runTask();
})();
