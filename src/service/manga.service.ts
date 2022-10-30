import type { Eplist, SeasonInfoDto, SeasonTodaytask } from '@/dto/manga.dto';
import * as path from 'path';
import * as fs from 'fs';
import { TaskConfig } from '@/config/globalVar';
import * as mangaApi from '@/net/manga.request';
import { exchangeMangaShop, getMangaPoint, shareComic } from '@/net/manga.request';
import { apiDelay, getPRCDate, isBoolean, logger } from '@/utils';
import { request } from '@/utils/request';
import { getConfigPath } from '@/utils/file';

let expireCouponNum: number;

/**
 * 获取即将过期的漫读券数量
 */
async function getExpireCouponNum() {
  expireCouponNum = 0;
  try {
    const { code, msg, data } = await mangaApi.getCoupons();
    if (code !== 0) {
      logger.error(`获取漫读券失败：${code} ${msg}`);
      return;
    }
    const { user_coupons } = data;
    if (user_coupons.length === 0) {
      logger.info('没有漫读券，跳过任务');
      return;
    }
    const coupons = user_coupons.filter(coupon => coupon.will_expire !== 0);
    expireCouponNum = coupons.reduce((acc, coupon) => acc + coupon.remain_amount, 0);
    return expireCouponNum;
  } catch (error) {
    logger.error(`获取漫读券异常: ${error}`);
  }
}

/**
 * 获取追漫列表
 */
async function getFavoriteList() {
  try {
    const { code, msg, data } = await mangaApi.getFavoriteList();
    if (code === 0) {
      return data;
    }
    logger.error(`获取追漫列表失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`获取追漫列表异常: ${error}`);
  }
}

/**
 * 获取需要购买的漫画章节
 */
async function getMangaEpList(comic_id: number) {
  try {
    const { code, msg, data } = await mangaApi.getMangaDetail(comic_id);
    if (code !== 0) {
      logger.error(`获取漫画详情失败：${code} ${msg}`);
      return;
    }
    if (!data || !data.ep_list) {
      return;
    }
    const { disable_coupon_amount, ep_list } = data;
    // 去掉没有漫读券的章节
    return disable_coupon_amount ? ep_list.slice(disable_coupon_amount) : ep_list;
  } catch (error) {
    logger.error(`获取漫画详情异常: ${error}`);
  }
}

/**
 * 获取购买信息
 */
async function getBuyCoupon(ep_id: number) {
  // web 中自动调取最后一话的
  try {
    const { code, msg, data } = await mangaApi.getBuyInfo(ep_id);
    if (code !== 0) {
      logger.error(`获取购买信息失败：${code} ${msg}`);
      return;
    }
    if (!data) {
      return;
    }
    if (!data.is_locked) return;
    if (!data.allow_coupon) {
      logger.info(`漫画 ${ep_id} 不支持漫读券`);
      return;
    }
    if (data.recommend_coupon_id === 0 || data.remain_coupon === 0) {
      expireCouponNum = 0;
      logger.info('没有足够的漫读券了');
      return;
    }
    if (!data.remain_lock_ep_num) {
      logger.info(`漫画${data.comic_id}已经全部购买了`);
      return;
    }
    return data.recommend_coupon_id;
  } catch (error) {
    logger.error(`获取购买信息异常: ${error}`);
  }
}

/**
 * 购买漫画的一个章节
 * @return true 则不再购买
 */
async function buyOneEpManga(ep_id: number) {
  try {
    const couponId = await getBuyCoupon(ep_id);
    if (!couponId) {
      return true;
    }
    const { code, msg } = await mangaApi.buyManga(ep_id, couponId);
    if (code !== 0) {
      logger.error(`购买漫画失败：${code} ${msg}`);
      return;
    }
    // 购买成功，则减少漫读券数量
    expireCouponNum--;
    logger.info(`购买漫画成功`);
  } catch (error) {
    logger.error(`购买漫画异常: ${error}`);
  }
}

/**
 * 搜索漫画
 */
async function searchManga(keyword: string) {
  try {
    const { code, msg, data } = await mangaApi.searchManga(keyword);
    if (code === 0) {
      return data;
    }
    logger.error(`搜索漫画失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`搜索漫画异常: ${error}`);
  }
}

/**
 * 购买漫画
 */
async function buyManga(comic_id: number) {
  const epList = filterLocked(await getMangaEpList(comic_id));
  if (epList.length === 0) {
    return false;
  }
  for (let index = 0; index < epList.length; index++) {
    await apiDelay(100);
    if (await buyOneEpManga(epList[index].id)) return true;
  }

  function filterLocked(epList: Eplist[] = []) {
    return epList.filter(ep => ep.is_locked);
  }
}

/**
 * 通过 mc 购买漫画
 */
