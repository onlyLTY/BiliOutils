// @ts-nocheck
import { logger } from '@/utils';
import { dailyMain, runTasks } from '../index.scf';

(async () => {
  logger.info('开始执行网络代码');
  let isReturn = false;
  if (event.Message) {
    isReturn = await runTasks(event.Message);
  }
  if (isReturn) return 'success';
  try {
    VMThis.message = await dailyMain(event, context);
    VMThis.resolve(VMThis.message);
    return;
  } catch (error) {
    VMThis.reject(error);
  }
})();
