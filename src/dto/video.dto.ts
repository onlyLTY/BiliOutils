import { ApiBaseProp } from './bili-base-prop';

/** 传递视频播放时长 */
export interface HeartbeatDto extends ApiBaseProp {
  data: null;
}

/** 分享 */
export interface ShareAddDto extends ApiBaseProp {
  data: number | null;
}

/** 投币 */
export interface AddCoinDto extends ApiBaseProp {
  data: {
    like: boolean;
  };
}

/** 已经给该视频投币数量 */
export interface DonatedCoinsForVideoDto extends ApiBaseProp {
  data: {
    multiply: 0 | 1 | 2;
  };
}

/** 获取排行榜上的视频 */
export interface RegionRankingVideosDto extends ApiBaseProp {
  data: Array<{
    aid: string;
    bvid: string;
    typename: string;
    title: string;
    subtitle: string;
    play: number;
    review: number;
    video_review: number;
    favorites: number;
    mid: number;
    author: string;
    description: string;
    create: string;
    pic: string;
    coins: number;
  }>;
}

/** 指定up的视频 */
export interface VideoByUpDto extends ApiBaseProp {
  data: {
    media_list: Array<{
      id: number;
      index: number;
      title: string;
      type: number;
      bv_id: number;
      upper: {
        mid: number;
        name: string;
      };
    }>;
  };
}

/**
 * 推荐视频
 */
export type RecommendVideoDto = ApiBaseProp<{
  item: RecommendVideo[];
  business_card?: any;
  floor_info?: any;
  user_feature: string;
  abtest: {
    group: string;
  };
  preload_expose_pct: number;
  preload_floor_expose_pct: number;
}>;

interface RecommendVideo {
  id: number;
  bvid: string;
  cid: number;
  goto: string;
  uri: string;
  pic: string;
  title: string;
  duration: number;
  pubdate: number;
  owner: {
    mid: number;
    name: string;
    face: string;
  };
  stat: {
    view: number;
    like: number;
    danmaku: number;
  };
  av_feature: string;
  is_followed: number;
  rcmd_reason: {
    reason_type: number;
  };
  show_info: number;
  track_id: string;
  pos: number;
  room_info?: any;
  ogv_info?: any;
}
