import { dailyTasks } from './task/dailyTask';
import { printVersion } from './utils/version';

process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  // 手动初始化配置
  await printVersion();
  return await dailyTasks();
})();
