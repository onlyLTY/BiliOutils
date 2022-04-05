import axios from './index';
import { TaskConfig } from '../config/globalVar';
import getCookie from '../utils/cookie';
import { ErrorCodeCommon as ErrCC } from '../config/ErrorCode';
import { sendMessage } from '../utils/effect';
import { logger, LogMessage } from '../utils/log';

const res = res => {
  // 设置 cookie 的变化
  const setCookie = res.headers?.['set-cookie'] || [];
  TaskConfig.COOKIE = getCookie(TaskConfig.COOKIE, setCookie);

  // 结果异常检测
  const code = res.data?.code;
  const exit = async () => {
    logger.error(`运行结束：${ErrCC[code]}`);
    // 发送信息
    await sendMessage(`异常：${ErrCC[code]}`, LogMessage.value);
    // 结束进程
    process.exit(0);
  };
  switch (code) {
    case ErrCC['账号未登录']:
    case ErrCC['账号被封停']:
      exit();
      break;
    default:
      return res;
  }
};

const err = err => {
  return axiosRetryInterceptor(err);
};

function axiosRetryInterceptor(err) {
  const config = err.config;
  // 不需要重试的请求
  if (config.retry === 0) return Promise.reject(err);

  // 默认重试次数 2
  if (!config.retry) config.retry = 2;

  // 设置重试次数
  config.__retryCount = config.__retryCount || 0;

  // 检测是否超过了重试次数
  if (config.__retryCount >= config.retry) {
    // 错误处理
    return Promise.reject(err);
  }

  // 已经重试过一次，增加重试次数
  config.__retryCount += 1;

  // 创建一个新的Promise来处理重试
  const backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve(void 0);
    }, config.retryDelay || 100);
  });

  // 返回新的Promise来处理重试
  return backoff.then(function () {
    return axios(config);
  });
}

const accountApi = axios.create({
  baseURL: 'https://account.bilibili.com',
});

const liveApi = axios.create({
  baseURL: 'https://api.live.bilibili.com',
});

const biliApi = axios.create({
  baseURL: 'https://api.bilibili.com',
});

const mangaApi = axios.create({
  baseURL: 'https://manga.bilibili.com',
});

const vcApi = axios.create({
  baseURL: 'https://api.vc.bilibili.com',
});

axios.interceptors.response.use(res, err);

export { biliApi, vcApi, accountApi, mangaApi, liveApi, axios };
