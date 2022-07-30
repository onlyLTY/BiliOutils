import { TaskConfig, TaskModule } from '../config/globalVar';
import { apiDelay, logger } from '../utils';
import {
  AidInfo,
  coinToId,
  CoinToIdParams,
  getAidByByPriority,
  getTodayCoinNum,
} from '../service/coin.service';
import { checkCoin } from '@/service/reward.service';

interface State {
  // 投币错误次数
  eCount: number;
  // 成功投币次数
  num: number;
  // 上一次错误码
  prevCode: number;
  // 遇到已经投满稿件的次数
  fillCount: number;
  // 上一个已经投满的稿件id
  prevFillId: number;
  // 获取稿件错误次数
  eAidCount: number;
}

export default async function addCoins() {
  logger.info('----【视频投币】----');
  await checkCoin();
  if (!TaskModule.coinsTask) {
    logger.info('跳过投币，今日已完成');
    return;
  }
  const state: State = {
    eCount: 0,
    num: 0,
    prevCode: undefined,
    fillCount: 0,
    prevFillId: undefined,
    eAidCount: 0,
  };
  let isReturn = false,
    MAX_COUNT = 5;
  // 突破数量限制
  if (!TaskConfig.limit.coins5) {
    MAX_COUNT = TaskModule.coinsTask;
  }
  // 判断需要投币的数量
  while (TaskModule.coinsTask > 0 && !isReturn && state.eCount < 5 && state.num < MAX_COUNT) {
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
  const { data, code, msg } = await getAidByByPriority();
  if (code === 1) {
    TaskModule.currentStartFun++;
    return false;
  }

  if (!data || !data.id || code !== 0) {
    msg && logger.debug(msg);
    state.eAidCount++;
    if (state.eAidCount >= 10) {
      logger.warn(`获取稿件错误次数超过 10 次，自动退出投币`);
      return true;
    }
    return false;
  }

  // 如果投币满的稿件再次被获取到，则直接换下一个等级获取
  if (state.prevFillId === data.id) {
    TaskModule.currentStartFun++;
    return false;
  }

  await apiDelay();
  return await coinToIdOnce(data, state);
}

/**
 * 设置还需要投币的数量
 */
async function setCoinsTask() {
  let coinNum = await getTodayCoinNum();
  coinNum ||= TaskConfig.coin.todayCoins;
  const coins = TaskConfig.coin.targetCoins - coinNum;
  TaskModule.coinsTask = coins > 0 ? coins : 0;
}

/**
 * 进行一次投币
 */
async function coinToIdOnce(data: AidInfo['data'], state: State) {
  const { id, coinType, mid } = data;
  try {
    const coinData = await coinToId({ id, coinType, mid } as CoinToIdParams);
    switch (coinData.code) {
      case 0:
        return coinSuccessHandle(state, data);
      case 34005:
        return coinFilledHandle(id, state);
      case -104:
      case -111:
        return coinErrorHandle(id, coinData);
      default:
        return coinOtherHandle(id, state, coinData);
    }
  } catch (error) {
    state.eCount++;
    logger.error(`投币异常 ${error.message}`);
  }
  return false;
}

/**
 * 稿件不允许投币处理
 */
function coinFilledHandle(id: number, state: State) {
  state.fillCount++;
  state.prevFillId = id;
  logger.verbose(`当前稿件[${id}]不能再投币了`);
  if (state.fillCount >= 3) {
    logger.warn(`该类型的用户组似乎没有币可投了`);
    state.fillCount = 0;
    TaskModule.currentStartFun++;
  }
  return false;
}

/**
 * 投币成功处理
 */
function coinSuccessHandle(state: State, { title, author }: AidInfo['data']) {
  TaskModule.money--;
  TaskModule.coinsTask--;
  state.num++;
  logger.info(`给[ ${title}--up【${author}】]投币成功`);
  return false;
}

type CoinData = {
  code: number;
  message: any;
};

/**
 * 严重错误处理
 */
function coinErrorHandle(id: number, coinData: CoinData) {
  logger.warn(`${id} ${coinData.message} 无法继续进行投币`);
  return true;
}

/**
 * 其他错误处理
 */
function coinOtherHandle(id: number, state: State, coinData: CoinData) {
  state.eCount++;
  logger.warn(`给${id}投币失败 ${coinData.code} ${coinData.message}`);
  // 如果重复错误就直接退出
  if (state.prevCode === coinData.code) {
    return true;
  }
  state.prevCode = coinData.code;
  return false;
}
