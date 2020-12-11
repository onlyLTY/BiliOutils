import { LiveSignDto, LiveSignInfoDto } from '../dto/Live.dto';
import { liveApi } from './api';

/**
 * 直播签到
 */
export async function doLiveSign(): Promise<LiveSignDto> {
  const { data } = await liveApi.get('/xlive/web-ucenter/v1/sign/DoSign');

  return data;
}

/**
 * 直播签到信息
 */
export async function webGetSignInfo(): Promise<LiveSignInfoDto> {
  const { data } = await liveApi.get(
    '/xlive/web-ucenter/v1/sign/WebGetSignInfo'
  );
  return data;
}
