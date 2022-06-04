import type { Sessionlist } from '@/dto/session.dto';
import { TaskConfig } from '@/config/globalVar';
import { deleteSession, getSession, readSession } from '@/net/session.request';
import { apiDelay, logger } from '@/utils';
import { User } from './tags.service';

/**
 * 判断时间戳是否是一个小时内
 * @param {number} timestamp 时间戳
 */
function isOneHour(timestamp: number) {
  const now = Date.now();
  const diff = now - timestamp * 1000;
  return diff < 3600000;
}

/**
 * 获取消息列表
 */
async function getMessageList(followUps: User[]) {
  try {
    const { code, message, data } = await getSession();
    if (code !== 0) {
      logger.warn(`获取会话失败：${code}-${message}`);
      return;
    }
    const { session_list } = data;
    if (session_list.length <= 0) {
      return;
    }
    return session_list.filter(
      ({ unread_count, talker_id, is_follow, last_msg }) =>
        followUps.find(follow => follow.mid === talker_id) &&
        unread_count > 0 &&
        talker_id === last_msg.sender_uid &&
        is_follow === 1 &&
        isOneHour(last_msg.timestamp),
    );
  } catch (error) {
    logger.error(`获取会话异常：${error.message}`);
  }
}

/**
 * 读取或者删除会话
 */
export async function updateSession(followUps: User[]) {
  const sessionList = await getMessageList(followUps);
  await apiDelay(200);
  try {
    for (let index = 0; index < sessionList.length; index++) {
      const session = sessionList[index];
      await handleSession(session);
    }
  } catch (error) {
    logger.error(`更新会话异常：${error.message}`);
  }
  if (sessionList.length >= 19) {
    await updateSession(followUps);
  }
}

async function handleSession(session: Sessionlist) {
  switch (TaskConfig.lottery.actFollowMsg) {
    case 'del':
    case 'delete':
      await deleteSession(session);
      break;
    case 'read':
      await readSession(session);
      break;
    default:
      break;
  }
  await apiDelay(50);
}
