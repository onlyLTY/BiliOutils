// @ts-nocheck
import { HEART_TRIGGER_NAME } from '@/constant';
import type { SCFContext, SCFEvent } from '#/scf';
import { logger } from '@/utils';
import { dailyHandle, liveHeartHandle } from '@/utils/sls';
import { printStrVersion } from '@/utils/version';

logger.info('开始执行网络代码');
printStrVersion();

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

(async () => {
  if (event.TriggerName === HEART_TRIGGER_NAME) {
    VMThis.message = liveHeartMain(event, context);
    return;
  } else {
    VMThis.message = dailyMain(event, context);
  }
  VMThis.resolve(VMThis.message);
  return;
})();
