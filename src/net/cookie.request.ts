import type { CookieInfoDto, RefreshCookieDto } from '@/dto/passport.dto';
import type { ApiBaseProp } from '@/dto/bili-base-prop';
import { TaskConfig } from '@/config/globalVar';
import { biliHttp, passportApi } from '@/net/api';

export function getCookieInfo() {
  return passportApi.get<CookieInfoDto>(
    `x/passport-login/web/cookie/info?csrf=${TaskConfig.BILIJCT}`,
  );
}

export function getCorrespondHtml(code: string) {
  return biliHttp.get<string>(`https://www.bilibili.com/correspond/1/${code}`);
}

/**
 * 刷新 cookie
 */
export function refreshCookie(refresh_csrf: string) {
  return passportApi.post<RefreshCookieDto>(`x/passport-login/web/cookie/refresh`, {
    csrf: TaskConfig.BILIJCT,
    refresh_csrf,
    source: 'main_web',
    refresh_token: TaskConfig.acTimeValue,
  });
}

/**
 * 确定刷新 token
 */
export function confirmRefreshToken(refresh_token: string) {
  return passportApi.post<ApiBaseProp>(`x/passport-login/web/confirm/refresh`, {
    csrf: TaskConfig.BILIJCT,
    refresh_token,
  });
}
