import type { FCContext, FCEvent } from '@/types/fc';
import type { SCFContext, SCFEvent, SLSType } from '@/types';
import type { SlSOptions } from '@/types/sls';
import { getPRCDate } from '../pure';
import { dailyTasks } from '@/task/dailyTask';
import { JSON5 } from '../json5';

interface Params {
  event: FCEvent | SCFEvent;
  context: FCContext | SCFContext;
  slsType: SLSType;
}

function getPayload(slsType: SLSType, event: Params['event']) {
  return slsType === 'scf' ? (event as SCFEvent).Message : (event as FCEvent).payload;
}

export async function getUpdateTrigger(
  slsType: SLSType,
  event: any,
  context: any,
): Promise<(slsOptions?: SlSOptions) => Promise<boolean>> {
  const caller =
    slsType === 'scf'
      ? (await import('./updateScfTrigger')).default
      : (await import('./updateFcTrigger')).default;
  return slsOptions => caller(event, context, slsOptions);
}

class DailyHandler {
  event: FCEvent | SCFEvent;
  context: SCFContext | FCContext;
  slsType: SLSType;
  payload?: string;

  init({ event, context, slsType }: Params) {
    this.context = context;
    this.event = event;
    this.slsType = slsType;
    this.payload = getPayload(slsType, event);

    return this;
  }

  async run() {
    let message: { lastTime: string };
    try {
      if (this.payload) {
        message = JSON5.parse(this.payload);
      }
    } catch {}

    if (message! && message.lastTime === getPRCDate().getDate().toString()) {
      return '今日重复执行';
    }

    const updateTrigger = await getUpdateTrigger(this.slsType, this.event, this.context);
    return await dailyTasks(updateTrigger);
  }
}

export const dailyHandler = new DailyHandler();
