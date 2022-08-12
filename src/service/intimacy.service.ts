import type { FansMedalDto } from '../dto/live.dto';
import { TaskConfig, TaskModule } from '../config/globalVar';
import * as liveRequest from '../net/live.request';
import { kaomoji, TODAY_MAX_FEED } from '../constant';
import {
  random,
  apiDelay,
  logger,
  Logger,
  apiDelaySync,
  randomString,
  createUUID,
  isServerless,
} from '@/utils';
import { likeLiveRoom, liveMobileHeartBeat } from '@/net/intimacy.request';
import type { MobileHeartBeatParams } from '@/net/intimacy.request';
import { SeedMessageResult } from '@/enums/intimacy.emum';

const messageArray = kaomoji.concat('1', '2', '3', '4', '5', '6', '7', '8', '9', '签到', '哈哈');
const liveLogger = new Logger(
  { console: 'debug', file: 'debug', push: 'warn', payload: TaskModule.nickname },
  'live',
);
// 发送弹幕失败的直播间
const sendMessageFailList = new Map<number, FansMedalDto>();

export async function getFansMealList() {
  let totalNumber = 99,
    pageNumber = 0;
  const list: FansMedalDto[] = [];
  try {
    while (pageNumber < totalNumber) {
      await apiDelay(200, 600);
      const { code, message, data } = await liveRequest.getFansMedalPanel(pageNumber + 1, 10);
      if (code !== 0) {
        logger.verbose(`获取勋章信息失败 ${code} ${message}`);
        return list;
      }

      if (!data) {
        return list;
      }

      totalNumber = data.page_info.total_page;
      pageNumber = data.page_info.current_page;
      list.push(...data.list, ...data.special_list);
    }

    return list;
  } catch (error) {
    logger.error(`获取勋章异常 ${error.message}`);
    return list;
  }
}

/**
 * 过滤掉不需要发送的直播间
 */
export function filterFansMedalList(list: FansMedalDto[]) {
  if (!list || list.length === 0) return [];
  return list.filter(fansMedalFilter);
}

function fansMedalFilter({ room_info, medal }: FansMedalDto) {
  // 没有直播间
  if (!room_info?.room_id) return false;
  // 粉丝牌已经满了或者为舰长
  if (medal.level >= 20) return false;
  // 今日够了
  if (medal.today_feed >= medal.day_limit) return false;
  // 今天达到了 TODAY_MAX_FEED（默认获取最大）
  if (medal.today_feed >= TODAY_MAX_FEED) return false;
  // 不存在白名单
  // TODO：白名单兼容 uid 和 room_id
  const { whiteList, blackList } = TaskConfig.intimacy;
  if (!whiteList || !whiteList.length) {
    // 判断是否存在黑名单中
    if (
      blackList &&
      (blackList.includes(room_info.room_id) || blackList.includes(medal.target_id))
    ) {
      return false;
    }
    return true;
  }
  // 如果存在白名单，则只发送白名单里的
  if (whiteList.includes(room_info.room_id) || whiteList.includes(medal.target_id)) {
    return true;
  }
  return false;
}

export async function sendOneMessage(roomid: number, nickName: string) {
  const msg = messageArray[random(messageArray.length - 1)];
  try {
    const { code, message } = await liveRequest.sendMessage(roomid, msg);

    if (code === 0) {
      // logger.info('发送成功!');
      return SeedMessageResult.Success;
    }
    if (code === SeedMessageResult.Unresistant) {
      logger.warn(`【${nickName}】${roomid}-可能未开启评论`);
      return SeedMessageResult.Unresistant;
    }
    logger.warn(`【${nickName}】${roomid}-发送失败 ${message}`);
    logger.verbose(`code: ${code}`);
    return code;
  } catch (error) {
    logger.verbose(`发送弹幕异常 ${error.message}`);
  }
  return SeedMessageResult.Unknown;
}

async function likeLive(roomId: number) {
  try {
    const { code, message, data } = await likeLiveRoom(roomId);
    if (code === 0) {
      return data;
    }
    logger.info(`【${roomId}】直播间点赞失败 ${code} ${message}`);
  } catch (error) {
    logger.warn(`点赞直播间异常 ${error.message}`);
  }
}

async function liveMobileHeart(
  heartbeatParams: MobileHeartBeatParams & { uname: string },
  countRef: Ref<number>,
  needTime = 75,
) {
  if (countRef.value >= needTime) {
    return;
  }
  try {
    const { code, message } = await liveMobileHeartBeat(heartbeatParams);
    if (code !== 0) {
      logger.warn(`直播间心跳失败 ${code} ${message}`);
      return;
    }
    countRef.value++;
    liveLogger.info(`直播心跳成功 ${heartbeatParams.uname}（${countRef.value}/${needTime}）`);
  } catch (error) {
    liveLogger.error(error);
    logger.error(`直播间心跳异常 ${error.message}`);
  }
}

async function likeAndShare(fansMealList: FansMedalDto[]) {
  for (let index = 0; index < fansMealList.length; index++) {
    const fansMedal = fansMealList[index];
    await liveInteract(fansMedal);
  }
}

async function liveHeart(fansMealList: FansMedalDto[]) {
  if (fansMealList.length === 0) return;
  const { liveHeart } = TaskConfig.intimacy;
  if (!liveHeart) return;
  if (isServerless()) return await liveHeartPromiseSync(fansMealList);
  return new Promise(resolve => liveHeartPromise(resolve, fansMealList));
}

