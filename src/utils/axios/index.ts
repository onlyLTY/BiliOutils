import type { AxiosTransform, CreateAxiosOptions } from '#/axiosTransform';
import type { AxiosError, AxiosResponse } from 'axios';
import { RequestEnum } from '@/enums/http.enum';
import { VAxios } from './Axios';
import type { RequestOptions, Result } from '#/axios';
import { isString } from '../is';
import { deepMergeObject, jsonp2Object } from '../pure';
import { apiDelay } from '../effect';
import { defaultHeaders } from '@/constant/biliUri';
import { TaskConfig } from '@/config/globalVar';
import getCookie from '../cookie';
import retryWhitelist from './retryWhitelist';
/**
 * 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    // 错误的时候返回
    const { data } = res;
    if (options.isJsonp && isString(data)) {
      return jsonp2Object(data);
    }
    return data;
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl } = options;
    if (apiUrl && isString(apiUrl)) {
      if (config.url.startsWith('/') && apiUrl.endsWith('/')) {
        config.url = apiUrl + config.url.substring(1);
      } else if (!config.url.startsWith('/') && !apiUrl.endsWith('/')) {
        config.url = `${apiUrl}/${config.url}`;
      } else {
        config.url = `${apiUrl}${config.url}`;
      }
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() !== RequestEnum.GET) {
      if (!isString(params)) {
        if (Reflect.has(config, 'data') && config.data) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          // 不然就把 params 视为 query 参数，可能导致密码明文出现在 url 中等情况
          config.data = params;
          config.params = undefined;
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * 请求拦截器处理
   */
  requsetInterceptors: (config: CreateAxiosOptions) => {
    const { requestOptions } = config;
    if (requestOptions.withBiliCookie === true) {
      config.headers['Cookie'] = TaskConfig.COOKIE;
    }
    return config;
  },

  /**
   * 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    if (res.config.requestOptions.withBiliCookie) {
      TaskConfig.COOKIE = getCookie(TaskConfig.COOKIE, res.headers?.['set-cookie'] || []);
    }
    return res;
  },

  /**
   * 响应错误处理
   */
  responseInterceptorsCatch: async (error: AxiosError) => {
    const { requestOptions: options, url } = error.config;
    // 防止部分情况重复请求
    if (retryWhitelist.find(item => item[0] === url && item[1] === error.code)) {
      return Promise.reject(error);
    }
    // 不需要重试的请求
    if (options.retry === 0) return Promise.reject(error);
    // 默认重试次数 2
    if (!options.retry) options.retry = 2;
    // 设置重试次数
    options.__retryCount = options.__retryCount || 0;
    // 检测是否超过了重试次数
    if (options.__retryCount >= options.retry) {
      // 错误处理
      return Promise.reject(error);
    }
    // 已经重试过一次，增加重试次数
    options.__retryCount += 1;
    await apiDelay(options.retryDelay || 100);
    // 返回新的Promise来处理重试
    return await biliHttp.request(error.config);
  },
};

export function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMergeObject(
      {
        timeout: 10 * 1000,
        headers: {
          'content-type': defaultHeaders['content-type'],
          'user-agent': defaultHeaders['user-agent'],
          'accept-language': defaultHeaders['accept-language'],
        },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 重试
          retry: 2,
          // 是否携带 bili cookie
          withBiliCookie: true,
        },
        withCredentials: true,
      } as CreateAxiosOptions,
      opt || {},
    ),
  );
}

export const defHttp = createAxios({
  requestOptions: {
    withBiliCookie: false,
  },
});

export const biliHttp = createAxios();
