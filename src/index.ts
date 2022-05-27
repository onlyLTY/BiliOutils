import { printVersion } from './utils/version';

process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  const { dailyTasks } = await import('./task/dailyTask');
  // 手动初始化配置
  await printVersion();
  return await dailyTasks();
})();
