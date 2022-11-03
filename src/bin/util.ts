/**
 * 替换最新的 cookie
 */
export async function replaceNewCookie() {
  if (!process.env.__BT_CONFIG_PATH__) {
    return;
  }
  const { BiliCookieJar } = await import('@/config/globalVar');
  const { getCookieItem } = await import('@/utils/cookie');
  const { replaceAllCookie } = await import('@/utils/file');
  const cookieJar = new BiliCookieJar(),
    cookie = await cookieJar.getCookieString(),
    mid = getCookieItem(cookie, 'DedeUserID');
  mid && replaceAllCookie(process.env.__BT_CONFIG_PATH__, mid, cookie);
}
