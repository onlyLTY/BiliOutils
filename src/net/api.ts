import { TaskConfig } from '@/config/globalVar';
import { baseURLs, RefererURLs } from '../constant/biliUri';
import { biliHttp, createRequest, defHttp } from '../utils/http';

const accountApi = createRequest({
  baseURL: baseURLs.account,
  headers: {
    'user-agent': TaskConfig.USER_AGENT,
  },
});

const liveApi = createRequest({
  baseURL: baseURLs.live,
  headers: {
    Referer: RefererURLs.www,
    'user-agent': TaskConfig.USER_AGENT,
  },
});

const biliApi = createRequest({
  baseURL: baseURLs.api,
  headers: {
    Referer: RefererURLs.www,
    'user-agent': TaskConfig.USER_AGENT,
  },
});

const mangaApi = createRequest({
  baseURL: baseURLs.manga,
  headers: {
    'user-agent': TaskConfig.USER_AGENT,
  },
});

const vcApi = createRequest({
  baseURL: baseURLs.vc,
  headers: {
    'user-agent': TaskConfig.USER_AGENT,
  },
});

export { biliApi, vcApi, accountApi, mangaApi, liveApi, biliHttp, defHttp };
