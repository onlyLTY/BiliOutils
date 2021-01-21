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
