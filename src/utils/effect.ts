import * as path from 'path';
import * as fs from 'fs';
import { logger } from './log';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { random } from './pure';
import { sendNotify } from './sendNotify';

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
 * 发送消息到其他设备
 * @param title 标题
 * @param text 文本内容
 */
export async function sendMessage(title: string, text: string) {
  logger.info('----【消息推送】----');
  // 处理 title
  title = `Bili-${TaskModule.nickname}-${title}`;
  await sendNotify(title, text, undefined, '');
}

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
