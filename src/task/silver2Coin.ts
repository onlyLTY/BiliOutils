import { logger } from '../utils/log';
import { exchangeSilver2Coin, exchangeStatus, getMyWallet } from '../net/liveRequest';

/**
 * 银瓜子兑换硬币
 */
export default async function silver2Coin() {
  logger.info('----【银瓜子兑换硬币】----');
  try {
    const { data, code, message } = await exchangeStatus();
    if (code != 0) {
      logger.info(`获取瓜子详情失败 ${message}`);
    }
    if (data.silver_2_coin_left === 0) {
      logger.info('今日已兑换一次');
      // 700 是一次的价格
    } else if (data.silver < 700) {
      logger.info('兑换失败，你瓜子不够了');
    } else {
      const { message } = await exchangeSilver2Coin();
      logger.info(message);
      await getMyWallet();
    }
  } catch (error) {
    logger.info(`操作异常 ${error.message}`);
  }
}
