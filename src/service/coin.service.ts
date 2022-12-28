import {
  apiDelay,
  getDateString,
  getPageNum,
  getRandomItem,
  isNumber,
  logger,
  random,
} from '../utils';
import {
  getCoinHistory,
  getDonateCoinExp,
  getFollowings,
  getSpecialFollowings,
} from '../net/user-info.request';
import { getRecommendVideos, getRegionRankingVideos } from '../net/video.request';
import { TaskConfig } from '../config/globalVar';
import type { FollowingsDto, TagsFollowingsDto } from '../dto/user-info.dto';
import type { UserNavNumDto } from '@/dto/coin.dto';
import {
  addCoinForVideo,
  addCoinForArticle,
  addCoinForAudio,
  getUserNavNum,
  searchArticlesByUpId,
  searchAudiosByUpId,
  searchVideosByUpId,
  getVideoRelation,
  getMusicCoin,
  getArticleInfo,
  getTodayAccountExp,
} from '../net/coin.request';
import type { ApiBaseProp } from '../dto/bili-base-prop';
import { request } from '@/utils/request';
import { TypeEnum } from '@/enums/coin.emum';

// const AidInfoCodeEnum = {
//   '-2': '获取异常',
//   '-1': '获取错误',
//   0: '获取成功',
//   1: '数据为空',
// };

export interface AidInfo {
  msg?: string;
  code: number;
  data?: {
    coinType: ValueOf<typeof TypeEnum>;
    id: number;
    title: string;
    author: string;
    message?: string;
    mid?: number; // article 需要
    /** 1：自制 2：转载 */
    copyright?: string; // video 需要
  };
}

function getRandmonNum([video, audio, article]: number[]) {
  const total = video + audio + article;
  if (!total) {
    return;
  }
  const num = random(0, total - 1);

  // num 是落在哪个区间
  let tempNum = num;
  if (num < video) {
    return {
      coinType: TypeEnum.video,
      total: video,
      ...getPageInfo(30, tempNum),
    };
  }
  const mid = video + audio;
  tempNum = num - video;
  if (num < mid) {
    return {
      coinType: TypeEnum.audio,
      total: audio,
      ...getPageInfo(30, tempNum),
    };
  }
  tempNum = num - mid;
  return {
    coinType: TypeEnum.article,
    total: article,
    ...getPageInfo(12, tempNum),
  };

  function getPageInfo(ps: number, tempNum: number) {
    return {
      page: getPageNum(ps, tempNum + 1),
      index: tempNum % ps,
    };
  }
}

/**
 * 从关注列表随机获取一个视频
 * @param special 是否只获取特别关注列表
 */
export async function getAidByFollowing(types?: string[], special = false): Promise<AidInfo> {
  try {
    const uid = TaskConfig.USERID;
    const { data, message, code }: ApiBaseProp = await (special
      ? getSpecialFollowings()
      : getFollowings(uid));

    const followList = special
      ? (data as TagsFollowingsDto['data'])
      : (data as FollowingsDto['data']).list;

    if (!followList || followList.length === 0) {
      return {
        msg: '没有关注列表',
        code: 1,
      };
    }

    if (code === 0) {
      await apiDelay();
      const { mid } = getRandomItem(followList) || {};
      return await getIdByRandom(mid, types);
    }
    return {
      msg: special
        ? `未获取到特别关注列表: ${code}-${message}`
        : `未获取到关注列表: ${code}-${message}`,
      code: -1,
    };
  } catch (error) {
    return {
      msg: error.message,
      code: -2,
    };
  }
}

/**
 * 从推荐列表随机获取一个视频
 */
export async function getAidByRecommend(): Promise<AidInfo> {
  try {
    const { code, data, message } = await getRecommendVideos(4);
    if (code !== 0) {
      return {
        msg: `未获取到首页推荐列表: ${code}-${message}`,
        code: -1,
      };
    }
    const { id, title, owner } = getRandomItem(data.item);
    return {
      code: 0,
      data: {
        id,
        title,
        coinType: TypeEnum.video,
        author: owner.name,
      },
    };
  } catch (error) {
    return {
      msg: error.message,
      code: -2,
    };
  }
}

/**
 * 从随机类别排行中获取一个视频
 */
export async function getAidByRegionRank(): Promise<AidInfo> {
  const arr = [1, 3, 4, 5, 160, 22, 119];
  const rid = getRandomItem(arr);

  try {
    const { data, message, code } = await getRegionRankingVideos(rid, 3);
    if (code !== 0) {
      return {
        msg: `未获取到排行信息: ${code}-${message}`,
        code: -1,
      };
    }
    const { aid, title, author } = getRandomItem(data);
    return {
      code: 0,
      data: {
        id: Number(aid),
        title,
        coinType: TypeEnum.video,
        author,
      },
    };
  } catch (error) {
    return {
      msg: error.message,
      code: -2,
    };
  }
}

