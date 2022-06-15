// @ts-nocheck
import type { FCContext, FCEvent } from '#/fc';
import { logger } from '@/utils';
import { dailyMain } from '../index.fc';

type MainFuncType = (event: FCEvent, context: FCContext) => Promise<string>;

(async () => {
  logger.info('开始执行网络代码');
  const eventJson: FCEvent = JSON.parse(event.toString());
  const caller: MainFuncType = dailyMain;
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
