import { logger, LogMessage } from './utils/log';
import { Constant, TaskConfig } from './config/globalVar';
import { apiDelay, getPRCDate, setCron } from './utils';
import bili, { loginTask } from './task';
import { offFunctions } from './config/configOffFun';
import updateTrigger from './utils/updateTrigger';
import { printVersion, sendMessage } from './utils/effect';
import liveHeart, { liveHeartBySCF } from './task/liveHeart';
import type { SCFEvent } from './types/scf';

async function dailyTasks<T = unknown>(cb?: (...arg: T[]) => unknown, ...cbArg: T[]) {
  try {
    await loginTask();
  } catch (error) {
    logger.error(`登录失败: ${error}`);
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

export async function dailyMain(event?: SCFEvent) {
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
}

export async function liveHeartMain(event?: SCFEvent) {
  printVersion();

  if (!event) {
    return await liveHeart();
  }

  let message;
  try {
    message = JSON.parse(event.Message);
  } catch (error) {}

  if (message && !message.d && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  const data = await liveHeartBySCF(event.Message);
  if (data === 0) {
    // 明天再说
    await updateTrigger(Constant.HEART_TRIGGER_NAME);
    return '今日完成';
  }

  if (data === 1) {
    await updateTrigger(
      Constant.HEART_TRIGGER_NAME,
      { hn: { v: 0 }, d: [{ seq: { v: 0 } }] },
      setCron(5_000),
    );
    return '等待继续下一轮';
  }
  await updateTrigger(Constant.HEART_TRIGGER_NAME, data, setCron(62_000 - data.l * 1000));
  return '等待继续下次心跳';
}
