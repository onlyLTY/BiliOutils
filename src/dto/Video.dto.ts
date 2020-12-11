import { ApiAbstract } from './BiLiAbstractClass';

//传递视频播放时长
export class HeartbeatDto extends ApiAbstract {
  data?: null;
}

//分享
export class ShareAddDto extends ApiAbstract {
  data?: number | null;
}

//投币
export class AddCoinDto extends ApiAbstract {
  data?: {
    like: boolean;
  };
}

//已经给该视频投币数量
export class DonatedCoinsForVideoDto extends ApiAbstract {
  'data': {
    multiply: 0 | 1 | 2;
  };
}

// 获取排行榜上的视频
export class RegionRankingVideosDto extends ApiAbstract {
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

// 或取指定up的视频
export class VideoByUpDto extends ApiAbstract {
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
