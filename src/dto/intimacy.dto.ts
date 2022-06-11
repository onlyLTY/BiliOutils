import { ApiBaseProp } from './bili-base-prop';

/**
 * 分享直播间
 */
export interface ShareLiveRoomRes extends ApiBaseProp {
  data: {
    /** 1 */
    allow_mock: number;
  };
}

/**
 * 直播心跳
 */
export interface LiveHeartBeatRes extends ApiBaseProp {
  data: {
    /** 60 */
    heartbeat_interval: number;
    timestamp: number;
    secret_rule: [number, number, number, number, number];
    /** axoaadsffcazxksectbbb */
    secret_key: string;
  };
}
