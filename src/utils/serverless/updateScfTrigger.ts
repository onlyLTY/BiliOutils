import type { SCFEvent, SCFContext } from '@/types/scf';
import type { SlSOptions } from '@/types/sls';
import type { Client } from 'tencentcloud-sdk-nodejs/tencentcloud/services/scf/v20180416/scf_client';
import { getPRCDate, randomDailyRunTime } from '../pure';
import { TaskConfig } from '@/config/globalVar';
import { logger, _logger } from '../log';

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

type TriggerRequest = {
  TriggerName: string;
  TriggerDesc?: string;
};

export class SCF {
  client: Client;
  params = {
    FunctionName: '',
    TriggerName: '',
    Type: 'timer',
    TriggerDesc: '',
    Qualifier: '$DEFAULT',
  };

  async init(context: SCFContext) {
    const sdk = await getSDK();
    if (!sdk) {
      return false;
    }
    this.params.FunctionName = context.function_name;
    const clientConfig = {
      credential: {
        secretId: process.env.TENCENT_SECRET_ID?.trim(),
        secretKey: process.env.TENCENT_SECRET_KEY?.trim(),
      },
      region: context.tencentcloud_region,
      profile: {
        httpProfile: {
          endpoint: 'scf.tencentcloudapi.com',
        },
      },
    };
    const ScfClient = sdk.scf.v20180416.Client;
    this.client = new ScfClient(clientConfig);
    return this.client;
  }

  async deleteTrigger(TriggerName?: string) {
    try {
      return await this.client.DeleteTrigger({
        ...this.params,
        TriggerName: TriggerName || this.params.TriggerName,
      });
    } catch ({ code, message }) {
      logger.warn(`删除trigger失败 ${code} => ${message}`);
      return false;
    }
  }

  async getHasTrigger(triggerName: string) {
    try {
      const { Triggers } = await this.client.ListTriggers({
        FunctionName: this.params.FunctionName,
      });
      const triggerIndex = Triggers?.findIndex(trigger => trigger.TriggerName === triggerName);

      return triggerIndex !== -1;
    } catch ({ code, message }) {
      logger.error(`获取trigger失败 ${code} => ${message}`);
      return false;
    }
  }

  async createTrigger(params: TriggerRequest, customArg: Record<string, any> = {}) {
    const today = getPRCDate();
    const CustomArgument = JSON.stringify({
      ...customArg,
      lastTime: today.getDate().toString(),
    });
    try {
      return await this.client.CreateTrigger({ ...this.params, ...params, CustomArgument });
    } catch ({ code, message }) {
      logger.error(`创建trigger失败 ${code} => ${message}`);
      return false;
    }
  }
}
export const scfClient = new SCF();

/**
 * 更新触发器
 * @param event SCF 事件
 * @param options 自定义 SCF 参数
 */
export default async function (
  event: SCFEvent,
  { customArg, triggerDesc, triggerName }: SlSOptions = {},
) {
  if (!event.TriggerName && !triggerName) {
    return false;
  }
  if (!process.env.TENCENT_SECRET_ID || !process.env.TENCENT_SECRET_KEY) {
    _logger.info('环境变量不存在TENCENT_SECRET_ID和TENCENT_SECRET_KEY');
    return false;
  }
  const TRIGGER_NAME = triggerName || event.TriggerName || 'daily';
  if (!scfClient.client) return false;

  async function aSingleUpdate() {
    const runTime = triggerDesc || randomDailyRunTime(TaskConfig.dailyRunTime, 'scf');
    const params = {
      TriggerName: TRIGGER_NAME,
      TriggerDesc: runTime.value,
    };

    const hasTrigger = await scfClient.getHasTrigger(TRIGGER_NAME);

    logger.info(`修改时间为：${runTime.string}`);

    if (hasTrigger) {
      const deleteResult = await scfClient.deleteTrigger(TRIGGER_NAME);
      if (!deleteResult) {
        return false;
      }
    }

    return !!(await scfClient.createTrigger(params, customArg));
  }

  let updateResults = false,
    runningTotalNumber = 2;
  while (!updateResults && runningTotalNumber) {
    updateResults = await aSingleUpdate();
    runningTotalNumber--;
  }
  return updateResults;
}
