import { receiveVipMy, receiveVipPrivilege } from '../net/vip.request';
import { TaskModule } from '../config/globalVar';
import { logger } from '../utils/log';

/**
 * 获取当前领取状态
 */
async function getPrivilegeStatus() {
  try {
    const { data, code, message } = await receiveVipMy();
    if (code !== 0) {
      logger.info(`获取领取状态失败：${code} ${message}`);
      return;
    }
    const { list } = data;
    return list.slice(0, 2).filter(item => {
      // 当前时间戳
      const nowUnix = parseInt((new Date().getTime() / 1000).toString());
      return item.state === 0 && nowUnix > item.period_end_unix;
    });
    // 查找未领取的权益
  } catch (error) {
    logger.error(`获取领取状态出现异常：${error.message}`);
  }
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
  try {
    logger.info('----【领取大会员权益】----');

    if (TaskModule.vipType !== 2) {
      logger.info(`账号非年度大会员，不需要领取权益`);
      return false;
    }

    const privilegeList = await getPrivilegeStatus();

    if (privilegeList.length === 0) {
      logger.info(`已经领取过权益，不需要再领取`);
      return;
    }

    for (let index = 0; index < privilegeList.length; index++) {
      const privilege = privilegeList[index];
      await getPrivilege(privilege.type);
    }
  } catch (error) {
    logger.error(`领取大会员权益出现异常：${error.message}`);
  }
}
