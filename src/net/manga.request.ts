import type { OnlyMsg } from '@/dto/bili-base-prop';
import type {
  BuyInfoDto,
  ClockInDto,
  CouponDto,
  FavoriteManga,
  MangaDetailDto,
  MangaPointShopDto,
  PointShopBuyDto,
  SearchMangaDto,
  SeasonInfoDto,
  ShareComicDto,
  TakeSeasonGiftDto,
  WalletDto,
} from '../dto/manga.dto';
import { mangaApi } from './api';

/**
 * 漫画签到
 * @param platform 平台
 */
export function clockIn(platform = 'android'): Promise<ClockInDto> {
  return mangaApi.post('twirp/activity.v1.Activity/ClockIn', {
    platform,
  });
}

/**
 * 获取背包
 *
 */
export function getWallet() {
  return mangaApi.post<WalletDto>(`twirp/user.v1.User/GetWallet?platform=web`);
}

/**
 * 追漫列表
 */
export function getFavoriteList(page_num = 1, page_size = 50, order = 1) {
  return mangaApi.post<FavoriteManga>(`twirp/bookshelf.v1.Bookshelf/ListFavorite?platform=web`, {
    page_num,
    page_size,
    order,
    wait_free: 0,
  });
}

/**
 * 获取账户中的漫读券信息
 */
export function getCoupons(page_num = 1, page_size = 50) {
  return mangaApi.post<CouponDto>(`twirp/user.v1.User/GetCoupons?platform=web`, {
    not_expired: true,
    page_num,
    page_size,
    tab_type: 1,
  });
}

/**
 * 获取漫画详情
 */
export function getMangaDetail(comic_id: number) {
  return mangaApi.post<MangaDetailDto>(`twirp/comic.v1.Comic/ComicDetail`, {
    device: 'android',
    version: '4.16.0',
    comic_id: comic_id,
  });
}

/**
 * 获取购买信息
 */
export function getBuyInfo(ep_id: number) {
  return mangaApi.post<BuyInfoDto>(`twirp/comic.v1.Comic/GetEpisodeBuyInfo?platform=web`, {
    ep_id,
  });
}

/**
 * 购买漫画
 */
export function buyManga(
  ep_id: number,
  coupon_id: number,
  buy_method = 2,
  auto_pay_gold_status = 0,
) {
  return mangaApi.post<OnlyMsg>(`twirp/comic.v1.Comic/BuyEpisode?&platform=web`, {
    buy_method,
    ep_id,
    coupon_id,
    auto_pay_gold_status,
  });
}

/**
 * 搜索漫画
 */
export function searchManga(keyword: string, page_num = 1, page_size = 9) {
  return mangaApi.post<SearchMangaDto>(`twirp/comic.v1.Comic/Search?device=pc&platform=web`, {
    keyword,
    page_num,
    page_size,
  });
}

/**
 * 领取大会员权益
 */
export function receiveMangaVipPrivilege() {
  return mangaApi.post<OnlyMsg>('twirp/user.v1.User/GetVipReward', { reason_id: 1 });
}

/**
 * 获取当前漫画积分
 */
export function getMangaPoint() {
  return mangaApi.post<OnlyMsg<{ point: string }>>('twirp/pointshop.v1.Pointshop/GetUserPoint');
}

/**
 * 漫画积分商城列表
 */
export function getMangaPointShopList() {
  return mangaApi.post<MangaPointShopDto>(`twirp/pointshop.v1.Pointshop/ListProduct`);
}

/**
 * 漫画积分商城兑换
 */
export function exchangeMangaShop(product_id = 195, point = 100, product_num = 1) {
  return mangaApi.post<PointShopBuyDto>(`twirp/pointshop.v1.Pointshop/Exchange`, {
    product_id,
    point,
    product_num,
  });
}

/**
 * 领取任务奖励
 */
export function takeSeasonGift(season_id: number | string = '31') {
  return mangaApi.post<TakeSeasonGiftDto>(`twirp/user.v1.Season/TakeSeasonGifts`, {
    id: 0,
    is_teenager: 0,
    no_recommend: 0,
    season_id,
    take_type: 1,
    mobi_app: 'android_comic',
    ts: new Date().getTime(),
  });
}

/**
 * 获取赛季信息
 */
export function getSeasonInfo() {
  return mangaApi.post<SeasonInfoDto>(`twirp/user.v1.Season/GetSeasonInfo`, {
    is_teenager: 0,
    no_recommend: 0,
    take_type: 1,
    mobi_app: 'android_comic',
    ts: new Date().getTime(),
  });
}

/**
 * 获取赛季信息
 */
export function shareComic() {
  return mangaApi.post<ShareComicDto>(`twirp/activity.v1.Activity/ShareComic`, {
    platform: 'android',
    ts: new Date().getTime(),
  });
}
