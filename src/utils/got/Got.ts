import type { BiliCookieJar } from '@/config/globalVar';
import type { RequestOptions } from '#/request';
import type { VGotOptions } from '#/got';
import type { Got, Response } from 'got';
import got from 'got';
import { isFunction, isObject, isString } from '../is';
import { jsonp2Object, mergeHeaders, stringify } from '../pure';
import { CookieJar } from '../cookie';

const transformRequestHook = (res: Response, options: RequestOptions = {}) => {
  const { isTransformResponse, isReturnNativeResponse } = options;

  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  if (isReturnNativeResponse) {
    return res;
  }
  // 不进行任何处理，直接返回
  if (isTransformResponse === false) {
    return res.body;
  }

  // 错误的时候返回
  const { body } = res;
  if (options.isJsonp && isString(body)) {
    return jsonp2Object(body);
  }

  try {
    if (isString(body) && body.startsWith('{')) {
      return JSON.parse(body);
    }
  } catch {}

  return body;
};

function axiosHandle(options: VGotOptions) {
  // 如果 options.url 不是字符串，则转换为字符串
  if (!isString(options.url)) {
    options.url = options.url?.toString();
  }

  // 如果 params 存在值，则合并到 searchParams
  if (isObject(options.params) && !isString(options.searchParams)) {
    options.searchParams = {
      ...options.searchParams,
      ...options.params,
    };
  }
  options.headers || (options.headers = {});
  const contentType = options.headers['content-type'] as string,
    isFormUrlencoded = contentType?.startsWith('application/x-www-form-urlencoded');
  if (isObject(options.data)) {
    if (isFormUrlencoded) {
      options.body = stringify(options.data);
    } else {
      options.json = options.data;
    }
  }
  if (isString(options.data) && isFormUrlencoded) {
    options.body = options.data;
  }

  function setAgent(pro: string) {
    if (!options.agent) {
      options.agent = {};
    }
    options.agent[pro] = options[`${pro}Agent`];
  }

  // 处理代理
  if (options.httpAgent) {
    setAgent('http');
  }
  if (options.httpsAgent) {
    setAgent('https');
  }

  // 如果 url 是 / 开头，则自动去掉 /
  if (options.url && options.url.startsWith('/')) {
    options.url = options.url.substring(1);
  }

  return options;
}

export type CookieJarType = CookieJar | BiliCookieJar | undefined;

export class VGot {
  protected gotInstance: Got;
  protected options: VGotOptions;
  cookieJar: CookieJarType;
  name = 'VGot';

  constructor(options: VGotOptions) {
    // 兼容 axios
    if (options.baseURL) {
      options.prefixUrl = options.baseURL;
    }
    this.options = options;
  }

  init() {
    // 处理 cookie
    if (!this.cookieJar) {
      this.cookieJar = new CookieJar();
    }
    this.gotInstance = got.extend(this.options, {
      cookieJar: this.cookieJar,
    });
  }

  request<T = any>(options: VGotOptions) {
    const { requestOptions = {}, headers = {} } = this.options;
    options.requestOptions = Object.assign({}, requestOptions, options.requestOptions);
    options.headers = mergeHeaders(headers, options.headers);

    if (requestOptions.retry) {
      options.retry = requestOptions.retry;
    }

    options = axiosHandle(options);

    return new Promise<T>((resolve, reject) => {
      this.gotInstance(options)
        .then((res: Response<T>) => {
          if (isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, options.requestOptions);
              resolve(ret);
            } catch (error) {
              reject(error || new Error('请求错误!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch(error => {
          if (error.response) {
            error.response.status = error.response.statusCode;
          }
          reject(error);
        });
    });
  }

  get<T = any>(config: VGotOptions): Promise<T>;
  get<T = any>(url: string, config?: VGotOptions): Promise<T>;
  get<T = any>(options: string | VGotOptions, config?: VGotOptions): Promise<T> {
    if (isString(options)) {
      return this.request({ ...config, method: 'GET', url: options });
    }
    return this.request({ ...options, method: 'GET' });
  }

  post<T = any>(config: VGotOptions): Promise<T>;
  post<T = any, D = any>(url: string, data?: D, config?: VGotOptions): Promise<T>;
  post<T = any, D = any>(
    options: string | VGotOptions,
    data?: D,
    config?: VGotOptions,
  ): Promise<T> {
    if (isString(options)) {
      return this.request({ ...config, method: 'POST', url: options, data });
    }
    return this.request({ ...options, method: 'POST' });
  }

  put<T = any, D = any>(url: string, data?: D, config?: VGotOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT', url, data });
  }

  delete<T = any, D = any>(url: string, data?: D, config?: VGotOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE', url, data });
  }

  patch<T = any, D = any>(url: string, data?: D, config?: VGotOptions): Promise<T> {
    return this.request({ ...config, method: 'PATCH', url, data });
  }
}
