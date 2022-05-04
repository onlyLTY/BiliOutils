import { HEART_TRIGGER_NAME } from './constant';
import type { SCFContext, SCFEvent } from './types/scf';
import { logger } from './utils';
import { printVersion } from './utils/effect';
import { dailyHandle, liveHeartHandle } from './utils/sls';

/**
 * 公告
 */
const notice = async (msg?: string) => {
  logger.warn(msg || `SCF从5.23号其将不再拥有免费额度，如有需要请停止使用，届时产生费用不予负责。`);
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

export function main_handler(event: SCFEvent, context: SCFContext) {
  printVersion();

  if (event.TriggerName === HEART_TRIGGER_NAME) {
    return liveHeartMain(event, context);
  }
  return dailyMain(event, context);
}
