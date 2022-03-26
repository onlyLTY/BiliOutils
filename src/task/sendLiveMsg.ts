import { apiDelay, random } from '../utils';
import * as liveRequest from '../net/liveRequest';
import { FansMedalPanelDto, FansMedalDto } from '../dto/Live.dto';
import { TaskConfig } from '../config/globalVar';
import { logger } from '../utils/log';

const kaomoji = [
  '(⌒▽⌒)',
  '（￣▽￣）',
  '(=・ω・=)',
  '(｀・ω・´)',
  '(〜￣△￣)〜',
  '(･∀･)',
  '(°∀°)ﾉ',
  '(￣3￣)',
  '╮(￣▽￣)╭',
  '_(:3」∠)_',
  '( ´_ゝ｀)',
  '←_←',
  '→_→',
  '(<_<)',
  '(>_>)',
  '(;¬_¬)',
  '(ﾟДﾟ≡ﾟдﾟ)!?',
  'Σ(ﾟдﾟ;)',
  'Σ( ￣□￣||)',
  '(´；ω；`)',
  '（/TДT)/',
  '(^・ω・^ )',
  '(｡･ω･｡)',
  '(●￣(ｴ)￣●)',
  'ε=ε=(ノ≧∇≦)ノ',
  '(´･_･`)',
  '(-_-#)',
  '（￣へ￣）',
  '(￣ε(#￣) Σ',
  'ヽ(`Д´)ﾉ',
  '（#-_-)┯━┯',
  '(╯°口°)╯(┴—┴',
  '←◡←',
  '( ♥д♥)',
  'Σ>―(〃°ω°〃)♡→',
  '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
  '(╬ﾟдﾟ)▄︻┻┳═一',
  '･*･:≡(　ε:)',
  '(汗)',
  '(苦笑)',
];

const messageArray = kaomoji.concat('1', '2', '3', '4', '5', '6', '7', '8', '9', '签到', '哈哈');

async function getFansMedalPanel(): Promise<FansMedalPanelDto['data']> {
  try {
    const { code, message, data } = await liveRequest.getFansMedalPanel(1, 256, TaskConfig.USERID);

    if (code !== 0) {
      console.error('获取勋章信息失败 ', code, message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('获取勋章异常', error.message);
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
        logger.info(`【${targetName}】${roomid}-可能未开启评论`);
        return false;
      }
      logger.info(`【${targetName}】${roomid}-发送失败 ${message}`);
      console.error(code);
      return false;
    }
    // logger.info('发送成功!');
    return true;
  } catch (error) {
    console.error('发送弹幕异常', error.message);
  }
}

export default async function liveSendMessage() {
  logger.info('----【发送直播弹幕】----');

  const fansMedalList = await getFansMealList();
  let count = 0,
    jumpCount = 0;
  logger.info(`一共需要发送${fansMedalList.length}个直播间`);
  console.info(`所需时间很长，请耐心等待`);

  for (const medal of fansMedalList) {
    const { room_info, anchor_info } = medal;
    if (!room_info?.room_id) {
      logger.info(`【${anchor_info.nick_name}】没有直播间哦`);
      jumpCount++;
      break;
    }
    // logger.info(`给【${medal.target_name}】${medal.roomid}发送弹幕`);
    (await sendOneMessage(room_info.room_id, anchor_info.nick_name)) && count++;
    await apiDelay(random(10000, 25000));
  }
  logger.info(`成功发送${count}个弹幕，跳过${jumpCount}个`);
}
