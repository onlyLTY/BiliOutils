import { getPRCDate, randomDailyRunTime } from './pure';
import { TaskConfig } from '../config/globalVar';
import { logger } from './log';
import type { FCContext, FCEvent } from '../types/fc';

/**
 * 获取 @alicloud/fc2
 */
async function getSDK() {
  try {
    return await import('@alicloud/fc2');
  } catch {
    logger.warn('@alicloud/fc2 not found，运行 yarn add @alicloud/fc2');
  }
}

/**
 * 更新触发器
 * @param event FC 事件
 * @param context FC 上下文
 * @param customArg 自定义 FC 参数
 * @param triggerDesc cron 表达式
 * @param runningTotalNumber 接口重试次数
 */
export default async function (
  event: FCEvent,
  context: FCContext,
  customArg?: Record<string, unknown>,
  triggerDesc?: { value: string; string: string },
  runningTotalNumber = 2,
) {
  if (!event.triggerName) {
    return false;
  }
  if (!process.env.ALI_SECRET_ID || !process.env.ALI_SECRET_KEY) {
    logger.info('环境变量不存在ALI_SECRET_ID和ALI_SECRET_KEY');
    return false;
  }
  const sdk = await getSDK();
  if (!sdk) {
    return false;
  }
  const FCClient = sdk.default;

  const FUNCTION_NAME = context.function.name;
  const TRIGGER_NAME = event.triggerName;
  const SERVICE_NAME = context.service.name;

  const client = new FCClient(context.accountId, {
    accessKeyID: process.env.ALI_SECRET_ID,
    accessKeySecret: process.env.ALI_SECRET_KEY,
    region: context.region,
  });

  async function updateTrigger(cron: string) {
    const today = getPRCDate();
    const cronExpression = `CRON_TZ=Asia/Shanghai ${cron}`;
    try {
      return await client.updateTrigger(SERVICE_NAME, FUNCTION_NAME, TRIGGER_NAME, {
        triggerConfig: {
          cronExpression,
          payload: JSON.stringify({
            ...customArg,
            lastTime: today.getDate().toString(),
          }),
        },
      });
    } catch (error) {
      logger.error(`更新trigger失败 ${error.message}`);
      return false;
    }
  }

  async function aSingleUpdate() {
    const runTime = triggerDesc || randomDailyRunTime(TaskConfig.dailyRunTime, 'fc');
    logger.info(`修改时间为：${runTime.string}`);
    return !!(await updateTrigger(runTime.value));
  }

  let updateResults = false;
  while (!updateResults && runningTotalNumber) {
    updateResults = await aSingleUpdate();
    runningTotalNumber--;
  }
  return updateResults;
}
