import type { IdType } from '../types';
import { stringify } from 'qs';
import {
  BagSendResDto,
  FansMedalPanelDto,
  JoinLotteryDto,
  LiveAreaDto,
  LiveCheckLotteryRes,
  LiveFansMedalDto,
  LiveGiftBagListDto,
  LiveRoomDto,
  LiveRoomInfoDto,
  LiveSignDto,
  LiveSignInfoDto,
  MyWalletDto,
  Silver2CoinDto,
  SilverStatusDto,
} from '../dto/live.dto';
import { liveApi } from './api';
import { TaskConfig } from '../config/globalVar';
import { PureDataProp } from '../dto/bili-base-prop';
import { getVisitId, random } from '../utils';
import { OriginURLs } from '../constant/biliUri';

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
  const { data } = await liveApi.get('/xlive/web-ucenter/v1/sign/WebGetSignInfo');
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
export async function sendMessage(roomid: number, msg: string): Promise<PureDataProp> {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  msg || (msg = random(10).toString());
  const { data } = await liveApi.post(
    '/msg/send',
    stringify({
      color: 5566168,
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
 * 获取勋章
 * @param page 页
 * @param pageSize 页大小
 * @param mid 用户id （其实可以随便一个）
 */
export async function getFansMedalPanel(
  page = 1,
  pageSize = 256,
  mid = 1,
): Promise<FansMedalPanelDto> {
  const { data } = await liveApi.get(
    `/xlive/app-ucenter/v1/fansMedal/panel?page=${page}&page_size=${pageSize}&target_id=${mid}`,
  );
  return data;
}

/**
 * 获取礼物背包列表
 * @param roomId 房间号(默认陈睿-嘻嘻)
 */
export async function getGiftBagList(roomId: IdType = 3394945): Promise<LiveGiftBagListDto> {
  const time = new Date().getTime();
  const { data } = await liveApi.get(
    `/xlive/web-room/v1/gift/bag_list?t=${time}&room_id=${roomId}`,
  );
  return data;
}

/**
 * 获取已有粉丝勋章的关注列表
 * @param pageNum 第几页
 */
export async function getLiveFansMedal(pageNum = 1, pageSize = 10): Promise<LiveFansMedalDto> {
  if (pageNum > 10) {
    pageNum = 10;
  }
  const { data } = await liveApi.get(
    `/xlive/app-ucenter/v1/user/GetMyMedals?page=${pageNum}&page_size=${pageSize}`,
  );
  return data;
}

/**
 * 获取直播间信息
 * @param roomid 直播间id
 */
export async function getLiveRoomInfo(roomid: number): Promise<LiveRoomInfoDto> {
  const { data } = await liveApi.get(`/room/v1/Room/get_info?room_id=${roomid}&from=room`);
  return data;
}

/**
 * 赠送礼物
 */
export async function sendBagGift({
  ruid,
  gift_num,
  bag_id,
  gift_id,
  roomid,
}: {
  ruid: IdType;
  gift_num: number;
  bag_id: number;
  gift_id: number;
  roomid: number;
}): Promise<BagSendResDto> {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  const postData = stringify({
    gift_id,
    ruid,
    gift_num,
    bag_id,
    biz_id: roomid,
    rnd: new Date().getTime(),
    send_ruid: 0,
    storm_beat_id: 0,
    metadata: '',
    price: 0,
    visit_id: '',
    csrf,
    platform: 'pc',
    biz_code: 'Live',
    csrf_token,
    uid: TaskConfig.USERID,
  });
  const { data } = await liveApi.post('/xlive/revenue/v2/gift/sendBag', postData, {
    headers: {
      Origin: OriginURLs.live,
    },
  });
  return data;
}

/**
 * 获取分区信息
 */
export async function getArea(): Promise<LiveAreaDto> {
  const { data } = await liveApi.get('/xlive/web-interface/v1/index/getWebAreaList?source_id=2');
  return data;
}

/**
 * 获取直播间列表
 * @param parentArea
 * @param areaId
 * @param page
 */
export async function getLiveRoom(
  parentArea: IdType,
  areaId: IdType,
  page = 1,
): Promise<LiveRoomDto> {
  const { data } = await liveApi.get(
    `/xlive/web-interface/v1/second/getList?platform=web&parent_area_id=${parentArea}&area_id=${areaId}&page=${page}`,
  );
  return data;
}

/**
 * 检查天选时刻状态（lottery）
 * @param roomId 直播间id
 */
export async function checkLottery(roomId: IdType): Promise<LiveCheckLotteryRes> {
  const { data } = await liveApi.get(`/xlive/lottery-interface/v1/Anchor/Check?roomid=${roomId}`);
  return data;
}

/**
 * 天选抽奖
 */
export async function joinLottery(options: {
  id: IdType;
  gift_id: IdType;
  gift_num: number;
}): Promise<JoinLotteryDto> {
  const { data } = await liveApi.post(
    `/xlive/lottery-interface/v1/Anchor/Join`,
    stringify({
      ...options,
      csrf: TaskConfig.BILIJCT,
      csrf_token: TaskConfig.BILIJCT,
      visit_id: getVisitId(),
      platform: 'pc',
    }),
  );
  return data;
}
