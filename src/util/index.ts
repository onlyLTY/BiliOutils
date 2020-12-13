import { TaskConfig } from '../config/globalVar';

/**
 * 异步延迟函数
 * @param delayTime 延迟时间(ms)
 */
export function apiDelay(delayTime?: number) {
  const API_DELAY = TaskConfig.BILI_API_DELAY;

  let delay;
  if (API_DELAY.length === 1) {
    delay = API_DELAY[0] * 1000;
  } else {
    delay = random(API_DELAY[0], API_DELAY[1]) * 1000;
  }
  delay = delayTime || delay;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('doing');
    }, delay);
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
  } else if (max < min) {
    //写反顺序后
    let temp = max;
    max = min;
    min = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
