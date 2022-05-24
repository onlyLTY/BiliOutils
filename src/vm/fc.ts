// @ts-nocheck
import { HEART_TRIGGER_NAME } from '@/constant';
import type { FCContext, FCEvent } from '#/fc';
import { logger } from '@/utils';
import { dailyHandle, liveHeartHandle } from '@/utils/sls';
import { printStrVersion } from '@/utils/version';

type MainFuncType = (event: FCEvent, context: FCContext) => Promise<string>;

logger.info('开始执行网络代码');
printStrVersion();
/**
 * 公告
 */
const notice = async (msg?: string) => {
  logger.info(msg || `阿里云 FC 测试ing`);
};

async function dailyMain(event: FCEvent, context: FCContext) {
  notice();
  return await dailyHandle({
    event,
    context,
    slsType: 'fc',
  });
}

async function liveHeartMain(event: FCEvent, context: FCContext) {
  notice('功能开发中，敬请期待');
  return await liveHeartHandle({
    event,
    context,
    slsType: 'fc',
  });
}

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
