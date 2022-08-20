import { getPRCDate } from '../pure';
import { dailyTasks } from '@/task/dailyTask';
import type { FCContext, FCEvent } from '@/types/fc';
import type { SCFContext, SCFEvent, SLSType } from '@/types';
import { JSON5 } from '../json5';

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
): Promise<(...args: any) => any> {
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
    if (payload) {
      message = JSON5.parse(payload);
    }
  } catch (error) {}

  if (message! && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  return await dailyTasks(updateTrigger);
}
