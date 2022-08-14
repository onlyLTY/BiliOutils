import { TaskConfig } from '@/config/globalVar';
import { baseURLs, OriginURLs, RefererURLs } from '../constant/biliUri';
import { biliHttp, createRequest, defHttp } from '../utils/http';

export { biliHttp, defHttp };

export const accountApi = createRequest({
  baseURL: baseURLs.account,
  headers: {
    'user-agent': TaskConfig.userAgent,
  },
});

export const liveApi = createRequest({
  baseURL: baseURLs.live,
  headers: {
    Referer: RefererURLs.www,
    'user-agent': TaskConfig.userAgent,
  },
});

export const biliApi = createRequest({
  baseURL: baseURLs.api,
  headers: {
    Referer: RefererURLs.www,
    'user-agent': TaskConfig.userAgent,
  },
});

export const mangaApi = createRequest({
  baseURL: baseURLs.manga,
  headers: {
    'user-agent': TaskConfig.userAgent,
  },
});

export const vcApi = createRequest({
  baseURL: baseURLs.vc,
  headers: {
    'user-agent': TaskConfig.userAgent,
    Referer: RefererURLs.www,
  },
});

export const liveTraceApi = createRequest({
  baseURL: baseURLs.liveTrace,
  headers: {
    'user-agent': TaskConfig.userAgent,
  },
});

export const passportApi = createRequest({
  baseURL: baseURLs.passport,
  headers: {
    'user-agent': TaskConfig.userAgent,
    Referer: RefererURLs.www,
    Origin: OriginURLs.www,
  },
});
