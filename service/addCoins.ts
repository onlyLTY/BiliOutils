import { addCoinForVideo } from '../net/videoRequest';
import { getAidBySpecialFollowing } from './getOneAid';
import { TaskModule } from '../globalVar';
import { apiDelay } from '../util';

export async function addCoins() {
  console.log('----【视频投币】----');
  if (!TaskModule.coinsTask) {
    console.log('跳过投币,今日已完成');
    return;
  }
  let i = 0;
  //判断需要投币的数量
  while (TaskModule.coinsTask) {
    const { data, msg } = await getAidBySpecialFollowing();
    if (msg === '0') {
      const { aid, title, author } = data;
      try {
        const coinData = await addCoinForVideo(aid, 1, 1);
        if (coinData.data) {
          TaskModule.coinsTask--;
          TaskModule.money--;
          i++;
          console.log(`给[${title}--up【${author}】]投币成功`);
        }
      } catch (error) {
        console.log('投币异常', error.message);
      }
    }
    await apiDelay();
  }
  console.log(`一共成功投币${i}颗`);
  console.log(`硬币还剩${TaskModule.money}颗`);
}
