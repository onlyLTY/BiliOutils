import type { FCCallback, FCContext, FCEvent } from './types/fc';
import { defLogger } from './utils/log/def';
import { JSON5 } from './utils/json5';
import { useVm } from './vm/useVm';

/**
 * 公告
 */
const notice = async (msg?: string) => {
  defLogger.info(msg || `阿里云 FC 测试ing`);
};

export async function dailyMain(event: FCEvent, context: FCContext) {
  notice();
  const { dailyHandle } = await import('./utils/serverless');
  return await dailyHandle({
    event,
    context,
    slsType: 'fc',
  });
}

export async function handler(event: Buffer, context: FCContext, callback: FCCallback) {
  const isGetCode = await useVm('vm.fc.js', { event, context });
  if (isGetCode) return callback(VMThis.error as Error, VMThis.message);
  try {
    const eventJson: FCEvent = JSON5.parse(event.toString());
    let isReturn = false;
    if (eventJson.payload) {
      isReturn = await runTasks(eventJson.payload);
    }
    if (isReturn) {
      callback(null, 'success');
      return;
    }
    const message = await dailyMain(eventJson, context);
    callback(null, message);
  } catch (error) {
    callback(error);
  }
}

export async function runTasks(payload: string) {
  try {
    const { runInputBiliTask } = await import('./task');
    const payloadJson = JSON5.parse(payload);
    if (payloadJson.task) {
      await runInputBiliTask(payloadJson.task);
      return true;
    }
  } catch {}
  return false;
}
