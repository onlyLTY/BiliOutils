import { isOnFunction } from './envUtil';

const envConfig = {
  silver2Coin: ['BILI_SILVER_2_COIN', false],
  liveSignTask: ['BILI_LIVE_SIGN', false],
  addCoins: ['BILI_ADD_COINS', false],
  mangaSign: ['BILI_MANGA_SIGN', false],
  shareAndWatch: ['BILI_SHARE_WATCH', false],
};

for (const envName in envConfig) {
  if (Object.prototype.hasOwnProperty.call(envConfig, envName)) {
    const el: [string, boolean] = envConfig[envName];
    if (!isOnFunction(el[0])) {
      el[1] = true;
    }
  }
}

/**
 * 按照配置清空函数
 * @param funArr 函数数组
 */
export function offFunctions(funArr: Array<() => {}>): Array<() => {}> {
  return funArr
    .map((el) => (envConfig[el.name] && envConfig[el.name][1] ? null : el))
    .filter((el) => el);
}
