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
