import {
  LiveSignDto,
  LiveSignInfoDto,
  Silver2CoinDto,
  SilverStatusDto
} from '../dto/Live.dto';
import { liveApi } from './api';
import { stringify } from 'qs';
import { TaskConfig } from '../config/globalVar';
import { PureData } from '../dto/BiLiAbstractClass';

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

export async function sendMessage(
  rnd: number,
  roomid: number
): Promise<PureData> {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  const { data } = await liveApi.post(
    '/msg/send',
    stringify({
      color: 16777215,
      fontsize: 25,
      mode: 1,
      msg: 1,
      rnd,
      roomid,
      bubble: 0,
      csrf,
      csrf_token
    })
  );
  return data;
}
