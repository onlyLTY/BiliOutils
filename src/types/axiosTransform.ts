import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './request';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export interface AxiosTransform {
  /**
   * 请求之前处理 config
   */
  beforeRequestHook?: (config: AxiosRequestConfig, option: RequestOptions) => AxiosRequestConfig;

  /**
   * 请求成功
   */
  transformRequestHook?: (res: AxiosResponse<Result>, option: RequestOptions) => any;

  /**
   * 请求失败
   */
  requestCatchHook?: (e: Error, option: RequestOptions) => Promise<any>;

  /**
   * 请求之前拦截
   */
  requsetInterceptors?: (
    config: AxiosRequestConfig,
    option: CreateAxiosOptions,
  ) => AxiosRequestConfig;

  /**
   * 请求成功拦截
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * 请求错误拦截
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * 响应错误拦截
   */
  responseInterceptorsCatch?: (error: Error) => void;
}
