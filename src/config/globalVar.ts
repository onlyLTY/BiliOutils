import type { Config } from '../types';
import { LOTTERY_EXCLUDE, LOTTERY_INCLUDE, LOTTERY_UP_BLACKLIST } from '../constant';
import { getNewObject } from '../utils/pure';
import { getUserId, getBiliJct } from '../utils/cookie';
import { checkConfig, getConfig } from './setConfig';

/**
 * 字符串数组转数字数组
 * @param strArr 字符串数组
 */
function strArr2numArr(strArr: string[] | number[]) {
  return strArr && strArr.map(str => Number(str)).filter(num => num > 0 && num % 1 === 0);
}

/** 默认的任务配置 */
class TaskConfigTemplate {
  config: Config;
  /** 直接复制全部吧 */
  COOKIE: string;
  /** bilibili账号的jct */
  readonly BILIJCT: string;
  /**操作用户的bilibili mid */
  readonly USERID: number;
  /**【可选】用户代理(浏览器) */
  readonly USER_AGENT: string;
  /** 预计投币数,默认5 */
  readonly BILI_TARGET_COINS: number;
  /** 调用api时的延迟(单位s),默认2s至6s */
  readonly BILI_API_DELAY: number[];
  /** 自定义高优先级用户列表 */
  readonly BILI_CUSTOMIZE_UP: Array<number>;
  /** 自定义投喂礼物用户列表 */
  readonly BILI_GIFT_UP: Array<number>;
  /** 目标等级 默认6级 */
  readonly BILI_TARGET_LEVEL: number;
  /** 最低剩余硬币数,默认0 */
  readonly BILI_STAY_COINS: number;
  /** 是否精准匹配UP主的视频 */
  readonly BILI_UPPER_ACC_MATCH: boolean;
  /** 投币操作重试次数 默认 4 */
  readonly BILI_COIN_RETRY_NUM: number;
  /** 充电的 up 默认自己 */
  readonly CHARGE_ID: number;
  /** 充电预设时间，哪一天？ */
  readonly CHARGE_PRESET_TIME: number;
  /** pushplus token */
  readonly PUSHPLUS_TOKEN: string;
  /** 压硬币数量 */
  readonly MATCH_COINS: number;
  /** 压硬币规则 大于0 是正压，小于反压 */
  readonly MATCH_SELECTION: number;
  /** 比赛赔率差距需要大于多少才压 */
  readonly MATCH_DIFF: number;
  /** 自定义推送 Api */
  readonly MESSAGE_API: string;
  /** 天选屏蔽奖品 */
  readonly LOTTERY_EXCLUDE: string[];
  /** 天选包含奖品 */
  readonly LOTTERY_INCLUDE: string[];
  /** 黑名单 */
  readonly LOTTERY_UP_BLACKLIST: number[];
  /** 是否将天选时刻关注 UP 移动到分组 */
  readonly LOTTERY_MOVE_TAG: string;
  /** 天选获取的直播页数 */
  readonly LOTTERY_PAGE_NUM: number;

  constructor(config: Config) {
    this.config = config;
    this.COOKIE = config.cookie;

    this.BILIJCT = getBiliJct(config.cookie);
    this.USERID = getUserId(config.cookie);
    this.USER_AGENT = config.userAgent;
    const apiDelay = config.apiDelay ?? [2, 6];
    this.BILI_API_DELAY = Array.isArray(apiDelay) ? strArr2numArr(apiDelay) : [Number(apiDelay)];

    const message = getNewObject(config.message);
    this.MESSAGE_API = message.api;
    this.PUSHPLUS_TOKEN = message.pushplusToken || process.env.PUSHPLUS_TOKEN;

    const coin = getNewObject(config.coin);
    this.BILI_CUSTOMIZE_UP = strArr2numArr(coin.customizeUp || config.customizeUp) || [];
    this.BILI_UPPER_ACC_MATCH = coin.upperAccMatch || config.upperAccMatch || true;
    this.BILI_COIN_RETRY_NUM = coin.retryNum || config.coinRetryNum || 4;
    this.BILI_TARGET_LEVEL = (coin.targetLevel || config.targetLevel) ?? 6;
    this.BILI_STAY_COINS = (coin.stayCoins || config.stayCoins) ?? 0;
    this.BILI_TARGET_COINS = (coin.targetCoins || config.targetCoins) ?? 5;

    const gift = getNewObject(config.gift);
    this.BILI_GIFT_UP = strArr2numArr(gift.mids || config.giftUp) || this.BILI_CUSTOMIZE_UP || [];

    const charge = getNewObject(config.charge);
    this.CHARGE_ID = charge.mid || config.chargeUpId || this.USERID;
    this.CHARGE_PRESET_TIME = charge.presetTime || config.chargePresetTime || 31;

    const match = getNewObject(config.match);
    this.MATCH_COINS = (match.coins || config.matchCoins) ?? 5;
    this.MATCH_SELECTION = (match.selection || config.matchSelection) ?? 1;
    this.MATCH_DIFF = (match.diff || config.matchDiff) ?? 0;

    // 最新的就不再有兼容了
    const lottery = getNewObject(config.lottery);
    this.LOTTERY_EXCLUDE = lottery.excludeAward || LOTTERY_EXCLUDE;
    this.LOTTERY_INCLUDE = lottery.includeAward || LOTTERY_INCLUDE;
    this.LOTTERY_UP_BLACKLIST = lottery.blackUid || LOTTERY_UP_BLACKLIST;
    this.LOTTERY_MOVE_TAG = lottery.moveTag;
    this.LOTTERY_PAGE_NUM = lottery.pageNum || 2;
  }
}

let _taskConfig: TaskConfigTemplate;
export const TaskConfig = new Proxy({} as TaskConfigTemplate, {
  get(_target, key) {
    if (!_taskConfig) {
      initialize();
    }
    return Reflect.get(_taskConfig, key);
  },
  set(_target, key, value) {
    if (key === 'config') {
      initialize(value);
      return true; // 否则 config 会被覆盖
    }
    return Reflect.set(_taskConfig, key, value);
  },
});

/** 任务完成情况统计 */
export abstract class TaskModule {
  /**拥有硬币数量 */
  static money = 0;
  /**还需要投币数量,初值BILI_TARGET_COINS */
  static coinsTask = 5;
  /**今日是否已经分享视频 */
  static share = false;
  /**今日是否已经观看视频 */
  static watch = false;
  /** 确定获取aid的函数开始下标 */
  static currentStartFun = 0;
  /** B币券余额 */
  static bCoinCouponBalance = 0;
  /** 0为无，1为月度，2为年度 */
  static vipType = 0;
  /** 充电留言 token */
  static chargeOrderNo: string;
  /** 用户等级 */
  static userLevel = 0;
  /** 用户昵称 */
  static nickname: string;
}

export function initialize(config?: Config) {
  if (!config) {
    config = getConfig();
  }
  _taskConfig = new TaskConfigTemplate(checkConfig(config));
  TaskModule.coinsTask = _taskConfig.BILI_TARGET_COINS;
}
