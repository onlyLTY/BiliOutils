/**
 * 返回状态码
 */
export const ActivityLotteryStatus = {
  Success: 0,
  /** 请求过于频繁 */
  TooManyRequests: -509,
  /** 不存在 */
  NotExist: 170001,
  /** 结束 */
  End: 175003,
  /** 抽奖频率过高 */
  Frequent: 170400,
  /** 获取次数已达上限 */
  Max: 170405,
  /** 抽奖次数用完 */
  NoTimes: 170415,
  /** 412 */
  PreconditionFailed: 412,
  /** 网络 */
  NetworkError: 'NET_ERR',
} as const;
