import type { Sessionlist, SessionMessage10Dto } from '@/dto/session.dto';
import type { SessionHandleType } from '@/types';
import { TaskModule } from '@/config/globalVar';
import { deleteSession, getSession, getSessionHistory, readSession } from '@/net/session.request';
import { apiDelay, isBoolean, logger, pushIfNotExist } from '@/utils';
import { User } from './tags.service';
import { request } from '@/utils/request';

// 直播小喇叭是否存在未读信息
let liveLoudspeakerNow: boolean;

/**
 * 判断时间戳是否是 n 小时内
 * @param {number} timestamp 时间戳 （unix，秒级）
 */
function isInNHour(timestamp: number, n = 1) {
  const now = Date.now();
  const diff = now - timestamp * 1000;
  return diff < n * 3600000;
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
    if (!session_list || session_list.length <= 0) {
      return;
    }
    const liveLoudspeaker = session_list.find(el => el.talker_id === 17561219);
    if (liveLoudspeaker) {
      liveLoudspeakerNow = true;
    }
    return session_list.filter(
      ({ unread_count, talker_id, is_follow, last_msg }) =>
        followUps.find(follow => follow.mid === talker_id) &&
        unread_count > 0 &&
        talker_id === last_msg.sender_uid &&
        is_follow === 1 &&
        isInNHour(last_msg.timestamp, 1.5),
    );
  } catch (error) {
    logger.error(`获取会话异常：${error.message}`);
  }
}

/**
 * 读取或者删除会话
 */
export async function updateSession(followUps: User[], actFollowMsg: SessionHandleType) {
  if (!followUps || followUps.length <= 0) {
    return;
  }
  liveLoudspeakerNow = false;
  const sessionList = await getMessageList(followUps);
  if (!sessionList || sessionList.length <= 0) {
    return;
  }
  await apiDelay(200);
  try {
    for (let index = 0; index < sessionList.length; index++) {
      const session = sessionList[index];
      await handleSession(session, actFollowMsg);
    }
  } catch (error) {
    logger.error(`更新会话异常：${error.message}`);
  }
  if (sessionList.length >= 19) {
    await updateSession(followUps, actFollowMsg);
  }
}

async function handleSession(session: Sessionlist, actFollowMsg: SessionHandleType) {
  switch (actFollowMsg) {
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

/**
 * 读取 直播小喇叭 的消息
 */
async function getLiveUserSession() {
  const { messages } = await request(getSessionHistory, { name: '获取直播小喇叭消息' });
  if (!messages) {
    return [];
  }
  return messages
    .map(({ msg_type, content, timestamp }) => {
      // 10 就是卡片类型的
      if (msg_type !== 10) {
        return;
      }
      // timestamp 是秒级的，判断是否是这两天发的
      if (!isInNHour(timestamp, 48)) {
        return;
      }
      try {
        const ctObj: SessionMessage10Dto = JSON.parse(content);
        const isOk = ctObj?.title?.includes('中奖');
        if (isOk) {
          return ctObj.text;
        }
      } catch {}
    })
    .filter(Boolean);
}

/**
 * 打印小喇叭消息
 */
export async function printLiveUserSession() {
  if (isBoolean(liveLoudspeakerNow) && !liveLoudspeakerNow) {
    return;
  }
  const messages = await getLiveUserSession();
  if (messages.length <= 0) {
    return;
  }
  pushIfNotExist(TaskModule.pushTitle, '【天选】');
  messages.forEach(message => logger.info(`【最近 48 小时可能中奖的消息】：${message}`));
}
