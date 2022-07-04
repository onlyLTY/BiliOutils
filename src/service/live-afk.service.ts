import { TaskModule } from '@/config/globalVar';
import { DoubleMessageProp } from '@/dto/bili-base-prop';
import { liveApi } from '@/net/api';
import type { MobileHeartBeatParams } from '@/net/intimacy.request';
import { liveMobileHeartBeat } from '@/net/intimacy.request';
import { getUser } from '@/net/user-info.request';
import { getRandomItem } from '@/utils';
import { apiDelay } from '@/utils/effect';
import { Logger } from '@/utils/log';
import { getRandomOptions } from './intimacy.service';

const liveLogger = new Logger(
  { console: 'debug', file: 'warn', push: 'warn', payload: TaskModule.nickname },
  'live',
);

/**
 *
 * @param time 运行时长（分钟）
 */
export async function liveAFKService(time = 400) {
  for (let index = time / 6; index > 0; index--) {
    const watchTime = await userWatchTime();
    if (watchTime.duration > 360) break;
    await runOneRound();
  }
}

/**
 * 运行一轮, 10分钟
 */
async function runOneRound() {
  const users = await getRecommendAnchors();
  if (!users || users.length === 0) {
    return;
  }
  const user = getRandomItem(users);
  liveLogger.info(`获取到主播：${user.nickname} 房间号：${user.room_id}`);
  const options = getRandomOptions();
  await liveHeartInterval(
    {
      up_id: user.uid,
      room_id: user.room_id,
      ...options,
    },
    10,
  );
}
/**
 * 获取直播间 ID
 */
export async function getLiveRoomId(uid: number) {
  try {
    const { code, message, data } = await getUser(uid);
    if (code !== 0) {
      liveLogger.warn(`获取直播间失败 ${code} ${message}`);
      return;
    }
    const live_room = data.live_room;
    if (!live_room) return;
    if (live_room.roomStatus === 0) {
      liveLogger.info(`直播间不存在`);
      return;
    }
    if (live_room.liveStatus === 0) {
      liveLogger.info(`直播间未直播`);
      return live_room.roomid;
    }
    return live_room.roomid;
  } catch (error) {
    liveLogger.error(error);
    liveLogger.error(`获取直播间异常 ${error.message}`);
  }
}

async function liveHeartInterval(heartbeatParams: MobileHeartBeatParams, time: number) {
  for (let t = time; t > 0; t--) {
    await liveMobileHeart(heartbeatParams);
    await apiDelay(60000);
  }
}

async function liveMobileHeart(heartbeatParams: MobileHeartBeatParams) {
  try {
    const { code, message } = await liveMobileHeartBeat(heartbeatParams);
    if (code !== 0) {
      liveLogger.warn(`直播间心跳失败 ${code} ${message}`);
      return;
    }
    liveLogger.info(`直播间心跳成功`);
  } catch (error) {
    liveLogger.error(error);
    liveLogger.error(`直播间心跳异常 ${error.message}`);
  }
}

/**
 * 获取活动的主播
 */
async function getRecommendAnchors() {
  try {
    const { data, code, message } = await liveApi.get<
      DoubleMessageProp<{ anchor_list: RecommendAnchors[] }>
    >(`activity_php/v1/Famine/recommendAnchors?_=${new Date().getTime()}`);
    if (code !== 0) {
      liveLogger.warn(`获取活动主播失败 ${code} ${message}`);
      return;
    }
    return data.anchor_list;
  } catch (error) {
    liveLogger.error(error);
    liveLogger.error(`获取活动的主播异常 ${error.message}`);
  }
}

/**
 * 当前直播时间
 */
async function userWatchTime() {
  try {
    const { data, code, message } = await liveApi.get<DoubleMessageProp<UserWatchTime>>(
      `activity_php/v1/Famine/userWatchTime?_=${new Date().getTime()}`,
    );
    if (code !== 0) {
      liveLogger.warn(`获取观看时间失败 ${code} ${message}`);
      return;
    }
    return data;
  } catch (error) {
    liveLogger.error(error);
    liveLogger.error(`获取观看时间失败 ${error.message}`);
  }
}

interface RecommendAnchors {
  uid: number;
  nickname: string;
  face: string;
  official_verify: {
    url: string;
    desc: string;
    position: number;
  };
  live_link: string;
  live_status: number;
  room_id: number;
  is_follow: number;
}

interface UserWatchTime {
  bind_status: number;
  duration: number;
}

(async () => {
  await liveAFKService(30);
})();
