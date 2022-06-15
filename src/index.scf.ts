import type { SCFContext, SCFEvent } from './types/scf';
import { logger } from './utils';
import { runInVM } from './utils/vm';

/**
 * 公告
 */
const notice = async (msg?: string) => {
  logger.warn(msg || `SCF从6.1号其将不再拥有免费额度，暂时可以购买1元额度，请自行购买，谢谢！`);
};

export async function dailyMain(event: SCFEvent, context: SCFContext) {
  notice();
  const { dailyHandle } = await import('./utils/sls');

  return await dailyHandle({
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

  return dailyMain(event, context);
}
