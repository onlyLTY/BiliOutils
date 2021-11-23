import { scf } from 'tencentcloud-sdk-nodejs';
import { random } from 'lodash';
import { getPRCDate } from './';
import config from '../config/setConfig';
import { Constant } from '../config/globalVar';

const ScfClient = scf.v20180416.Client;

const MAX_MINUTES = 59,
  MAX_HOURS = 23,
  DAILY_MIN_HOURS = 19;

const { DAILY_RUN_TIME, DAILY_TRIGGER_NAME } = Constant;

/** 每日任务随机时间设置 */
function randomDailyRunTime(dailyRunTime = DAILY_RUN_TIME) {
  const taskTime = dailyRunTime.split('-');
  const startTime = taskTime[0].split(':').map(str => +str);
  const endTime = taskTime[1].split(':').map(str => +str);

  const hours = random(startTime[0] ?? DAILY_MIN_HOURS, endTime[0] ?? MAX_HOURS);
  let minutes = 0;
  if (hours == startTime[0]) {
    minutes = random(startTime[1], MAX_MINUTES);
  } else if (hours == endTime[0]) {
    minutes = random(endTime[1]);
  } else {
    minutes = random(MAX_MINUTES);
  }
  let seconds = 0;
  if (hours == startTime[0]) {
    seconds = random(startTime[2], MAX_MINUTES);
  } else if (hours == endTime[0]) {
    seconds = random(endTime[2]);
  } else {
    seconds = random(MAX_MINUTES);
  }

  return {
    value: `${seconds} ${minutes} ${hours} * * * *`,
    string: `${hours}:${minutes}:${seconds}`,
  };
}

/**
 *
 * @param triggerName 定时器名
 * @param customArg 自定义 scf 参数
 * @param triggerDesc cron 表达式
 * @param runningTotalNumber 接口重试次数
 */
export default async function (
  triggerName = DAILY_TRIGGER_NAME,
  customArg?,
  triggerDesc?: { value: string; string: string },
  runningTotalNumber = 2,
) {
  if (!config.sls) {
    return false;
  }
  const FUNCTION_NAME = config.sls?.name;
  const clientConfig = {
    credential: {
      secretId: process.env.TENCENT_SECRET_ID,
      secretKey: process.env.TENCENT_SECRET_KEY,
    },
    region: config.sls.region,
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
      console.log('创建trigger失败', `${code} => ${message}`);
      return false;
    }
  }

  async function deleteTrigger(params) {
    try {
      return await client.DeleteTrigger(params);
    } catch ({ code, message }) {
      console.log('删除trigger失败', `${code} => ${message}`);
      return false;
    }
  }

  async function getHasTrigger(triggerName) {
    try {
      const { Triggers } = await client.ListTriggers({
        FunctionName: FUNCTION_NAME,
      });
      const triggerIndex = Triggers?.findIndex(trigger => trigger.TriggerName === triggerName);

      return triggerIndex !== -1;
    } catch ({ code, message }) {
      console.log('获取trigger失败', `${code} => ${message}`);
      return false;
    }
  }

  async function aSingleUpdate() {
    let runTime = triggerDesc || randomDailyRunTime(config.dailyRunTime);
    const params = {
      FunctionName: FUNCTION_NAME,
      TriggerName: triggerName,
      Type: 'timer',
      TriggerDesc: runTime.value,
      Qualifier: '$DEFAULT',
    };

    const hasTrigger = await getHasTrigger(triggerName);

    console.log(`修改时间为：${runTime.string}`);

    if (hasTrigger) {
      const deleteResult = await deleteTrigger(params);
      if (!deleteResult) {
        return;
      }
    }

    return !!(await createTrigger(params));
  }

  if (!process.env.TENCENT_SECRET_ID || !process.env.TENCENT_SECRET_KEY) {
    console.log('环境变量不存在TENCENT_SECRET_ID和TENCENT_SECRET_KEY');
    return false;
  }
  let updateResults = false;
  while (!updateResults && runningTotalNumber) {
    updateResults = await aSingleUpdate();
    runningTotalNumber--;
  }
  return updateResults;
}
