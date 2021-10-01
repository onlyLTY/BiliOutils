export interface ApiBaseProp {
  /**
   * -658 Token 过期
   */
  code: number;
  message: string;
  ttl: number;
  data?: object | number;
}

export interface AccountBaseProp {
  code: number;
  status: boolean;
  data?: object;
}

export interface DoubleMessageProp {
  code: number;
  msg: string;
  message: string;
  data?: any;
}

export interface PureDataProp {
  code: number;
  message: string;
  data?: object | [] | null;
}

/**
 * 0：请求成功
 * -101：账号未登录
 * -111：csrf校验失败
 * -400：请求错误
 */
export type ResponseCode = 0 | -101 | -111 | -400;
