import type { IdType } from '../types';
import type {
  CoinBalanceDto,
  CoinHistoryDto,
  CoinTodayExpDto,
  CreateTagDto,
  FollowingsDto,
  OtherUserDto,
  RewardDto,
  TagListDto,
  TagsFollowingsDto,
  UserInfoNavDto,
} from '../dto/user-info.dto';
import type { ApiBaseProp } from '../dto/bili-base-prop';
import type { VideoByUpDto } from '../dto/video.dto';
import { biliApi, accountApi } from './api';
import { OriginURLs } from '../constant/biliUri';
import { TaskConfig } from '../config/globalVar';

/**
 * 登录账号
 */
export function loginByCookie(): Promise<UserInfoNavDto> {
  return biliApi.get('x/web-interface/nav', {
    headers: {
      Origin: OriginURLs.account,
    },
  });
}

/**
 * 每日任务完成情况
 */
export function getDailyTaskRewardInfo(): Promise<RewardDto> {
  return biliApi.get('x/member/web/exp/reward');
}

/**
 * 获取投币获得的经验
 */
export function getDonateCoinExp(): Promise<CoinTodayExpDto> {
  return biliApi.get('x/web-interface/coin/today/exp');
}

/**
 * 获取最近投币记录
 */
export function getCoinHistory() {
  return biliApi.get<CoinHistoryDto>('x/member/web/coin/log?jsonp=jsonp', {
    headers: {
      origin: OriginURLs.account,
    },
  });
}

/**
 * 硬币数量
 */
export function getCoinBalance(): Promise<CoinBalanceDto> {
  return accountApi.get('site/getCoin');
}

/**
 * 获取关注列表
 * @param vmid 用户id
 * @param pageNumber 页数
 * @param pageSize 每页的数量
 * @param order 分组
 * @param order_type 分组类型
 */
export function getFollowings(
  vmid: number,
  pageNumber = 1,
  pageSize = 50,
  order = 'desc',
  order_type = 'attention',
): Promise<FollowingsDto> {
  return biliApi.get('x/relation/followings', {
    params: {
      vmid,
      pn: pageNumber,
      ps: pageSize,
      order,
      order_type,
    },
  });
}

/**
 * 获取某个分组的关注列表
 * @param pageNumber 页数 [1]
 * @param pageSize 每页数量 [50]
 * @param tagId 分组 id [-10] 特别关注
 */
export function getFollowingsByTag(
  pageNumber = 1,
  pageSize = 50,
  tagId = -10,
): Promise<TagsFollowingsDto> {
  return biliApi.get('x/relation/tag', {
    params: {
      tagid: tagId,
      pn: pageNumber,
      ps: pageSize,
    },
  });
}

/**
 * 获取特别关注
 * @param pageNumber 页数 [1]
 * @param pageSize 每页数量 [50]
 */
export function getSpecialFollowings(pageNumber = 1, pageSize = 50): Promise<TagsFollowingsDto> {
  return getFollowingsByTag(pageNumber, pageSize, -10);
}

/**
 * 获取指定Up的视频
 * @param upId upId
 * @param pageSize 数据数量
 */
export function getVideosByUpId(upId: number, pageSize = 50): Promise<VideoByUpDto> {
  return biliApi.get('x/v2/medialist/resource/list', {
    params: {
      direction: false,
      mobi_app: 'web',
      type: 1,
      bvid: '',
      ps: pageSize,
      biz_id: upId,
    },
  });
}

/**
 * 获取用户信息（主要是直播）
 * @param mid 用户 id
 */
export function getUser(mid: IdType): Promise<OtherUserDto> {
  return biliApi.get(`x/space/acc/info?mid=${mid}&jsonp=jsonp`);
}

/**
 * 创建一个关注分组
 */
export function createTag(name: string): Promise<CreateTagDto> {
  return biliApi.post('x/relation/tag/create', {
    tag: name,
    jsonp: 'jsonp',
    csrf: TaskConfig.BILIJCT,
  });
}

/**
 * 操作用户关系
 * @param mid 用户 id
 * @param action 动作 1 关注 2 取关
 */
export function modeRelation(mid: IdType, action = 1) {
  return biliApi.post<ApiBaseProp>('x/relation/modify', {
    fid: mid,
    act: action,
    re_src: 11,
    spmid: '333.999.0.0',
    jsonp: 'jsonp',
    csrf: TaskConfig.BILIJCT,
  });
}

export function unFollow(mid: IdType) {
  return modeRelation(mid, 2);
}

/**
 * 移动到某个分组
 * @param mid 用户 id
 * @param tagId 分组 id
 */
export function moveToTag(mid: IdType, tagId: number): Promise<ApiBaseProp> {
  return biliApi.post(
    'x/relation/tags/addUsers?cross_domain=true',
    {
      fids: mid,
      tagids: tagId,
      csrf: TaskConfig.BILIJCT,
    },
    {
      headers: {
        Origin: OriginURLs.space,
      },
    },
  );
}

/**
 * 获取分组列表
 */
export function getTags(): Promise<TagListDto> {
  return biliApi.get('x/relation/tags?jsonp=jsonp&callback=__jp3', {
    headers: {
      Referer: 'https://space.bilibili.com/1/fans/follow?tagid=0',
    },
    requestOptions: {
      isJsonp: true,
    },
  });
}
