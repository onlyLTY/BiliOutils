import type {
  VideoSearchDto,
  AudioSearchDto,
  ArticleSearchDto,
  VideoRelationDto,
  VideoStatusDto,
  AudioCoinDto,
} from '../dto/coin.dto';
import type { IdType } from '../types';
import type { UserNavNumDto } from '../dto/coin.dto';
import { biliApi } from './api';
import { jsonp2Object } from '../utils';
import axios from './index';
import { stringify } from 'qs';
import { TaskConfig } from '../config/globalVar';
import type { AddCoinDto } from '../dto/video.dto';

/**
 * 获取用户导航数量（视频，音频，相册...）
 * @param mid 用户 id
 */
export async function getUserNavNum(mid: IdType): Promise<UserNavNumDto> {
  const { data } = await biliApi.get(`/x/space/navnum?mid=${mid}`);
  return data;
}

/**
 * 获取指定up主视频
 * @param upId upId
 * @param pageSize 页面数据条数 max: 30
 * @param pageNumber 页数
 * @param keyword 搜索关键词
 */
export async function searchVideosByUpId(
  upId: number,
  pageSize = 30,
  pageNumber = 1,
  keyword = '',
): Promise<VideoSearchDto> {
  const { data } = await biliApi.get('/x/space/arc/search', {
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
  return data;
}

/**
 * 获取指定up主音频
 * @param uid uid
 * @param pageSize 页面数据条数 max: 30
 * @param pageNumber 页数
 */
export async function searchAudiosByUpId(
  uid: number,
  pageSize = 30,
  pageNumber = 1,
): Promise<AudioSearchDto> {
  const { data } = await biliApi.get('/audio/music-service/web/song/upper', {
    params: {
      jsonp: 'jsonp',
      order: 1,
      pn: pageNumber,
      ps: pageSize,
      uid,
    },
  });
  return data;
}

/**
 * 获取指定up主文章
 * @param mid mid
 * @param pageSize 页面数据条数 max: 12
 * @param pageNumber 页数
 */
export async function searchArticlesByUpId(
  mid: number,
  pageSize = 12,
  pageNumber = 1,
): Promise<ArticleSearchDto> {
  const { data: jsonpText } = await biliApi.get('/x/space/article', {
    params: {
      callback: '__test',
      jsonp: 'jsonp',
      sort: 'publish_time',
      order: 1,
      pn: pageNumber,
      ps: pageSize,
      mid,
    },
  });
  return jsonp2Object(jsonpText);
}

/**
 * relation 对视频的操作
 * @param aid
 * @param bvid
 */
export async function getVideoRelation(aid: number, bvid?: string): Promise<VideoRelationDto> {
  const { data } = await biliApi.get('/x/web-interface/archive/relation', {
    params: {
      aid,
      bvid,
    },
  });
  return data;
}

/**
 * 视频状态
 * @param aid
 * @param bvid
 */
export async function getVideoStatus(aid: number, bvid?: string): Promise<VideoStatusDto> {
  const { data } = await biliApi.get('/x/web-interface/archive/stat', {
    params: {
      aid,
      bvid,
    },
  });
  return data;
}

/**
 * 投币
 * @param aid av号
 * @param multiply 硬币数
 * @param selectLike 是否点赞
 */
export async function addCoinForVideo(
  aid: number | string,
  multiply: 1 | 2,
  selectLike: 1 | 2 = 1,
): Promise<AddCoinDto> {
  const { data } = await biliApi.post(
    '/x/web-interface/coin/add',
    stringify({
      aid,
      multiply,
      selectLike,
      csrf: TaskConfig.BILIJCT,
      cross_domain: true,
    }),
  );

  return data;
}

/**
 * 给音频投币
 * @param sid
 * @param coin
 */
export async function addCoinForAudio(sid: number, coin = 1): Promise<AudioCoinDto> {
  const { data } = await axios.post(
    'https://www.bilibili.com/audio/music-service-c/web/coin/add',
    stringify({
      sid,
      multiply: coin,
      csrf: TaskConfig.BILIJCT,
    }),
  );
  return data;
}

/**
 * 给专栏投币
 * @param aid
 * @param coin
 */
export async function addCoinForArticle(aid: number, coin = 1): Promise<AddCoinDto> {
  const { data } = await biliApi.post(
    '/x/web-interface/coin/add',
    stringify({
      aid,
      avtype: 2,
      multiply: coin,
      csrf: TaskConfig.BILIJCT,
    }),
  );
  return data;
}
