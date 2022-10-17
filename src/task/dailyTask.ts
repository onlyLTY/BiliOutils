export async function dailyTasks<T = unknown>(
  cb?: (...arg: T[]) => Promise<unknown>,
  ...cbArg: T[]
) {
  const { getBiliTasks } = await import('./index');
  const { apiDelay, logger, Logger } = await import('../utils');
  const { getWaitRuningFunc } = await import('../config/configOffFun');
  const { printVersion } = await import('@/utils/version');
  await Logger.init();
  await printVersion();
  try {
    const { beforeTask, loginTask } = await getBiliTasks(['beforeTask', 'loginTask']);
    await beforeTask();
    await loginTask();
  } catch (error) {
    logger.error(`登录失败: ${error}`);
    await Logger.push('【登录失败】');
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

  await Logger.push('每日完成');
  return '完成';
}
