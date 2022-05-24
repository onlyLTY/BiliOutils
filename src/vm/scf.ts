// @ts-nocheck
import { HEART_TRIGGER_NAME } from '@/constant';
import { logger } from '@/utils';
import { printStrVersion } from '@/utils/version';
import { dailyMain, liveHeartMain } from '../index.scf';

logger.info('开始执行网络代码');
printStrVersion();

(async () => {
  if (event.TriggerName === HEART_TRIGGER_NAME) {
    VMThis.message = await liveHeartMain(event, context);
    return;
  } else {
    VMThis.message = await dailyMain(event, context);
  }
  VMThis.resolve(VMThis.message);
  return;
})();
