import type { LevelType } from '@/types/log';
import type {
  ActivityLotteryIdType,
  CouponBalanceUseType,
  SessionHandleType,
  UserConfig,
} from '@/types';
import {
  DAILY_RUN_TIME,
  LOTTERY_EXCLUDE,
  LOTTERY_INCLUDE,
  LOTTERY_UP_BLACKLIST,
  TODAY_MAX_FEED,
} from '@/constant';
import { cloneObject, deepMergeObject, arr2numArr } from '@/utils/pure';
import { getBiliJct, getUserId } from '@/utils/cookie';
import { isNumber, isString, isUnDef } from '@/utils/is';

type DefaultConfig = typeof defaultConfig;
export type TheConfig = DefaultConfig;

export const defaultConfig = {
  cookie: '',
  accessKey: '',
  // acTimeValue: '',
  // accessRefreshToken: '',
  createCookieDay: undefined,
  message: {
    br: '\n',
    // 仅错误时发送
    onlyError: false,
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
    // 使用 b 币券
    useCouponBp: false,
    // 充电（废弃）
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
    // 转盘抽奖
    activityLottery: false,
    // 每日电池
    dailyBattery: false,
  },
  log: {
    pushLevel: 'verbose' as LevelType | boolean,
    consoleLevel: 'debug' as LevelType | boolean,
    fileLevel: 'debug' as LevelType | boolean,
    useEmoji: true,
    fileSplit: 'day' as 'day' | 'month',
  },
  limit: {
    // 获取经验限制为 6 级
    level6: true,
    // 投币限制为 5 颗
    coins5: true,
  },
  /** 调用api时的延迟(单位s),默认2s至6s */
  apiDelay: [2, 6],
  /**【可选】用户代理(浏览器) */
  userAgent: '',
  dailyRunTime: DAILY_RUN_TIME,
  match: {
    /** 压硬币数量 */
    coins: 2,
    /** 压硬币规则 大于0 是正压，小于反压 */
    selection: 1,
    /** 比赛赔率差距需要大于多少才压 */
    diff: 7,
  },
  charge: {} as any,
  couponBalance: {
    /** 充电的 up 默认自己 */
    mid: 0,
    /** 预设时间，哪一天？设置为空数组即每一天 */
    presetTime: [10, 20],
    /** 使用方式 */
    use: '充电' as CouponBalanceUseType,
  },
  gift: {
    /** 自定义投喂礼物用户列表 */
    mids: [] as number[],
    // 投喂礼物 id
    // 辣条 小心心 能量石头 PK票 小海浪
    id: [1, 30607, 30426, 31531, 31674],
    // 投喂礼物 name
    name: [] as string[],
    // 无视其它礼物配置，投喂所有即将过期礼物
    all: false,
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
    /** 稿件必须是 up 的稿件，而非合作视频中的参与者 */
    upperAccMatch: false,
    /** 获取稿件的来源（排序），留空则来自 首页推荐 */
    src: ['自定义UP', '特别关注', '关注', '首页推荐', '分区排行'],
  },
  lottery: {
    /** 天选屏蔽奖品 */
    excludeAward: LOTTERY_EXCLUDE,
    /** 天选包含奖品 */
    includeAward: LOTTERY_INCLUDE,
    /** 黑名单 */
    blackUid: LOTTERY_UP_BLACKLIST,
    /** 天选时刻关注 UP 移动到分组 */
    moveTag: '天选时刻',
    /** 天选获取的直播页数 */
    pageNum: 2,
    /** 关注回复处理方式  */
    actFollowMsg: 'read' as SessionHandleType,
    /** 扫描关注的用户 */
    scanFollow: undefined as string | 'only' | undefined,
    /** 跳过需要关注的天选 */
    skipNeedFollow: false,
    // 打印可能中奖的消息
    mayBeWinMsg: true,
  },
  redPack: {
    /**
     * 声明：
     * 表示次数时，小于等于0的数表示不限制次数
     */
    // 直播间来源方式 1 活动（活动链接可能更新不及时），2 扫描。其它值 所有方式依次尝试。
    source: 0,
    // 活动链接
    uri: '',
    // 仅使用活动时有效，每轮抢红包的间隔时间（秒）
    intervalActive: 60,
    // 中场休息时间，当每参加了几个直播间的时候，休息一下 [参加个数，休息时间（分，小于1为直接结束）]
    restTime: [-1, -1],
    // 疑似触发风控时休眠时间，[连续出现次数，休眠时间（分，小于1为直接结束）]
    riskTime: [-1, -1], // 与 riskNum 不同，该参数会与 restTime 互相影响重置次数
    // 【废弃】
    riskSleepTime: -1,
    // 同时参与的直播间数量
    linkRoomNum: 1,
    // 总参与次数，达到后不管结果如何，直接结束
    totalNum: -1,
    // 参与直播时发送的弹幕数量（与内置数量比，min(10，剩余时间/5，配置)）
    // [固定值]，[最少,最多]
    dmNum: [10],
    // 是否在等待时处理关注用户（读取消息，移动）
    moveUpInWait: true,
    /** 天选时刻关注 UP 移动到分组 */
    moveTag: 'rp关注',
    /** 关注回复处理方式  */
    actFollowMsg: 'read' as SessionHandleType,
    // 连续超过多少次没有中，直接结束，小于1为不限制
    noWinNum: 10, // 避免一直运行
    // 连续疑似触发风控多少次，直接结束，小于1为不限制
    riskNum: 5, // 避免一直运行
  },
  unFollow: {
    // 单个取消的时间间隔（秒）
    delay: 3,
    // 中场休息，[取消数量, 休息时间（分）] 取消数量和休息时间都应该为正数（非0），否则无效
    restTime: [20, -1],
    // 总数 -1 无限制
    totalNum: -1,
    // 取消关注的 tag
    tags: ['天选时刻', 'rp关注'],
  },
  intimacy: {
    // 直播弹幕
    liveSendMessage: true,
    // 点赞直播间
    liveLike: true,
    // 直播心跳
    liveHeart: false,
    // 白名单
    whiteList: [] as number[],
    // 黑名单
    blackList: [] as number[],
    // 每日亲密度上限 （系统 1500）
    limitFeed: TODAY_MAX_FEED,
    // 同时有多少个直播间已获取亲密度超过200时，强制跳过弹幕和点赞。小于 0 不跳过
    skipNum: 10,
    // 完成直播心跳后是否再检查一次，可能因为数据延迟而重复操作，不建议云函数开启
    isRetryHeart: false,
  },
  jury: {
    once: true,
    // 默认投票 0-3 好-无法判断，从中随机
    vote: [0, 0, 1],
    // 是否采用参考投票
    opinion: true,
    // 参考投票最少人数
    opinionMin: 3,
    // 排除投票 0-3 好-无法判断，用于配合参考投票，不影响【默认投票】配置
    notOpinion: [3],
    // 没有案件后的等待时间（分）
    waitTime: 20,
    // insiders 参考值
    insiderWeight: 0.8,
    // 是否观看视频 0 不观看，1 观看
    insiders: [0, 1],
    // 是否匿名 0 不匿名，1 匿名
    anonymous: [0, 1],
    // 云函数下使用新的触发器进行休眠
    newTrigger: true,
    // 异步，非云函数下使用。不支持推送结果
    async: false,
  },
  manga: {
    // 签到
    sign: true,
    // 购买漫画
    buy: false,
    // read
    read: false,
    // 购买漫画 id（优先级高）
    mc: [] as number[],
    // 购买漫画名称（优先级中）
    name: [] as string[],
    // 购买追漫（优先级低）
    love: true,
    // 猜拳
    guess: false,
  },
  exchangeCoupon: {
    // 兑换漫读券数量，小于 1 为自动
    num: 1,
    // 间隔时间，单位 ms，随机误差 -50 ~ 150
    delay: 2000,
    // 保留积分数
    keepAmount: 0,
  },
  bigPoint: {
    // 是否重试，或者重试间隔时间，单位秒
    isRetry: 20 as boolean | number,
    // 是否观看视频
    isWatch: true,
    // 领取任务后的观看延时（秒）
    watchDelay: 40,
  },
  activityLottery: {
    // 活动列表
    list: [] as ActivityLotteryIdType[],
    // 是否从网络请求活动列表
    isRequest: true,
    // 抽奖延时（秒）
    delay: [1.8, 3.2],
    // 追番？
    bangumi: false,
    // 关注？
    follow: false,
    // 请求 GitHub 使用的代理前缀
    proxyPrefix: 'https://ghproxy.com/',
    // 自定义活动列表链接
    customUrl: '',
  },
  BILIJCT: '',
  USERID: 0,
};