/**
 * 从自定义up主列表中随机选择
 */
export async function getAidByCustomizeUp(types?: string[]): Promise<AidInfo> {
  const customizeUp = TaskConfig.coin.customizeUp;
  if (customizeUp.length === 0) {
    return {
      code: 1,
      msg: '没有自定义up主',
    };
  }
  return await getIdByRandom(getRandomItem(customizeUp), types);
}

/**
 * 获取随机投稿（视频，音频，专栏）
 */
export async function getIdByRandom(mid: number, types?: string[]) {
  if (!mid) {
    return {
      code: 1,
      msg: '用户id不存在',
    };
  }
  try {
    // 获取目标用户的投稿
    const { code, data, message } = await getUserNavNum(mid);
    if (code) {
      return {
        msg: `通过mid获取随机投稿失败: ${code}-${message}`,
        code: -1,
      };
    }
    await apiDelay();
    // 获取随机投稿
    const randmonNumData = getRandmonNumData(data, types);
    if (!randmonNumData) {
      return {
        msg: '用户没有投稿',
        code: 1,
      };
    }
    // 获取稿件的详情
    const handleData = await getRandomInfo(mid, randmonNumData);
    if (handleData.message) {
      return {
        msg: handleData.message,
        code: -1,
      };
    }
    return {
      code: 0,
      data: handleData as AidInfo['data'],
    };
  } catch (error) {
    logger.debug(error);
    return {
      msg: error.message,
      code: -2,
    };
  }
}

function getRandmonNumData(navData: UserNavNumDto['data'], types: string[] = []) {
  types = types.length === 0 ? ['video', 'audio', 'article'] : types;
  return getRandmonNum(
    (['video', 'audio', 'article'] as const).map(item =>
      types.includes(item) ? navData[item] : 0,
    ),
  );
}

async function getRandomInfo(mid: number, data: Defined<ReturnType<typeof getRandmonNumData>>) {
  const { coinType, page, index, total } = data,
    handle = {
      [TypeEnum.video]: getVideoByRandom,
      [TypeEnum.audio]: getAudioByRandom,
      [TypeEnum.article]: getArticleByRandom,
    };
  return await handle[coinType](mid, page, index, total);
}

let countVideo = 0;
async function getVideoByRandom(mid: number, page: number, index: number, total: number) {
  if (countVideo >= 5)
    return {
      message: '获取 upperAccMatch 视频失败',
    };

  const { code, data, message } = await searchVideosByUpId(mid, 30, page);
  if (code) return { message };
  countVideo++;

  const { aid, title, author, copyright, mid: upperMid } = data.list.vlist[index];

  if (upperMid !== mid && TaskConfig.coin.upperAccMatch) {
    const { page, index } = getRandmonNum([total, 0, 0]) || { page: 1, index: 0 };
    return await getVideoByRandom(mid, page, index, total);
  }

  countVideo = 0;
  return { coinType: TypeEnum.video, id: aid, title, author, copyright };
}

async function getAudioByRandom(mid: number, page: number, index: number) {
  const { code, data, msg } = await searchAudiosByUpId(mid, 30, page);
  if (code) {
    return { message: msg };
  }
  const { data: list } = data;
  const { id, uname, title } = list[index];
  return { coinType: TypeEnum.audio, id, title, author: uname };
}

async function getArticleByRandom(mid: number, page: number, index: number) {
  const { code, data, message } = await searchArticlesByUpId(mid, 12, page);
  if (code) {
    return { message };
  }
  const { articles } = data;
  const {
    id,
    title,
    author: { name },
  } = articles[index];
  return { coinType: TypeEnum.article, id, title, author: name, mid };
}

function getAidBySpecialFollowing(types?: string[]) {
  return getAidByFollowing(types, true);
}

