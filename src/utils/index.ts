import * as path from 'path';
import * as fs from 'fs';
import { random as baseRandom } from 'lodash';
import { TaskConfig } from '../config/globalVar';
import { logger } from './log';
export * from './cookie';
export * from './gzip';
const { sendNotify } = require('./sendNotify');

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

  const startTime = new Date().getTime() + parseInt(delay, 10);
  // eslint-disable-next-line no-empty
  while (new Date().getTime() < startTime) {}

  return new Promise(resolve => {
    resolve('done');
  });
}

export const random = baseRandom;

/**
 * 发送消息到其他设备
 * @param title 标题
 * @param text 文本内容
 */
export async function sendMessage(title: string, text: string) {
  logger.info('----【消息推送】----');
  // 处理 title
  title = `Bili-${TaskConfig.NICKNAME}-${title}`;
  await sendNotify(title, text, undefined, '');
}

/**
 * 不同时区获取北京时间
 */
export function getPRCDate(): Date {
  const now = new Date(),
    nowTime = now.getTime(),
    timezone = now.getTimezoneOffset() / 60;
  // 3600000 为每小时毫秒数
  return new Date(nowTime + (timezone + 8) * 3600000);
}

/**
 * 返回本月天数
 */
export function getMonthHasDays(now?: Date) {
  const nowTime = now || getPRCDate(),
    year = nowTime.getFullYear(),
    month = nowTime.getMonth() + 1,
    smallMonth = [4, 6, 9, 11];

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  if (month === 2) {
    return isLeapYear ? 29 : 28;
  } else if (smallMonth.includes(month)) {
    return 30;
  } else {
    return 31;
  }
}

/**
 * 打印版本
 */
export function printVersion() {
  try {
    const version = fs.readFileSync(path.resolve(__dirname, '../version.txt'), 'utf8').trim();
    if (version) {
      logger.info(`当前版本【${version}】`);
    }
  } catch {}
}

/**
 * 生成一个 UUID
 */
export function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, t => {
    const e = (16 * Math.random()) | 0;
    return (t === 'x' ? e : (3 & e) | 8).toString(16);
  });
}
