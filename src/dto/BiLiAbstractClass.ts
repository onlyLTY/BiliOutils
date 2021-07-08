export abstract class ApiAbstract {
  /**
   * -658 Token 过期
   */
  'code': number;
  'message': string;
  'ttl': number;
  abstract data?: object | number;
}

export abstract class AccountAbstract {
  'code': number;
  'status': boolean;
  abstract data?: object;
}

export abstract class PureData {
  code: number;
  msg: string;
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
