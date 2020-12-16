import axios from './index';

export const accountApi = axios.create({
  baseURL: 'https://account.bilibili.com',
});

export const liveApi = axios.create({
  baseURL: 'https://api.live.bilibili.com',
});

export const biliApi = axios.create({
  baseURL: 'https://api.bilibili.com',
});

export const mangaApi = axios.create({
  baseURL: 'https://manga.bilibili.com',
});

export const vcApi = axios.create({
  baseURL: 'https://api.vc.bilibili.com',
});
