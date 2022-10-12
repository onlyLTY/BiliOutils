import type { SlSOptions } from '@/types/sls';
import { getPRCDate, randomDailyRunTime } from '../pure';
import type Client from '@alicloud/fc2';
import { TaskConfig } from '@/config/globalVar';
import { logger, _logger } from '../log';
import type { FCContext, FCEvent } from '@/types/fc';

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

type TriggerRequest = {
  TriggerName: string;
  TriggerDesc?: string;
};

export class FC {
  client: Client;
  functionName: string;
  sericeName: string;
  params = {
    TriggerName: '',
    TriggerDesc: '',
  };

  async init(context: FCContext, event?: FCEvent) {
    const sdk = await getSDK();
    if (!sdk) {
      return false;
    }
    const clientConfig = {
      accessKeyID: process.env.ALI_SECRET_ID?.trim(),
      accessKeySecret: process.env.ALI_SECRET_KEY?.trim(),
      region: context.region,
    };
    this.functionName = context.function.name;
    this.sericeName = context.service.name;
    this.params.TriggerName = event?.triggerName || '';
    const FcClient = sdk.default;
    this.client = new FcClient(context.accountId, clientConfig);
    return this.client;
  }

  async updateTrigger(cron: string, customArg: Record<string, any> = {}, triggerName?: string) {
    const today = getPRCDate();
    const cronExpression = `CRON_TZ=Asia/Shanghai ${cron}`;
    try {
      return await this.client.updateTrigger(
        this.sericeName,
        this.functionName,
        triggerName || this.params.TriggerName,
        {
          triggerConfig: {
            cronExpression,
            payload: JSON.stringify({
              ...customArg,
              lastTime: today.getDate().toString(),
            }),
          },
        },
      );
    } catch (error) {
      logger.error(`更新trigger失败 ${error.message}`);
      return false;
    }
  }

  async createTrigger(params: TriggerRequest, customArg: Record<string, any> = {}) {
    params = {
      ...this.params,
      ...params,
    };
    const cronExpression = `CRON_TZ=Asia/Shanghai ${params.TriggerDesc}`;
    return await this.client.createTrigger(this.sericeName, this.functionName, {
      triggerName: params.TriggerName,
      triggerConfig: {
        cronExpression,
        enable: true,
        payload: JSON.stringify({
          ...customArg,
          lastTime: getPRCDate().getDate().toString(),
        }),
      },
    });
  }

  deleteTrigger(TriggerName?: string) {
    return this.client.deleteTrigger(
      this.sericeName,
      this.functionName,
      TriggerName || this.params.TriggerName,
    );
  }
}

export const fcClient = new FC();

/**
 * 更新触发器
 * @param event FC 事件
 * @param options 自定义配置
 */
export default async function (
  event: FCEvent,
  { customArg, triggerDesc, triggerName }: SlSOptions = {},
) {
  if (!event.triggerName && !triggerName) {
    return false;
  }
  if (!process.env.ALI_SECRET_ID || !process.env.ALI_SECRET_KEY) {
    _logger.info('环境变量不存在ALI_SECRET_ID和ALI_SECRET_KEY');
    return false;
  }
  if (!fcClient.client) return false;

  async function aSingleUpdate() {
    const runTime = triggerDesc || randomDailyRunTime(TaskConfig.dailyRunTime, 'fc');
    logger.info(`修改时间为：${runTime.string}`);
    return !!(await fcClient.updateTrigger(
      runTime.value,
      customArg,
      triggerName || event.triggerName,
    ));
  }

  let updateResults = false,
    runningTotalNumber = 2;
  while (!updateResults && runningTotalNumber) {
    updateResults = await aSingleUpdate();
    runningTotalNumber--;
  }
  return updateResults;
}
