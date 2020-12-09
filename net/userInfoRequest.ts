import { biliApi, accountApi } from './api';
import {} from 'qs';
import {
  CoinBalanceDto,
  CoinTodayExpDto,
  FollowingsDto,
  RewardDto,
  UserInfoNavDto,
} from '../dto/UserInfo.dto';
import { VideoByUpDto } from '../dto/Video.dto';

/**
 * 登录账号
 */
export async function loginByCookie(): Promise<UserInfoNavDto> {
  const { data } = await biliApi.get('/x/web-interface/nav');
  return data;
}

/**
 * 每日任务完成情况
 */
export async function getDailyTaskRewardInfo(): Promise<RewardDto> {
  const { data } = await biliApi.get('/x/member/web/exp/reward');
  return data;
}

/**
 * 获取投币获得的经验
 */
export async function getDonateCoinExp(): Promise<CoinTodayExpDto> {
  const { data } = await biliApi.get('/x/web-interface/coin/today/exp');
  return data;
}

/**
 * 硬币数量
 */
export async function getCoinBalance(): Promise<CoinBalanceDto> {
  const { data } = await accountApi.get('/site/getCoin');
  return data;
}

/**
 * 获取关注列表
 * @param vmid 用户id
 * @param pageNumber 页数
 * @param pageSize 每页的数量
 * @param order 分组
 * @param order_type 分组类型
 */
export async function getFollowings(
  vmid: number,
  pageNumber: number = 1,
  pageSize: number = 50,
  order: string = 'desc',
  order_type: string = 'attention'
): Promise<FollowingsDto> {
  const { data } = await biliApi.get('/x/relation/followings', {
    params: {
      vmid,
      pn: pageNumber,
      ps: pageSize,
      order,
      order_type,
    },
  });
  return data;
}

/**
 * 获取特别关注
 * @param pageNumber 页数
 * @param pageSize 每页数量
 */
export async function getSpecialFollowings(
  pageNumber: number = 1,
  pageSize: number = 50
): Promise<FollowingsDto> {
  const { data } = await biliApi.get('/x/relation/tag', {
    params: {
      tagid: -10,
      pn: pageNumber,
      ps: pageSize,
    },
  });
  return data;
}

/**
 * 获取指定Up的视频
 * @param upId upId
 * @param pageSize 数据数量
 */
export async function getVideosByUpId(
  upId: number,
  pageSize: number = 50
): Promise<VideoByUpDto> {
  const { data } = await biliApi.get('/x/v2/medialist/resource/list', {
    params: {
      direction: false,
      mobi_app: 'web',
      type: 1,
      bvid: '',
      ps: pageSize,
      biz_id: upId,
    },
  });
  return data;
}

/**
 * 获取指定up主视频
 * @param upId upId
 * @param pageSize 页面数据条数
 * @param pageNumber 页数
 * @param keyword 搜索关键词
 */
export async function searchVideosByUpId(
  upId: number,
  pageSize: number = 20,
  pageNumber: number = 1,
  keyword: string = ''
): Promise<FollowingsDto> {
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
