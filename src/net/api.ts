import axios from './index';
import { TaskConfig, TaskModule } from '../config/globalVar';
import getCookie from '../utils/cookie';
import { ErrorCodeCommon as ErrCC } from '../config/ErrorCode';
import { sendMessage } from '../utils';

const res = res => {
  // 设置 cookie 的变化
  const setCookie = res.headers?.['set-cookie'] || [];
  TaskConfig.COOKIE = getCookie(TaskConfig.COOKIE, setCookie);

  // 结果异常检测
  const code = res.data?.code;
  const exit = async () => {
    console.log('运行结束：', ErrCC[code]);
    // 发送信息
    await sendMessage('bili每日任务出现异常', TaskModule.appInfo);
    // 结束进程
    process.exit(code);
  };
  switch (code) {
    case ErrCC['账号未登录']:
    case ErrCC['账号被封停']:
      exit();
    default:
      return res;
  }
};

const err = err => {
  return Promise.reject(err);
};

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

biliApi.interceptors.response.use(res, err);
vcApi.interceptors.response.use(res, err);
accountApi.interceptors.response.use(res, err);
mangaApi.interceptors.response.use(res, err);
liveApi.interceptors.response.use(res, err);

export { biliApi, vcApi, accountApi, mangaApi, liveApi };
