import { offFunctions } from '../config/configOffFun';
import { apiDelay, logger, LogMessage } from '../utils';
import { sendMessage } from '@/utils/sendNotify';
import bili, { loginTask } from './index';

export async function dailyTasks<T = unknown>(
  cb?: (...arg: T[]) => Promise<unknown>,
  ...cbArg: T[]
) {
  LogMessage.value = '';
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
