import { AnyProp } from '@/dto/bili-base-prop';
import { isBoolean } from './is';
import { emptyLogger, Logger, logger } from './log';

export type RequestOptions = {
  logger?: Logger | boolean;
  name?: string;
  successCode?: number;
  transform?: boolean;
  okMsg?: string;
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
  options: O = { transform: true } as O,
  ...args: Parameters<T>
): Promise<O['transform'] extends false ? AnyProp<R['data']> : R['data']> {
  const thatlogger = getLogger(options.logger);
  const { name, successCode = 0, transform, okMsg } = options;
  try {
    const resp = await reqFunc(...args);
    const { code, message, msg, data } = resp || {};
    if (code !== successCode) {
      thatlogger.warn(`${name || reqFunc.name}请求失败：${code} ${message || msg}`);
    }
    if (okMsg) {
      thatlogger.info(okMsg);
    }
    if (transform === false) {
      return resp;
    }
    return data as R['data'];
  } catch (error) {
    thatlogger.error(`${name || reqFunc.name}请求出现异常`);
    thatlogger.error(error);
  }
  return {} as Record<string, any>;
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
