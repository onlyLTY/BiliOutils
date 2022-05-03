import { Constant } from './config/globalVar';
import { getPRCDate, logger, setCron } from './utils';
import updateTrigger from './utils/updateTrigger';
import { printVersion } from './utils/effect';
import { liveHeartBySCF } from './task/liveHeart';
import type { SCFContext, SCFEvent } from './types/scf';
import { dailyTasks } from './task/dailyTask';

/**
 * 公告
 */
const notice = async () => {
  logger.warn(`SCF从5.23号其将不再拥有免费额度，如有需要请停止使用，届时产生费用不予负责。`);
};

async function dailyMain(event: SCFEvent, context: SCFContext) {
  printVersion();
  notice();

  let message: { lastTime: string };
  try {
    message = JSON.parse(event.Message);
  } catch (error) {}

  if (message && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  return await dailyTasks(() => updateTrigger(event, context));
}

async function liveHeartMain(event: SCFEvent, context: SCFContext) {
  printVersion();
  notice();

  let message;
  try {
    message = JSON.parse(event.Message);
  } catch (error) {}

  if (message && !message.d && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  const data = await liveHeartBySCF(event.Message);
  /**
   * 0 今日完成，不再需要执行
   * 1 等待继续下一轮心跳，可能一轮无法获取 24 个小心心，所以需要多轮
   * data 等待继续下次心跳，要 5 次心跳才能获取到小心心
   */
  if (data === 0) {
    // 明天再说
    await updateTrigger(event, context);
    return '今日完成';
  }

  if (data === 1) {
    await updateTrigger(event, context, { hn: { v: 0 }, d: [{ seq: { v: 0 } }] }, setCron(5_000));
    return '等待继续下一轮心跳';
  }
  await updateTrigger(event, context, data, setCron(62_000 - data.l * 1000));
  return '等待继续下次心跳';
}

export function main_handler(event: SCFEvent, context: SCFContext) {
  if (event.TriggerName === Constant.HEART_TRIGGER_NAME) {
    return liveHeartMain(event, context);
  }
  return dailyMain(event, context);
}
