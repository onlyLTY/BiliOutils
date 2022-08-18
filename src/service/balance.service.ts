import { TaskConfig, TaskModule } from '@/config/globalVar';
import { defaultComments } from '../constant';
import { isArray } from '@/utils/is';
import { logger } from '@/utils/log';
import { getMonthHasDays, getPRCDate, random } from '@/utils/pure';
import { chargingCommentsForUp, chargingForUp } from '@/net/vip.request';
import { updateNav } from './nav.service';
import { apiDelay } from '@/utils/effect';
import { exchangeBattery } from '@/net/live.request';

async function init() {
  // 根据时间确定是否执行
  const nowTime = getPRCDate(),
    today = nowTime.getDate(),
    monthHasDays = getMonthHasDays(nowTime);

  let presetTime: number[] = TaskConfig.couponBalance.presetTime;
  if (!isArray(presetTime)) {
    presetTime = [presetTime];
  }

  const isInPresetTime = presetTime.some(time => time === today);
  const isLastDay = monthHasDays === today;
  // 判断是否在指定时间内
  if (!isInPresetTime && !isLastDay) {
    logger.info(`不在预设时间，不符合条件`);
    return false;
  }

  // 充电前获取下 nav
  await updateNav();
  await apiDelay();

  // 判断余额是否足够
  const useType = TaskConfig.couponBalance.use,
    bp_num = TaskModule.couponBalance;
  if (useType === '充电' || bp_num < 2) {
    logger.info(`剩余券为${bp_num}，不足2跳过充电`);
    return false;
  }
  if (bp_num < 1) {
    logger.info(`剩余券为${bp_num}，跳过兑换`);
    return false;
  }

  logger.info(`b 币券余额${bp_num}`);
  return true;
}

/**
 * 留言只是不作处理
 */
export async function chargeComments() {
  try {
    if (!TaskModule.chargeOrderNo) {
      return false;
    }
    const comment = defaultComments[random(0, defaultComments.length - 1)];
    const { code } = await chargingCommentsForUp(TaskModule.chargeOrderNo, comment);
    if (code === 0) {
      logger.info('留言成功！');
    }
  } catch (error) {
    logger.warn(error);
  }
}

enum ChargeStatus {
  '成功' = 4,
  '低于20电池' = -2,
  'B币不足' = -4,
}

export async function chargingService() {
  if (!(await init())) {
    return;
  }

  try {
    const bp_num = TaskModule.couponBalance || 0;
    let errorCount = 0;
    const up_mid = TaskConfig.couponBalance.mid;
    // 固定为 up 模式
    const run = async () => {
      const { code, message, data } = await chargingForUp(bp_num, true, up_mid);
      if (code !== 0) {
        logger.warn(`充电失败：${code} ${message}`);
        return;
      }
      logger.info(`目标【${up_mid}】${ChargeStatus[data.status]}`);

      if (data.status === ChargeStatus['成功']) {
        TaskModule.chargeOrderNo = data.order_no;
        await apiDelay();
        await chargeComments();
      }
    };
    TaskModule.chargeOrderNo = '';
    while (!TaskModule.chargeOrderNo) {
      await run();
      await apiDelay();
      // 尝试 4 次
      if (errorCount++ > 2) {
        break;
      }
    }
  } catch (error) {
    logger.error(`充电出现异常：${error.message}`);
    logger.error(error);
  }
}

/**
 * 兑换电池
 */
export async function exchangeBatteryService() {
  if (!(await init())) {
    return;
  }
  try {
    const bp_num = TaskModule.couponBalance || 0;
    if (bp_num < 1) {
      logger.info(`剩余券为${bp_num}，跳过兑换`);
      return;
    }
    const { code, message } = await exchangeBattery(bp_num);
    if (code === 0) {
      logger.info(`兑换电池${bp_num * 10}成功！`);
      return;
    }
    logger.warn(`兑换电池失败：${code} ${message}`);
  } catch (error) {
    logger.error(`兑换电池出现异常：${error.message}`);
    logger.error(error);
  }
}
