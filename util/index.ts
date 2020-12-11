import { TaskConfig } from '../globalVar';

/**
 * 异步延迟函数
 * @param delayTime 延迟时间(ms)
 */
export function apiDelay(delayTime?: number) {
  const API_DELAY = TaskConfig.BILI_API_DELAY;
  const DELAY = API_DELAY || delayTime || random(2000, 6000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('doing');
    }, DELAY);
  });
}

/**
 * 返回随机值
 * @param min
 * @param max
 *
 * random(2,6) --> [2,6]
 * random(9)   --> [0,9]
 */
export function random(min: number = 0, max: number = 1): number {
  if (min !== undefined && max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
