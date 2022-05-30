export interface RequestOptions {
  // 需要对返回数据进行处理
  isTransformResponse?: boolean;
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean;
  // 默认请求地址
  apiUrl?: string;
  // 忽略重复请求
  ignoreCancelToken?: boolean;
  // 是 JSONP
  isJsonp?: boolean;
  // 重试次数
  retry?: number;
  // 当前重试次数
  __retryCount?: number;
  // 重试延迟
  retryDelay?: number;
  // 是否携带 cookie
  withCredentials?: boolean;
  // 是否携带 bili cookie
  withBiliCookie?: boolean;
}

export interface Result<T = any> {
  code: number;
  data?: T;
}