async function buyMangaByMc() {
  const { mc } = TaskConfig.manga;
  if (mc.length === 0) {
    return;
  }
  for (let index = 0; index < mc.length; index++) {
    if (expireCouponNum <= 0) return;
    const mcId = mc[index];
    await buyManga(mcId);
  }
}

/**
 * 通过名字购买漫画
 */
async function buyMangaByName() {
  const { name } = TaskConfig.manga;
  if (name.length === 0) {
    return;
  }
  for (let index = 0; index < name.length; index++) {
    if (expireCouponNum <= 0) return;
    const keyword = name[index];
    const mangas = await searchManga(keyword);
    if (!mangas || mangas.list.length === 0) {
      continue;
    }
    const manga = mangas.list.find(mange => mange.title === keyword);
    if (!manga) {
      continue;
    }
    await buyManga(manga.id);
  }
}

/**
 * 通过追漫列表购买漫画
 */
async function buyMangaByLove() {
  const { love } = TaskConfig.manga;
  if (!love || expireCouponNum <= 0) {
    return;
  }
  const favoriteList = await getFavoriteList();
  if (!favoriteList || favoriteList.length === 0) {
    return;
  }
  for (let index = 0; index < favoriteList.length; index++) {
    if (expireCouponNum <= 0) return;
    const favorite = favoriteList[index];
    await buyManga(favorite.comic_id);
  }
}

export async function buyMangaService() {
  const { buy } = TaskConfig.manga;
  if (!buy) {
    return;
  }
  if (!isTodayRunning()) {
    logger.info('非购买漫画时间，不购买');
    return;
  }
  expireCouponNum = (await getExpireCouponNum()) as number;
  if (!expireCouponNum) {
    return;
  }
  if (expireCouponNum < 1) {
    logger.info('没有即将过期的漫读券，跳过任务');
    return;
  }
  logger.info('开始购买漫画');
  await buyMangaByMc();
  await buyMangaByName();
  await buyMangaByLove();

  function isTodayRunning() {
    const { buyWeek, buyInterval } = TaskConfig.manga;
    if (buyInterval === 1) return true;
    const now = new Date();
    const weekDay = now.getDay();
    const today = now.getDate();
    return buyWeek.includes(weekDay) || (today % buyInterval) - 1 === 0;
  }
}

export async function mangaSign() {
  const { sign } = TaskConfig.manga;
  if (!sign) {
    return;
  }
  try {
    const { code } = await mangaApi.clockIn();
    if (code == 0) {
      logger.info('漫画签到成功');
    } else {
      logger.warn('漫画签到失败');
    }
  } catch (error) {
    /**
     * 这是axios报的错误,重复签到后返回的状态码是400
     * 所以将签到成功的情况忽略掉
     */
    const { status, statusCode } = error.response || {};
    if (status === 400 || statusCode === 400) {
      logger.info('已经签到过了，跳过任务');
    } else {
      logger.error(`漫画签到异常 ${error.message}`);
    }
  }
}

async function getSeasonInfo() {
  try {
    const { code, data, msg } = await mangaApi.getSeasonInfo();
    if (code === 0) {
      return data;
    }
    logger.warn(`获取赛季信息失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`获取赛季异常: ${error.message}`);
  }
}

export async function takeSeasonGift() {
  try {
    const seasonInfo = await getSeasonInfo();
    if (!seasonInfo) return;

    const { code, msg } = await mangaApi.takeSeasonGift(seasonInfo.season_id);
    if (code === 0) return;
    if (code === 7) {
      // 已领取或者未完成
      // logger.debug(`获取任务礼包失败：${code} ${msg}`);
      return;
    }
    logger.warn(`获取任务礼包失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`获取任务礼包异常: ${error.message}`);
  }
}

/**
 * 商城兑换
 */
