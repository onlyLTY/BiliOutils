import { HEART_TRIGGER_NAME } from './constant';
import type { SCFContext, SCFEvent } from './types/scf';
import { logger } from './utils';
import { dailyHandle, liveHeartHandle } from './utils/sls';
import { printVersion } from './utils/version';
import { runInVM } from './utils/vm';

/**
 * 公告
 */
const notice = async (msg?: string) => {
  logger.warn(msg || `SCF从6.1号其将不再拥有免费额度，暂时可以购买1元额度，请自行购买，谢谢！`);
};

async function dailyMain(event: SCFEvent, context: SCFContext) {
  notice();

  return await dailyHandle({
    event,
    context,
    slsType: 'scf',
  });
}

async function liveHeartMain(event: SCFEvent, context: SCFContext) {
  notice();

  return await liveHeartHandle({
    event,
    context,
    slsType: 'scf',
  });
}

export async function main_handler(event: SCFEvent, context: SCFContext) {
  if (process.env.USE_NETWORK_CODE) {
    const isGetCode = await runInVM('vm.scf.js', { event, context });
    if (isGetCode) {
      return isGetCode;
    }
  }
  await printVersion();

  if (event.TriggerName === HEART_TRIGGER_NAME) {
    return liveHeartMain(event, context);
  }
  return dailyMain(event, context);
}
