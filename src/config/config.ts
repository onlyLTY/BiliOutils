import {
  DAILY_RUN_TIME,
  HEART_RUN_TIME,
  LOTTERY_EXCLUDE,
  LOTTERY_INCLUDE,
  LOTTERY_UP_BLACKLIST,
} from '@/constant';

export const defaultConfig = {
  cookie: '',
  message: {
    email: {},
    pushplusToken: process.env.PUSHPLUS_TOKEN,
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
  apiDelay: [2, 6],
  userAgent: '',
  dailyRunTime: '',
  heartRunTime: '',
  // 老的配置
  targetLevel: 6,
  stayCoins: 0,
  targetCoins: 5,
  customizeUp: [],
  giftUp: [],
  coinRetryNum: 4,
  upperAccMatch: true,
  chargeUpId: undefined,
  chargePresetTime: 31,
  matchCoins: 5,
  matchSelection: 1,
  matchDiff: 0,
  // 新的配置方式
  match: {
    coins: 5,
    selection: 1,
    diff: 0,
  },
  charge: {
    mid: undefined,
    presetTime: 31,
  },
  gift: {
    mids: [],
  },
  coin: {
    customizeUp: [],
    retryNum: 4,
    upperAccMatch: true,
    targetLevel: 6,
    stayCoins: 0,
    targetCoins: 5,
  },
  sls: {
    name: '',
    description: '',
    region: 'ap-chengdu',
    dailyRunTime: DAILY_RUN_TIME,
    heartRunTime: HEART_RUN_TIME,
  },
  lottery: {
    excludeAward: LOTTERY_EXCLUDE,
    includeAward: LOTTERY_INCLUDE,
    blackUid: LOTTERY_UP_BLACKLIST,
    moveTag: '天选时刻',
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
};
