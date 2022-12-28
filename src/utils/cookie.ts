import { isString } from './is';

export function getCookieJSON(cookie: string | undefined): Record<string, string> {
  if (!cookie) return {};
  // 使用正则表达式获取 cookie 键值对，并转换为对象
  const matchArray = cookie.match(/([^;=]+)(?:=([^;]*))?/g);
  if (!matchArray) return {};
  return matchArray.reduce((pre, cur) => {
    const [key, value] = cur.trim().split('=');
    pre[key] = encodeCookieValue(value);
    return pre;
  }, {});
}

/**
 * 处理 set-cookie
 * @param setCookieArray
 */
function getSetCookieValue(setCookieArray: string[]) {
  let cookieStr = '';
  setCookieArray.forEach(setCookie => (cookieStr += setCookie.split('; ')[0] + '; '));
  if (cookieStr.endsWith('; ')) {
    cookieStr = cookieStr.substring(0, cookieStr.length - 2 || 0);
  }
  return cookieStr;
}

function encodeCookieValue(val: string) {
  return encodeURIComponent(val)
    .replaceAll('%7C', '|')
    .replaceAll('%2B', '+')
    .replaceAll('%25', '%')
    .replaceAll('*', '%2A');
}

export function encodeCookie(cookie: string) {
  return getCookieString(getCookieJSON(cookie));
}

function getCookieString(obj: object) {
  const string = Object.keys(obj).reduce((pre, cur) => pre + `${cur}=${obj[cur]}; `, '');
  return string.substring(0, string.length - 2 || 0);
}

export default function getCookie(cookie = '', setCookie: string[] | string) {
  if (isString(setCookie)) setCookie = [setCookie];
  if (!setCookie || setCookie.length === 0) return cookie;

  return getCookieString({
    ...getCookieJSON(cookie),
    ...getCookieJSON(getSetCookieValue(setCookie)),
  });
}
export { getCookie };

export function getCookieItem(cookie: string | undefined, key: string) {
  if (!cookie) return null;
  const reg = `(?:^| )${key}=([^;]*)(?:;|$)`;
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
    if (cookie) {
      this.cookie = cookie;
    }
  }

  getCookieString() {
    return this.cookie;
  }

  setCookie(rawCookie: string) {
    this.cookie = getCookie(this.cookie, rawCookie);
  }

  toJSON() {
    return getCookieJSON(this.cookie);
  }

  getCookieItem(key: string) {
    return getCookieItem(this.cookie, key);
  }
}

export function isBiliCookie(cookie: string) {
  return Boolean(
    cookie &&
      cookie.length > 90 &&
      ['bili_jct', 'SESSDATA', 'DedeUserID'].every(str => cookie.includes(str)),
  );
}

(async () => {
  const a = new CookieJar();
  [
    'SESSDATA=e860d3ee%2C1686573108%2C5b7a7%2Ac1; Path=/; Domain=bilibili.com; Expires=Mon, 12 Jun 2023 12:31:48 GMT; HttpOnly; Secure',
    'bili_jct=4b403a186c5cde6f9e52be10c2cd9695; Path=/; Domain=bilibili.com; Expires=Mon, 12 Jun 2023 12:31:48 GMT',
    'DedeUserID=357123798; Path=/; Domain=bilibili.com; Expires=Mon, 12 Jun 2023 12:31:48 GMT',
    'DedeUserID__ckMd5=8aa3b2eff1fa70ed; Path=/; Domain=bilibili.com; Expires=Mon, 12 Jun 2023 12:31:48 GMT',
    'sid=h1j3dijd; Path=/; Domain=bilibili.com; Expires=Mon, 12 Jun 2023 12:31:48 GMT',
  ].forEach(setCookie => a.setCookie(setCookie));
})();
