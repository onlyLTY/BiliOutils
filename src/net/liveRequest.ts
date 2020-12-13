import {
  LiveSignDto,
  LiveSignInfoDto,
  Silver2CoinDto,
  SilverStatusDto,
} from '../dto/Live.dto';
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
    '/xlive/web-ucenter/v1/sign/WebGetSignInfo',
  );
  return data;
}

/**
 * 银瓜子兑换硬币
 */
export async function exchangeSilver2Coin(): Promise<Silver2CoinDto> {
  const { data } = await liveApi.get('/pay/v1/Exchange/silver2coin');
  return data;
}

/**
 * 瓜子交换信息
 */
export async function exchangeStatus(): Promise<SilverStatusDto> {
  const { data } = await liveApi.get('/pay/v1/Exchange/getStatus');
  return data;
}
