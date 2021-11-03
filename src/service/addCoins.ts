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
  let i = 0,
    eCount = 0,
    prevCode;
  //判断需要投币的数量
  while (TaskModule.coinsTask && eCount < 5) {
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
    if (TaskModule.coinsTask <= 0 || TaskModule.money <= 0) break;
    //这个函数不会报错的
    const { data, msg } = await getAidByByPriority();
    if (!data?.aid || msg != '0') {
      eCount++;
      continue;
    }

    await apiDelay();
    const { aid, title, author } = data;
    try {
      const coinData = await addCoinForVideo(aid, 1, 1);
      if (coinData.code == 0) {
        TaskModule.money--;
        TaskModule.coinsTask--;
        i++;
        console.log(`给[${title}--up【${author}】]投币成功`);
      } else {
        eCount++;
        if (coinData.code === -111 || coinData.code === -104) {
          console.log(aid, coinData.message, '无法继续进行投币');
          break;
        }
        console.log('给up投币失败 ', coinData.code, coinData.message);
        // 如果重复错误就直接退出
        if (prevCode === coinData.code) {
          break;
        }
        prevCode = coinData.code;
      }
    } catch (error) {
      eCount++;
      console.log('投币异常 ', error.message);
    } finally {
      await apiDelay(1500);
    }
  }
  if (eCount >= 5) console.log(`出现异常/错误5次，自动退出投币`);
  console.log(`一共成功投币${i}颗`);
  console.log(`硬币还剩${TaskModule.money}颗`);
}
