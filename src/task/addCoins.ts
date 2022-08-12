import { TaskConfig, TaskModule } from '../config/globalVar';
import { apiDelay, logger } from '../utils';
import {
  aidFuncName,
  AidInfo,
  coinToId,
  CoinToIdParams,
  getAidByByPriority,
  getContributionCoin,
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
  // 是否刷新硬币数量
  refresh: boolean;
}

type IdInfo = Defined<AidInfo['data']>;

let MAX_COUNT = 5;

function initMaxCount() {
  // 突破数量限制
  if (!TaskConfig.limit.coins5) {
    MAX_COUNT = TaskModule.coinsTask;
    return;
  }
  MAX_COUNT = TaskModule.coinsTask > 5 ? 5 : TaskModule.coinsTask;
}

export default async function addCoins() {
  logger.info('----【每日投币】----');
  await checkCoin();
  if (!TaskModule.coinsTask) {
    logger.info('跳过投币，今日已完成');
    return;
  }
  const state: State = {
    eCount: 0,
    num: 0,
    prevCode: -999,
    fillCount: 0,
    prevFillId: 0,
    eAidCount: 0,
    refresh: true,
  };
  let isReturn = false;
  initMaxCount();
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
  state.refresh && (await setCoinsTask(state.num));
  state.refresh = false;
  if (TaskModule.coinsTask < 1 || TaskModule.money < 1) {
    return true;
  }
  // 这个函数不会报错的
  const { data, code, msg } = await getAidByByPriority();
  if (code === 1) {
    aidFuncName.next();
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
    aidFuncName.next();
    return false;
  }

  // 保存 id
  if (!TaskModule.videoAid && data.coinType === '视频') {
    TaskModule.videoAid = data.id;
  }

  await apiDelay();
  state.refresh = true;
  return await coinToIdOnce(data, state);
}

/**
 * 设置还需要投币的数量
 */
async function setCoinsTask(num: number) {
  const coinNum = await getTodayCoinNum(num);
  const coins = TaskConfig.coin.targetCoins - coinNum;
  TaskModule.coinsTask = coins > 0 ? coins : 0;
}

/**
 * 获取本次投币数量
 * @param contributionCoin 稿件已投币数量
 * @param copyright 是否为原创
 */
function getCoin(contributionCoin: number, coin: number, copyright?: string) {
  // 先判断一下，防止直接 return 1
  if (contributionCoin >= 2) return 0;
  if (TaskModule.coinsTask === 1 || MAX_COUNT - coin === 1) return 1;
  if (copyright === '2') return 1 - contributionCoin;
  return 2 - contributionCoin;
}

/**
 * 进行一次投币
 */
async function coinToIdOnce(data: IdInfo, state: State) {
  const { id, coinType, mid, copyright } = data;
  const contributionCoin = await getContributionCoin(coinType as any, id);
  const coin = getCoin(contributionCoin, state.num, copyright);
  if (coin < 1) return coinFilledHandle(id, state);
  try {
    const coinData = await coinToId({ id, coinType, mid, coin } as CoinToIdParams);
    if (!id) {
      state.eCount++;
      return false;
    }
    switch (coinData.code) {
      case 0:
        return coinSuccessHandle(state, data, coin);
      case 34005:
        return coinFilledHandle(id, state);
      case -104:
      case -111:
        return coinErrorHandle(id, coinData);
      default:
        return coinOtherHandle(state, data, coinData);
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
    aidFuncName.next();
  }
  return false;
}

/**
 * 投币成功处理
 */
function coinSuccessHandle(state: State, { author, id, coinType }: IdInfo, coin: number) {
  TaskModule.money -= coin;
  TaskModule.coinsTask -= coin;
  state.num += coin;
  logger.info(`给${aidFuncName.title}【${author}】的${coinType}：${id} 投币${coin}颗`);
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
function coinOtherHandle(state: State, { id, coinType }: IdInfo, coinData: CoinData) {
  state.eCount++;
  logger.warn(
    `给${aidFuncName.title}的${coinType} ${id} 投币失败 ${coinData.code} ${coinData.message}`,
  );
  // 如果重复错误就直接退出
  if (state.prevCode === coinData.code) {
    return true;
  }
  state.prevCode = coinData.code;
  return false;
}
