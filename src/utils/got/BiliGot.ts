import { BiliCookieJar } from '@/config/globalVar';
import type { VGotOptions } from '@/types/got';
import { CookieJar } from '../cookie';
import { CookieJarType, VGot } from './Got';

export class BiliGot extends VGot {
  cookieJar: CookieJarType = null;

  constructor(options: VGotOptions) {
    super(options);
    // 处理 cookie
    const { withBiliCookie, withCredentials } = this.options.requestOptions || {};
    if (withBiliCookie) {
      this.cookieJar = new BiliCookieJar();
    } else if (withCredentials) {
      this.cookieJar = new CookieJar();
    }
  }
}
