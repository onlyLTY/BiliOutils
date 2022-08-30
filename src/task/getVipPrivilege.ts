import { receiveVipMy, receiveVipPrivilege } from '../net/vip.request';
import { TaskModule } from '../config/globalVar';
import { logger } from '../utils/log';
import { apiDelay } from '@/utils';

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
    const stateList = list.filter(item => item.state === 0);
    if (stateList.length === 0) {
      return;
    }
    return stateList;
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
      return '会员购优惠券';
    case 3:
      return '漫读券';
    case 4:
      return '会员购运费券';
    default:
      return '未知';
  }
}

async function getOnePrivilege(type: number): Promise<boolean> {
  try {
    const name = getPrivilegeName(type);
    const { code, message } = await receiveVipPrivilege(type);

    if (code === 73319) {
      logger.error(`${name}领取失败，账号存在异常（可能异地登陆）`);
      return true;
    }

    let status = '成功';
    if (code !== 0) {
      status = `失败 ${message}`;
    }
    logger.info(`领取${name}${status}`);
    return true;
  } catch (error) {
    logger.error(`领取权益出现异常：${error.message}`);
    logger.error(error);
  }
  return false;
}

async function getPrivilege(type: number) {
  if (![1, 3].includes(type)) {
    return;
  }
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
    if (TaskModule.vipStatus === 0 || TaskModule.vipType === 0) {
      logger.info('您还不是大会员，无法领取权益');
      return;
    }

    const privilegeList = await getPrivilegeStatus();

    if (!privilegeList || privilegeList.length === 0) {
      logger.info('暂无可领取权益（除保留）');
      return;
    }

    for (let index = 0; index < privilegeList.length; index++) {
      await apiDelay(100);
      const privilege = privilegeList[index];
      await getPrivilege(privilege.type);
    }
  } catch (error) {
    logger.error(`领取大会员权益出现异常：${error.message}`);
    logger.error(error);
  }
}
