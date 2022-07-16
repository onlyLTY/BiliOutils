import {
  DAILY_RUN_TIME,
  LOTTERY_EXCLUDE,
  LOTTERY_INCLUDE,
  LOTTERY_UP_BLACKLIST,
  TODAY_MAX_FEED,
} from '@/constant';
import { cloneObject, getNewObject, deepMergeObject, arr2numArr } from '@/utils/pure';
import { getBiliJct, getUserId } from '../utils/cookie';
import { isArray, isString } from '../utils/is';

type DefaultConfig = typeof defaultConfig;
export type TheConfig = Omit<DefaultConfig, keyof typeof compatibleMap>;

export const defaultConfig = {
  cookie: '',
  accessKey: '',
  message: {
    br: '\n',
    email: {
      host: 'smtp.163.com',
      port: 465,
    },
    pushplusToken: process.env.PUSHPLUS_TOKEN?.trim(),
    api: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      url: '',
      proxy: {
        host: '',
        port: 443,
        auth: '',
      },
      data: {},
    },
  },
  function: {
    // 瓜子兑换硬币
    silver2Coin: true,
    // 直播签到
    liveSignTask: true,
    // 投币
    addCoins: true,
    // 漫画签到
    mangaSign: false,
    // 分享和观看
    shareAndWatch: true,
    // 应援团签到
    supGroupSign: false,
    // 直播发送弹幕
    liveSendMessage: false,
    // 充电
    charging: false,
    // 获取 vip 权益
    getVipPrivilege: false,
    // 直播赠送礼物
    giveGift: false,
    // 赛事竞猜
    matchGame: false,
    // 直播天选时刻
    liveLottery: false,
    // 直播天选红包
    liveRedPack: false,
    // 批量取关
    batchUnfollow: false,
    // 粉丝牌等级
    liveIntimacy: false,
    // 漫画任务
    mangaTask: false,
    // 大会员积分
    bigPoint: false,
    liveFamine: false,
    // 风纪委员
    judgement: false,
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
    presetTime: [10, 20],
  },
  gift: {
    /** 自定义投喂礼物用户列表 */
    mids: [] as number[],
  },
  coin: {
    /** 自定义高优先级用户列表 */
    customizeUp: [] as number[],
    /** 目标等级 默认6级 */
    targetLevel: 6,
    /** 最低剩余硬币数,默认0 */
    stayCoins: 0,
    /** 预计投币数,默认5 */
    targetCoins: 5,
    /** 如果获取今日已投币数量失败，假设已投币数量为多少 */
    todayCoins: 0,
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
    isMoveTag: true,
    /** 天选时刻关注 UP 移动到分组 */
    moveTag: '天选时刻',
    /** 天选获取的直播页数 */
    pageNum: 2,
    /** 关注回复处理方式  */
    actFollowMsg: 'read',
    /** 扫描关注的用户 */
    scanFollow: undefined,
    /** 跳过需要关注的天选 */
    skipNeedFollow: false,
  },
  redPack: {},
  intimacy: {
    // 直播弹幕
    liveSendMessage: true,
    // 点赞直播间
    liveLike: true,
    // 30 分钟直播心跳
    liveHeart: false,
    // 白名单
    whiteList: [],
    // 黑名单
    blackList: [],
    // 每日亲密度上限 （系统 1500）
    limitFeed: TODAY_MAX_FEED,
  },
  jury: {
    mode: 1,
    once: true,
    vote: [0, 1],
    opinionMin: 3,
  },
  manga: {
    // 签到
    sign: true,
    // 购买漫画
    buy: false,
    // 购买漫画 id（优先级高）
    mc: [] as number[],
    // 购买漫画名称（优先级中）
    name: [] as string[],
    // 购买追漫（优先级低）
    love: true,
    // 执行购买漫画间隔时间（单位天）
    buyInterval: 2,
    // 星期几执行购买漫画
    buyWeek: [],
    // 商城兑换漫读券数量
    exchangeCouponNum: 0,
  },
  activity: {
    liveFamineTime: 400,
  },
  bigPoint: {
    // 是否重试
    isRetry: true,
    // 是否观看视频
    isWatch: true,
    // 自定义观看视频的章节
    epids: [] as number[],
  },
  BILIJCT: '',
  USERID: 0,
};

export function getDefaultConfig() {
  return cloneObject(defaultConfig, true);
}

export function mergeConfig(config: RecursivePartial<DefaultConfig>) {
  return configValueHandle(
    oldConfigHandle(deepMergeObject(getDefaultConfig(), beforeMergeConfig(config))),
  );
}

/**
 * 兼容映射
 */
const compatibleMap = {
  targetLevel: ['coin', 'targetLevel'],
  stayCoins: ['coin', 'stayCoins'],
  targetCoins: ['coin', 'targetCoins'],
  customizeUp: ['coin', 'customizeUp'],
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
function oldConfigHandle(config: DefaultConfig): TheConfig {
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
  const { coin, gift, charge, match } = config;
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
  if (coin.targetCoins > 5) {
    coin.targetCoins = 5;
  }
  if (match.coins > 10) {
    match.coins = 10;
  }

  return config;
}

function setConstValue(config: TheConfig) {
  config.BILIJCT = getBiliJct(config.cookie);
  config.USERID = getUserId(config.cookie);
  return config;
}

/**
 * 合并前处理用户配置
 * @param config
 */
function beforeMergeConfig(config: RecursivePartial<DefaultConfig>) {
  // 需要注意用户配置可能没有定义各种配置项
  const { message } = config;
  if (message && isString(message.api)) {
    const url = message.api;
    message.api = cloneObject(defaultConfig.message.api, true);
    message.api.url = url;
    message.api.method = 'GET';
  }
  return config;
}
