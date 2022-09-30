export async function dailyTasks<T = unknown>(
  cb?: (...arg: T[]) => Promise<unknown>,
  ...cbArg: T[]
) {
  const { getBiliTask } = await import('./index');
  const { apiDelay, logger, Logger } = await import('../utils');
  const { getWaitRuningFunc } = await import('../config/configOffFun');
  const { sendMessage } = await import('@/utils/sendNotify');
  const { printVersion } = await import('@/utils/version');
  await Logger.init();
  await printVersion();
  try {
    const loginTask = await getBiliTask('loginTask');
    await loginTask();
  } catch (error) {
    logger.error(`登录失败: ${error}`);
    await sendMessage('【登录失败】', Logger.pushValue);
    return '未完成';
  }
  const biliArr = getWaitRuningFunc();
  // 我是吐了，为了解决一个问题引用了黑魔法，导致处处黑魔法
  for await (const asyncFun of biliArr) {
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
