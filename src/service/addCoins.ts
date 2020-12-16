import { addCoinForVideo } from '../net/videoRequest';
import { getAidByByPriority } from './getOneAid';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { apiDelay } from '../utils';
import { getDonateCoinExp } from '../net/userInfoRequest';

export default async function addCoins() {
  console.log('----【视频投币】----');
  if (!TaskModule.coinsTask) {
    console.log('跳过投币,今日已完成');
    return;
  }
  let i = 0;
  //判断需要投币的数量
  while (TaskModule.coinsTask) {
    /**
     * 增加投币数据的稳定性,同时执行两个脚本也可能保持正常的投币数
     * 为啥会同时执行两个?不知道,可能我脑子有问题吧(狗头)
     */
    try {
      const { data: coinExp, code } = await getDonateCoinExp();
      if (code == 0) {
        let coins = TaskConfig.BILI_TARGET_COINS - coinExp / 10;
        TaskModule.coinsTask = coins > 0 ? coins : 0;
      }
    } catch (error) {}
    if (TaskModule.coinsTask <= 0) break;
    //这个函数不会报错的
    const { data, msg } = await getAidByByPriority();
    await apiDelay();
    if (msg === '0') {
      const { aid, title, author } = data;
      try {
        const coinData = await addCoinForVideo(aid, 1, 1);
        if (coinData.code == 0) {
          TaskModule.money--;
          TaskModule.coinsTask--;
          i++;
          console.log(`给[${title}--up【${author}】]投币成功`);
        }
      } catch (error) {
        console.log('投币异常', error.message);
      } finally {
        await apiDelay(1500);
      }
    }
  }
  console.log(`一共成功投币${i}颗`);
  console.log(`硬币还剩${TaskModule.money}颗`);
}
