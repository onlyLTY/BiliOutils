import { scf } from 'tencentcloud-sdk-nodejs';
import { random } from 'lodash';
import { getPRCDate } from './';
import config from '../config/setConfig';
import { Constant } from 'config/globalVar';

const ScfClient = scf.v20180416.Client;

const MAX_MINUTES = 59,
  MAX_HOURS = 23,
  DAILY_MIN_HOURS = 19,
  JURY_START_MINUTES = 5,
  JURY_RUNTIME_HOURS = 6;

/** 每日任务随机时间设置 */
function randomDailyRunTime(dailyRunTime = Constant.DAILY_RUN_TIME) {
  const taskTime = dailyRunTime.split('-');
  const startTime = taskTime[0].split(':').map(str => +str);
  const endTime = taskTime[1].split(':').map(str => +str);

  const hours = random(
    startTime[0] ?? DAILY_MIN_HOURS,
    endTime[0] ?? MAX_HOURS,
  );
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

  return `${seconds} ${minutes} ${hours} * * * *`;
}

/** 风纪任务随机时间设置 */
function randomJuryRunTime(juryRunTime = Constant.JURY_RUN_TIME) {
  const time = juryRunTime.split('/').map(el => el.split('-').map(el => +el));

  const startHours = random(time[0][0], time[0][1]), // 8 - 12
    startMinutes = random(JURY_START_MINUTES), // 0 - 5 分钟开始
    minutes = random(time[1][0], time[1][1]),
    seconds = random(MAX_MINUTES);

  const endHours = JURY_RUNTIME_HOURS + startHours;

  return `${seconds} ${startMinutes}/${minutes} ${startHours}-${endHours} * * * *`;
}

/**
 *
 * @param taskName 执行任务类型名
 * @param runningTotalNumber 接口重试次数
 */
export default async function (taskName = 'daily', runningTotalNumber = 2) {
  if (!config.sls) {
    return false;
  }
  const FUNCTION_NAME = config.sls?.name;
  const DAILY_TRIGGER_NAME = Constant.DAILY_TRIGGER_NAME;
  const JURY_TRIGGER_NAME = Constant.JURY_TRIGGER_NAME;
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
    params.CustomArgument = today.getDate().toString();
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

  async function getHasTrigger(taskName) {
    try {
      const { Triggers } = await client.ListTriggers({
        FunctionName: FUNCTION_NAME,
      });
      const TRIGGER_NAME =
        taskName === 'daily' ? DAILY_TRIGGER_NAME : JURY_TRIGGER_NAME;
      const triggerIndex = Triggers?.findIndex(
        trigger => trigger.TriggerName === TRIGGER_NAME,
      );

      return triggerIndex !== -1;
    } catch ({ code, message }) {
      console.log('获取trigger失败', `${code} => ${message}`);
      return false;
    }
  }

  async function aSingleUpdate(taskName) {
    let runTime = randomDailyRunTime(config.dailyRunTime);
    const params = {
      FunctionName: FUNCTION_NAME,
      TriggerName: DAILY_TRIGGER_NAME,
      Type: 'timer',
      TriggerDesc: runTime,
      Qualifier: '$DEFAULT',
    };

    const hasTrigger = await getHasTrigger(taskName);

    if (taskName.toLowerCase() === 'jury') {
      runTime = randomJuryRunTime();
      params.TriggerDesc = runTime;
      params.TriggerName = JURY_TRIGGER_NAME;
    }
    console.log(`修改时间为：${runTime}`);

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
    updateResults = await aSingleUpdate(taskName);
    runningTotalNumber--;
  }
  return updateResults;
}
