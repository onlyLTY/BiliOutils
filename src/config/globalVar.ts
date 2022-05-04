import { getUserId, getBiliJct } from '../utils/cookie';
import config from './setConfig';

/**
 * 字符串数组转数字数组
 * @param strArr 字符串数组
 */
function strArr2numArr(strArr: string[] | number[]) {
  return strArr && strArr.map(str => Number(str)).filter(num => num > 0 && num % 1 === 0);
}

/** 默认的任务配置 */
export abstract class TaskConfig {
  static readonly config = config;
  /** 直接复制全部吧 */
  static COOKIE: string = config.cookie;
  /** bilibili账号的jct */
  static readonly BILIJCT: string = getBiliJct();
  /** bilibili 用户昵称 */
  static NICKNAME = '';
  /**操作用户的bilibili mid */
  static readonly USERID: number = getUserId();
  /**【可选】用户代理(浏览器) */
  static readonly USER_AGENT: string = config.userAgent;
  /** 预计投币数,默认5 */
  static readonly BILI_TARGET_COINS: number = config.targetCoins ?? 5;
  private static biliApiDelay = config.apiDelay || [2, 6];
  /** 调用api时的延迟(单位s),默认2s至6s */
  static readonly BILI_API_DELAY: number[] = Array.isArray(TaskConfig.biliApiDelay)
    ? TaskConfig.biliApiDelay
    : [TaskConfig.biliApiDelay];
  /** 自定义高优先级用户列表 */
  static readonly BILI_CUSTOMIZE_UP: Array<number> = strArr2numArr(config.customizeUp) || [];
  /** 自定义投喂礼物用户列表 */
  static readonly BILI_GIFT_UP: Array<number> =
    strArr2numArr(config.giftUp) || TaskConfig.BILI_CUSTOMIZE_UP || [];
  /** 目标等级 默认6级 */
  static readonly BILI_TARGET_LEVEL: number = config.targetLevel ?? 6;
  /** 最低剩余硬币数,默认0 */
  static readonly BILI_STAY_COINS: number = config.stayCoins ?? 0;
  /** 是否精准匹配UP主的视频 */
  static readonly BILI_UPPER_ACC_MATCH: boolean = config.upperAccMatch || true;
  /** 投币操作重试次数 默认 4 */
  static readonly BILI_COIN_RETRY_NUM: number = config.coinRetryNum || 4;
  /** 充电的 up 默认自己 */
  static readonly CHARGE_ID = config.chargeUpId || TaskConfig.USERID;
  /** 充电预设时间，哪一天？ */
  static readonly CHARGE_PRESET_TIME = config.chargePresetTime || 31;
  /** pushplus token */
  static readonly PUSHPLUS_TOKEN = process.env.PUSHPLUS_TOKEN || config.message?.pushplusToken;
  /** 压硬币数量 */
  static readonly MATCH_COINS = config.matchCoins ?? 5;
  /** 压硬币规则 大于0 是正压，小于反压 */
  static readonly MATCH_SELECTION = config.matchSelection ?? 1;
  /** 比赛赔率差距需要大于多少才压 */
  static readonly MATCH_DIFF = config.matchDiff ?? 0;
  /** 自定义推送 Api */
  static readonly MESSAGE_API = config.message?.api;
}

/** 任务完成情况统计 */
export abstract class TaskModule {
  /**拥有硬币数量 */
  static money = 0;
  /**还需要投币数量,初值BILI_TARGET_COINS */
  static coinsTask: number = TaskConfig.BILI_TARGET_COINS;
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
}
