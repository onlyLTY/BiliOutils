import type { ApiBaseProp } from './bili-base-prop';

/**
 * 用户导航数量（视频，音频，相册...）
 */
export type UserNavNumDto = ApiBaseProp<{
  video: number;
  bangumi: number;
  cinema: number;
  channel: Channel;
  favourite: Favourite;
  tag: number;
  article: number;
  playlist: number;
  album: number;
  audio: number;
  pugv: number;
  season_num: number;
}>;

interface Channel {
  master: number;
  guest: number;
}

interface Favourite {
  master: number;
  guest: number;
}

/**
 * 用户视频信息
 */
export type VideoSearchDto = ApiBaseProp<{
  list: {
    tlist: Tlist;
    vlist: Vlist[];
  };
  page: {
    pn: number;
    ps: number;
    count: number;
  };
  episodic_button: {
    text: string;
    uri: string;
  };
}>;

interface Tlist {
  [key: number]: {
    tid: number;
    count: number;
    name: string;
  };
}

interface Vlist {
  comment: number;
  typeid: number;
  play: number;
  pic: string;
  subtitle: string;
  description: string;
  /**  1：自制 2：转载 */
  copyright: string;
  title: string;
  review: number;
  author: string;
  mid: number;
  created: number;
  length: string;
  video_review: number;
  aid: number;
  bvid: string;
  hide_click: boolean;
  is_pay: number;
  is_union_video: number;
  is_steins_gate: number;
  is_live_playback: number;
}

/**
 * 用户音频信息
 */
export interface AudioSearchDto {
  code: number;
  msg: string;
  data: {
    curPage: number;
    pageCount: number;
    totalSize: number;
    pageSize: number;
    data: {
      id: number;
      uid: number;
      uname: string;
      title: string;
      cover: string;
      lyric: string;
      crtype: number;
      duration: number;
      passtime: number;
      curtime: number;
      ctime: number;
      coin_num: number;
    }[];
  };
}

/**
 * 用户专栏信息
 */
export type ArticleSearchDto = ApiBaseProp<{
  pn: number;
  ps: number;
  count: number;
  articles: {
    id: number;
    title: string;
    author: {
      mid: number;
      name: string;
    };
  }[];
}>;

/**
 * 视频关系
 */
export type VideoRelationDto = ApiBaseProp<{
  attention: boolean;
  /** 收藏 */
  favorite: boolean;
  /** 订阅合集 */
  season_fav: boolean;
  like: boolean;
  dislike: boolean;
  /** 已投币数量 */
  coin: number;
}>;

/**
 * 视频状态
 */
export type VideoStatusDto = ApiBaseProp<{
  aid: number;
  bvid: string;
  view: number;
  danmaku: number;
  reply: number;
  favorite: number;
  coin: number;
  share: number;
  like: number;
  now_rank: number;
  his_rank: number;
  no_reprint: 0 | 1;
  copyright: 1 | 2;
  argue_msg: '';
  evaluation: '';
}>;

/**
 * 音频投币
 */
export interface AudioCoinDto {
  code: number;
  msg: string;
  data: string;
}

/**
 * 音频的投币数量
 */
export type AudioCoinNumDto = {
  code: number;
  msg: string;
  data: number;
};

/**
 * 专栏信息
 */
export type ArticleInfoDto = ApiBaseProp<{
  // 下面是用户的行为
  like: number;
  attention: boolean;
  favorite: boolean;
  coin: number;
  // 这是专栏的信息
  stats: {
    view: number;
    favorite: number;
    like: number;
    dislike: number;
    reply: number;
    share: number;
    coin: number;
    dynamic: number;
  };
  title: string;
  banner_url: string;
  mid: number;
  author_name: string;
  is_author: boolean;
  image_urls: string[];
  origin_image_urls: string[];
  shareable: boolean;
  show_later_watch: boolean;
  show_small_window: boolean;
  in_list: boolean;
  pre: number;
  next: number;
  share_channels: {
    name: string;
    picture: string;
    share_channel: string;
  }[];
  type: number;
  video_url: string;
  location: string;
}>;

/**
 * 今日获取的经验值
 */
export type TodayExpDto = {
  code: number;
  message: string;
  /** 经验值，10 为单位 */
  number: number;
};
