import { getDailyTaskRewardInfo } from '../net/user-info.request';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { logger } from '../utils/log';
import { getTodayCoinNum } from '@/service/coin.service';

/**
 * 投币检测
 */
export async function checkCoin() {
  const coinNum = await getTodayCoinNum();
  /** 剩余硬币数量 */
  const targetCoinsDiff = TaskModule.money - TaskConfig.coin.stayCoins;
  let coins = 0;
  if (TaskModule.coinsTask === 0) {
    // 根据经验设置的目标
    logger.info(`今日投币数量：${coinNum}，还需投币0颗，经验够了，不想投了`);
  } else if (targetCoinsDiff <= 0) {
    // 剩余硬币比需要保留的少
    logger.info(`今日投币数量：${coinNum}，还需投币0颗，硬币不够了，不投币了`);
  } else if (targetCoinsDiff < TaskModule.coinsTask) {
    coins = targetCoinsDiff;
    logger.info(
      `投币数量: ${coinNum}，还能投币数量: ${targetCoinsDiff}颗;(目标${TaskModule.coinsTask}颗，忽略部分投币)`,
    );
  } else {
    coins = TaskModule.coinsTask - coinNum;
    logger.info(`投币数量：${coinNum}，还需投币数量: ${coins}颗;(目标${TaskModule.coinsTask}颗)`);
  }
  TaskModule.coinsTask = coins;
}

/**
 * 播放和分享检测
 */
export async function checkShareAndWatch() {
  try {
    const { data, message, code } = await getDailyTaskRewardInfo();
    if (code != 0) {
      logger.warn(`状态获取失败: ${code} ${message}`);
      return;
    }
    const { share, watch } = data;
    logger.info(`每日分享: ${share ? '已完成' : '[未完成]'}`);
    logger.info(`每日播放: ${watch ? '已完成' : '[未完成]'}`);

    TaskModule.share = share;
    TaskModule.watch = watch;
  } catch (error) {
    logger.error(`每日分享/播放检测出现异常: ${error.message}`);
  }
}
