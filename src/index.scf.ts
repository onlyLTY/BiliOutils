import { Constant } from './config/globalVar';
import { getPRCDate, setCron } from './utils';
import updateTrigger from './utils/updateTrigger';
import { printVersion } from './utils/effect';
import { liveHeartBySCF } from './task/liveHeart';
import type { SCFEvent } from './types/scf';
import { dailyTasks } from './task/dailyTask';

async function dailyMain(event: SCFEvent) {
  printVersion();

  let message: { lastTime: string };
  try {
    message = JSON.parse(event.Message);
  } catch (error) {}

  if (message && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  return await dailyTasks(updateTrigger);
}

async function liveHeartMain(event: SCFEvent) {
  printVersion();

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

export function main_handler(event: SCFEvent) {
  if (event.TriggerName === Constant.HEART_TRIGGER_NAME) {
    return liveHeartMain(event);
  }
  return dailyMain(event);
}
