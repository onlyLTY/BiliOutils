import type { FCCallback, FCContext, FCEvent } from './types/fc';
import { logger } from './utils';
import { runInVM } from './utils/vm';

/**
 * 公告
 */
const notice = async (msg?: string) => {
  logger.info(msg || `阿里云 FC 测试ing`);
};

export async function dailyMain(event: FCEvent, context: FCContext) {
  notice();
  const { dailyHandle } = await import('./utils/sls');
  return await dailyHandle({
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
    const eventJson: FCEvent = JSON.parse(event.toString());
    const message = await dailyMain(eventJson, context);
    callback(null, message);
  } catch (error) {
    callback(error);
  }
}
