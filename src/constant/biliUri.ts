import { ContentTypeEnum } from '../enums/http.enum';

export const OriginURLs = {
  account: 'https://account.bilibili.com',
  live: 'https://live.bilibili.com',
  space: 'https://space.bilibili.com',
  message: 'https://message.bilibili.com',
  www: 'https://www.bilibili.com',
  manga: 'https://manga.bilibili.com',
};

export const RefererURLs = {
  www: 'https://www.bilibili.com/',
};

export const baseURLs = {
  account: 'https://account.bilibili.com',
  live: 'https://api.live.bilibili.com',
  api: 'https://api.bilibili.com',
  manga: 'https://manga.bilibili.com',
  vc: 'https://api.vc.bilibili.com',
  liveTrace: 'https://live-trace.bilibili.com',
};

export const defaultHeaders = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36 Edg/101.0.1210.32',
  'content-type': ContentTypeEnum.FORM_URLENCODED,
  'accept-language': 'zh-CN,zh;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
};

interface UAOption {
  version?: string;
  phone?: string;
  build?: string | number;
  channel?: string;
  os?: string;
}

export function getAndroidUA({
  version = '6.74.0',
  phone = 'MI 10 Pro',
  build = '6740400',
  channel = 'xiaomi',
  os = '10',
}: UAOption = {}) {
  return `Mozilla/5.0 BiliDroid/${version} (bbcallen@gmail.com) os/android model/${phone} mobi_app/android build/${build} channel/${channel} innerVer/${channel} osVer/${os} network/2`;
}
