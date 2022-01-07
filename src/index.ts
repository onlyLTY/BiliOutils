import { warpLog } from './utils/log';
import { TaskConfig, TaskModule } from './config/globalVar';
import { apiDelay, sendMessage, getPRCDate, printVersion } from './utils';
import bili, { loginTask } from './service';
import { offFunctions } from './config/configOffFun';
import updateTrigger from './utils/updateTrigger';

async function dailyTasks<T = any>(cb?: (...arg: T[]) => any, ...cbArg: T[]) {
  try {
    await loginTask();
  } catch (error) {
    console.log('登录失败: ', error);
    await sendMessage('登录失败', TaskModule.appInfo);
    return '未完成';
  }

  const biliArr = offFunctions([...Object.values(bili)]);

  for (const asyncFun of biliArr) {
    await asyncFun();
    await apiDelay();
  }

  if (cb) {
    await cb(...cbArg);
  }

  await sendMessage('每日完成', TaskModule.appInfo);
  return '完成';
}

exports.main_handler = async (event, _context) => {
  //必须得写在main_handler中,否则serverless无效
  console.log = warpLog();
  printVersion();

  // 只有serverless才有event
  if (!event) {
    // 如果需要执行 liveHeart
    if (TaskConfig.config.function.liveHeart) {
      const { liveHeart } = await import('./service/liveHeart');
      return await dailyTasks(liveHeart);
    }
    return await dailyTasks();
  }
  let message: { lastTime: string; };
  try {
    message = JSON.parse(event.Message);
  } catch (error) {}

  if (message && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  return await dailyTasks(updateTrigger);
};
