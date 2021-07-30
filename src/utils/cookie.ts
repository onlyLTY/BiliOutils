import { userConfig } from '../config/setConfig';

const { cookie } = userConfig;

function getCookieArray(cookie: string | undefined) {
  if (!cookie) return [];
  return cookie.split('; ').map(el => el.split('='));
}

function cookie2Obj(cookie: string, setCookie: any): object {
  let setCookieArr = getCookieArray(setCookie?.[0]).filter(
    el => el.length === 2,
  );
  let arr = getCookieArray(cookie)
    .concat(setCookieArr)
    .filter(el => el.length === 2);

  let obj = {};
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
  return obj;
}

function getCookieString(obj) {
  let string = Object.keys(obj).reduce((pre, cur) => {
    return pre + `${cur}=${obj[cur]}; `;
  }, '');
  return string.substring(0, string.length - 2 || 0);
}

export default function (cookie: string, setCookie: []) {
  if (!cookie) return '';
  if (!setCookie || setCookie.length === 0) return cookie;

  return getCookieString(cookie2Obj(cookie, setCookie));
}

export function getCookieItem(cookie: string, key: string) {
  if (!cookie) return null;
  const reg = `(?:^|)${key}=([^;]*)(?:;|$)`;
  const r = cookie.match(reg);
  return r ? r[1] : null;
}

export function getUserId(): number {
  return Number(getCookieItem(cookie, 'DedeUserID')) || 0;
}

export function getBiliJct(): string {
  return getCookieItem(cookie, 'bili_jct') || '';
}
