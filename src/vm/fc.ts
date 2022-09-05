import './fix';
import type { FCContext, FCEvent } from '#/fc';
import { logger } from '@/utils';
import { dailyMain, runTasks } from '../index.fc';

type MainFuncType = (event: FCEvent, context: FCContext) => Promise<string>;

(async () => {
  logger.info('开始执行网络代码');
  const eventJson: FCEvent = __BT_context__.event;
  let isReturn = false;
  if (eventJson.payload) {
    isReturn = await runTasks(eventJson.payload);
  }
  if (isReturn) {
    __BT_context__.resolve('success');
    return;
  }
  const caller: MainFuncType = dailyMain;
  caller(eventJson, __BT_context__.context)
    .then(message => {
      __BT_context__.resolve(message);
    })
    .catch(err => {
      __BT_context__.reject(err);
    });
})();
