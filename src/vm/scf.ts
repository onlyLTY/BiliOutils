import './fix';
import { logger } from '@/utils';
import { dailyMain, runTasks } from '../index.scf';

(async () => {
  logger.info('开始执行网络代码');
  let isReturn = false;
  if (__BT_context__.event.Message) {
    isReturn = await runTasks(__BT_context__.event.Message);
  }
  if (isReturn) return __BT_context__.resolve('success');
  try {
    const message = await dailyMain();
    __BT_context__.resolve(message);
    return;
  } catch (error) {
    __BT_context__.reject(error);
  }
})();
