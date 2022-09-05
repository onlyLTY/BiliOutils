import './fix';
import { dailyTasks } from '@/task/dailyTask';
import { logger } from '@/utils';

logger.info('开始执行网络代码');
dailyTasks()
  .then(message => {
    __BT_context__.resolve(message);
  })
  .catch(error => {
    __BT_context__.reject(error);
  });
