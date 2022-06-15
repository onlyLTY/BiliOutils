// @ts-nocheck
import { logger } from '@/utils';
import { dailyMain } from '../index.scf';

(async () => {
  logger.info('开始执行网络代码');
  try {
    VMThis.message = await dailyMain(event, context);
    VMThis.resolve(VMThis.message);
    return;
  } catch (error) {
    VMThis.reject(error);
  }
})();
