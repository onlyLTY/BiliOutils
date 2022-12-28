import type { Reservation } from '@/dto/reservation.dto';
import { reservation, reserveAttachCardButton } from '@/net/reservation.request';
import { getUnixTime, logger, sleep } from '@/utils';

/**
 * 请求指定用户的预约列表
 */
async function fetchReservation(vmid: string) {
  const { code, message, data } = await reservation(vmid);
  if (code !== 0) {
    logger.warn(`获取预约列表失败：${code} ${message}`);
    return;
  }
  return data?.filter(res => filterLottery(res));
}

/**
 * 过滤出符合要求的预约
 */
function filterLottery(data: Reservation) {
  // 参与过了？
  if (data.reserve_record_ctime) {
    return false;
  }
  // 已经开奖了
  if (getUnixTime() > data.live_plan_start_time) {
    return false;
  }
  // 其它
  if (Reflect.has(data, 'lottery_prize_info') && Reflect.has(data, 'lottery_type')) {
    return true;
  }
  return false;
}

/**
 * 进行一个预约
 */
async function reserveLive(res: Reservation) {
  logger.debug(`预约直播：${res.name}(${res.sid}/${res.up_mid})`);
  logger.debug(`奖励列表：${res.lottery_prize_info.text}`);
  logger.debug(`活动链接：${res.lottery_prize_info.jump_url}`);
  logger.debug(`开奖时间：${new Date(res.live_plan_start_time * 1000).toLocaleString('zh-CN')}`);

  const { code, message, data } = await reserveAttachCardButton(res.sid, res.total, 1);
  if (code !== 0) {
    logger.warn(`预约直播${res.sid}失败：${code} ${message}`);
    return false;
  }
  logger.debug(`预约成功：${data.toast}，${data.desc_update}`);
  return true;
}

export async function reservationService() {
  // TODO: demo
  const demo = [];
  for (const d of demo) {
    const list = await fetchReservation(d);
    await sleep(1000);
    if (!list || list.length < 1) {
      continue;
    }
    // 一个人不至于有几个直播预约吧
    await Promise.all(list.map(res => reserveLive(res)));
  }
}
