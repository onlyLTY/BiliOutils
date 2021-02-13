import { TaskConfig } from './globalVar';

export const functionConfig = {
  silver2Coin: true,
  liveSignTask: true,
  addCoins: true,
  mangaSign: false,
  shareAndWatch: true,
  judgement: false,
  supGroupSign: false,
  liveSendMessage: false,
  taskReward: true,
};

function funHandle() {
  if (!functionConfig.addCoins && !functionConfig.shareAndWatch) {
    functionConfig.taskReward = false;
  }

  for (const funName in functionConfig) {
    if (Object.prototype.hasOwnProperty.call(functionConfig, funName)) {
      const el: boolean = functionConfig[funName];
      const taskFunction = TaskConfig.config.function || {};
      //el 设置的值 --> false --> 设置成关闭
      //设置的值 --> true --> 设置成开启
      //未配置 --> undefined --> 默认
      switch (taskFunction[funName]) {
        case true:
          el === false && (functionConfig[funName] = true);
          break;
        case false:
          el === true && (functionConfig[funName] = false);
          break;
        default:
          break;
      }
    }
  }
}

/**
 * 按照配置清空函数
 * @param funArr 函数数组
 */
export function offFunctions(funArr: Array<() => {}>): Array<() => {}> {
  funHandle();
  return funArr
    .map(el => (functionConfig[el.name] ? el : null))
    .filter(el => el);
}
