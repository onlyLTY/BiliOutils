import { logger, LogMessage } from './utils/log';
import { TaskConfig } from './config/globalVar';
import { apiDelay, sendMessage, getPRCDate, printVersion } from './utils';
import bili, { loginTask } from './task';
import { offFunctions } from './config/configOffFun';
import updateTrigger from './utils/updateTrigger';

async function dailyTasks<T = unknown>(cb?: (...arg: T[]) => unknown, ...cbArg: T[]) {
  try {
    await loginTask();
  } catch (error) {
    logger.info(`登录失败: ${error}`);
    await sendMessage('登录失败', LogMessage.value);
    return '未完成';
  }

  const biliArr = offFunctions([...Object.values(bili)]);

  for (const asyncFun of biliArr) {
    await asyncFun();
    await apiDelay();
  }

  cb && (await cb(...cbArg));

  await sendMessage('每日完成', LogMessage.value);
  return '完成';
}

exports.main_handler = async (event, _context) => {
  printVersion();

  // 只有serverless才有event
  if (!event) {
    // 如果需要执行 liveHeart
    if (TaskConfig.config.function.liveHeart) {
      const { liveHeart } = await import('./task/liveHeart');
      return await dailyTasks(liveHeart);
    }
    return await dailyTasks();
  }
  let message: { lastTime: string };
  try {
    message = JSON.parse(event.Message);
  } catch (error) {}

  if (message && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  return await dailyTasks(updateTrigger);
};
