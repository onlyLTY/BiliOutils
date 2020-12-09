import { apiDelay, randomNum } from '../util';
import { getSpecialFollowings, getVideosByUpId } from '../net/userInfoRequest';
import { getRegionRankingVideos } from '../net/videoRequest';

class AidInfo {
  msg: string;
  data: {
    aid?: number;
    title?: string;
    author?: string;
  };
}

/**
 * 从关注列表随机获取一个视频
 */
export async function getAidBySpecialFollowing(): Promise<AidInfo> {
  try {
    const { data } = await getSpecialFollowings();

    if (data) {
      await apiDelay();

      const { mid } = data[randomNum(data.length)];

      return await getAidByUp(mid);
    }
    return {
      msg: '-1',
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
  const rid = arr[randomNum(arr.length)];

  try {
    const { data } = await getRegionRankingVideos(rid, 0);
    if (data) {
      const { aid, title, author } = data[randomNum(data.length)];
      return {
        msg: '0',
        data: {
          aid: Number(aid),
          title,
          author,
        },
      };
    }
    return {
      msg: '-1',
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
export async function getAidByCustomizeUp(
  customizeUp: Array<number>
): Promise<AidInfo> {
  //process.env.BILI_CUSTOMIZE_UP
  const mid = customizeUp[randomNum(customizeUp.length)];
  return await getAidByUp(mid);
}

/**
 * 获取指定up主的随机视频
 * @param id up主ip
 */
export async function getAidByUp(id: number): Promise<AidInfo> {
  try {
    const { data } = await getVideosByUpId(id);

    if (data) {
      const avList = data.media_list;
      const { id, title, upper } = avList[randomNum(avList.length)];
      return {
        msg: '0',
        data: {
          aid: id,
          title,
          author: upper.name,
        },
      };
    }
    return {
      msg: '-1',
      data: {},
    };
  } catch (error) {
    return {
      msg: error.message,
      data: {},
    };
  }
}
