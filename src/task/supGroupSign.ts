import { SupGroupsDto } from '../dto/sup-group.dto';
import { apiDelay } from '../utils';
import { getMyGroupsApi, groupSignApi } from '../net/sup-group.request';
import { logger } from '../utils/log';

type Group = SupGroupsDto['data']['list'];

/**
 * 获取应援团信息
 */
async function getMyGroups(): Promise<Group> {
  try {
    const { data, code, message } = await getMyGroupsApi();
    if (code === 0) {
      return data?.list || [];
    }
    logger.warn(`获取自己的应援团异常失败: ${message}`);
    return [];
  } catch (error) {
    logger.error(`获取自己的应援团异常: ${error}`);
  }
}

/**
 * 应援团我的签到
 */
export default async function supGroupSign() {
  logger.info('----【应援团签到】----');

  const myGroups = await getMyGroups();
  await apiDelay();
  const countRef = { value: 0 };
  for (let i = 0; i < myGroups.length; i++) {
    const group = myGroups[i];
    await groupSign(group, countRef);
  }
  logger.info(`签到结束，成功${countRef.value}/${myGroups.length}`);
}

async function groupSign(group: Group[0], countRef: Ref<number>) {
  try {
    // logger.info(`应援团${group.group_name}签到开始`);
    const { data, code, message } = await groupSignApi(group.group_id, group.owner_uid);
    if (code !== 0) {
      logger.warn(`[${group.group_name}]签到失败 ${message}`);
      return;
    }
    if (data.status === 0) {
      countRef.value++;
      // logger.info(`签到成功: ${message}`);
    } else {
      logger.verbose(`签到失败: ${data.status} ${message}`);
    }
  } catch (error) {
    logger.error(`签到异常 ${error.message}`);
  } finally {
    await apiDelay(400, 1000);
  }
}
