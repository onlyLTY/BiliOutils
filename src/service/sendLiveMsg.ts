import { apiDelay, random } from '../utils';
import * as liveRequest from '../net/liveRequest';
import { FansMedalDto } from '../dto/Live.dto';

type FansMedalListDto = FansMedalDto['data']['fansMedalList'];

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

async function getFansMeal10(
  page: number = 1,
  pageSize: number = 10,
): Promise<FansMedalDto['data']> {
  try {
    const { code, message, data } = await liveRequest.getFansMedal(page, pageSize);

    if (code !== 0) {
      console.error('获取直播间失败 ', code, message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('获取直播间异常', error.message);
    return null;
  }
}

async function getFansMealList(): Promise<FansMedalListDto> {
  const { fansMedalList, pageinfo } = await getFansMeal10(1, 10);
  let { totalpages } = pageinfo;

  if (totalpages && totalpages > 1) {
    for (let index = 2; index <= totalpages; index++) {
      const medalTemp = await getFansMeal10(index, 10);
      fansMedalList.push(...medalTemp.fansMedalList);
    }
  }

  return fansMedalList;
}

async function sendOneMessage(roomid: number, targetName: string) {
  const msg = messageArray[random(messageArray.length - 1)];
  try {
    const { code, message } = await liveRequest.sendMessage(roomid, msg);

    if (code !== 0) {
      console.log(`【${targetName}】${roomid}-发送失败`, message);
      console.error(code);
    }
    // console.log('发送成功!');
    return true;
  } catch (error) {
    console.error('发送弹幕异常', error.message);
  }
}

export default async function liveSendMessage() {
  console.log('----【发送直播弹幕】----');

  const fansMedalList = await getFansMealList();
  let count = 0,
    jumpCount = 0;
  console.log(`一共需要发送${fansMedalList.length}个直播间`);
  console.info(`所需时间很长，请耐心等待`);

  for (const medal of fansMedalList) {
    if (!medal.roomid) {
      console.log(`【${medal.target_name}】没有直播间哦`);
      jumpCount++;
      break;
    }
    // console.log(`给【${medal.target_name}】${medal.roomid}发送弹幕`);
    (await sendOneMessage(medal.roomid, medal.target_name)) && count++;
    await apiDelay(random(6000, 25000));
  }
  console.log(`成功发送${count}个弹幕,跳过${jumpCount}个`);
}
