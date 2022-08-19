import { defaultFunc, encrypt } from '@/wasm/wasm_rsa_umd';
import { logger, sleep } from '@/utils';
import axios from 'axios';
import { createServer } from 'http';

interface ApiBaseProp<T = object | number | null> {
  code: number;
  message: string;
  ttl: number;
  data: T;
}

type CookieInfoDto = ApiBaseProp<{ refresh: boolean; timestamp: number }>;

/**
 * refreshCookie
 */
type RefreshCookieDto = ApiBaseProp<{
  status: number;
  message: string;
  refresh_token: string;
}>;

const headers = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36 Edg/101.0.1210.32',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'accept-language': 'zh-CN,zh;q=0.9',
};

class PassportApi {
  baseURL = 'https://passport.bilibili.com/';

  async get<T>(url: string) {
    const { data } = await axios.get<T>(this.baseURL + url, {
      headers,
    });
    return data;
  }

  async post<T>(url: string, config?: Record<string, any>) {
    const { data } = await axios.post<T>(this.baseURL + url, {
      headers,
      data: config,
    });
    return data;
  }
}

const passportApi = new PassportApi();

function getCookieInfoApi(csrf: string) {
  return passportApi.get<CookieInfoDto>(`x/passport-login/web/cookie/info?csrf=${csrf}`);
}

async function getCorrespondHtmlApi(code: string) {
  const { data } = await axios.get<string>(`https://www.bilibili.com/correspond/1/${code}`, {
    responseType: 'text',
  });
  return data;
}

/**
 * 刷新 cookie
 */
function refreshCookieApi(csrf: string, refresh_csrf: string, refresh_token: string) {
  return passportApi.post<RefreshCookieDto>(`x/passport-login/web/cookie/refresh`, {
    csrf,
    refresh_csrf,
    source: 'main_web',
    refresh_token,
  });
}

/**
 * 确定刷新 token
 */
function confirmRefreshApi(csrf: string, refresh_token: string) {
  return passportApi.post<ApiBaseProp>(`x/passport-login/web/confirm/refresh`, {
    csrf,
    refresh_token,
  });
}

function convertToHex(str: string) {
  return str.split('').reduce((i, t) => i + t.charCodeAt(0).toString(16), '');
}

async function getCookieInfo(csrf: string) {
  try {
    const { data, code, message } = await getCookieInfoApi(csrf);
    if (code !== 0 || !data.refresh) {
      logger.warn(`获取 cookie 信息失败 ${code} ${message}`);
      return;
    }
    return data.timestamp;
  } catch (error) {
    logger.error('获取 cookie/info 异常');
    logger.error(error);
  }
}

async function getCorrespondCode(timestamp: number) {
  await defaultFunc();
  return encrypt({
    data: convertToHex(`refresh_${timestamp}`),
    digest: 'SHA256',
  });
}

async function getRefreshCsrf() {
  const timestamp = await getCookieInfo();
  if (!timestamp) {
    return;
  }
  const code = await getCorrespondCode(timestamp);
  try {
    await sleep(300);
    const html = await getCorrespondHtmlApi(code);
    if (html) {
      return html.match(/<div id="1-name">(\w+)<\/div>/)?.[1];
    }
  } catch (error) {
    logger.error('获取 refresh_csrf 异常');
    logger.error(error);
  }
}

/**
 * 刷新 cookie
 */
async function refreshCookie(csrf: string, refresh_csrf: string, refresh_token: string) {
  try {
    const { data, code } = await refreshCookieApi(csrf, refresh_csrf, refresh_token);
    if (code === 0) {
      return data.refresh_token;
    }
  } catch (error) {
    logger.error('刷新 cookie 异常');
    logger.error(error);
  }
}

/**
 * 确定 refreshToken
 */
async function confirmRefreshToken(csrf: string, refreshToken: string) {
  try {
    const { code } = await confirmRefreshApi(csrf, refreshToken);
    if (code === 0) {
      logger.info('确定 refreshToken 成功');
      return true;
    }
  } catch (error) {
    logger.error('确定 refreshToken 异常');
    logger.error(error);
  }
}

export async function refreshCookieService() {
  const refreshToken = '',
    refresh_csrf = await getRefreshCsrf(),
    csrf = '',
    refresh_token = '';
  if (!refresh_csrf) return;
  const newRefreshToken = await refreshCookie(csrf, refresh_csrf, refresh_token);
  if (!newRefreshToken) return;
  await confirmRefreshToken(csrf, refreshToken);
}
