import setCookie, { encodeCookie, getCookieItem } from '@/utils/cookie';

const DEF_COOKIE =
  'SESSDATA=4a480e95,1639884061,5f394*61; bili_jct=20caaccb9a577494ebfff10d8794b309; DedeUserID=781236152; DedeUserID__ckMd5=794ce27c5f185238; sid=66crlaql; fingerprint3=dc07b734860f34040b7892876e6862c5; fingerprint=76bd2c43c7f94fa7eeee73ec281992de';

describe('cookie 工具测试', () => {
  test('获取 value', () => {
    expect(getCookieItem(DEF_COOKIE, 'SESSDATA')).toBe('4a480e95,1639884061,5f394*61');
  });

  test('使用 setCookie 更新', () => {
    const newCookie = setCookie(DEF_COOKIE, ['DedeUserID=123456789; path=/']);
    expect(getCookieItem(newCookie, 'DedeUserID')).toBe('123456789');
  });

  test('使用 encodeCookie 编码值', () => {
    const newCookie = encodeCookie(DEF_COOKIE);
    expect(getCookieItem(newCookie, 'SESSDATA')).toBe('4a480e95%2C1639884061%2C5f394%2A61');
  });
});
