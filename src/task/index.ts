export const biliTaskArray = [
  ['beforeTask', () => import('./beforeTask')],
  ['loginTask', () => import('./loginTask')],
  ['exchangeCoupon', () => import('./exchangeCoupon')],
  ['liveSignTask', () => import('./liveSignTask')],
  ['addCoins', () => import('./addCoins')],
  ['bigPoint', () => import('./bigPoint')],
  ['shareAndWatch', () => import('./shareAndWatch')],
  ['silver2Coin', () => import('./silver2Coin')],
  ['mangaTask', () => import('./mangaTask')],
  ['supGroupSign', () => import('./supGroupSign')],
  ['liveSendMessage', () => import('./liveSendMessage')],
  ['getVipPrivilege', () => import('./getVipPrivilege')],
  ['useCouponBp', () => import('./useCouponBp')],
  ['matchGame', () => import('./matchGame')],
  ['giveGift', () => import('./giveGift')],
  ['liveIntimacy', () => import('./liveIntimacy')],
  ['batchUnfollow', () => import('./batchUnfollow')],
  ['liveLottery', () => import('./liveLottery')],
  ['liveRedPack', () => import('./liveRedPack')],
  ['dailyBattery', () => import('./dailyBattery')],
  ['activityLottery', () => import('./activityLottery')],
  ['judgement', () => import('./judgement')],
] as const;

export type BiliTaskName = typeof biliTaskArray[number][0];
export type TaskFunc = () => Promise<{ default: () => Promise<any> }>;

export const biliTasks = new Map<string, TaskFunc>(biliTaskArray);

export default biliTasks;

export async function getBiliTask(funcName: BiliTaskName) {
  const biliTask = biliTasks.get(funcName);
  if (!biliTask) {
    return () => Promise.resolve(0);
  }
  return (await biliTask()).default;
}

export async function getBiliTasks<T extends BiliTaskName>(
  funcNames: T[],
): Promise<Record<T, TaskFunc>> {
  const tasks: Record<BiliTaskName, TaskFunc> = {} as any;
  for (const funcName of funcNames) {
    const biliTask = biliTasks.get(funcName);
    if (!biliTask) continue;
    tasks[funcName] = (await biliTask()).default;
  }
  return tasks;
}

/**
 * 获取用户输入的任务
 */
export function getInputBiliTask(taskNameStr: string) {
  const taskNameArr = taskNameStr.split(',');
  const taskArr: Defined<ReturnType<typeof biliTasks.get>>[] = [biliTaskArray[0][1]];
  taskNameArr.forEach(name => {
    const task = biliTasks.get(name);
    if (task) {
      taskArr.push(task);
    }
  });
  return taskArr.map(async func => (await func()).default);
}

/**
 * 运行用户输入的任务
 */
export async function runInputBiliTask(taskNameStr: string) {
  const { logger, Logger, clearLogs } = await import('../utils/log');
  await Logger.init();
  logger.info(`开始执行自定义任务！`);
  const taskArr = getInputBiliTask(taskNameStr);
  for await (const task of taskArr) {
    await task();
  }
  // 在任务完成后再加载版本
  logger.info(`----【版本信息】----`);
  const { printVersion } = await import('../utils/version');
  await printVersion();
  if (taskNameStr.includes('noPush')) {
    logger.info(`已设置不推送通知`);
  } else {
    await Logger.push('自定义任务完成');
  }
  clearLogs();
}
