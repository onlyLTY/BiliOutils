import type { IdType } from '../types';
import type {
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
import type { PureDataProp } from '../dto/bili-base-prop';
import { liveApi } from './api';
import { TaskConfig } from '../config/globalVar';
import { getVisitId, random } from '../utils';
import { OriginURLs } from '../constant/biliUri';

/**
 * 直播签到
 */
export function doLiveSign(): Promise<LiveSignDto> {
  return liveApi.get('/xlive/web-ucenter/v1/sign/DoSign');
}

/**
 * 直播签到信息
 */
export function webGetSignInfo(): Promise<LiveSignInfoDto> {
  return liveApi.get('/xlive/web-ucenter/v1/sign/WebGetSignInfo');
}

/**
 * 银瓜子兑换硬币
 */
export function exchangeSilver2Coin(): Promise<Silver2CoinDto> {
  return liveApi.post('/xlive/revenue/v1/wallet/silver2coin', {
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT,
  });
}

/**
 * 瓜子交换信息
 */
export function exchangeStatus(): Promise<SilverStatusDto> {
  return liveApi.get('/xlive/revenue/v1/wallet/getStatus');
}

/**
 * 瓜子交换信息
 */
export function getMyWallet(): Promise<MyWalletDto> {
  return liveApi.get('/xlive/revenue/v1/wallet/myWallet?need_bp=1&need_metal=1&platform=pc');
}

/**
 * 发送一个直播弹幕
 * @param roomid 直播房间号
 * @param msg 消息
 */
export function sendMessage(roomid: number, msg: string): Promise<PureDataProp> {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  msg || (msg = random(10).toString());
  return liveApi.post('/msg/send', {
    color: 5566168,
    fontsize: 25,
    mode: 1,
    msg,
    rnd: Date.now(),
    roomid,
    bubble: 0,
    csrf,
    csrf_token,
  });
}

/**
 * 获取勋章
 * @param page 页
 * @param pageSize 页大小
 * @param mid 用户id （其实可以随便一个）
 */
export function getFansMedalPanel(page = 1, pageSize = 256, mid = 1): Promise<FansMedalPanelDto> {
  return liveApi.get(
    `/xlive/app-ucenter/v1/fansMedal/panel?page=${page}&page_size=${pageSize}&target_id=${mid}`,
  );
}

/**
 * 获取礼物背包列表
 * @param roomId 房间号(默认陈睿-嘻嘻)
 */
export function getGiftBagList(roomId: IdType = 3394945): Promise<LiveGiftBagListDto> {
  const time = new Date().getTime();
  return liveApi.get(`/xlive/web-room/v1/gift/bag_list?t=${time}&room_id=${roomId}`);
}

/**
 * 获取已有粉丝勋章的关注列表
 * @param pageNum 第几页
 */
export function getLiveFansMedal(pageNum = 1, pageSize = 10): Promise<LiveFansMedalDto> {
  if (pageNum > 10) {
    pageNum = 10;
  }
  return liveApi.get(
    `/xlive/app-ucenter/v1/user/GetMyMedals?page=${pageNum}&page_size=${pageSize}`,
  );
}

/**
 * 获取直播间信息
 * @param roomid 直播间id
 */
export function getLiveRoomInfo(roomid: number): Promise<LiveRoomInfoDto> {
  return liveApi.get(`/room/v1/Room/get_info?room_id=${roomid}&from=room`);
}

/**
 * 赠送礼物
 */
export function sendBagGift({
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
  const postData = {
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
  };
  return liveApi.post('/xlive/revenue/v2/gift/sendBag', postData, {
    headers: {
      Origin: OriginURLs.live,
    },
  });
}

/**
 * 获取分区信息
 */
export function getArea(): Promise<LiveAreaDto> {
  return liveApi.get('/xlive/web-interface/v1/index/getWebAreaList?source_id=2');
}

/**
 * 获取直播间列表
 * @param parentArea
 * @param areaId
 * @param page
 */
export function getLiveRoom(parentArea: IdType, areaId: IdType, page = 1): Promise<LiveRoomDto> {
  return liveApi.get(
    `/xlive/web-interface/v1/second/getList?platform=web&parent_area_id=${parentArea}&area_id=${areaId}&page=${page}`,
  );
}

/**
 * 检查天选时刻状态（lottery）
 * @param roomId 直播间id
 */
export function checkLottery(roomId: IdType): Promise<LiveCheckLotteryRes> {
  return liveApi.get(`/xlive/lottery-interface/v1/Anchor/Check?roomid=${roomId}`);
}

/**
 * 天选抽奖
 */
export function joinLottery(options: {
  id: IdType;
  gift_id: IdType;
  gift_num: number;
}): Promise<JoinLotteryDto> {
  return liveApi.post(`/xlive/lottery-interface/v1/Anchor/Join`, {
    ...options,
    csrf: TaskConfig.BILIJCT,
    csrf_token: TaskConfig.BILIJCT,
    visit_id: getVisitId(),
    platform: 'pc',
  });
}
