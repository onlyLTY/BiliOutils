import { isOnFunction } from './envUtil';

/** 函数名:['环境变量名,是否开启'] */
const envConfig = {
  silver2Coin: ['BILI_SILVER_2_COIN', true],
  liveSignTask: ['BILI_LIVE_SIGN', true],
  addCoins: ['BILI_ADD_COINS', true],
  mangaSign: ['BILI_MANGA_SIGN', true],
  shareAndWatch: ['BILI_SHARE_WATCH', true],
  judgement: ['BILI_JURY_VOTE', false],
  supGroupSign: ['BILI_GROUP_SIGN', true],
};

for (const envName in envConfig) {
  if (Object.prototype.hasOwnProperty.call(envConfig, envName)) {
    const el: [string, boolean] = envConfig[envName];
    //el[0] 环境变量值 --> false --> 设置成关闭
    //环境变量值 --> true --> 设置成开启
    //环境变量未配置 --> undefined --> 默认
    switch (isOnFunction(el[0])) {
      case true:
        el[1] === false && (el[1] = true);
        break;
      case false:
        el[1] === true && (el[1] = false);
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
    .map((el) => (envConfig[el.name]?.[1] ? el : null))
    .filter((el) => el);
}
