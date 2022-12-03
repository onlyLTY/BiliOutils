import type { Eplist, GameGuessDto, SearchMangaDto, SeasonInfoDto } from '@/dto/manga.dto';
import { TaskConfig } from '@/config/globalVar';
import * as mangaApi from '@/net/manga.request';
import { exchangeMangaShop, getMangaPoint, shareComic } from '@/net/manga.request';
import { apiDelay, getPRCDate, getRandomItem, isBoolean, logger, random } from '@/utils';
import { request } from '@/utils/request';
import { Bilicomic } from '@catlair/bilicomic-dataflow';
import { RockPaperScissors, RockPaperScissorsResult, RoundResult } from '@/enums/manga-game.emum';

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
    const { disable_coupon_amount, ep_list, title } = data;
    // 去掉没有漫读券的章节
    return {
      title,
      ep_list: disable_coupon_amount ? ep_list.slice(disable_coupon_amount) : ep_list,
    };
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
      logger.error(`购买漫画 ${ep_id} 失败：${code} ${msg}`);
      return false;
    }
    // 购买成功，则减少漫读券数量
    expireCouponNum--;
    logger.debug(`购买漫画 ${ep_id} 成功`);
  } catch (error) {
    logger.error(`购买漫画异常: ${error}`);
  }
  return false;
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
  const { title, ep_list } = (await getMangaEpList(comic_id)) || {};
  const epList = filterLocked(ep_list);
  if (epList.length === 0) {
    return false;
  }
  logger.info(`购买漫画（${comic_id}）：${title}`);
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
    if (expireCouponNum <= 0) return true;
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

  type SearchList = {
    keyword: string;
    mangas: SearchMangaDto['data']['list'];
  };

  const searchList: SearchList[] = [];
  for (let index = 0; index < name.length; index++) {
    if (expireCouponNum <= 0) return true;
    const keyword = name[index];
    const mangas = await searchManga(keyword);
    if (!mangas || mangas.list.length === 0) {
      continue;
    }
    // 先找完全匹配的
    const manga = mangas.list.find(manga => manga.title === keyword);
    if (!manga) {
      searchList.push({
        keyword,
        mangas: mangas.list,
      });
      continue;
    }
    await buyManga(manga.id);
  }

  // 模糊匹配 searchList
  for (const { mangas, keyword } of searchList) {
    if (expireCouponNum <= 0) return true;
    const manga = mangas.find(manga => manga.title?.includes(keyword));
    if (!manga) continue;
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
    if (expireCouponNum <= 0) return true;
    const favorite = favoriteList[index];
    await buyManga(favorite.comic_id);
  }
}

