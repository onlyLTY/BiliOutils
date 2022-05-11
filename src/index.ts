import { printVersion } from './utils/effect';
import { dailyTasks } from './task/dailyTask';

process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  printVersion();

  return await dailyTasks();
})();
