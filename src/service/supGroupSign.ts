import { SupGroupsDto } from '../dto/SupGroup.dto';
import { apiDelay } from '../utils';
import { getMyGroupsApi, groupSignApi } from '../net/supGroupRequest';

/**
 * 获取应援团信息
 */
async function getMyGroups(): Promise<SupGroupsDto['data']['list']> {
  try {
    const { data, code, message } = await getMyGroupsApi();
    if (code === 0) {
      return data?.list || [];
    }
    console.log('获取自己的应援团异常失败: ', message);
    return [];
  } catch (error) {
    console.log('获取自己的应援团异常: ', error);
  }
}

/**
 * 应援团我的签到
 */
export default async function supGroupSign() {
  console.log('----【应援团签到】----');

  const myGroups = await getMyGroups();
  await apiDelay();
  for (let i = 0; i < myGroups.length; ) {
    let group = myGroups[i];
    try {
      console.log(`应援团${group.group_name}签到开始`);
      const { data, code, message } = await groupSignApi(
        group.group_id,
        group.owner_uid
      );
      if (code === 0) {
        if (data.status === 0) {
          console.log('签到成功: ', message);
        } else {
          console.log(message);
        }
        i++;
      } else {
        console.log('签到失败', message);
      }
    } catch (error) {
      console.log('签到异常', error);
    } finally {
      await apiDelay();
    }
  }
}
