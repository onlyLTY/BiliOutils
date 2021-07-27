import {
  exchangeSilver2Coin,
  exchangeStatus,
  getMyWallet,
} from '../net/liveRequest';

/**
 * 银瓜子兑换硬币
 */
export default async function silver2Coin() {
  console.log('----【银瓜子兑换硬币】----');
  try {
    const { data, code, message } = await exchangeStatus();
    if (code != 0) {
      console.log('获取瓜子详情失败', message);
    }
    if (data.silver_2_coin_left === 0) {
      console.log('今日已兑换一次');
      // 700 是一次的价格
    } else if (data.silver < 700) {
      console.log('兑换失败,你瓜子不够了');
    } else {
      const { message } = await exchangeSilver2Coin();
      console.log(message);
      await getMyWallet();
    }
  } catch (error) {
    console.log('操作异常', error.message);
  }
}
