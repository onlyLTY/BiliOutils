import type { ApiBaseProp } from './bili-base-prop';

/**
 * 用户导航数量（视频，音频，相册...）
 */
export interface UserNavNumDto extends ApiBaseProp {
  data: {
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
  };
}

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
export interface VideoSearchDto extends ApiBaseProp {
  data: {
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
  };
}

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
export interface ArticleSearchDto extends ApiBaseProp {
  data: {
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
  };
}

/**
 * 视频关系
 */
export interface VideoRelationDto extends ApiBaseProp {
  data: {
    attention: boolean;
    favorite: boolean;
    season_fav: boolean;
    like: boolean;
    dislike: boolean;
    coin: number;
  };
}

/**
 * 视频状态
 */
export interface VideoStatusDto extends ApiBaseProp {
  data: {
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
  };
}

/**
 * 音频投币
 */
export interface AudioCoinDto {
  code: number;
  msg: string;
  data: string;
}
