import { DAILY_RUN_TIME, LOTTERY_EXCLUDE, LOTTERY_INCLUDE, LOTTERY_UP_BLACKLIST } from '@/constant';
import { cloneObject, getNewObject, deepMergeObject, arr2numArr } from '@/utils/pure';
import { getBiliJct, getUserId } from '../utils';
import { isArray } from '../utils/is';

type DefaultConfig = typeof defaultConfig;
export type TheConfig = Omit<DefaultConfig, keyof typeof compatibleMap>;

export const defaultConfig = {
  cookie: '',
  message: {
    email: {
      host: 'smtp.163.com',
      port: 465,
    },
    pushplusToken: process.env.PUSHPLUS_TOKEN,
    api: undefined,
  },
  function: {
    silver2Coin: true,
    liveSignTask: true,
    addCoins: true,
    mangaSign: false,
    shareAndWatch: true,
    supGroupSign: false,
    liveSendMessage: false,
    taskReward: true,
    charging: false,
    getVipPrivilege: false,
    giveGift: false,
    matchGame: false,
    liveLottery: false,
    liveRedPack: false,
    liveIntimacy: false,
  },
  /** 调用api时的延迟(单位s),默认2s至6s */
  apiDelay: [2, 6],
  /**【可选】用户代理(浏览器) */
  userAgent: '',
  dailyRunTime: DAILY_RUN_TIME,
  // 老的配置
  // 全部是 undefined 是为了更好的合并
  targetLevel: undefined,
  stayCoins: undefined,
  targetCoins: undefined,
  customizeUp: undefined,
  giftUp: undefined,
  coinRetryNum: undefined,
  chargeUpId: undefined,
  chargePresetTime: undefined,
  matchCoins: undefined,
  matchSelection: undefined,
  matchDiff: undefined,
  // 新的配置方式
  match: {
    /** 压硬币数量 */
    coins: 5,
    /** 压硬币规则 大于0 是正压，小于反压 */
    selection: 1,
    /** 比赛赔率差距需要大于多少才压 */
    diff: 0,
  },
  charge: {
    /** 充电的 up 默认自己 */
    mid: 0,
    /** 充电预设时间，哪一天？ */
    presetTime: 31,
  },
  gift: {
    /** 自定义投喂礼物用户列表 */
    mids: [],
  },
  coin: {
    /** 自定义高优先级用户列表 */
    customizeUp: [],
    /** 投币操作重试次数 默认 4 */
    retryNum: 4,
    /** 目标等级 默认6级 */
    targetLevel: 6,
    /** 最低剩余硬币数,默认0 */
    stayCoins: 0,
    /** 预计投币数,默认5 */
    targetCoins: 5,
  },
  sls: {
    name: '',
    description: '',
    region: 'ap-chengdu',
    dailyRunTime: DAILY_RUN_TIME,
  },
  lottery: {
    /** 天选屏蔽奖品 */
    excludeAward: LOTTERY_EXCLUDE,
    /** 天选包含奖品 */
    includeAward: LOTTERY_INCLUDE,
    /** 黑名单 */
    blackUid: LOTTERY_UP_BLACKLIST,
    /** 是否将天选时刻关注 UP 移动到分组 */
    isMoveTag: false,
    /** 天选时刻关注 UP 移动到分组 */
    moveTag: '天选时刻',
    /** 天选获取的直播页数 */
    pageNum: 0,
    /** 关注回复处理方式  */
    actFollowMsg: 'delete',
  },
  intimacy: {
    // 直播弹幕
    liveSendMessage: true,
    // 分享直播间
    liveShare: true,
    // 点赞直播间
    liveLike: true,
    // 白名单
    whiteList: [],
    // 黑名单
    blackList: [],
  },
  BILIJCT: '',
  USERID: 0,
};

export function getDefaultConfig() {
  return cloneObject(defaultConfig, true);
}

export function mergeConfig(config: RecursivePartial<DefaultConfig>) {
  return configValueHandle(configHandle(deepMergeObject(getDefaultConfig(), config)));
}

/**
 * 兼容映射
 */
const compatibleMap = {
  targetLevel: ['coin', 'targetLevel'],
  stayCoins: ['coin', 'stayCoins'],
  targetCoins: ['coin', 'targetCoins'],
  customizeUp: ['coin', 'customizeUp'],
  coinRetryNum: ['coin', 'retryNum'],
  giftUp: ['gift', 'mids'],
  chargeUpId: ['charge', 'mid'],
  chargePresetTime: ['charge', 'presetTime'],
  matchCoins: ['match', 'coins'],
  matchSelection: ['match', 'selection'],
  matchDiff: ['match', 'diff'],
};

/**
 * 旧配置兼容处理
 * @param config
 */
function configHandle(config: DefaultConfig): TheConfig {
  Object.keys(compatibleMap).forEach(oldKey => {
    if (config[oldKey] !== undefined) {
      const [newKey, newKey2] = compatibleMap[oldKey];
      config[newKey] = getNewObject(config[newKey]);
      config[newKey][newKey2] = config[oldKey];
    }
    delete config[oldKey];
  });
  return config;
}

/**
 * 配置默认值处理
 * @param config
 */
function configValueHandle(config: TheConfig) {
  setConstValue(config);
  const { coin, gift, charge } = config;
  // TODO: 兼容旧配置
  if (!isArray(config.apiDelay)) {
    config.apiDelay = [Number(config.apiDelay)];
  } else {
    config.apiDelay = arr2numArr(config.apiDelay);
  }

  coin.customizeUp = arr2numArr(coin.customizeUp);
  gift.mids = arr2numArr(gift.mids);

  /**
   * 部分默认值处理
   */
  if (gift.mids.length === 0) {
    gift.mids = coin.customizeUp;
  }
  if (!charge.mid) {
    charge.mid = config.USERID;
  }

  return config;
}

function setConstValue(config: TheConfig) {
  config.BILIJCT = getBiliJct(config.cookie);
  config.USERID = getUserId(config.cookie);
  return config;
}
