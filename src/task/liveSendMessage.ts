import { apiDelay, random } from '../utils';
import { logger } from '../utils/log';
import { getFansMealList, sendOneMessage } from '@/service/intimacy.service';

export default async function liveSendMessage() {
  logger.info('----【发送直播弹幕】----');
  logger.info(`该函数即将废弃，请使用 liveIntimacy 替代`);

  try {
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
      if (medal.today_feed === 100 || medal.level >= 20) {
        jumpCount++;
        continue;
      }
      if (await sendOneMessage(room_info.room_id, anchor_info.nick_name)) count++;
      if (i < fansMedalLength - 1) await apiDelay(random(10000, 25000));
    }
    logger.info(`成功发送${count}个弹幕，跳过${jumpCount}个`);
  } catch (error) {
    logger.error(`直播间发送弹幕异常: ${error.message}`);
  }
}