export function getDefaultConfig() {
  return cloneObject(defaultConfig, true);
}

export function mergeConfig(config: UserConfig) {
  return configValueHandle(
    oldConfigHandle(deepMergeObject(getDefaultConfig(), beforeMergeConfig(config))),
  );
}

/**
 * 旧配置兼容处理
 * @param config
 */
function oldConfigHandle(config: DefaultConfig): TheConfig {
  // couponBalance charge
  config.couponBalance.mid ||= config.charge.mid;
  config.couponBalance.presetTime ||= config.charge.presetTime;

  return config;
}

/**
 * 配置默认值处理
 * @param config
 */
function configValueHandle(config: TheConfig) {
  setConstValue(config);
  const { coin, gift, match, couponBalance } = config;

  coin.customizeUp = arr2numArr(coin.customizeUp);
  gift.mids = arr2numArr(gift.mids);

  // 处理 charge
  const couponBalanceUse = couponBalance.use;
  switch (couponBalanceUse) {
    case 'battery':
    case '电池':
      couponBalance.use = '电池';
      break;
    case 'charge':
    case '充电':
      couponBalance.use = '充电';
      break;
    default:
      couponBalance.use = '充电';
      break;
  }

  /**
   * 部分默认值处理
   */
  if (gift.mids.length === 0) {
    gift.mids = coin.customizeUp;
  }
  if (!couponBalance.mid) {
    couponBalance.mid = config.USERID;
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
  setCookieValue(config, config.cookie);
  return config;
}

export function setCookieValue(config: TheConfig, cookie: string) {
  config.BILIJCT = getBiliJct(cookie);
  config.USERID = getUserId(cookie);
  return config;
}

/**
 * 合并前处理用户配置
 * @param config
 */
function beforeMergeConfig(config: UserConfig) {
  // 需要注意用户配置可能没有定义各种配置项
  const { message } = config;
  if (message && isString(message.api)) {
    const url = message.api;
    message.api = cloneObject(defaultConfig.message.api, true);
    message.api.url = url;
    message.api.method = 'GET';
  }

  // 处理 redPack
  const { redPack } = config;
  if (redPack && Reflect.has(redPack, 'riskSleepTime') && !Reflect.has(redPack, 'riskTime')) {
    redPack.riskTime = [1, redPack.riskSleepTime];
  }

  // 处理 jury
  const { jury } = config;
  if (jury) {
    if (isNumber(jury.insiders) && isUnDef(jury.insiderWeight)) {
      jury.insiderWeight = jury.insiders;
    }
  }

  return config;
}