export function getRandomOptions() {
  return {
    buvid: TaskConfig.buvid,
    gu_id: randomString(43).toLocaleUpperCase(),
    visit_id: randomString(32).toLocaleLowerCase(),
    uuid: createUUID(),
    click_id: createUUID(),
  };
}

type NeedTimeType = {
  value: number;
  increase?: boolean;
};

function getLiveHeartNeedTime(medal = { today_feed: 0 }): NeedTimeType {
  const { limitFeed } = TaskConfig.intimacy;
  // 今日还需要 feed
  const { today_feed } = medal;
  let needFeed = limitFeed - today_feed;
  if (today_feed < 200) {
    needFeed -= 200;
  }
  if (needFeed <= 0) {
    return {
      value: 0,
    };
  }
  // 所需要挂机时间 （每 100 feed 需要挂机 5 分钟）,加 1 是因为 1 分钟需要 1 + 1 次
  return {
    value: Math.ceil(needFeed / 100) * 5 + 1,
    increase: today_feed < 200,
  };
}

type LiveHeartRunOptions = {
  fansMedal: FansMedalDto;
  options: Record<string, string>;
  countRef: Ref<number>;
  needTime: NeedTimeType;
  timerRef?: Ref<NodeJS.Timer>;
};

function liveHeartPromise(resolve: (value: unknown) => void, roomList: FansMedalDto[]) {
  for (const fansMedal of roomList) {
    const countRef: Ref<number> = { value: 0 };
    const timerRef: Ref<NodeJS.Timer> = { value: undefined as unknown as NodeJS.Timer };
    const options = getRandomOptions();
    const needTime = getLiveHeartNeedTime(fansMedal.medal);
    const runOptions = { fansMedal, options, countRef, needTime, timerRef };
    run(runOptions);
    timerRef.value = setInterval(run, 60000, runOptions);
    apiDelaySync(50, 150);
  }
  resolve('直播间心跳');
  async function run({
    fansMedal: { medal, room_info, anchor_info },
    options,
    countRef,
    needTime,
    timerRef,
  }: LiveHeartRunOptions) {
    await liveMobileHeart(
      {
        up_id: medal.target_id,
        room_id: room_info.room_id,
        uname: anchor_info.nick_name,
        ...options,
      },
      countRef,
      needTime.value,
    );
    if (countRef.value < needTime.value) {
      return;
    }
    if (needTime.increase && sendMessageFailList.has(room_info.room_id)) {
      needTime.value += 5;
      sendMessageFailList.delete(room_info.room_id);
      return;
    }
    timerRef && timerRef.value && clearInterval(timerRef.value);
  }
}

function liveHeartPromiseSync(roomList: FansMedalDto[]) {
  return Promise.all(
    roomList.map(fansMedal => allLiveHeart(fansMedal, getRandomOptions(), { value: 0 })),
  );
}

/**
 * 完成一个直播间所有轮次的心跳
 * @param fansMedal
 * @param options
 */
async function allLiveHeart(
  fansMedal: FansMedalDto,
  options: Record<string, string>,
  countRef: Ref<number>,
) {
  const needTime = getLiveHeartNeedTime(fansMedal.medal);
  for (let i = 0; i < needTime.value; i++) {
    const { medal, anchor_info, room_info } = fansMedal;
    if (needTime.increase && sendMessageFailList.has(room_info.room_id)) {
      needTime.value += 5;
      sendMessageFailList.delete(room_info.room_id);
    }
    await liveMobileHeart(
      {
        up_id: medal.target_id,
        room_id: room_info.room_id,
        uname: anchor_info.nick_name,
        ...options,
      },
      countRef,
      needTime.value,
    );
    await apiDelay(60000);
  }
}

export async function liveInteract(fansMedal: FansMedalDto) {
  const { room_info, anchor_info } = fansMedal;
  if (!room_info || !anchor_info) {
    return;
  }
  const { liveLike, liveSendMessage } = TaskConfig.intimacy,
    nickName = anchor_info.nick_name,
    roomid = room_info.room_id;
  if (!liveLike && !liveSendMessage) return;
  // 发送直播弹幕
  let sendMessageResult: number;
  if (liveSendMessage) {
    liveLogger.verbose(`为【${nickName}】发送直播弹幕`);
    sendMessageResult = await sendOneMessage(roomid, nickName);
  }
  if (sendMessageResult! !== SeedMessageResult.Success) {
    sendMessageFailList.set(roomid, fansMedal);
  }

  // 点赞直播
  if (liveLike) {
    await apiDelay(100, 300);
    liveLogger.verbose(`为 [${nickName}] 直播间点赞`);
    await likeLive(roomid);
  }

  await apiDelay(11000, 16000);
}

// 发送直播弹幕 1 次 间隔 10s 以上
// 点赞 1 次 间隔 3s 以上

export async function liveIntimacyService() {
  // 获取到可能需要操作的粉丝牌
  const fansMealList = filterFansMedalList(await getFansMealList());
  // 获取到点亮的粉丝牌
  await Promise.allSettled([likeAndShare(fansMealList), liveHeart(fansMealList)]);
  return;
}
