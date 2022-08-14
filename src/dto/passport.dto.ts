import type { ApiBaseProp } from './bili-base-prop';

export type CookieInfoDto = ApiBaseProp<{ refresh: boolean; timestamp: number }>;

/**
 * refreshCookie
 */
export type RefreshCookieDto = ApiBaseProp<{
  status: number;
  message: string;
  refresh_token: string;
}>;
