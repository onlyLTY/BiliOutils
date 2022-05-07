import { getPRCDate, setCron } from './pure';
import { dailyTasks } from '../task/dailyTask';
import type { FCContext, FCEvent } from '../types/fc';
import { liveHeartBySCF } from '../task/liveHeart';
import type { HeartSLSDateType, SCFContext, SCFEvent, SLSType } from '../types';

interface Params {
  event: FCEvent | SCFEvent;
  context: FCContext | SCFContext;
  slsType: SLSType;
}

function getPayload(slsType: SLSType, event: Params['event']) {
  return slsType === 'scf' ? (event as SCFEvent).Message : (event as FCEvent).payload;
}

async function getUpdateTrigger(
  slsType: SLSType,
  event: any,
  context: any,
): Promise<(...args) => any> {
  const caller =
    slsType === 'scf'
      ? (await import('./updateScfTrigger')).default
      : (await import('./updateFcTrigger')).default;
  return (...args) => caller(event, context, ...args);
}

export async function dailyHandle({ event, context, slsType }: Params) {
  const payload = getPayload(slsType, event),
    updateTrigger = await getUpdateTrigger(slsType, event, context);
  let message: { lastTime: string };
  try {
    message = JSON.parse(payload);
  } catch (error) {}

  if (message && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  return await dailyTasks(updateTrigger);
}

export async function liveHeartHandle({ event, context, slsType }: Params) {
  const payload = getPayload(slsType, event),
    updateTrigger = await getUpdateTrigger(slsType, event, context);
  let message: HeartSLSDateType & { lastTime: string };
  try {
    message = JSON.parse(payload);
  } catch (error) {}

  if (message && !message.d && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  const data = await liveHeartBySCF(payload);
  /**
   * 0 今日完成，不再需要执行
   * 1 等待继续下一轮心跳，可能一轮无法获取 24 个小心心，所以需要多轮
   * data 等待继续下次心跳，要 5 次心跳才能获取到小心心
   */
  if (data === 0) {
    // 明天再说
    await updateTrigger();
    return '今日完成';
  }

  if (data === 1) {
    await updateTrigger({ hn: { v: 0 }, d: [{ seq: { v: 0 } }] }, setCron(5_000, slsType));
    return '等待继续下一轮心跳';
  }
  await updateTrigger(data, setCron(62_000 - data.l * 1000, slsType));
  return '等待继续下次心跳';
}
