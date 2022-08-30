import type { TagsFollowingsDto } from '@/dto/user-info.dto';
import type { SessionHandleType } from '@/types';
import type { TagListDto } from '@/dto/user-info.dto';
import { apiDelay, Logger, logger, sleep } from '@/utils';
import {
  createTag,
  getFollowingsByTag,
  getTags,
  moveToTag,
  unFollow,
} from '@/net/user-info.request';
import { updateSession } from './session.service';
import { TaskConfig } from '@/config/globalVar';

const tagLogger = new Logger({ console: 'debug', file: 'warn', push: 'warn' }, 'live');

export interface User {
  mid: number;
  uname: string;
}

let unCount = 0;

/**
 * 获取最后一个关注
 */
export async function getLastFollow() {
  try {
    const { data, code } = await getFollowingsByTag(1, 1, 0);
    if (code !== 0) {
      logger.warn(`获取最后一个关注失败: ${code}`);
    }
    return data?.[0];
  } catch (error) {
    logger.warn(error);
  }
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
  if (!users || users.length === 0) {
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
    await apiDelay(500, 1300);
  }
}

/**
 * 取关分组
 * @param tagName 分组名称
 * @param restNum 剩余取关数量
 */
export async function unFollowTag(tagName = '天选时刻', restNum = -1): Promise<number> {
  const tag = await getTag(tagName);
  if (!tag) {
    return restNum;
  }
  await apiDelay();
  if (!tag.tagid) {
    return restNum;
  }
  try {
    const { data, code } = await getFollowingsByTag(1, 20, tag.tagid);
    if (code !== 0 || !data.length) {
      return restNum;
    }
    restNum = await unFollowUsers(data, restNum);
    // 取关完成
    if (data.length < 20) {
      return restNum;
    }
    // 如果还有剩余，则继续取关
    if (restNum !== 0) {
      return await unFollowTag(tagName, restNum);
    }
  } catch (error) {
    logger.warn(`取关分组异常: ${error.message}`);
  }
  return restNum;
}

/**
 * 取关用户
 * @param users 用户列表
 * @param restNum 剩余取关数量
 */
export async function unFollowUsers(users: User[], restNum = -1) {
  const [unNum, sleepTime] = TaskConfig.unFollow.restTime;
  for (const user of users) {
    if (restNum === 0) {
      return restNum;
    }
    try {
      const { code, message } = await unFollow(user.mid);
      tagLogger.debug(`取关【${user.uname}】成功！`);
      if (code !== 0) {
        logger.warn(`取关【${user.uname}】失败: ${code} ${message}`);
      }
      restNum > 0 && restNum--;
      unCount++;
      if (unNum > 0 && unCount >= unNum && sleepTime > 0) {
        unCount = 0;
        await sleep(sleepTime * 60000);
        continue;
      }
      await sleep(TaskConfig.unFollow.delay * 1000);
    } catch (error) {
      logger.warn(`取关【${user.uname}】异常: ${error.message}`);
    }
  }
  return restNum;
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
  lotteryFollows: (number | string)[],
  lastFollow?: number,
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
    if (lotteryFollows.includes(mid) || lotteryFollows.includes(uname)) {
      users.push({ mid, uname });
    }
  }
  // 整个关注列表已经获取完毕
  if (data.length < 20) {
    return;
  }
  return await getTeamUsers(users, lotteryFollows, lastFollow, ps + 1);
}

export async function handleFollowUps(
  newFollowUps: (string | number)[],
  lastFollow?: TagsFollowingsDto['data'][number],
  moveTag?: string,
  actFollowMsg: SessionHandleType = 'read',
  log = true,
) {
  // 获取天选时刻关注的用户
  const followUps: User[] = [];
  await getTeamUsers(followUps, newFollowUps, lastFollow?.mid);
  // 读取消息
  log && logger.debug(`开始处理消息：${actFollowMsg}}`);
  await updateSession(followUps, actFollowMsg);
  // 移动关注UP到分组
  if (moveTag) {
    log && logger.debug(`移动关注UP${followUps.length}个到分组${moveTag}`);
    await moveUsersToTag(followUps, moveTag);
    log && logger.debug('移动关注UP到分组成功');
  }
}