const idFuncObject = {
  自定义UP: getAidByCustomizeUp,
  特别关注: getAidBySpecialFollowing,
  关注: getAidByFollowing,
  首页推荐: getAidByRecommend,
  分区排行: getAidByRegionRank,
};
export type IdFuncMapKey = keyof typeof idFuncObject;
const idFuncArray: [IdFuncMapKey, () => Promise<AidInfo>][] = [];
TaskConfig.coin.src.forEach(name => idFuncArray.push([name as IdFuncMapKey, idFuncObject[name]]));
export const idFuncMap = new Map<IdFuncMapKey, (types?: string[]) => Promise<AidInfo>>(idFuncArray);
export const aidFuncName = new (class {
  private srcs: IdFuncMapKey[] = (TaskConfig.coin.src || []) as IdFuncMapKey[];
  value: IdFuncMapKey = this.srcs[0] || '首页推荐';

  next() {
    // 获取下一个
    const index = this.srcs.indexOf(this.value) + 1;
    // 下一个不存在时，设置为 首页推荐
    if (index === this.srcs.length) {
      return (this.value = '首页推荐');
    }
    return (this.value = this.srcs[index]);
  }
})();

/**
 * 按照优先顺序调用不同函数获取aid
 */
export async function getAidByByPriority(types?: string[]) {
  const idFunc = idFuncMap.get(aidFuncName.value);
  await apiDelay();
  return idFunc?.(types && types.map(el => TypeEnum[el])) || getAidByRecommend();
}

// 参数
export interface CoinToIdParams {
  id: number;
  coinType?: ValueOf<typeof TypeEnum>;
  coin?: 1 | 2;
  mid: number;
}

/**
 * 投币给稿件
 */
export async function coinToId({ id, coin = 1, coinType = '视频', mid }: CoinToIdParams) {
  const handle = {
    [TypeEnum.video]: addCoinForVideo,
    [TypeEnum.audio]: addCoinForAudio,
    [TypeEnum.article]: (id: number, coin = 1) => addCoinForArticle(mid, id, coin),
  };

  const handleData = await handle[coinType](Number(id), coin);
  return {
    code: handleData.code,
    //@ts-ignore
    message: handleData.message || handleData.msg,
  };
}

/**
 * 获取今日投币数量
 */
export async function getTodayCoinNum(defCoin?: number) {
  return (
    (await getTodayAccountCoin()) ||
    (await getTodayCoin()) ||
    (await getTodayExpenseCoin()) ||
    defCoin ||
    0
  );
}

/** 获取已投硬币 */
async function getTodayCoin() {
  try {
    const { data: coinExp, code } = await getDonateCoinExp();
    if (code === 0) {
      return coinExp / 10;
    }
  } catch (error) {
    logger.debug(`获取投币数量异常 ${error.message}`);
  }
}

/** 获取已投硬币 */
async function getTodayAccountCoin() {
  try {
    const { number, code } = await getTodayAccountExp();
    if (code === 0) {
      return number / 10;
    }
  } catch (error) {
    logger.debug(`获取投币数量异常[exp.php] ${error.message}`);
  }
}

/** 获取今日投币消耗硬币 */
async function getTodayExpenseCoin() {
  try {
    const { code, message, data } = await getCoinHistory();
    if (code !== 0) {
      logger.warn(`获取投币消耗硬币失败：${code} ${message}`);
      return;
    }
    const list = data.list;
    if (!list || !list.length) {
      return;
    }
    const today = list
      .filter(item => {
        if (item.delta !== -2 && item.delta !== -1) return false;
        const { reason, time } = item;
        if (!reason || !time) return;
        if (!reason.startsWith('给') || !reason.endsWith('打赏')) return;
        if (time.startsWith(getDateString())) return true;
        return false;
      })
      .reduce((acc, item) => acc + item.delta, 0);
    return Math.abs(today);
  } catch (error) {
    logger.debug(`获取投币消耗硬币异常 ${error.message}`);
  }
}

/**
 * 获取视频已投币数量
 */
async function getVideoCoinNum(aid: number) {
  const { coin } = await request(getVideoRelation, undefined, { aid });
  return coin ?? 0;
}

/**
 * 获取音频已投币数量
 */
async function getAudioCoinNum(sid: number) {
  const coin = await request(getMusicCoin, undefined, sid);
  return isNumber(coin) ? coin : 0;
}

/**
 * 获取专栏已投币数量
 */
async function getArticleCoinNum(id: number) {
  const { coin } = await request(getArticleInfo, undefined, id);
  return coin ?? 0;
}

/**
 * 获取稿件还能投币数量
 */
export async function getContributionCoin(coinType: ValueOf<typeof TypeEnum>, id: number | string) {
  try {
    const handle = {
      [TypeEnum.video]: getVideoCoinNum,
      [TypeEnum.audio]: getAudioCoinNum,
      [TypeEnum.article]: getArticleCoinNum,
    };
    return handle[coinType](Number(id));
  } catch (error) {
    logger.warn(`获取稿件还能投币数量异常 ${error.message}`);
    return 0;
  }
}
