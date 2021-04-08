import { TaskConfig } from '../config/globalVar';
import sendMail from './email';
export * from './cookie';

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
    delay = random(API_DELAY[0] || 2, API_DELAY[1] || 6) * 1000;
  }
  delay = delayTime || delay;

  let startTime = new Date().getTime() + parseInt(delay, 10);
  while (new Date().getTime() < startTime) {}

  return new Promise((resolve) => {
    resolve('done');
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
export function random(min: number = 1, max: number = 0): number {
  if (max < min) {
    //写反顺序后
    let temp = max;
    max = min;
    min = temp;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 发送消息到其他设备
 * @param title 标题
 * @param text 文本内容
 */
export async function sendMessage(title: string, text: string) {
  sendMail(title, text).catch(console.log);
}
