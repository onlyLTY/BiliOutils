import { apiDelay, random } from '../utils';
import { getFollowings, getSpecialFollowings, getVideosByUpId } from '../net/user-info.request';
import { getRegionRankingVideos } from '../net/video.request';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { FollowingsDto } from '../dto/user-info.dto';

class AidInfo {
  msg: string;
  data: {
    aid?: number | string;
    title?: string;
    author?: string;
  };
}

/**
 * 从关注列表随机获取一个视频
 * @param special 是否只获取特别关注列表
 */
export async function getAidByFollowing(special = true): Promise<AidInfo> {
  try {
    const uid = TaskConfig.USERID;
    let tempData: FollowingsDto;
    if (special) {
      tempData = await getSpecialFollowings();
    } else {
      tempData = await getFollowings(uid);
    }

    const { data, message, code } = tempData;

    if (code === 0 && data.length > 0) {
      await apiDelay();

      const { mid } = data[random(data.length - 1)];

      return await getAidByUp(mid);
    }
    if (data.length === 0)
      return {
        msg: '-1',
        data: {},
      };
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
          aid,
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
  return await getAidByUp(mid);
}

/**
 * 获取指定up主的随机视频
 * @param uid up主ip
 */
export async function getAidByUp(uid: number | string): Promise<AidInfo> {
  uid = Number(uid);
  try {
    const { message, data, code } = await getVideosByUpId(uid);

    if (code == 0) {
      let avList = data.media_list;

      if (TaskConfig.BILI_UPPER_ACC_MATCH === true) {
        avList = avList.filter(el => uid === el.upper?.mid);
      }
      const { id, title, upper } = avList[random(avList.length - 1)];
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
      msg: `通过uid获取视频失败: ${code}-${message}`,
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
 * 按照优先顺序调用不同函数获取aid
 */
export async function getAidByByPriority() {
  let data: AidInfo;
  const aidFunArray: Array<() => Promise<AidInfo>> = [
    getAidByCustomizeUp,
    getAidByFollowing,
    () => getAidByFollowing(false),
    getAidByRegionRank,
  ];

  //如果没有自定义up则直接删除
  if (!TaskConfig.BILI_CUSTOMIZE_UP) {
    aidFunArray.shift();
  }

  //从指定下标开始调用函数
  aidFunArray.splice(0, TaskModule.currentStartFun);

  for (let index = 0; index < aidFunArray.length; index++) {
    const fun = aidFunArray[index];
    data = await fun();
    if (data.msg === '0') return data;

    let i = Number(TaskConfig.BILI_COIN_RETRY_NUM ?? 4);
    i = i < 1 ? 1 : i > 8 ? 8 : i;
    while (i--) {
      await apiDelay();
      data = await fun();
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
    data: { aid: 0 },
  };
}
