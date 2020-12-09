/**
 * 异步延迟函数
 * @param delayTime 延迟时间(ms)
 */
export function apiDelay(delayTime?: number) {
  const API_DELAY = Number(process.env.BILI_API_DELAY);
  const DELAY = API_DELAY || delayTime || random(2000, 6000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('doing');
    }, DELAY);
  });
}

/**
 * 返回0到max
 * @param max 值
 */
export function randomNum(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * 返回min-max
 * @param min
 * @param max
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
