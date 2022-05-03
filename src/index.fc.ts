import { getPRCDate, logger } from './utils';
import { printVersion } from './utils/effect';
import updateTrigger from './utils/updateFcTrigger';
import { dailyTasks } from './task/dailyTask';
import type { FCCallback, FCContext, FCEvent } from './types/fc';

/**
 * 公告
 */
const notice = async () => {
  logger.info(`阿里云 FC 测试ing`);
};

async function dailyMain(event: FCEvent, context: FCContext) {
  printVersion();
  notice();

  let message: { lastTime: string };
  try {
    message = JSON.parse(event.payload);
  } catch (error) {}

  if (message && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  return await dailyTasks(() => updateTrigger(event, context));
}

export function handler(event: Buffer, context: FCContext, callback: FCCallback) {
  const eventJson: FCEvent = JSON.parse(event.toString());
  dailyMain(eventJson, context)
    .then(message => {
      callback(null, message);
    })
    .catch(err => {
      callback(err);
    });
}
