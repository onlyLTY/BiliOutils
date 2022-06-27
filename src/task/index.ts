/**
 * 任务读取顺序
 */
export const taskExportOrder = [
  'taskReward',
  'liveSignTask',
  'addCoins',
  'bigPoint',
  'shareAndWatch',
  'silver2Coin',
  'mangaSign',
  'mangaTask',
  'supGroupSign',
  'liveSendMessage',
  'charging',
  'getVipPrivilege',
  'matchGame',
  'liveLottery',
  'liveRedPack',
  'liveIntimacy',
  'giveGift',
  'loginTask',
] as const;

/**
 * 按照上面的顺序导入的任务
 */
export const biliTasks = [
  () => import('./taskReward'),
  () => import('./liveSignTask'),
  () => import('./addCoins'),
  () => import('./bigPoint'),
  () => import('./shareAndWatch'),
  () => import('./silver2Coin'),
  () => import('./mangaSign'),
  () => import('./mangaTask'),
  () => import('./supGroupSign'),
  () => import('./liveSendMessage'),
  () => import('./charging'),
  () => import('./getVipPrivilege'),
  () => import('./matchGame'),
  () => import('./liveLottery'),
  () => import('./liveRedPack'),
  () => import('./liveIntimacy'),
  () => import('./giveGift'),
  () => import('./loginTask'),
];

export async function getBiliTask(funcName: typeof taskExportOrder[number]) {
  const index = taskExportOrder.findIndex(name => name === funcName);
  if (index === -1) {
    return () => Promise.resolve();
  }
  return (await biliTasks[index]()).default;
}

export default biliTasks;
