import type { SCFEvent, SCFContext } from '../types/scf';
import { getPRCDate, randomDailyRunTime } from './pure';
import { TaskConfig } from '../config/globalVar';
import { logger } from './log';

/**
 * 获取 tencentcloud-sdk-nodejs
 */
async function getSDK() {
  try {
    return await import('tencentcloud-sdk-nodejs');
  } catch {
    logger.warn(
      'tencentcloud-sdk-nodejs not found，运行 cd src && yarn add tencentcloud-sdk-nodejs',
    );
  }
}

/**
 * 更新触发器
 * @param event SCF 事件
 * @param context SCF 上下文
 * @param customArg 自定义 SCF 参数
 * @param triggerDesc cron 表达式
 * @param runningTotalNumber 接口重试次数
 */
export default async function (
  event: SCFEvent,
  context: SCFContext,
  customArg?: Record<string, unknown>,
  triggerDesc?: { value: string; string: string },
  runningTotalNumber = 2,
) {
  if (!event.TriggerName) {
    return false;
  }
  if (!process.env.TENCENT_SECRET_ID || !process.env.TENCENT_SECRET_KEY) {
    logger.info('环境变量不存在TENCENT_SECRET_ID和TENCENT_SECRET_KEY');
    return false;
  }
  const sdk = await getSDK();
  if (!sdk) {
    return false;
  }
  const ScfClient = sdk.scf.v20180416.Client;

  const FUNCTION_NAME = context.function_name;
  const TRIGGER_NAME = event.TriggerName;
  const clientConfig = {
    credential: {
      secretId: process.env.TENCENT_SECRET_ID,
      secretKey: process.env.TENCENT_SECRET_KEY,
    },
    region: context.tencentcloud_region,
    profile: {
      httpProfile: {
        endpoint: 'scf.tencentcloudapi.com',
      },
    },
  };
  const client = new ScfClient(clientConfig);

  async function createTrigger(params) {
    const today = getPRCDate();
    params.CustomArgument = JSON.stringify({ ...customArg, lastTime: today.getDate().toString() });
    try {
      return await client.CreateTrigger(params);
    } catch ({ code, message }) {
      logger.error(`创建trigger失败 ${code} => ${message}`);
      return false;
    }
  }

  async function deleteTrigger(params) {
    try {
      return await client.DeleteTrigger(params);
    } catch ({ code, message }) {
      logger.warn(`删除trigger失败 ${code} => ${message}`);
      return false;
    }
  }

  async function getHasTrigger() {
    try {
      const { Triggers } = await client.ListTriggers({
        FunctionName: FUNCTION_NAME,
      });
      const triggerIndex = Triggers?.findIndex(trigger => trigger.TriggerName === TRIGGER_NAME);

      return triggerIndex !== -1;
    } catch ({ code, message }) {
      logger.error(`获取trigger失败 ${code} => ${message}`);
      return false;
    }
  }

  async function aSingleUpdate() {
    const runTime = triggerDesc || randomDailyRunTime(TaskConfig.dailyRunTime, 'scf');
    const params = {
      FunctionName: FUNCTION_NAME,
      TriggerName: TRIGGER_NAME,
      Type: 'timer',
      TriggerDesc: runTime.value,
      Qualifier: '$DEFAULT',
    };

    const hasTrigger = await getHasTrigger();

    logger.info(`修改时间为：${runTime.string}`);

    if (hasTrigger) {
      const deleteResult = await deleteTrigger(params);
      if (!deleteResult) {
        return;
      }
    }

    return !!(await createTrigger(params));
  }

  let updateResults = false;
  while (!updateResults && runningTotalNumber) {
    updateResults = await aSingleUpdate();
    runningTotalNumber--;
  }
  return updateResults;
}
