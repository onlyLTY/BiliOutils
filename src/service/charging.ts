import { chargingForUp, chargingCommentsForUp } from '../net/vipRequest';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { getPRCDate, getMonthHasDays, apiDelay } from '../utils';
import { random } from 'lodash';
import { updateNav } from './updateNav';

enum ChargeStatus {
  '成功' = 4,
  '低于20电池' = -2,
  'B币不足' = -4,
}

const defaultComments = [
  '棒',
  '棒唉',
  '棒耶',
  '加油~',
  'UP加油!',
  '支持~',
  '支持支持！',
  '催更啦',
  '顶顶',
  '留下脚印~',
  '干杯',
  'bilibili干杯',
  'o(*￣▽￣*)o',
  '(｡･∀･)ﾉﾞ嗨',
  '(●ˇ∀ˇ●)',
  '( •̀ ω •́ )y',
  '(ง •_•)ง',
  '>.<',
  '^_~',
];

function init() {
  // 根据时间确定是否执行
  const nowTime = getPRCDate(),
    today = nowTime.getDate(),
    monthHasDays = getMonthHasDays(nowTime);

  const presetTime = TaskConfig.CHARGE_PRESET_TIME;

  // 查看余额
  if (TaskModule.bCoinCouponBalance < 2) {
    console.log(`剩余券为${TaskModule.bCoinCouponBalance},不足2跳过投币`);
    return false;
  }

  // 今天是否是最后一天
  if (monthHasDays === today) {
    console.log(`今天是最后一天了`);
    return true;
  }

  // 判断是否在指定时间内
  if (presetTime > today) {
    console.log(`预设时间为${presetTime}，不符合条件`);
    return false;
  }

  return true;
}

export default async function charging() {
  console.log('----【给目标充电】----');

  // 充电前获取下 nav
  await updateNav();
  await apiDelay();

  if (!init()) {
    return;
  }

  try {
    const bp_num = TaskModule.bCoinCouponBalance || 0;
    const up_mid = TaskConfig.CHARGE_ID;
    let errorCount = 0;
    console.log(`b 币券余额${bp_num}`);
    // 固定为 up 模式
    const run = async () => {
      const { code, message, data } = await chargingForUp(bp_num, true, up_mid);
      if (code !== 0) {
        console.log('充电失败：', code, message);
        return;
      }
      console.log('【充值结果】', ChargeStatus[data.status]);

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
    console.log('充电出现异常：', error.message);
  }
}
/**
 * 留言只是不作处理
 */
async function chargeComments() {
  try {
    if (!TaskModule.chargeOrderNo) {
      return false;
    }
    const comment = defaultComments[random(0, defaultComments.length - 1)];
    const { code } = await chargingCommentsForUp(TaskModule.chargeOrderNo, comment);
    if (code === 0) {
      console.log('留言成功！');
    }
  } catch {}
}