export async function exchangeCoupon(num: number) {
  try {
    const { code, msg = '' } = await exchangeMangaShop(195, num * 100, num);
    // 抢的人太多
    if (code === 4) {
      return true;
    }
    if (code === 0) {
      logger.info(`兑换商品成功，兑换数量：${num}`);
      return;
    }
    if (code === 1 && msg.includes('快')) {
      logger.debug(msg);
      return true;
    }
    // 库存不足，且时间是 12:02 之前
    if (
      code === 2 &&
      msg.includes('库存') &&
      getPRCDate().getHours() === 12 &&
      getPRCDate().getMinutes() < 2
    ) {
      logger.debug('库存不足，但时间是 12:02 之前，尝试重新兑换');
      return true;
    }
    logger.warn(`兑换商品失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`商城兑换异常: ${error}`);
  }
}

export async function exchangeCouponService() {
  const { num: exchangeCouponNum, delay } = TaskConfig.exchangeCoupon;
  if (exchangeCouponNum < 1) {
    return;
  }
  logger.info(`开始兑换漫读券，预设数量：${exchangeCouponNum}`);
  let num = exchangeCouponNum;
  const { point } = await request(getMangaPoint, { name: '获取积分' });
  const pointNum = parseInt(point, 10) || 0,
    buyCouponNum = Math.floor(pointNum / 100);
  logger.info(`当前积分：${pointNum}`);
  if (buyCouponNum < num) {
    num = buyCouponNum;
  }
  if (buyCouponNum < 1) {
    logger.info('可兑换的漫读券数量不足 1，跳过任务');
    return;
  }
  let isRepeat: boolean | undefined = true;
  while (isRepeat) {
    isRepeat = await exchangeCoupon(num);
    // 等待 2s 再次尝试
    await apiDelay(delay - 50, delay + 150);
  }
}

/**
 * 每日首次分享
 */
export async function shareComicService() {
  try {
    const { code, msg } = await shareComic();
    if (code === 0) {
      logger.info(msg || '每日分享成功！');
      return;
    }
    logger.warn(`每日分享失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`每日分享异常: ${error.message}`);
  }
}

/**
 * 生成阅读请求体
 */
function createDataFlow(mangaId: number | string, mangaNum: number) {
  const { dir } = getConfigPath();
  const fileBin = fs.readFileSync(path.resolve(dir, `./manga_request_${TaskConfig.USERID}`));
  const base = fileBin.subarray(fileBin.indexOf('RDIO'));
  const sub1 = base.subarray(0, base.indexOf('manga_id') + 'manga_id'.length + 2);
  const sub2 = base.subarray(
    base.indexOf('flutter') - 4,
    base.indexOf('manga_num') + 'manga_num'.length + 2,
  );
  const sub3 = base.subarray(base.indexOf(Buffer.from([112, 1, 120])));
  return Buffer.concat([
    sub1,
    Buffer.from(mangaId.toString()),
    sub2,
    Buffer.from(mangaNum.toString()),
    sub3,
  ]);
}

/**
 * 判断是否已经阅读
 */
function getReadMangaStatus(task15min: SeasonTodaytask, task30min: SeasonTodaytask) {
  const doneTask30min = task30min.status === 2,
    doneTask15min = task15min.status === 2;
  if (doneTask30min && doneTask15min) {
    return true;
  }
  return false;
}

function getKeyTaskItem(today_tasks: SeasonInfoDto['data']['today_tasks']) {
  const task30min = today_tasks.find(el => el.type === 17 && el.sub_id === 5),
    task15min = today_tasks.find(el => el.type === 22 && el.comics.length > 0);
  return {
    task15min,
    task30min,
  };
}

async function getTaskInfo() {
  try {
    const seasonInfo = await getSeasonInfo();
    if (!seasonInfo) {
      logger.error('跳过每日阅读');
      return false;
    }
    const { task15min, task30min } = getKeyTaskItem(seasonInfo.today_tasks);

    if (!task30min || !task15min) {
      logger.warn('未知异常');
      return false;
    }

    const task30minProgress = task30min.progress,
      task15minProgress = task15min.progress;

    if (getReadMangaStatus(task15min, task30min)) {
      return true;
    }

    const time = Math.max(30 - task30minProgress, 15 - task15minProgress);
    return {
      comicId: task15min?.comics[0].comic_id,
      time,
    };
  } catch (error) {
    logger.error(`获取每日阅读进度异常：${error.message}`);
  }
  return false;
}

async function readManga(buffer: Buffer, needTime: number) {
  for (let index = 0; index < 3; index++) {
    logger.debug(`开始阅读漫画第${index + 1}轮`);
    const add = Math.ceil(needTime / 10);
    for (let count = 0; count < needTime * 2 + add; count++) {
      await mangaApi.sendRealtime(buffer);
      await apiDelay();
    }
    await apiDelay(5000);
    const taskInfo = await getTaskInfo();
    if (isBoolean(taskInfo)) {
      return taskInfo;
    }
    needTime = taskInfo.time;
  }
  return false;
}

/**
 * 每日漫画阅读
 */
export async function readMangaService() {
  if (!TaskConfig.manga.read) {
    return;
  }
  try {
    const taskInfo = await getTaskInfo();
    if (isBoolean(taskInfo)) {
      return taskInfo;
    }
    const { comicId, time } = taskInfo;
    const eplist = await getMangaEpList(comicId);
    if (!eplist) {
      return;
    }
    const buffer = createDataFlow(comicId, eplist[0].id);
    (await readManga(buffer, time))
      ? logger.info('每日漫画阅读任务完成')
      : logger.warn('每日漫画阅读未完成×_×');
  } catch (error) {
    logger.error(`每日漫画阅读任务出错`);
    logger.error(error);
  }
}
