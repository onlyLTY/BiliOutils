import { TaskConfig } from '../config/globalVar';
import { random } from './pure';

/**
 * 异步延迟函数
 * @param delayTime 延迟时间(ms)
 */
export function apiDelay(delayTime?: number) {
  const API_DELAY = TaskConfig.BILI_API_DELAY;

  let delay: number;
  if (delayTime) {
    delay = delayTime;
  } else if (API_DELAY.length === 1) {
    delay = API_DELAY[0] * 1000;
  } else {
    delay = random(API_DELAY[0] || 2, API_DELAY[1] || 6) * 1000;
  }

  const startTime = new Date().getTime() + Number(delay || 0);
  // eslint-disable-next-line no-empty
  while (new Date().getTime() < startTime) {}

  return new Promise(resolve => {
    resolve('done');
  });
}
