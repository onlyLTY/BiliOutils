import { scf } from 'tencentcloud-sdk-nodejs';
import { random } from 'lodash';
import { Config } from '../interface/Config';
let config: Config;
try {
  config = require('../config/config.json');
} catch (error) {
  config = require('../../config/config.json');
}

const ScfClient = scf.v20180416.Client;
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
  params.CustomArgument = new Date().getDate().toString();
  try {
    return await client.CreateTrigger(params);
  } catch (error) {
    console.log('创建trigger失败', error);
    return false;
  }
}

async function deleteTrigger(params) {
  try {
    return await client.DeleteTrigger(params);
  } catch (error) {
    console.log('删除trigger失败', error);
    return false;
  }
}

export default async function (taskName = 'daily') {
  let RUN_TIME = randomDailyRunTime(config.dailyRunTime);

  const params = {
    FunctionName: config.sls.name,
    TriggerName: 'bilitools_daily_timer',
    Type: 'timer',
    TriggerDesc: RUN_TIME,
    Qualifier: '$DEFAULT',
  };

  if (taskName.toLowerCase() === 'jury') {
    RUN_TIME = randomJuryRunTime();
    params.TriggerDesc = RUN_TIME;
    params.TriggerName = 'jury-timer';
  }
  console.log(`修改时间为：${RUN_TIME}`);
  const deleteResult = await deleteTrigger(params);
  if (!deleteResult) {
    return;
  }
  const createResult = await createTrigger(params);
  return createResult;
}

const MAX_MINUTES = 59,
  MAX_HOURS = 23,
  DAILY_MIN_HOURS = 19,
  JURY_START_MINUTES = 5,
  JURY_RUNTIME_HOURS = 6;

function randomDailyRunTime(dailyRunTime = '17:30:00-23:40:00') {
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
function randomJuryRunTime(juryRunTime = '8-12/20-40') {
  const time = juryRunTime.split('/').map(el => el.split('-').map(el => +el));

  const startHours = random(time[0][0], time[0][1]), // 8 - 12
    startMinutes = random(JURY_START_MINUTES), // 0 - 5 分钟开始
    minutes = random(time[1][0], time[1][1]),
    seconds = random(MAX_MINUTES);

  const endHours = JURY_RUNTIME_HOURS + startHours;

  return `${seconds} ${startMinutes}/${minutes} ${startHours}-${endHours} * * * *`;
}
