import { SupGroupsDto } from '../dto/sup-group.dto';
import { apiDelay } from '../utils';
import { getMyGroupsApi, groupSignApi } from '../net/sup-group.request';
import { logger } from '../utils/log';

/**
 * 获取应援团信息
 */
async function getMyGroups(): Promise<SupGroupsDto['data']['list']> {
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
  let count = 0;
  for (let i = 0; i < myGroups.length; ) {
    const group = myGroups[i];
    try {
      // logger.info(`应援团${group.group_name}签到开始`);
      const { data, code, message } = await groupSignApi(group.group_id, group.owner_uid);
      if (code === 0) {
        if (data.status === 0) {
          count++;
          // logger.info(`签到成功: ${message}`);
        } else {
          logger.info(message);
        }
      } else {
        logger.warn(`[${group.group_name}]签到失败 ${message}`);
      }
    } catch (error) {
      logger.error(`签到异常 ${error.message}`);
    } finally {
      await apiDelay();
    }
  }
  logger.info(`签到结束，成功${count}/${myGroups.length}`);
}
