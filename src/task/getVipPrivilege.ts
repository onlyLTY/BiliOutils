import { receiveVipPrivilege } from '../net/vip.request';
import { TaskModule } from '../config/globalVar';
import { getPRCDate, getMonthHasDays } from '../utils';
import { logger } from '../utils/log';

function init() {
  if (TaskModule.vipType !== 2) {
    logger.info(`账号非年度大会员，不需要领取权益`);
    return false;
  }
  // 根据时间确定是否执行
  const nowTime = getPRCDate(),
    today = nowTime.getDate(),
    monthHasDays = getMonthHasDays(nowTime);

  // 本月的第一天和最后一天
  if (today !== 1 && monthHasDays !== today) {
    logger.info('今天非预订领取时间，跳过领取');
    return false;
  }

  return true;
}

function getPrivilegeName(type: number): string {
  switch (type) {
    case 1:
      return 'B 币券';
    case 2:
      return '大会员优惠券';
    default:
      return '';
  }
}

async function getOnePrivilege(type: number): Promise<boolean> {
  try {
    const name = getPrivilegeName(type);
    const { code, message } = await receiveVipPrivilege(type);

    let status = '成功';
    if (code === 0) {
      status = `失败 ${message}`;
    }
    logger.info(`领取${name} ${status}`);

    return true;
  } catch (error) {
    logger.error(`领取权益出现异常：${error.message}`);
  }
  return false;
}

async function getPrivilege(type: number) {
  let errCount = 0,
    suc = false;

  while (!suc) {
    suc = await getOnePrivilege(type);
    if (errCount > 2) {
      break;
    }
    errCount++;
  }

  return suc;
}

export default async function getVipPrivilege() {
  logger.info('----【领取大会员权益】----');

  if (!init()) {
    return;
  }

  await getPrivilege(1);
  await getPrivilege(2);
}
