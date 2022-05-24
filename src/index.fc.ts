import { HEART_TRIGGER_NAME } from './constant';
import type { FCCallback, FCContext, FCEvent } from './types/fc';
import { logger } from './utils';
import { dailyHandle, liveHeartHandle } from './utils/sls';
import { printVersion } from './utils/version';
import { runInVM } from './utils/vm';

type MainFuncType = (event: FCEvent, context: FCContext) => Promise<string>;

/**
 * 公告
 */
const notice = async (msg?: string) => {
  logger.info(msg || `阿里云 FC 测试ing`);
};

export async function dailyMain(event: FCEvent, context: FCContext) {
  notice();
  return await dailyHandle({
    event,
    context,
    slsType: 'fc',
  });
}

export async function liveHeartMain(event: FCEvent, context: FCContext) {
  notice('功能开发中，敬请期待');
  return await liveHeartHandle({
    event,
    context,
    slsType: 'fc',
  });
}

export async function handler(event: Buffer, context: FCContext, callback: FCCallback) {
  if (process.env.USE_NETWORK_CODE) {
    const isGetCode = await runInVM('vm.fc.js', { event, context });
    if (isGetCode) {
      callback(VMThis.error as Error, VMThis.message);
      return;
    }
  }
  try {
    await printVersion();
    const eventJson: FCEvent = JSON.parse(event.toString());
    let caller: MainFuncType = dailyMain;
    if (eventJson.triggerName === HEART_TRIGGER_NAME) {
      caller = liveHeartMain;
    }
    const message = await caller(eventJson, context);
    callback(null, message);
  } catch (error) {
    callback(error);
  }
}
