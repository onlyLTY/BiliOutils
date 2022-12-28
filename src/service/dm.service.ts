import { kaomoji } from '@/constant';
import { SeedMessageResult } from '@/enums/intimacy.emum';
import { logger, random } from '@/utils';
import * as liveRequest from '../net/live.request';

const messageArray = kaomoji.concat('1', '2', '3', '4', '5', '6', '7', '8', '9', '签到', '哈哈');

export async function sendDmMessage(roomid: number, nickName: string) {
  const msg = messageArray[random(messageArray.length - 1)];
  try {
    const { code, message } = await liveRequest.sendMessage(roomid, msg);

    if (code === SeedMessageResult.Success) {
      return 0;
    }
    if (code === SeedMessageResult.Unresistant) {
      logger.warn(`【${nickName}】${roomid}-可能未开启评论`);
      return SeedMessageResult.Unresistant;
    }
    logger.warn(`【${nickName}】${roomid}-发送失败 ${code} ${message}`);
    return code;
  } catch (error) {
    logger.verbose(`发送弹幕异常 ${error.message}`);
  }
  return SeedMessageResult.Unknown;
}
