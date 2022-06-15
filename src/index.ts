process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  const { dailyTasks } = await import('./task/dailyTask');
  // 手动初始化配置
  return await dailyTasks();
})();
