import type { IdType } from '../types';
import { biliApi, accountApi } from './api';
import type {
  CoinBalanceDto,
  CoinTodayExpDto,
  FollowingsDto,
  OtherUserDto,
  RewardDto,
  UserInfoNavDto,
} from '../dto/user-info.dto';
import type { VideoByUpDto } from '../dto/video.dto';

/**
 * 登录账号
 */
export async function loginByCookie(): Promise<UserInfoNavDto> {
  // @ts-ignore
  const { data } = await biliApi.get('/x/web-interface/nav', { retry: 3 });
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
  pageNumber = 1,
  pageSize = 50,
  order = 'desc',
  order_type = 'attention',
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
 * @param pageNumber 页数 [1]
 * @param pageSize 每页数量 [50]
 */
export async function getSpecialFollowings(pageNumber = 1, pageSize = 50): Promise<FollowingsDto> {
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
export async function getVideosByUpId(upId: number, pageSize = 50): Promise<VideoByUpDto> {
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
 * 获取用户信息（主要是直播）
 * @param mid 用户 id
 */
export async function getUser(mid: IdType): Promise<OtherUserDto> {
  const { data } = await biliApi.get(`/x/space/acc/info?mid=${mid}&jsonp=jsonp`);
  return data;
}
