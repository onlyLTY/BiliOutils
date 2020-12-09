import {
  getDailyTaskRewardInfo,
  getDonateCoinExp,
} from '../net/userInfoRequest';
import { TaskConfig, TaskModule } from '../globalVar';
import { apiDelay } from '../util';

export async function taskReward() {
  console.log('----【每日任务完成情况】----');
  try {
    const { data, message, code } = await getDailyTaskRewardInfo();
    await apiDelay();
    const { data: coinExp } = await getDonateCoinExp(); //获取更精准的已投币数
    if (code === 0) {
      /**还需投币 */
      const coins = TaskConfig.TARGET_COINS - coinExp / 10;

      console.log(
        `投币获取经验: ${coinExp}, 还需投币数量: ${coins}颗;(目标${TaskConfig.TARGET_COINS}颗)`
      );
      console.log(`每日分享: ${data.share ? '已完成' : '[未完成]'}`);
      console.log(`每日播放: ${data.watch ? '已完成' : '[未完成]'}`);

      TaskModule.coinsTask = coins;
      TaskModule.share = data.share;
      TaskModule.watch = data.watch;
    } else {
      console.log('状态获取失败: ', message);
    }
  } catch (error) {
    console.log('状态获取异常', error.message);
  }
}
