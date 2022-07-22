(async () => {
  const { initialize } = await import('../config/globalVar');
  initialize(JSON.parse(process.env.__BT_CONFIG__));
  const task = await import('../task/dailyTask');
  await task.dailyTasks();
  // 替换 cookie 为最新的
  const { replaceNewCookie } = await import('./util');
  replaceNewCookie();
  process.send(true);
})();
