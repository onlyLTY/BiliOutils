import { AnyProp } from '@/dto/bili-base-prop';
import { isBoolean } from './is';
import { emptyLogger, Logger, logger } from './log';

export type RequestOptions = {
  logger?: Logger | boolean;
  name?: string;
  successCode?: number;
  transformResponse?: boolean;
};

/**
 * 请求处理
 */
export async function request<
  T extends (...args: any[]) => Promise<AnyProp<R['data']>>,
  R extends UnPromisify<ReturnType<T>>,
  O extends RequestOptions,
>(
  reqFunc: T,
  options?: O,
  ...args: Parameters<T>
): Promise<O['transformResponse'] extends false ? AnyProp<R['data']> : R['data']> {
  options ||= {} as O;
  const thatlogger = getLogger(options.logger);
  const { name, successCode = 0, transformResponse } = options;
  try {
    const resp = await reqFunc(...args);
    const { code, message, msg, data } = resp || {};
    if (code !== successCode) {
      thatlogger.warn(`${name || reqFunc.name}请求失败：${code} ${message || msg}`);
    }
    if (transformResponse === false) {
      return resp;
    }
    return data;
  } catch (error) {
    thatlogger.error(`${name || reqFunc.name}请求出现异常`);
    thatlogger.error(error);
  }
}

function getLogger(loggerOption: RequestOptions['logger']) {
  if (loggerOption === undefined) {
    return logger;
  } else if (isBoolean(loggerOption)) {
    return loggerOption ? logger : emptyLogger;
  } else {
    return loggerOption;
  }
}

export function getRequestNameWrapper(options: RequestOptions = {}) {
  return <
    T extends (...args: any[]) => Promise<AnyProp<R['data']>>,
    R extends UnPromisify<ReturnType<T>>,
  >(
    reqFunc: T,
    name: string,
    ...args: Parameters<T>
  ) => request(reqFunc, { ...options, name }, ...args);
}
