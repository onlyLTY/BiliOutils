import type { Config } from '../types';
import { getConfig } from './setConfig';
import { mergeConfig } from './config';
import { getAndroidUA } from '@/constant/biliUri';

type TaskConfigType = Config & {
  mobileUA: string;
};

let _taskConfig: TaskConfigType;
export const TaskConfig = new Proxy({} as TaskConfigType, {
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
  _taskConfig = { ...userConfig, mobileUA: getAndroidUA() };
  TaskModule = class extends TaskModuleTemplate {};
  TaskModule.coinsTask = _taskConfig.coin.targetCoins;
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
