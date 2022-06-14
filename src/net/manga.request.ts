import type { OnlyMsg } from '@/dto/bili-base-prop';
import type {
  BuyInfoDto,
  ClockInDto,
  CouponDto,
  FavoriteManga,
  MangaDetailDto,
  SearchMangaDto,
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
