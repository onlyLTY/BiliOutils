import type { IdType } from '../types';
import { biliApi, accountApi } from './api';
import type {
  CoinBalanceDto,
  CoinTodayExpDto,
  CreateTagDto,
  FollowingsDto,
  OtherUserDto,
  RewardDto,
  TagListDto,
  TagsFollowingsDto,
  UserInfoNavDto,
} from '../dto/user-info.dto';
import type { VideoByUpDto } from '../dto/video.dto';
import { OriginURLs } from '../constant/biliUri';
import { stringify } from 'qs';
import { TaskConfig } from '../config/globalVar';
import type { ApiBaseProp } from '../dto/bili-base-prop';
import { jsonp2Object } from '../utils';

/**
 * 登录账号
 */
export async function loginByCookie(): Promise<UserInfoNavDto> {
  const { data } = await biliApi.get('/x/web-interface/nav', {
    retry: 3,
    headers: {
      Origin: OriginURLs.account,
    },
  });
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
 * 获取某个分组的关注列表
 * @param pageNumber 页数 [1]
 * @param pageSize 每页数量 [50]
 * @param tagId 分组 id [-10] 特别关注
 */
export async function getFollowingsByTag(
  pageNumber = 1,
  pageSize = 50,
  tagId = -10,
): Promise<TagsFollowingsDto> {
  const { data } = await biliApi.get('/x/relation/tag', {
    params: {
      tagid: tagId,
      pn: pageNumber,
      ps: pageSize,
    },
  });
  return data;
}

/**
 * 获取特别关注
 * @param pageNumber 页数 [1]
 * @param pageSize 每页数量 [50]
 */
export async function getSpecialFollowings(
  pageNumber = 1,
  pageSize = 50,
): Promise<TagsFollowingsDto> {
  return await getFollowingsByTag(pageNumber, pageSize, -10);
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

/**
 * 创建一个关注分组
 */
export async function createTag(name: string): Promise<CreateTagDto> {
  const { data } = await biliApi.post(
    '/x/relation/tag/create',
    stringify({
      tag: name,
      jsonp: 'jsonp',
      csrf: TaskConfig.BILIJCT,
    }),
  );
  return data;
}

/**
 * 取关
 * @param mid 用户 id
 */
export async function unFollow(mid: IdType): Promise<ApiBaseProp> {
  const { data } = await biliApi.post(
    '/x/relation/modify',
    stringify({
      fid: mid,
      act: 2,
      re_src: 11,
      spmid: '333.999.0.0',
      jsonp: 'jsonp',
      csrf: TaskConfig.BILIJCT,
    }),
  );
  return data;
}

/**
 * 移动到某个分组
 * @param mid 用户 id
 * @param tagId 分组 id
 */
export async function moveToTag(mid: IdType, tagId: number): Promise<ApiBaseProp> {
  const res = await biliApi.post(
    '/x/relation/tags/addUsers?cross_domain=true',
    stringify({
      fids: mid,
      tagids: tagId,
      csrf: TaskConfig.BILIJCT,
    }),
    {
      headers: {
        Origin: OriginURLs.space,
      },
    },
  );
  return res.data;
}

/**
 * 获取分组列表
 */
export async function getTags(): Promise<TagListDto> {
  const { data } = await biliApi.get('/x/relation/tags?jsonp=jsonp&callback=__jp3', {
    headers: {
      Referer: 'https://space.bilibili.com/1/fans/follow?tagid=0',
    },
  });
  return jsonp2Object(data);
}
