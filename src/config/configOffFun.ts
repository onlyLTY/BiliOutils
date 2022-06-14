import { TaskConfig } from './globalVar';

function funHandle() {
  const functionConfig = TaskConfig.function;
  if (!functionConfig.addCoins && !functionConfig.shareAndWatch) {
    functionConfig.taskReward = false;
  }
  // TODO: 兼容处理 liveSendMessage
  if (functionConfig.liveIntimacy && TaskConfig.intimacy.liveSendMessage) {
    functionConfig.liveSendMessage = false;
  }
  // TODO: 兼容处理 mangaSign
  if (functionConfig.mangaTask && TaskConfig.manga.sign) {
    functionConfig.mangaSign = false;
  }
  return functionConfig;
}

/**
 * 按照配置清空函数
 * @param funArr 函数数组
 */
export function offFunctions(funArr: Array<() => Promise<unknown>>): Array<() => Promise<unknown>> {
  const functionConfig = funHandle();
  return funArr.map(el => (functionConfig[el.name] ? el : null)).filter(el => el);
}
