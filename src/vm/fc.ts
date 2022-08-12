import type { FCContext, FCEvent } from '#/fc';
import { logger } from '@/utils';
import { dailyMain, runTasks } from '../index.fc';
import { JSON5 } from '@/utils/json5';

type MainFuncType = (event: FCEvent, context: FCContext) => Promise<string>;

(async () => {
  logger.info('开始执行网络代码');
  // @ts-ignore
  const eventJson: FCEvent = JSON5.parse(event.toString());
  let isReturn = false;
  if (eventJson.payload) {
    isReturn = await runTasks(eventJson.payload);
  }
  if (isReturn) {
    VMThis.message = 'success';
    VMThis.resolve('success');
    return;
  }
  const caller: MainFuncType = dailyMain;
  // @ts-ignore
  caller(eventJson, context)
    .then(message => {
      VMThis.message = message;
      VMThis.resolve(VMThis.message);
    })
    .catch(err => {
      VMThis.error = err;
      VMThis.reject(VMThis.error);
    });
})();
