(async () => {
  const { initialize } = await import('./config/globalVar');
  initialize(JSON.parse(process.env.__BT_CONFIG__));
  const task = await import('./task/dailyTask');
  await task.dailyTasks();
  process.send(true);
})();
