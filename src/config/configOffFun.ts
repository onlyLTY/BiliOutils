import { TaskConfig } from './globalVar';
import { getFunctionConfig } from './funcConfig';

function funHandle() {
  const functionConfig = getFunctionConfig();
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

  if (!functionConfig.addCoins && !functionConfig.shareAndWatch) {
    functionConfig.taskReward = false;
  }
  /**
   * 非本地环境下，无法执行 liveHeart
   * Serveless 支持的除外
   */
  // const { LIVE_HEART_FORCE, IS_LOCAL } = process.env;
  // if (!LIVE_HEART_FORCE && IS_LOCAL !== 'true') {
  //   functionConfig.liveHeart = false;
  // }
  return functionConfig;
}

/**
 * 按照配置清空函数
 * @param funArr 函数数组
 */
export function offFunctions(funArr: Array<() => unknown>): Array<() => unknown> {
  const functionConfig = funHandle();
  return funArr.map(el => (functionConfig[el.name] ? el : null)).filter(el => el);
}
