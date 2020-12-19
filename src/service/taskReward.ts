import {
  getDailyTaskRewardInfo,
  getDonateCoinExp,
} from '../net/userInfoRequest';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { apiDelay } from '../utils';

export default async function taskReward() {
  console.log('----【每日任务完成情况】----');
  try {
    const { data, message, code } = await getDailyTaskRewardInfo();
    await apiDelay();
    const { data: coinExp } = await getDonateCoinExp(); //获取更精准的已投币数
    if (code != 0) {
      console.log('状态获取失败: ', code, message);
      return;
    }

    /**还需投币 */
    const targetCoinsDiff = TaskModule.money - TaskConfig.BILI_STAY_COINS;
    let coins = 0;
    if (TaskModule.coinsTask === 0) {
      //根据经验设置的目标
      console.log(`今日投币获取经验: ${coinExp}，还需投币0颗，经验够了,不想投了`);
    } else if (targetCoinsDiff <= 0) {
      //剩余硬币比需要保留的少
      console.log(`今日投币获取经验: ${coinExp}，还需投币0颗，硬币不够了,不投币了`);
    } else if (targetCoinsDiff < TaskModule.coinsTask) {
      //确保最后一次投币精准降落到设置的需要保留硬币数上
      //(狗头保命)
      coins = TaskModule.coinsTask - targetCoinsDiff;
      console.log(
        `投币获取经验: ${coinExp}, 还需投币数量: ${coins}颗;(目标${TaskModule.coinsTask}颗，忽略部分投币)`
      );
    } else {
      coins = TaskModule.coinsTask - coinExp / 10;
      console.log(
        `投币获取经验: ${coinExp}, 还需投币数量: ${coins}颗;(目标${TaskModule.coinsTask}颗)`
      );
    }

    TaskModule.coinsTask = coins;

    console.log(`每日分享: ${data.share ? '已完成' : '[未完成]'}`);
    console.log(`每日播放: ${data.watch ? '已完成' : '[未完成]'}`);

    TaskModule.share = data.share;
    TaskModule.watch = data.watch;
  } catch (error) {
    console.log('状态获取异常', error.message);
  }
}
