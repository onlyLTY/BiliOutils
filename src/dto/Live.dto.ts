import { ApiBaseProp, PureDataProp } from './BiLiBaseProp';

/** 直播签到 */
export interface LiveSignDto extends ApiBaseProp {
  data?: { text: string; hadSignDays: number; specialText: string } | null;
}

/** 直播签到信息 */
export interface LiveSignInfoDto extends ApiBaseProp {
  data?: {
    text: string;
    hadSignDays: number;
    specialText: string;
    status: 0 | 1;
  };
}

/** 获取瓜子状态 */
export interface SilverStatusDto extends ApiBaseProp {
  data: {
    silver: number; //银瓜子
    gold: number; //金瓜子
    coin: number; //硬币
    coin_2_silver_left: number; //
    silver_2_coin_left: 1 | 0; // (银瓜子到硬币)
    status: number;
    vip: number;
  };
}

/** 瓜子换硬币 */
export interface Silver2CoinDto extends PureDataProp {
  /**
   * 0 成功
   * 403 今日兑换过
   */
  code: number;
  data: {
    coin: number;
    gold: number;
    silver: number;
    /** eg: Silver2Coin00000000000000000000000 */
    tid: string;
  };
}

/** 我的钱包 */
export interface MyWalletDto extends ApiBaseProp {
  data: {
    gold: number;
    silver: number;
    bp: string;
    /** 硬币数 */
    metal: number;
  };
}

/** 获取有勋章的直播间 */
export interface FansMedalDto extends PureDataProp {
  data: {
    medalCount: number;
    count: number;
    /** 你的名字 */
    name: string;
    pageinfo: {
      totalpages: number;
      curPage: number;
    };
    fansMedalList: {
      /** 你的id */
      uid: number;
      target_id: number;
      medal_id: number;
      /** 经验 */
      score: number;
      level: number;
      intimacy: number;
      status: number;
      source: number;
      receive_channel: number;
      is_receive: number;
      master_status: number;
      // receive_time: string;
      // today_intimacy: number;
      // last_wear_time: number;
      // is_lighted: number;
      // medal_level: number;
      // next_intimacy: number;
      // day_limit: number;
      /** 勋章名 */
      // medal_name: number;
      // master_available: number;
      // guard_type: number;
      // lpl_status: number;
      // can_delete: boolean;
      /** up主名字 */
      target_name: string;
      /** up主头像 */
      // target_face: string;
      // live_stream_status: number;
      // icon_code: number;
      // icon_text: string;
      // rank: string;
      // medal_color: string;
      // medal_color_start: number;
      // medal_color_end: number;
      // guard_level: number;
      // medal_color_border: number;
      /** 下面三个都是今日已经获得亲密度 */
      todayFeed: number;
      // today_feed: number;
      // dayLimit: number;
      // uname: string;
      color: number;
      medalName: string;
      guard_medal_title: string;
      anchorInfo: object;
      roomid: number;
    }[];
  };
}
