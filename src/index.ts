import { TaskConfig } from './config/globalVar';
import { printVersion } from './utils/effect';
import liveHeart from './task/liveHeart';
import { dailyTasks } from './task/dailyTask';

process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  printVersion();

  // 如果需要执行 liveHeart
  if (TaskConfig.config.function.liveHeart) {
    return await dailyTasks(liveHeart);
  }
  return await dailyTasks();
})();
