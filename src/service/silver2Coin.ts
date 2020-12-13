import { exchangeSilver2Coin, exchangeStatus } from '../net/liveRequest';

/**
 * 银瓜子兑换硬币
 */
export default async function silver2Coin() {
  console.log('----【银瓜子兑换硬币】----');
  try {
    const { data, code, msg } = await exchangeStatus();
    if (code != 0) {
      console.log('获取瓜子详情失败', msg);
    }
    if (data.silver > data.silver_2_coin_left) {
      const { msg } = await exchangeSilver2Coin();
      console.log(msg);
    } else {
      console.log('兑换失败,你瓜子不够了');
    }
  } catch (error) {
    console.log('操作异常', error.message);
  }
}
