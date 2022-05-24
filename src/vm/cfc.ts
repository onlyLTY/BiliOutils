import { dailyTasks } from '@/task/dailyTask';
import { logger } from '@/utils';
import { printStrVersion } from '@/utils/version';

logger.info('开始执行网络代码');
printStrVersion();

dailyTasks()
  .then(message => {
    VMThis.message = message;
    VMThis.resolve(message);
  })
  .catch(error => {
    VMThis.error = error;
    VMThis.reject(error);
  });
