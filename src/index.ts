import { printVersion } from './utils/effect';
import { dailyTasks } from './task/dailyTask';
import { initialize } from './config/globalVar';

process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  // 手动初始化配置
  await printVersion();
  initialize();
  return await dailyTasks();
})();
