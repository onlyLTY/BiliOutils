import { logger, LogMessage } from '../src/utils/log';
import { TaskConfig } from '../src/config/globalVar';
import { apiDelay } from '../src/utils';
import bili, { loginTask } from '../src/task';
import { offFunctions } from '../src/config/configOffFun';
import { liveHeart } from '../src/task/liveHeart';

// 使用 require 加载是为了防止被打包
// 青龙面板中存在此文件，可以直接使用
const { sendNotify } = require('./sendNotify');

async function dailyTasks<T = unknown>(cb?: (...arg: T[]) => unknown, ...cbArg: T[]) {
  try {
    await loginTask();
  } catch (error) {
    logger.error(`登录失败: ${error}`);
    await sendNotify(`Bili-${TaskConfig.NICKNAME}-登录失败`, LogMessage.value);
    return '未完成';
  }

  const biliArr = offFunctions([...Object.values(bili)]);

  for (const asyncFun of biliArr) {
    await asyncFun();
    await apiDelay();
  }

  cb && (await cb(...cbArg));

  await sendNotify(`Bili-${TaskConfig.NICKNAME}-任务完成`, LogMessage.value);
  return '完成';
}

const main_handler = async () => {
  logger.info(`当前版本【0.4.0-rc0】`);

  if (TaskConfig.config.function?.liveHeart) {
    return await dailyTasks(liveHeart);
  }
  return await dailyTasks();
};

main_handler();
