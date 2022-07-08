import { AnyProp } from '@/dto/bili-base-prop';
import { isBoolean } from './is';
import { emptyLogger, Logger, logger } from './log';

export type RequestOptions = {
  logger?: Logger | boolean;
  name?: string;
  successCode?: number;
};

/**
 * 请求处理
 */
export async function request<
  T extends (...args: any[]) => Promise<AnyProp<R['data']>>,
  R extends UnPromisify<ReturnType<T>>,
>(reqFunc: T, options: RequestOptions = {}, ...args: Parameters<T>): Promise<R['data']> {
  const thatlogger = getLogger(options.logger);
  const { name, successCode = 0 } = options;
  try {
    const { code, message, msg, data } = await reqFunc(...args);
    if (code !== successCode) {
      thatlogger.warn(`${name || reqFunc.name}请求失败：${code} ${message || msg}`);
      return;
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
