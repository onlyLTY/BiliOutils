// @ts-nocheck
import { logger } from '@/utils';
import { printStrVersion } from '@/utils/version';
import { dailyMain } from '../index.scf';

logger.info('开始执行网络代码');
printStrVersion();

(async () => {
  try {
    VMThis.message = await dailyMain(event, context);
    VMThis.resolve(VMThis.message);
    return;
  } catch (error) {
    VMThis.reject(error);
  }
})();
