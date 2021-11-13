import { warpLog } from '../src/utils/log';
import { TaskConfig, TaskModule } from '../src/config/globalVar';
import { apiDelay } from '../src/utils';
import bili, { loginTask } from '../src/service';
import { offFunctions } from '../src/config/configOffFun';
import { liveHeart } from '../src/service/liveHeart';
const { sendNotify } = require('./sendNotify');

async function dailyTasks(cb?: (...arg) => any, ...cbArg) {
  try {
    await loginTask();
  } catch (error) {
    console.log('登录失败: ', error);
    await sendNotify(`Bili-${TaskConfig.NICKNAME}-登录失败`, TaskModule.appInfo);
    return '未完成';
  }

  const biliArr = offFunctions([...Object.values(bili)]);

  for (const asyncFun of biliArr) {
    await asyncFun();
    await apiDelay();
  }

  cb && (await cb(...cbArg));

  await sendNotify(`Bili-${TaskConfig.NICKNAME}-任务完成`, TaskModule.appInfo);
  return '完成';
}

const main_handler = async () => {
  console.log = warpLog();
  console.log(`当前版本【0.3.21-rc0】`);

  if (TaskConfig.config.function?.liveHeart) {
    return await dailyTasks(liveHeart);
  }
  return await dailyTasks();
};

main_handler();