export async function buyMangaService() {
  const { buy } = TaskConfig.manga;
  if (!buy) {
    return false;
  }
  expireCouponNum = (await getExpireCouponNum()) as number;
  if (!expireCouponNum || expireCouponNum <= 0) {
    logger.info('没有即将过期的漫读券，跳过任务');
    return false;
  }
  // 依次购买
  for (const buy of [buyMangaByMc, buyMangaByName, buyMangaByLove]) {
    logger.debug(`开始购买漫画：${buy.name}`);
    if (await buy()) return true;
  }
  return false;
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
    if (!seasonInfo) {
      logger.debug('没有赛季信息，跳过任务');
      return;
    }
    if (!seasonInfo.tasks?.length && !seasonInfo.today_tasks.find(el => el.status === 1)) {
      logger.debug('没有可领取的任务奖励，跳过任务');
      return;
    }

    const { code, msg } = await mangaApi.takeSeasonGift(seasonInfo.season_id);
    if (code === 0) return;
    if (code === 7) return;
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
  // 循环等待，到 12 点才开始兑换
  while (new Date().getHours() !== 12) {
    await apiDelay(10);
  }
  let isRepeat: boolean | undefined = true;
  // 尝试兑换
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

    if (task30minProgress === 30 && task15minProgress === 15) {
      logger.info('每日阅读任务已完成');
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

async function readManga(comicId: number, epId: number, needTime: number) {
  let time = needTime;
  const bilicomic = new Bilicomic(TaskConfig.USERID, comicId, epId);
  for (let index = 0; index < 3; index++) {
    logger.debug(`开始阅读漫画第${index + 1}轮`);
    try {
      await bilicomic.read(time * 2 + 2);
      await apiDelay(1000);
    } catch (error) {
      logger.debug(`阅读漫画第${index + 1}轮异常：${error.message}`);
    }
    await apiDelay(7000);
    const taskInfo = await getTaskInfo();
    if (isBoolean(taskInfo)) {
      return taskInfo;
    }
    time = taskInfo.time;
    // 如果一轮下来时间一点没变，直接跳过
    if (time === needTime) break;
  }
  return false;
}

/**
 * 每日漫画阅读
 */
export async function readMangaService(isNoLogin?: boolean) {
  if (!TaskConfig.manga.read) {
    return;
  }
  logger.debug('开始每日阅读');
  try {
    const taskInfo = await getTaskInfo();
    if (isBoolean(taskInfo)) {
      return taskInfo;
    }
    const { comicId, time } = taskInfo;
    const { ep_list } = (await getMangaEpList(comicId)) || {};
    if (!ep_list) {
      return;
    }
    const result = await readManga(comicId, ep_list[0].id, time);
    if (isNoLogin) {
      logger.info('非登录状态，不判断阅读结果');
      return;
    }
    if (!result) {
      logger.warn('每日漫画阅读未完成×_×');
    }
  } catch (error) {
    logger.error(`每日漫画阅读任务异常`, error);
  }
}

/**
 * 猜拳游戏
 */
export async function guessGameService() {
  if (!TaskConfig.manga.guess) {
    return;
  }
  const init = await gameInit();
  if (!init) return;
  const { times, round_limit, round } = init;
  // 积分
  let score = 0;
  if (round) {
    logger.debug(`上次游戏还有未完成的局数，继续游戏`);
    for (let index = 0; index < round; index++) {
      await apiDelay(2000);
      await doRoundGuessGame();
    }
  }
  for (let index = 0; index < times; index++) {
    logger.debug(`开始第${index + 1}次猜拳游戏`);
    score -= 10;
    score += await gamePlay(round_limit);
    if (index !== times - 1) await apiDelay(6000);
  }
  logger.info(`猜拳游戏结束，获得积分：${score}`);
}

/**
 * 游戏初始化
 */
async function gameInit() {
  try {
    const { code, msg, data } = await mangaApi.gameInit();
    if (code !== 0) {
      logger.error(`游戏初始化失败：${code} ${msg}`);
      return;
    }
    const { have_tried, play_times, change_role, last_round } = data.home || {};
    const { play_limit = 5, round_limit = 2 } = data.conf || {};
    // 今日还能玩的次数
    const times = play_limit - play_times;
    logger.debug(`今天还能玩${times}次`);
    const rData = {
      times,
      round_limit,
      last_round,
      // 剩余回合数
      round: last_round === 0 ? 0 : round_limit - last_round,
    };
    if (times <= 0) {
      // 回合没有剩余了
      if (last_round === round_limit || last_round === 0) {
        return;
      }
      return rData;
    }
    if (have_tried || !change_role) {
      return rData;
    }
    logger.info(`开始初始化角色`);
    const roles = data.conf.role_resources;
    if (!roles?.length) {
      logger.error('角色列表为空');
      return;
    }
    await finishTry(roles);
    return rData;
  } catch (error) {
    logger.error(`游戏初始化异常：`, error);
  }
}

async function finishTry(
  roles: {
    name: string;
    url: string;
  }[],
) {
  try {
    const role = getRandomItem(roles);
    await mangaApi.chooseRole(role.name);
    await apiDelay(500);
    await mangaApi.finishTry();
  } catch (error) {
    logger.error(`游戏试玩异常：`, error);
  }
}

/**
 * 进行一轮猜拳
 */
async function gamePlay(round_limit = 2) {
  try {
    // 开始游戏
    const { code, msg } = await mangaApi.startGame();
    let round = 0;
    if (code === 1) {
      logger.warn(msg);
      round = 1;
    } else if (code !== 0) {
      logger.error(`开始游戏失败：${code} ${msg}`);
      return 0;
    }

    for (let index = 0; index < round_limit - round; index++) {
      // 开始回合
      await apiDelay(3000);
      await doRoundGuessGame();
    }

    // 查看结果
    await apiDelay(2000);
    return await checkLastResult();
  } catch (error) {
    logger.error(`进行一轮猜拳异常：`, error);
  }
  return 0;
}

/**
 * 查看结果
 */
async function checkLastResult() {
  const { code, data, msg } = await mangaApi.checkLastResult();
  if (code !== 0) {
    logger.error(`查看结果失败：${code} ${msg}`);
    return 0;
  }
  logger.debug(`本轮猜拳获取积分：${data.total_amount}`);
  return data.total_amount;
}

/**
 * 进行一回合猜拳
 */
async function doRoundGuessGame() {
  try {
    const { code, msg, data } = await mangaApi.startRound();
    if (code === 1) {
      logger.warn(msg);
    } else if (code !== 0) {
      logger.error(`开始回合失败：${code} ${msg}`);
      return;
    }
    if (data && data.round) {
      logger.debug(`开始第${data.round}回合`);
    }
    // 猜拳
    await apiDelay(1500);
    const guessGame = new GuessGame();
    let lastResult = 0;
    while (lastResult === 0) {
      lastResult = await guessGame.run();
      await apiDelay(3000);
    }
    logger.debug(`回合猜拳结束：${RoundResult[lastResult]}`);
  } catch (error) {
    logger.error(`开始回合异常：`, error);
  }
}

/**
 * 获取克制关系
 */
function getRestrict(card: number) {
  return card === 1 ? 3 : card - 1;
}

class GuessGame {
  card: number;
  pc_card: number;
  // 上次输赢
  last_result: number;
  // 电脑相同手势次数
  pc_same_count = 0;

  setCard() {
    if ((this.last_result === 1 || this.last_result === 3) && this.pc_same_count < 2) {
      this.card = getRestrict(this.pc_card);
      return;
    }
    this.card = random(1, 3);
    return;
  }

  setData(data: GameGuessDto['data']) {
    this.last_result = data.win;
    if (data.pc_card === this.pc_card) {
      this.pc_same_count++;
    } else {
      this.pc_same_count = 0;
    }
    this.pc_card = data.pc_card;
  }

  async run() {
    try {
      this.setCard();
      const { data, msg, code } = await mangaApi.guessFinger(this.card);
      if (code !== 0) {
        logger.error(`猜拳失败：${code} ${msg}`);
        return RoundResult.输;
      }
      if (data.pc_card === 0) {
        logger.debug(`出现异常，重新猜拳`);
        return RoundResult.输;
      }
      this.setData(data);
      logger.debug(
        `我[${RockPaperScissors[this.card]}] VS 电脑[${RockPaperScissors[data.pc_card]}] ${
          RockPaperScissorsResult[data.win]
        }`,
      );
      return data.round_result;
    } catch (error) {
      logger.error(`猜拳异常：`, error);
    }
    return RoundResult.输;
  }
}
