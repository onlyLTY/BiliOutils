import * as net from '@/net/daily-battery.request';
import { apiDelay, logger } from '@/utils';
import { sendOneMessage } from './intimacy.service';

/**
 * 获取任务进度
 */
async function getTaskStatus() {
  try {
    const { code, message, data } = await net.getUserTaskProgress();
    if (code !== 0) {
      logger.warn(`获取任务进度失败：${code}-${message}`);
      return -1;
    }
    if (data.is_surplus === -1 || data.target === 0) {
      logger.info('账号无法完成该任务，故跳过');
      return -2;
    }
    const { status, progress } = data;
    if (status === 0 || status === 1) {
      logger.debug(`任务进度：${progress}`);
      return progress + 10;
    }
    return status;
  } catch (error) {
    logger.error('获取任务进度异常', error);
    return -1;
  }
}

/**
 * 领取任务奖励
 */
async function receiveTaskReward() {
  try {
    const { code, message } = await net.receiveTaskReward();
    if (code !== 0) {
      logger.warn(`领取任务奖励失败：${code}-${message}`);
      return false;
    }
    logger.info('领取任务奖励成功');
    return true;
  } catch (error) {
    logger.error('领取任务奖励异常', error);
    return false;
  }
}

/**
 * 每日任务
 */
async function dailyBattery() {
  const status = await getTaskStatus();
  switch (status) {
    case -2: {
      return true;
    }
    case -1: {
      return false;
    }
    case 2: {
      // 领取任务奖励
      return await receiveTaskReward();
    }
    case 3: {
      logger.info('任务已完成');
      return true;
    }
    default: {
      // lol 的直播间发一条弹幕
      logger.debug(`发送弹幕`);
      for (let index = 0; index < 15 - status; index++) {
        await sendOneMessage(7734200, 'bili官方');
        await apiDelay(10000, 15000);
      }
      return false;
    }
  }
}

export async function dailyBatteryService() {
  for (let index = 0; index < 2; index++) {
    const result = await dailyBattery();
    if (result) return;
    await apiDelay();
  }
}
