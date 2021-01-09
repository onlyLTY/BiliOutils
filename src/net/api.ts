import axios from './index';
import { TaskConfig } from '../config/globalVar';
import getCookie from '../config/cookie';

const res = (res) => {
  const setCookie = res.headers?.['set-cookie'] || [];
  TaskConfig.COOKIT = getCookie(TaskConfig.COOKIT, setCookie);
  return res;
};

const err = (err) => {
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
