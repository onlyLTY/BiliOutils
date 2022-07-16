/**
 * 任务读取顺序
 */
export const taskExportOrder = [
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
  'batchUnfollow',
  'liveLottery',
  'liveRedPack',
  'liveIntimacy',
  'giveGift',
  'loginTask',
  'liveFamine',
  'judgement',
] as const;

/**
 * 按照上面的顺序导入的任务
 * 全部写出来是因为想要动态导入但不写 rollup 就不会打包
 */
export const biliTasks = [
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
  () => import('./batchUnfollow'),
  () => import('./liveLottery'),
  () => import('./liveRedPack'),
  () => import('./liveIntimacy'),
  () => import('./giveGift'),
  () => import('./loginTask'),
  () => import('./liveFamine'),
  () => import('./judgement'),
];

export async function getBiliTask(funcName: typeof taskExportOrder[number]) {
  const index = taskExportOrder.findIndex(name => name === funcName);
  if (index === -1) {
    return () => Promise.resolve();
  }
  return (await biliTasks[index]()).default;
}

export default biliTasks;
