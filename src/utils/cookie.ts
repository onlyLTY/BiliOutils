import { TaskConfig } from '@/config/globalVar';
import { isString } from './is';

function getCookieArray(cookie: string | undefined) {
  if (!cookie) return [];
  return cookie.split('; ').map(el => el.split('='));
}

/**
 * 处理 set-cookie
 * @param setCookieArray
 */
function getSetCookieValue(setCookieArray: string[]) {
  let cookieStr = '';
  setCookieArray.forEach(setCookie => {
    const cookie = setCookie.split('; ')[0];
    cookieStr += cookie + '; ';
  });
  return cookieStr.substring(0, cookieStr.length - 2 || 0);
}

function cookie2Obj(cookie: string): Record<string, string> {
  const arr = getCookieArray(cookie).filter(el => el.length === 2);

  const obj = {};
  for (const it of arr) {
    if (obj[it[0]]) {
      obj[it[0]] = it[1];
    } else {
      Object.defineProperty(obj, it[0], {
        value: it[1],
        enumerable: true,
        writable: true,
      });
    }
  }
  Object.keys(obj).forEach(key => {
    obj[key] = encodeCookieValue(obj[key]);
  });
  return obj;
}

function encodeCookieValue(val: string) {
  return encodeURIComponent(val)
    .replaceAll('%7C', '|')
    .replaceAll('%2B', '+')
    .replaceAll('%25', '%')
    .replaceAll('*', '%2A');
}

export function encodeCookie(cookie: string) {
  return getCookieString(cookie2Obj(cookie));
}

function getCookieString(obj: object) {
  const string = Object.keys(obj).reduce((pre, cur) => pre + `${cur}=${obj[cur]}; `, '');
  return string.substring(0, string.length - 2 || 0);
}

export default function getCookie(cookie: string, setCookie: string[] | string) {
  if (!cookie && cookie !== '') return '';
  if (isString(setCookie)) setCookie = [setCookie];
  if (!setCookie || setCookie.length === 0) return cookie;

  return getCookieString({ ...cookie2Obj(cookie), ...cookie2Obj(getSetCookieValue(setCookie)) });
}
export { getCookie };

export function getCookieItem(cookie: string, key: string) {
  if (!cookie) return null;
  const reg = `(?:^|)${key}=([^;]*)(?:;|$)`;
  const r = cookie.match(reg);
  return r ? r[1] : null;
}

export function getUserId(cookie: string): number {
  return Number(getCookieItem(cookie, 'DedeUserID')) || 0;
}

export function getBiliJct(cookie: string): string {
  return getCookieItem(cookie, 'bili_jct') || '';
}

export function getLIVE_BUVID(cookie: string): string {
  return getCookieItem(cookie, 'LIVE_BUVID') || '';
}

export class CookieJar {
  private cookie: string;

  constructor(cookie?: string) {
    this.cookie = cookie;
  }

  getCookieString() {
    return this.cookie;
  }

  setCookie(rawCookie: string) {
    this.cookie = getCookie(this.cookie, rawCookie);
  }

  toJSON() {
    return cookie2Obj(this.cookie);
  }

  getCookieItem(key: string) {
    return getCookieItem(this.cookie, key);
  }
}

export class BiliCookieJar {
  async getCookieString() {
    return TaskConfig.cookie;
  }

  async setCookie(rawCookie: string) {
    TaskConfig.cookie = getCookie(TaskConfig.cookie, rawCookie);
  }
}
