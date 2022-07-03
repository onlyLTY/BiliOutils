function getCookieArray(cookie: string | undefined) {
  if (!cookie) return [];
  return cookie.split('; ').map(el => el.split('='));
}

function cookie2Obj(cookie: string, setCookie?: unknown): object {
  const setCookieArr = getCookieArray(setCookie?.[0]).filter(el => el.length === 2);
  const arr = getCookieArray(cookie)
    .concat(setCookieArr)
    .filter(el => el.length === 2);

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

function encodeCookieValue(val: string): string {
  return encodeURIComponent(val)
    .replaceAll('%7C', '|')
    .replaceAll('%2B', '+')
    .replaceAll('%25', '%')
    .replaceAll('*', '%2A');
}

export function encodeCookie(cookie: string) {
  return getCookieString(cookie2Obj(cookie));
}

function getCookieString(obj: object): string {
  const string = Object.keys(obj).reduce((pre, cur) => {
    return pre + `${cur}=${obj[cur]}; `;
  }, '');
  return string.substring(0, string.length - 2 || 0);
}

export default function (cookie: string, setCookie: string[]) {
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

export function getUserId(cookie: string): number {
  return Number(getCookieItem(cookie, 'DedeUserID')) || 0;
}

export function getBiliJct(cookie: string): string {
  return getCookieItem(cookie, 'bili_jct') || '';
}

export function getLIVE_BUVID(cookie: string): string {
  return getCookieItem(cookie, 'LIVE_BUVID') || '';
}
