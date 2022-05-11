import { apiDelay, logger } from '../utils';
import {
  createTag,
  getFollowingsByTag,
  getTags,
  moveToTag,
  unFollow,
} from '../net/user-info.request';
import type { TagListDto } from '../dto/user-info.dto';

export interface User {
  mid: number;
  uname: string;
}

/**
 * 获取最后一个关注
 */
export async function getLastFollow() {
  const { data, code } = await getFollowingsByTag(1, 1, 0);
  if (code !== 0) {
    throw new Error(`获取最后一个关注失败: ${code}`);
  }
  return data[0];
}

/**
 * 获取 tag
 * @param tagName tag名称
 */
export async function getTag(tagName: string): Promise<TagListDto['data'][0] | undefined> {
  // 获取分组列表
  const { data, code } = await getTags();
  if (code !== 0) {
    logger.warn(`获取分组列表失败: ${code}`);
    return;
  }
  return data.find(tag => tag.name === tagName);
}

/**
 * 尝试创建一个分组
 * @param tagName tag名称
 */
export async function tryCreateTag(tagName: string) {
  const tag = await getTag(tagName);
  // 如果已经存在，则不创建
  if (tag) {
    return tag.tagid;
  }
  await apiDelay(300);
  const { data, code, message } = await createTag(tagName);
  // 判断出已经存在？
  if (code === 22106) {
    await apiDelay(300);
    const tag = await getTag(tagName);
    return tag && tag.tagid;
  }
  if (code !== 0) {
    logger.warn(`创建分组失败: ${code}-${message}`);
  }
  return data.tagid;
}

/**
 * 将用户加入分组
 * @param users 用户列表
 * @param tagName 分组名称
 */
export async function moveUsersToTag(users: User[], tagName = '天选时刻') {
  if (users.length === 0) {
    return;
  }
  const tagId = await tryCreateTag(tagName);
  if (!tagId) {
    return;
  }
  for (const user of users) {
    const { code, message } = await moveToTag(user.mid, tagId);
    if (code !== 0) {
      logger.warn(`移动【${user.uname}】失败: ${code}-${message}`);
    }
    await apiDelay();
  }
}

/**
 * 取关分组
 * @param tagName 分组名称
 * @param num 取关数量
 */
export async function unFollowTag(tagName = '天选时刻', num = -1) {
  const tag = await getTag(tagName);
  if (!tag) {
    return;
  }
  await apiDelay();
  if (!tag.tagid) {
    return;
  }
  try {
    const { data, code } = await getFollowingsByTag(1, 20, tag.tagid);
    if (code !== 0 || !data.length) {
      return;
    }
    num = await unFollowUsers(data, num);
    // 取关完成
    if (data.length < 20) {
      return;
    }
    // 如果还有剩余，则继续取关
    if (num !== 0) {
      await unFollowTag(tagName, num);
    }
  } catch (error) {
    logger.warn(`取关分组异常: ${error.message}`);
  }
}

/**
 * 取关用户
 * @param users 用户列表
 * @param num 取关数量
 */
export async function unFollowUsers(users: User[], num = -1) {
  for (const user of users) {
    if (num === 0) {
      return num;
    }
    try {
      const { code, message } = await unFollow(user.mid);
      if (code !== 0) {
        logger.warn(`取关【${user.uname}】失败: ${code}-${message}`);
      }
      num !== -1 && num--;
      await apiDelay();
    } catch (error) {
      logger.warn(`取关【${user.uname}】异常: ${error.message}`);
    }
  }
  return num;
}

/**
 * 获取天选时刻关注的用户
 * @param users
 * @param lotteryFollows
 * @param lastFollow
 * @param ps [1]
 */
export async function getTeamUsers(
  users: User[],
  lotteryFollows: number[],
  lastFollow: number,
  ps = 1,
) {
  if (users.length > lotteryFollows.length) {
    return;
  }
  // 获取在 lastFollow 之后关注的用户
  const { data, code, message } = await getFollowingsByTag(ps, 20, 0);
  if (code !== 0) {
    logger.warn(`获取关注用户失败: ${code}-${message}`);
    return;
  }
  for (const { mid, uname } of data) {
    if (users.length >= lotteryFollows.length) {
      return;
    }
    if (mid === lastFollow) {
      return;
    }
    if (lotteryFollows.includes(mid)) {
      users.push({ mid, uname });
    }
  }
  // 整个关注列表已经获取完毕
  if (data.length < 20) {
    return;
  }
  return await getTeamUsers(users, lotteryFollows, lastFollow, ps + 1);
}
