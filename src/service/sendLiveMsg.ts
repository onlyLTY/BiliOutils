import { apiDelay, random } from '../utils';
import * as liveRequest from '../net/liveRequest';
import { FansMedalDto } from '../dto/Live.dto';

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
  '(苦笑)'
];

const messageArray = kaomoji.concat(
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '签到',
  '哈哈'
);

async function getFansMealList(): Promise<
  FansMedalDto['data']['fansMedalList']
> {
  try {
    const { code, message, data } = await liveRequest.getFansMedalList(1, 50);

    if (code !== 0) {
      console.log('获取直播间失败 ', code, message);
      return [];
    }

    return data.fansMedalList;
  } catch (error) {
    console.log('获取直播间异常', error.message);
    return [];
  }
}

async function sendOneMessage(roomid: number) {
  const msg = messageArray[random(messageArray.length - 1)];
  try {
    const { code, message } = await liveRequest.sendMessage(roomid, msg);

    if (code !== 0) {
      console.log('发送消息失败 ', code, message);
    }
    console.log('发送成功!');
    return true;
  } catch (error) {
    console.log('发送弹幕异常', error.message);
  }
}

export default async function liveSendMessage() {
  console.log('----【发送直播弹幕】----');

  const fansMedalList = await getFansMealList();
  let count = 0,
    jumpCount = 0;
  console.log(`一共需要发送${fansMedalList.length}个直播间发送`);
  for (const medal of fansMedalList) {
    if (!medal.roomid) {
      console.log(`【${medal.target_name}】没有直播间哦`);
      jumpCount++;
      break;
    }
    console.log(`给【${medal.target_name}】${medal.roomid}发送弹幕`);
    (await sendOneMessage(medal.roomid)) && count++;
    await apiDelay(random(60000, 20000));
  }
  console.log(`成功发送${count}个弹幕,跳过${jumpCount}个`);
}
