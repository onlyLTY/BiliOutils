import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { CreateAxiosOptions } from '../../types/axiosTransform';
import type { RequestOptions, Result } from '../../types/axios';
import axios from 'axios';
import { AxiosCanceler } from './axiosCancel';
import { isFunction, isString } from '../is';
import { cloneObject, stringify } from '../pure';
import { ContentTypeEnum, RequestEnum } from '../../enums/http.enum';

/**
 * @description axios 封装
 */
export class VAxios {
  // axios 实例
  private axiosInstance: AxiosInstance;
  // 配置
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    const { requestOptions } = options;
    if (requestOptions.withCredentials === false) {
      options.withCredentials = false;
    }
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * 创建一个 axios 实例
   */
  private createAxiosInstance(options: CreateAxiosOptions) {
    this.axiosInstance = axios.create(options);
  }

  private getTransform() {
    return this.options.transform;
  }

  getAxios() {
    return this.axiosInstance;
  }

  /**
   * 重新设置 axios 实例
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxiosInstance(config);
  }

  /**
   * 设置请求头
   */
  setHeaders(headers: any) {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }

    const {
      requsetInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        headers: { ignoreCancelToken },
      } = config;

      const ignoreCancel = ignoreCancelToken
        ? ignoreCancelToken
        : this.options.requestOptions?.ignoreCancelToken;

      !ignoreCancel && axiosCanceler.addPending(config);

      if (isFunction(responseInterceptors)) {
        config = requsetInterceptors(config, this.options);
      }

      return config;
    }, undefined);

    // 请求错误拦截器
    isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // 响应错误拦截器
    isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  /**
   * 支持 form-data
   */
  private supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET ||
      isString(config.data)
    ) {
      return config;
    }

    return {
      ...config,
      data: stringify(config.data),
    };
  }

  get<T = any>(config: CreateAxiosOptions): Promise<T>;
  get<T = any>(url: string, config?: CreateAxiosOptions): Promise<T>;
  get<T = any>(options: string | CreateAxiosOptions, config?: CreateAxiosOptions): Promise<T> {
    if (isString(options)) {
      return this.request({ ...config, method: 'GET', url: options });
    }
    return this.request({ ...options, method: 'GET' });
  }

  post<T = any>(config: CreateAxiosOptions): Promise<T>;
  post<T = any, D = any>(url: string, data?: D, config?: CreateAxiosOptions): Promise<T>;
  post<T = any, D = any>(
    options: string | CreateAxiosOptions,
    data?: D,
    config?: CreateAxiosOptions,
  ): Promise<T> {
    if (isString(options)) {
      return this.request({ ...config, method: 'POST', url: options, data });
    }
    return this.request({ ...options, method: 'POST' });
  }

  put<T = any, D = any>(url: string, data?: D, config?: CreateAxiosOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT', url, data });
  }

  delete<T = any, D = any>(url: string, data?: D, config?: CreateAxiosOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE', url, data });
  }

  patch<T = any, D = any>(url: string, data?: D, config?: CreateAxiosOptions): Promise<T> {
    return this.request({ ...config, method: 'PATCH', url, data });
  }

  request<T = any>(config: CreateAxiosOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneObject(config, true);
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, config.requestOptions);

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};

    if (isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;
    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (error) {
              reject(error || new Error('请求错误!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          reject(e);
        });
    });
  }
}
