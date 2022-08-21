export interface AnyProp<T = any> {
  code?: number;
  message?: string;
  data?: T;
  ttl?: number;
  ts?: number;
  msg?: string;
  status?: boolean;
}

export interface ApiBaseProp<T = object | number | null> {
  /**
   * -658 Token 过期
   */
  code: number;
  message: string;
  ttl: number;
  data: T;
}

export interface OnlyMsg<T = any> {
  code: number;
  msg: string;
  data: T;
}

export interface AccountBaseProp<T = object> {
  code: number;
  status: boolean;
  data: T;
}

export interface DoubleMessageProp<T = unknown> {
  code: number;
  msg: string;
  message: string;
  data: T;
}

export interface PureDataProp<T = object | [] | null> {
  code: number;
  message: string;
  data: T;
}

/**
 * 0：请求成功
 * -101：账号未登录
 * -111：csrf校验失败
 * -400：请求错误
 */
export type ResponseCode = 0 | -101 | -111 | -400;

/**
 * result 请求
 */
export interface ResponseResult<T = any> {
  code: number;
  message: string;
  result: T;
}
