import { apiDelay, getPageNum, logger, random } from '../utils';
import { getFollowings, getSpecialFollowings } from '../net/user-info.request';
import { getRegionRankingVideos } from '../net/video.request';
import { TaskConfig, TaskModule } from '../config/globalVar';
import type { FollowingsDto, TagsFollowingsDto } from '../dto/user-info.dto';
import {
  addCoinForVideo,
  addCoinForArticle,
  addCoinForAudio,
  getUserNavNum,
  searchArticlesByUpId,
  searchAudiosByUpId,
  searchVideosByUpId,
} from '../net/coin.request';
import type { ApiBaseProp } from '../dto/bili-base-prop';

const TypeEnum = {
  video: 'video',
  audio: 'audio',
  article: 'article',
};

export interface AidInfo {
  msg: string;
  data: {
    type?: string;
    id?: number;
    title?: string;
    author?: string;
    message?: string;
    mid?: number; // article 需要
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
      type: TypeEnum.video,
      /** 第几页 */
      page: getPageNum(30, tempNum + 1),
      /** 第几个 */
      index: tempNum % 30,
    };
  }
  const mid = video + audio;
  tempNum = num - video;
  if (num < mid) {
    return {
      type: TypeEnum.audio,
      page: getPageNum(30, tempNum + 1),
      index: tempNum % 30,
    };
  }
  tempNum = num - mid;
  return {
    type: TypeEnum.article,
    page: getPageNum(12, tempNum + 1),
    index: tempNum % 12,
  };
}

/**
 * 从关注列表随机获取一个视频
 * @param special 是否只获取特别关注列表
 */
export async function getAidByFollowing(special = true): Promise<AidInfo> {
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
        msg: '-1',
        data: {},
      };
    }

    if (code === 0) {
      await apiDelay();
      const { mid } = followList[random(followList.length - 1)] || {};
      return await getIdByRandom(mid);
    }
    return {
      msg: special
        ? `未获取到特别关注列表: ${code}-${message}`
        : `未获取到关注列表: ${code}-${message}`,
      data: {},
    };
  } catch (error) {
    return {
      msg: error.message,
      data: {},
    };
  }
}

/**
 * 从随机类别排行中获取一个视频
 */
export async function getAidByRegionRank(): Promise<AidInfo> {
  const arr = [1, 3, 4, 5, 160, 22, 119];
  const rid = arr[random(arr.length - 1)];

  try {
    const { data, message, code } = await getRegionRankingVideos(rid, 3);
    if (code == 0) {
      const { aid, title, author } = data[random(data.length - 1)];
      return {
        msg: '0',
        data: {
          id: Number(aid),
          title,
          author,
        },
      };
    }
    return {
      msg: `未获取到排行信息: ${code}-${message}`,
      data: {},
    };
  } catch (error) {
    return {
      msg: error.message,
      data: {},
    };
  }
}

/**
 * 从自定义up主列表中随机选择
 */
export async function getAidByCustomizeUp(): Promise<AidInfo> {
  const customizeUp = TaskConfig.BILI_CUSTOMIZE_UP;

  if (customizeUp.length === 0) {
    return {
      msg: '-1',
      data: {},
    };
  }
  const mid = customizeUp[random(customizeUp.length - 1)];
  return await getIdByRandom(mid);
}

/**
 * 获取随机投稿（视频，音频，专栏）
 */
export async function getIdByRandom(mid: number) {
  try {
    const { code, data, message } = await getUserNavNum(mid);
    if (code) {
      return {
        msg: `通过uid获取视频失败: ${code}-${message}`,
        data: {},
      };
    }
    await apiDelay();
    const { video, audio, article } = data;
    const { type, page, index } = getRandmonNum([video, audio, article]);

    const handle = {
      [TypeEnum.video]: getVideoByRandom,
      [TypeEnum.audio]: getAudioByRandom,
      [TypeEnum.article]: getArticleByRandom,
    };

    const handleData = await handle[type](mid, page, index);
    if (handleData.message) {
      return {
        msg: handleData.message,
        data: {},
      };
    }
    return {
      msg: '0',
      data: handleData,
    };
  } catch (error) {
    logger.debug(error);
    return {
      msg: error.message,
      data: {},
    };
  }
}

async function getVideoByRandom(mid: number, page: number, index: number) {
  const { code, data, message } = await searchVideosByUpId(mid, 30, page);
  if (code) {
    return { message };
  }
  const { aid, title, author } = data.list.vlist[index];
  return { type: TypeEnum.video, id: aid, title, author };
}

async function getAudioByRandom(mid: number, page: number, index: number) {
  const { code, data, msg } = await searchAudiosByUpId(mid, 30, page);
  if (code) {
    return { message: msg };
  }
  const { data: list } = data;
  const { id, uname, title } = list[index];
  return { type: TypeEnum.audio, id, title, author: uname };
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
  return { type: TypeEnum.article, id, title, author: name, mid };
}

/**
 * 获取 id 的函数数组
 */
function getIdFuncArray(): Array<() => Promise<AidInfo>> {
  const arr = [
    getAidByCustomizeUp,
    getAidByFollowing,
    () => getAidByFollowing(false),
    getAidByRegionRank,
  ];
  //如果没有自定义up则直接删除
  if (!TaskConfig.BILI_CUSTOMIZE_UP) {
    arr.shift();
  }
  return arr;
}

export const idFuncArray = getIdFuncArray();

/**
 * 按照优先顺序调用不同函数获取aid
 */
export async function getAidByByPriority(start = 0) {
  //从指定下标开始调用函数
  idFuncArray.splice(0, TaskModule.currentStartFun + start);

  for (let index = 0; index < idFuncArray.length; index++) {
    const fun = idFuncArray[index];
    let i = Number(TaskConfig.BILI_COIN_RETRY_NUM ?? 4);
    i = i < 1 ? 1 : i > 8 ? 8 : i;
    while (i--) {
      await apiDelay();
      const data = await fun();
      if (data.msg === '-1') i = 0;
      if (data.msg === '0') return data;
    }

    //当调用出现多次错误后将使用优先级更低的函数
    //此处保留出错的索引
    if (i <= 0) {
      TaskModule.currentStartFun = index;
    }
  }

  return {
    msg: '-1',
    data: { id: 0 },
  };
}

// 参数
export interface CoinToIdParams {
  id: number;
  type?: keyof typeof TypeEnum;
  coin?: 1 | 2;
  mid?: number;
}

/**
 * 投币给稿件
 */
export async function coinToId({ id, coin = 1, type = 'video', mid }: CoinToIdParams) {
  const handle = {
    [TypeEnum.video]: addCoinForVideo,
    [TypeEnum.audio]: addCoinForAudio,
    [TypeEnum.article]: (id: number, coin = 1) => addCoinForArticle(mid, id, coin),
  };

  const handleData = await handle[type](Number(id), coin);
  return {
    code: handleData.code,
    //@ts-ignore
    message: handleData.message || handleData.msg,
  };
}
