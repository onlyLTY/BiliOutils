import type { Config } from '../types';
import { checkConfig, getConfig } from './setConfig';
import { mergeConfig } from './config';

/** 默认的任务配置 */
class TaskConfigTemplate {
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
  /** 投币操作重试次数 默认 4 */
  readonly BILI_COIN_RETRY_NUM: number;
  /** pushplus token */
  readonly PUSHPLUS_TOKEN: string;
  /** 压硬币数量 */
  readonly MATCH_COINS: number;
  /** 压硬币规则 大于0 是正压，小于反压 */
  readonly MATCH_SELECTION: number;
  /** 比赛赔率差距需要大于多少才压 */
  readonly MATCH_DIFF: number;

  constructor(config: Config) {
    this.COOKIE = config.cookie;

    this.BILIJCT = config.BILIJCT;
    this.USERID = config.USERID;
    this.USER_AGENT = config.userAgent;
    this.BILI_API_DELAY = config.apiDelay;

    const message = config.message;
    this.PUSHPLUS_TOKEN = message.pushplusToken;

    const coin = config.coin;
    this.BILI_CUSTOMIZE_UP = coin.customizeUp;
    this.BILI_COIN_RETRY_NUM = coin.retryNum;
    this.BILI_TARGET_LEVEL = coin.targetLevel;
    this.BILI_STAY_COINS = coin.stayCoins;
    this.BILI_TARGET_COINS = coin.targetCoins;

    const gift = config.gift;
    this.BILI_GIFT_UP = gift.mids;

    const match = config.match;
    this.MATCH_COINS = match.coins;
    this.MATCH_SELECTION = match.selection;
    this.MATCH_DIFF = match.diff;
  }
}

let _taskConfig: TaskConfigTemplate & Config;
export const TaskConfig = new Proxy({} as TaskConfigTemplate & Config, {
  get(_target, key) {
    if (!_taskConfig) {
      initialize();
    }
    return Reflect.get(_taskConfig, key);
  },
  set(_target, key, value) {
    if (key === 'config' && value) {
      initialize(value);
      return true; // 否则 config 会被覆盖
    }
    return Reflect.set(_taskConfig, key, value);
  },
});

/** 任务完成情况统计 */
abstract class TaskModuleTemplate {
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
  /** 大会员状态 0 无 1 有 */
  static vipStatus = 0;
  /** 充电留言 token */
  static chargeOrderNo: string;
  /** 用户等级 */
  static userLevel = 0;
  /** 用户昵称 */
  static nickname: string;
}

export let TaskModule: typeof TaskModuleTemplate = null;

export function initialize(config?: Config) {
  if (!config) {
    config = getConfig(false);
  }
  // TODO: 配置方式兼容
  const userConfig = mergeConfig(config) as Config;
  _taskConfig = { ...new TaskConfigTemplate(checkConfig(userConfig)), ...userConfig };
  TaskModule = class extends TaskModuleTemplate {};
  TaskModule.coinsTask = _taskConfig.BILI_TARGET_COINS;
}

/**
 * 改变配置
 */
export function changeConfig(index: string) {
  const config = getConfig();
  if (config[index]) {
    initialize(config[index]);
  }
}
