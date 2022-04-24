import { Constant, TaskConfig } from '../config/globalVar';
import { getGiftBagList, sendBagGift, getLiveFansMedal } from '../net/live.request';
import { getUser } from '../net/user-info.request';
import { LiveGiftBagListDto } from '../dto/live.dto';
import { apiDelay, random, logger } from '../utils';

const EXPIRE_DATE = 2;
const { BILI_GIFT_UP } = TaskConfig;

export default async function giveGift() {
  logger.info('----【投喂过期食物】----');
  try {
    const expiredGifts = await getExpiredGift();
    await apiDelay();
    if (!expiredGifts?.length) {
      logger.info(`没有${EXPIRE_DATE}天内过期的简单礼物`);
      return;
    }

    const room = await findOneRoom();
    if (!room) {
      logger.info(`没有找到投喂目标`);
      return;
    }

    // 投喂
    await sendGift(room, expiredGifts);
  } catch (error) {
    logger.info(`投喂过期食物异常 ${error}`);
  }
}

let countGetExpiredGift = 0;
async function getExpiredGift() {
  try {
    const {
      data: { list },
    } = await getGiftBagList();

    return list.filter(gift => {
      // 判断 是否是辣条或者小星星
      if (![1, 30607].includes(gift.gift_id)) {
        logger.info(`${gift.gift_name} 即将过期请尽快投喂`);
        return false;
      }
      return (gift.expire_at * 1000 - new Date().getTime()) / Constant.MS2DATE < EXPIRE_DATE;
    });
  } catch (error) {
    // 重试一次
    if (!countGetExpiredGift) {
      await getExpiredGift();
    } else {
      return null;
    }
    countGetExpiredGift++;
  }
}

async function findOneRoom() {
  const upList = Object.assign([] as number[], BILI_GIFT_UP);
  const getOneUp = () => upList.splice(random(BILI_GIFT_UP.length - 1), 1)[0];
  while (upList.length) {
    const mid = getOneUp();
    const room = await getUserRoom(mid);
    if (room) {
      return {
        mid,
        ...room,
      };
    }
  }
  return await findOneByRandomUp();
}

async function findOneByRandomUp() {
  const {
    data: { count, items: fansMedalList },
  } = await getLiveFansMedal();
  await apiDelay();
  if (!count) {
    return;
  }
  const target = fansMedalList[random(fansMedalList.length - 1)];
  return {
    mid: target.target_id,
    roomid: target.roomid || 0,
    name: target.uname,
  };
}

async function getUserRoom(mid: number) {
  try {
    const {
      data: { live_room, name },
    } = await getUser(mid);
    await apiDelay();
    if (live_room.roomStatus) {
      return {
        roomid: live_room.roomid,
        name,
      };
    }
  } catch {}
}

async function sendGift(
  { roomid, mid, name }: { roomid: number; mid: number; name: string },
  gifts: LiveGiftBagListDto['data']['list'],
) {
  for (const gift of gifts) {
    await apiDelay();
    try {
      const { code, message, data } = await sendBagGift({
        roomid,
        ruid: mid,
        bag_id: gift.bag_id,
        gift_id: gift.gift_id,
        gift_num: gift.gift_num,
      });

      if (code !== 0) {
        logger.warn(`向[${name}]投喂[${gift.gift_name}]，${message}`);
        continue;
      }
      data.gift_list.forEach(gift => {
        logger.info(`成功给 [${name}] 投喂${gift.gift_name}`);
      });
    } catch {}
  }
}