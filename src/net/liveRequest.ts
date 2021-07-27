import {
  FansMedalDto,
  LiveSignDto,
  LiveSignInfoDto,
  MyWalletDto,
  Silver2CoinDto,
  SilverStatusDto,
} from '../dto/Live.dto';
import { liveApi } from './api';
import { stringify } from 'qs';
import { TaskConfig } from '../config/globalVar';
import { PureDataProp } from '../dto/BiLiBaseProp';
import { random } from '../utils';

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
  const { data } = await liveApi.post(
    '/xlive/revenue/v1/wallet/silver2coin',
    stringify({
      csrf_token: TaskConfig.BILIJCT,
      csrf: TaskConfig.BILIJCT,
    }),
  );
  return data;
}

/**
 * 瓜子交换信息
 */
export async function exchangeStatus(): Promise<SilverStatusDto> {
  const { data } = await liveApi.get('/xlive/revenue/v1/wallet/getStatus');
  return data;
}

/**
 * 瓜子交换信息
 */
export async function getMyWallet(): Promise<MyWalletDto> {
  const { data } = await liveApi.get(
    '/xlive/revenue/v1/wallet/myWallet?need_bp=1&need_metal=1&platform=pc',
  );
  return data;
}

/**
 * 发送一个直播弹幕
 * @param roomid 直播房间号
 * @param msg 消息
 */
export async function sendMessage(
  roomid: number,
  msg: string,
): Promise<PureDataProp> {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  msg || (msg = random(10).toString());
  const { data } = await liveApi.post(
    '/msg/send',
    stringify({
      color: 16777215,
      fontsize: 25,
      mode: 1,
      msg,
      rnd: Date.now(),
      roomid,
      bubble: 0,
      csrf,
      csrf_token,
    }),
  );
  return data;
}

/**
 * 获取有勋章的直播间
 * @param page 页
 * @param pageSize 页大小
 */
export async function getFansMedalList(
  page: number = 1,
  pageSize: number = 50,
): Promise<FansMedalDto> {
  const { data } = await liveApi.get(
    `/fans_medal/v5/live_fans_medal/iApiMedal?page=${page}&pageSize=${pageSize}`,
  );
  return data;
}
