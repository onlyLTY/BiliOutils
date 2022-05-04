import { HEART_TRIGGER_NAME } from './constant';
import type { FCCallback, FCContext, FCEvent } from './types/fc';
import { logger } from './utils';
import { printVersion } from './utils/effect';
import { dailyHandle, liveHeartHandle } from './utils/sls';

type MainFuncType = (event: FCEvent, context: FCContext) => Promise<string>;

/**
 * 公告
 */
const notice = async (msg?: string) => {
  logger.info(msg || `阿里云 FC 测试ing`);
};

async function dailyMain(event: FCEvent, context: FCContext) {
  notice();
  return await dailyHandle({
    event,
    context,
    slsType: 'fc',
  });
}

async function liveHeartMain(event: FCEvent, context: FCContext) {
  notice('功能开发中，敬请期待');
  return await liveHeartHandle({
    event,
    context,
    slsType: 'fc',
  });
}

export function handler(event: Buffer, context: FCContext, callback: FCCallback) {
  printVersion();
  const eventJson: FCEvent = JSON.parse(event.toString());
  let caller: MainFuncType = dailyMain;
  if (eventJson.triggerName === HEART_TRIGGER_NAME) {
    caller = liveHeartMain;
  }
  caller(eventJson, context)
    .then(message => {
      callback(null, message);
    })
    .catch(err => {
      callback(err);
    });
}
