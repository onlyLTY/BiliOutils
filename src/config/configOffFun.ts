import { TaskConfig } from './globalVar';

const envConfig = {
  silver2Coin: true,
  liveSignTask: true,
  addCoins: true,
  mangaSign: true,
  shareAndWatch: true,
  judgement: false,
  supGroupSign: true,
};

for (const envName in envConfig) {
  if (Object.prototype.hasOwnProperty.call(envConfig, envName)) {
    const el: boolean = envConfig[envName];
    const taskFunction = TaskConfig.config.function || {};
    //el 设置的值 --> false --> 设置成关闭
    //设置的值 --> true --> 设置成开启
    //未配置 --> undefined --> 默认
    switch (taskFunction[envName]) {
      case true:
        el === false && (envConfig[envName] = true);
        break;
      case false:
        el === true && (envConfig[envName] = false);
        break;
      default:
        break;
    }
  }
}

/**
 * 按照配置清空函数
 * @param funArr 函数数组
 */
export function offFunctions(funArr: Array<() => {}>): Array<() => {}> {
  return funArr
    .map((el) => (envConfig[el.name] ? el : null))
    .filter((el) => el);
}
