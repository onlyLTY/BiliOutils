import { ApiAbstract, PureData } from './BiLiAbstractClass';

//直播签到
export class LiveSignDto extends ApiAbstract {
  data?: { text: string; hadSignDays: number; specialText: string } | null;
}

//直播签到信息
export class LiveSignInfoDto extends ApiAbstract {
  data?: {
    text: string;
    hadSignDays: number;
    specialText: string;
    status: 0 | 1;
  };
}

//获取瓜子状态
export class SilverStatusDto {
  'code': number;
  'msg': string;
  'message': string;
  'data': {
    silver: number; //银瓜子
    gold: number; //金瓜子
    coin: number; //硬币
    coin_2_silver_left: number; //
    silver_2_coin_left: number; // (银瓜子到硬币)
  };
}

//瓜子换硬币
export class Silver2CoinDto extends PureData {
  'data'?: {};
}

/** 获取有勋章的直播间 */
export class FansMedalDto extends PureData {
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
