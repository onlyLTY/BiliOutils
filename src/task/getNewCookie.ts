import { TaskConfig } from '@/config/globalVar';
import { MS2DATE } from '@/constant';
import * as auth from '@/service/auth.service';
import { logger } from '@/utils';
import { readJsonFile, writeJsonFile } from '@/utils/file';
import { dirname, resolve } from 'path';

export default async function getNewCookie() {
  const day = TaskConfig.createCookieDay;
  if (!day || day < 1) {
    return false;
  }
  const btJonPath = getBtJonPath();
  if (!btJonPath) {
    return false;
  }
  const btJob = readJsonFile(btJonPath);
  if (!isNeedCreateCookie(btJob?.lastNewCookie, day)) {
    return;
  }
  const newCookie = await auth.getNewCookie(TaskConfig.cookie);
  if (!newCookie) {
    return;
  }
  TaskConfig.cookie = newCookie;
  logger.debug('cookie 使用新 cookie');
  writeJsonFile(btJonPath, {
    lastNewCookie: Date.now(),
  });
}

/**
 * 获取 bt_job.json 路径
 */
function getBtJonPath() {
  if (!process.env.__BT_CONFIG_PATH__) {
    return undefined;
  }
  const configDir = dirname(process.env.__BT_CONFIG_PATH__);
  return resolve(configDir, 'bt_jobs.json');
}

/**
 * 判断是否需要创建新 cookie
 * @param timestamp 上次运行时间
 * @param day 间隔天数
 */
function isNeedCreateCookie(timestamp: number, day: number) {
  if (!timestamp) {
    return true;
  }
  const dayDiff = (Date.now() - timestamp) / MS2DATE;
  return dayDiff > day;
}
