import type {
  VideoSearchDto,
  AudioSearchDto,
  ArticleSearchDto,
  VideoRelationDto,
  VideoStatusDto,
  AudioCoinDto,
} from '../dto/coin.dto';
import type { AddCoinDto } from '../dto/video.dto';
import type { IdType } from '../types';
import type { UserNavNumDto } from '../dto/coin.dto';
import { biliApi, biliHttp } from './api';
import { TaskConfig } from '../config/globalVar';

/**
 * 获取用户导航数量（视频，音频，相册...）
 * @param mid 用户 id
 */
export function getUserNavNum(mid: IdType): Promise<UserNavNumDto> {
  return biliApi.get(`/x/space/navnum?mid=${mid}`);
}

/**
 * 获取指定up主视频
 * @param upId upId
 * @param pageSize 页面数据条数 max: 30
 * @param pageNumber 页数
 * @param keyword 搜索关键词
 */
export function searchVideosByUpId(
  upId: number,
  pageSize = 30,
  pageNumber = 1,
  keyword = '',
): Promise<VideoSearchDto> {
  return biliApi.get('/x/space/arc/search', {
    params: {
      jsonp: 'jsonp',
      order: 'pubdate',
      keyword,
      pn: pageNumber,
      tid: 0,
      ps: pageSize,
      mid: upId,
    },
  });
}

/**
 * 获取指定up主音频
 * @param uid uid
 * @param pageSize 页面数据条数 max: 30
 * @param pageNumber 页数
 */
export function searchAudiosByUpId(
  uid: number,
  pageSize = 30,
  pageNumber = 1,
): Promise<AudioSearchDto> {
  return biliApi.get('/audio/music-service/web/song/upper', {
    params: {
      jsonp: 'jsonp',
      order: 1,
      pn: pageNumber,
      ps: pageSize,
      uid,
    },
  });
}

/**
 * 获取指定up主文章
 * @param mid mid
 * @param pageSize 页面数据条数 max: 12
 * @param pageNumber 页数
 */
export function searchArticlesByUpId(
  mid: number,
  pageSize = 12,
  pageNumber = 1,
): Promise<ArticleSearchDto> {
  return biliApi.get('/x/space/article', {
    params: {
      callback: '__test',
      jsonp: 'jsonp',
      sort: 'publish_time',
      pn: pageNumber,
      ps: pageSize,
      mid,
    },
    requestOptions: {
      isJsonp: true,
    },
  });
}

interface VideoId {
  aid: IdType;
  bvid: string;
}

/**
 * relation 已经对视频的操作
 * @param aid
 * @param bvid
 */
export function getVideoRelation({ aid, bvid }: VideoId): Promise<VideoRelationDto> {
  return biliApi.get('/x/web-interface/archive/relation', {
    params: {
      aid,
      bvid,
    },
  });
}

/**
 * 视频状态
 * @param aid
 * @param bvid
 */
export function getVideoStatus({ aid = '', bvid = '' }: VideoId): Promise<VideoStatusDto> {
  return biliApi.get(`/x/web-interface/archive/stat?aid=${aid}&bvid=${bvid}`);
}

/**
 * 投币
 * @param aid av号
 * @param multiply 硬币数
 * @param selectLike 是否点赞
 */
export function addCoinForVideo(
  aid: number | string,
  multiply: 1 | 2,
  selectLike: 1 | 2 = 1,
): Promise<AddCoinDto> {
  return biliApi.post('/x/web-interface/coin/add', {
    aid,
    multiply,
    selectLike,
    csrf: TaskConfig.BILIJCT,
    // cross_domain: true,
  });
}

/**
 * 给音频投币
 * @param sid
 * @param coin
 */
export function addCoinForAudio(sid: number, coin = 1): Promise<AudioCoinDto> {
  return biliHttp.post('https://www.bilibili.com/audio/music-service-c/web/coin/add', {
    sid,
    multiply: coin,
    csrf: TaskConfig.BILIJCT,
  });
}

/**
 * 给专栏投币
 * @param upid
 * @param aid
 * @param coin
 */
export function addCoinForArticle(upid: number, aid: number, coin = 1): Promise<AddCoinDto> {
  return biliApi.post('/x/web-interface/coin/add', {
    aid,
    upid,
    avtype: 2,
    multiply: coin,
    csrf: TaskConfig.BILIJCT,
  });
}
