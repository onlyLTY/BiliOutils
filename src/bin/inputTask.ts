(async () => {
  const { initialize } = await import('../config/globalVar');
  initialize(JSON.parse(process.env.__BT_CONFIG__));
  const task = await import('../task/');
  await task.runInputBiliTask(process.env.__BT_TASKS_STRING__);
  process.send(true);
})();
