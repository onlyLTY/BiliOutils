import { TaskConfig } from '../config/globalVar';
import { random } from './pure';

/**
 * 异步延迟函数
 * @param delayTime 延迟时间(ms)
 * @param delayTime2 延迟时间2(ms)
 */
export function apiDelay(delayTime?: number, delayTime2?: number) {
  const delay = getDelay(delayTime, delayTime2);
  return new Promise<typeof delay>(resolve => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

export function apiDelaySync(delayTime?: number, delayTime2?: number) {
  const now = Date.now();
  const delay = getDelay(delayTime, delayTime2);
  while (Date.now() - now < delay) {
    // empty
  }
}

function getDelay(delayTime?: number, delayTime2?: number) {
  if (delayTime && delayTime2) {
    return random(delayTime, delayTime2);
  }
  if (delayTime) {
    return delayTime;
  }
  const API_DELAY = TaskConfig.apiDelay;
  if (API_DELAY.length === 1) {
    return API_DELAY[0] * 1000;
  }
  return random(API_DELAY[0] || 2, API_DELAY[1] || 6) * 1000;
}
