import type { VGotOptions } from '@catlair/node-got';
import { BiliCookieJar } from '@/config/globalVar';
import { VGot } from '@catlair/node-got';
import { CookieJar } from '../cookie';

export class BiliGot extends VGot {
  constructor(options: VGotOptions) {
    // 处理 cookie
    const { withBiliCookie, withCredentials } = options.requestOptions || {};
    if (withBiliCookie) {
      options.cookieJar = new BiliCookieJar();
    } else if (withCredentials) {
      options.cookieJar = new CookieJar();
    }
    super(options);
  }
}
