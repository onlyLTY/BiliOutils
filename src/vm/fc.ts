// @ts-nocheck
import type { FCContext, FCEvent } from '#/fc';
import { HEART_TRIGGER_NAME } from '@/constant';
import { logger } from '@/utils';
import { printStrVersion } from '@/utils/version';
import { dailyMain, liveHeartMain } from '../index.fc';

type MainFuncType = (event: FCEvent, context: FCContext) => Promise<string>;

logger.info('开始执行网络代码');
printStrVersion();

(async () => {
  const eventJson: FCEvent = JSON.parse(event.toString());
  let caller: MainFuncType = dailyMain;
  if (eventJson.triggerName === HEART_TRIGGER_NAME) {
    caller = liveHeartMain;
  }
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
