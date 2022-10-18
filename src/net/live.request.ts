import type { IdType } from '../types';
import type {
  BagSendResDto,
  Bp2GoldDto,
  DanmuDto,
  FansMedalPanelDto,
  JoinLotteryDto,
  JoinRedPacketRes,
  LiveAreaDto,
  LiveCheckLotteryRes,
  LiveCheckRedRes,
  LiveFansMedalDto,
  LiveFollowListDto,
  LiveGiftBagListDto,
  LiveRoomDto,
  LiveRoomInfoDto,
  LiveSignDto,
  LiveSignInfoDto,
  MyWalletDto,
  OnlineGoldRankDto,
  Silver2CoinDto,
  SilverStatusDto,
} from '../dto/live.dto';
import type { PureDataProp } from '../dto/bili-base-prop';
import { liveApi } from './api';
import { TaskConfig } from '../config/globalVar';
import { createVisitId, getUnixTime, random } from '../utils';
import { OriginURLs } from '../constant/biliUri';
import { appSignString } from '@/utils/bili';

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
 * b币兑换电池
 */
export function exchangeBattery(couponBalance: number) {
  const pay_bp = couponBalance * 1000;
  return liveApi.post<Bp2GoldDto>('xlive/revenue/v1/order/createOrder', {
    platform: 'pc',
    pay_bp,
    context_id: 13142548, // 直播间 id
    context_type: 1, // 直播间相关，未知
    goods_id: 1,
    goods_num: couponBalance,
    goods_type: 2, // 未知
    ios_bp: 0, // 消耗
    common_bp: pay_bp, // 消耗
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT,
    visit_id: createVisitId(),
  });
}

/**
 * 瓜子交换信息
 */
export function exchangeStatus(): Promise<SilverStatusDto> {
  return liveApi.get('/xlive/revenue/v1/wallet/getStatus');
}

/**
 * 我的钱包
 */
export function getMyWallet(): Promise<MyWalletDto> {
  return liveApi.get('/xlive/revenue/v1/wallet/myWallet?need_bp=1&need_metal=1&platform=pc');
}

/**
 * 发送一个直播弹幕
 * @param roomid 直播房间号
 * @param msg 消息
 * @param dm_type 弹幕类型，1 为表情
 */
export function sendMessage(roomid: number, msg: string, dm_type?: number): Promise<PureDataProp> {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  msg || (msg = random(10).toString());
  const data: Record<string, any> = {
    bubble: 0,
    msg,
    color: 5566168,
    mode: 1,
    fontsize: 25,
    rnd: getUnixTime(),
    roomid,
    csrf,
    csrf_token,
  };
  dm_type && (data.dm_type = dm_type);
  return liveApi.post('/msg/send', data);
}

/**
 * 获取勋章
 * @param page 页
 * @param pageSize 页大小
 */
export function getFansMedalPanel(page = 1, pageSize = 50): Promise<FansMedalPanelDto> {
  return liveApi.get(
    `xlive/app-ucenter/v1/fansMedal/panel?${appSignString({
      page,
      page_size: pageSize,
    })}`,
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
    visit_id: createVisitId(),
    platform: 'pc',
  });
}

/**
 * 检查直播红包状态
 * @param roomId 直播间id
 */
export function checkRedPacket(roomId: IdType) {
  return liveApi.get<LiveCheckRedRes>(
    `/xlive/lottery-interface/v1/lottery/getLotteryInfoWeb?roomid=${roomId}`,
  );
}

/**
 * 抢直播红包
 * @param params 直播间id，红包id，用户id
 */
export function joinRedPacket(params: { room_id: IdType; ruid: IdType; lot_id: IdType }) {
  return liveApi.post<JoinRedPacketRes>(
    `/xlive/lottery-interface/v1/popularityRedPocket/RedPocketDraw`,
    {
      ...params,
      spm_id: '444.8.red_envelope.extract',
      jump_from: '26000',
      c_locale: 'en_US',
      device: 'android',
      mobi_app: 'android',
      platform: 'android',
      channel: 'xiaomi',
      version: '6.79.0',
      statistics: { appId: 1, platform: 3, version: '6.79.0', abtest: '' },
      session_id: '',
      csrf_token: TaskConfig.BILIJCT,
      csrf: TaskConfig.BILIJCT,
      visit_id: '',
    },
    {
      headers: {
        'user-agent': TaskConfig.mobileUA,
      },
    },
  );
}

/**
 * 已关注用户的直播间列表
 */
export function getFollowLiveRoomList(page = 1, page_size = 9) {
  return liveApi.get<LiveFollowListDto>(
    `/xlive/web-ucenter/user/following?page=${page}&page_size=${page_size}`,
  );
}

/**
 * 获取弹幕信息
 */
export function getDanmuInfo(room_id: number) {
  return liveApi.get<DanmuDto>(`xlive/web-room/v1/index/getDanmuInfo?id=${room_id}`);
}

/**
 * 获取在线排名
 */
export function getOnlineGoldRank(ruid: number, room_id: number) {
  return liveApi.get<OnlineGoldRankDto>(
    `xlive/general-interface/v1/rank/getOnlineGoldRank?ruid=${ruid}&roomId=${room_id}&page=1&pageSize=1`,
  );
}
