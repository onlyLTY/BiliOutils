import { getDonateCoinExp } from '../net/user-info.request';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { apiDelay, logger } from '../utils';
import { AidInfo, coinToId, CoinToIdParams, getAidByByPriority } from '../service/coin.service';

interface State {
  eCount: number;
  num: number;
  prevCode: number;
  fillCount: number;
  priority: number;
}

export default async function addCoins() {
  logger.info('----【视频投币】----');
  if (!TaskModule.coinsTask) {
    logger.info('跳过投币，今日已完成');
    return;
  }

  const state: State = { eCount: 0, num: 0, prevCode: 0, fillCount: 0, priority: 0 };
  let isReturn = false;
  // 判断需要投币的数量
  while (TaskModule.coinsTask > 0 && !isReturn && state.eCount < 5 && state.num < 5) {
    isReturn = await coinHandle(state);
  }

  if (state.eCount >= 5) logger.info(`出现异常/错误5次，自动退出投币`);
  logger.info(`一共成功投币${state.num}颗`);
  logger.info(`硬币还剩${TaskModule.money}颗`);
}

/**
 * 进行投币
 */
async function coinHandle(state: State) {
  await setCoinsTask();
  if (TaskModule.coinsTask <= 0 || TaskModule.money <= 0) {
    return true;
  }
  //这个函数不会报错的
  const { data, msg } = await getAidByByPriority(state.priority);
  if (!data?.id || msg != '0') {
    state.eCount++;
    return false;
  }

  await apiDelay();
  return await coinToIdOnce(data, state);
}

/**
 * 设置还需要投币的数量
 */
async function setCoinsTask() {
  try {
    const { data: coinExp, code } = await getDonateCoinExp();
    if (code == 0) {
      const coins = TaskConfig.coin.targetCoins - coinExp / 10;
      TaskModule.coinsTask = coins > 0 ? coins : 0;
    }
  } catch (error) {}
}

/**
 * 进行一次投币
 */
async function coinToIdOnce(data: AidInfo['data'], state: State) {
  const { id, title, author, coinType, mid } = data;
  try {
    const coinData = await coinToId({ id, coinType, mid } as CoinToIdParams);
    if (coinData.code === 0) {
      TaskModule.money--;
      TaskModule.coinsTask--;
      state.num++;
      logger.info(`给[${title}--up【${author}】]投币成功`);
    } else if (coinData.code === 34005) {
      state.fillCount++;
      logger.verbose(`当前稿件[${id}]不能再投币了`);
      if (state.fillCount >= 3) {
        logger.warn(`自定义用户组投币似乎没有币可投了`);
        state.priority++;
      }
    } else if (coinData.code === -111 || coinData.code === -104) {
      logger.warn(`${id} ${coinData.message} 无法继续进行投币`);
      return true;
    } else {
      state.eCount++;
      logger.warn(`给${id}投币失败 ${coinData.code} ${coinData.message}`);
      // 如果重复错误就直接退出
      if (state.prevCode === coinData.code) {
        return true;
      }
      state.prevCode = coinData.code;
    }
  } catch (error) {
    state.eCount++;
    logger.error(`投币异常 ${error.message}`);
  } finally {
    await apiDelay(1500);
  }
  return false;
}
