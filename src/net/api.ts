import { baseURLs, RefererURLs } from '../constant/biliUri';
import { biliHttp, createAxios, defHttp } from '../utils/axios';

const accountApi = createAxios({
  baseURL: baseURLs.account,
});

const liveApi = createAxios({
  baseURL: baseURLs.live,
  headers: {
    Referer: RefererURLs.www,
  },
});

const biliApi = createAxios({
  baseURL: baseURLs.api,
  headers: {
    Referer: RefererURLs.www,
  },
});

const mangaApi = createAxios({
  baseURL: baseURLs.manga,
});

const vcApi = createAxios({
  baseURL: baseURLs.vc,
});

export { biliApi, vcApi, accountApi, mangaApi, liveApi, biliHttp, defHttp };
