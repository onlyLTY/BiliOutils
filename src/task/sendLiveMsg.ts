import { apiDelay, random } from '../utils';
import * as liveRequest from '../net/live.request';
import { FansMedalPanelDto, FansMedalDto } from '../dto/live.dto';
import { TaskConfig } from '../config/globalVar';
import { logger } from '../utils/log';
import { kaomoji } from '../constant';

const messageArray = kaomoji.concat('1', '2', '3', '4', '5', '6', '7', '8', '9', '签到', '哈哈');

async function getFansMedalPanel(): Promise<FansMedalPanelDto['data']> {
  try {
    const { code, message, data } = await liveRequest.getFansMedalPanel(1, 256, TaskConfig.USERID);

    if (code !== 0) {
      logger.verbose(`获取勋章信息失败 ${code} ${message}`);
      return null;
    }

    return data;
  } catch (error) {
    logger.error(`获取勋章异常 ${error.message}`);
    return null;
  }
}

async function getFansMealList(): Promise<FansMedalDto[]> {
  const { list, special_list } = await getFansMedalPanel();
  list.push(...special_list);
  return list;
}

async function sendOneMessage(roomid: number, targetName: string) {
  const msg = messageArray[random(messageArray.length - 1)];
  try {
    const { code, message } = await liveRequest.sendMessage(roomid, msg);

    if (code !== 0) {
      // 11000 某种不可抗力不允许发
      // 10030 发送过于频繁
      if (code === 11000) {
        logger.warn(`【${targetName}】${roomid}-可能未开启评论`);
        return false;
      }
      logger.warn(`【${targetName}】${roomid}-发送失败 ${message}`);
      logger.verbose(`code: ${code}`);
      return false;
    }
    // logger.info('发送成功!');
    return true;
  } catch (error) {
    logger.verbose(`发送弹幕异常 ${error.message}`);
  }
}

export default async function liveSendMessage() {
  logger.info('----【发送直播弹幕】----');

  const fansMedalList = await getFansMealList();
  const fansMedalLength = fansMedalList.length;
  let count = 0,
    jumpCount = 0;
  logger.info(`一共需要发送${fansMedalLength}个直播间`);
  logger.verbose(`所需时间可能很长，请耐心等待`);

  for (let i = 0; i < fansMedalLength; i++) {
    const { room_info, anchor_info, medal } = fansMedalList[i];
    if (!room_info?.room_id) {
      logger.info(`【${anchor_info.nick_name}】没有直播间哦`);
      jumpCount++;
      continue;
    }
    if (medal.today_feed === 100 || medal.guard_level > 0) {
      jumpCount++;
      continue;
    }
    if (await sendOneMessage(room_info.room_id, anchor_info.nick_name)) count++;
    if (i < fansMedalLength - 1) await apiDelay(random(10000, 25000));
  }
  logger.info(`成功发送${count}个弹幕，跳过${jumpCount}个`);
}
