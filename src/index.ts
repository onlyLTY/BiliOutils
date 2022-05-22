import { printVersion } from './utils/effect';
import { dailyTasks } from './task/dailyTask';

process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  // 手动初始化配置
  await printVersion();
  return await dailyTasks();
})();
