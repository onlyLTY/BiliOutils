export async function dailyTasks<T = unknown>(
  cb?: (...arg: T[]) => Promise<unknown>,
  ...cbArg: T[]
) {
  const { apiDelay, logger, Logger } = await import('../utils');
  const { offFunctions } = await import('../config/configOffFun');
  const { sendMessage } = await import('@/utils/sendNotify');
  const { loginTask, default: bili } = await import('./index');
  const { printVersion } = await import('@/utils/version');
  await Logger.init();
  await printVersion();
  try {
    await loginTask();
  } catch (error) {
    logger.error(`登录失败: ${error}`);
    await sendMessage('登录失败', Logger.pushValue);
    return '未完成';
  }

  const biliArr = offFunctions([...Object.values(bili)]);

  for (const asyncFun of biliArr) {
    try {
      await asyncFun();
    } catch (error) {
      logger.error(`${asyncFun.name}失败: ${error}`);
    } finally {
      await apiDelay();
    }
  }

  cb && (await cb(...cbArg));

  await sendMessage('每日完成', Logger.pushValue);
  return '完成';
}
