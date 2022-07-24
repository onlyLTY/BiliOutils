export const biliTaskArray = [
  ['loginTask', () => import('./loginTask')],
  ['exchangeCoupon', () => import('./exchangeCoupon')],
  ['liveSignTask', () => import('./liveSignTask')],
  ['addCoins', () => import('./addCoins')],
  ['bigPoint', () => import('./bigPoint')],
  ['shareAndWatch', () => import('./shareAndWatch')],
  ['silver2Coin', () => import('./silver2Coin')],
  ['mangaSign', () => import('./mangaSign')],
  ['mangaTask', () => import('./mangaTask')],
  ['supGroupSign', () => import('./supGroupSign')],
  ['liveSendMessage', () => import('./liveSendMessage')],
  ['charging', () => import('./charging')],
  ['getVipPrivilege', () => import('./getVipPrivilege')],
  ['matchGame', () => import('./matchGame')],
  ['giveGift', () => import('./giveGift')],
  ['batchUnfollow', () => import('./batchUnfollow')],
  ['liveLottery', () => import('./liveLottery')],
  ['liveRedPack', () => import('./liveRedPack')],
  ['liveIntimacy', () => import('./liveIntimacy')],
  ['liveFamine', () => import('./liveFamine')],
  ['judgement', () => import('./judgement')],
] as const;

export type BiliTaskName = typeof biliTaskArray[number][0];

export const biliTasks = new Map<string, () => Promise<{ default: () => Promise<any> }>>(
  biliTaskArray,
);

export default biliTasks;

export async function getBiliTask(funcName: BiliTaskName) {
  const biliTask = biliTasks.get(funcName);
  if (!biliTask) {
    return () => Promise.resolve(0);
  }
  return (await biliTask()).default;
}

/**
 * 获取用户输入的任务
 */
export function getInputBiliTask(taskNameStr: string) {
  const taskNameArr = taskNameStr.split(',');
  const taskArr: Array<ReturnType<typeof biliTasks.get>> = [];
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
  const { logger, Logger } = await import('../utils/log');
  const { sendMessage } = await import('../utils/sendNotify');
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
  await sendMessage('任务完成', Logger.pushValue);
}
