import { SupGroupsDto, SupGroupsSignDto } from 'dto/SupGroup.dto';
import { vcApi } from './api';

/**
 * 获取自己的应援团
 */
export async function getMyGroupsApi(): Promise<SupGroupsDto> {
  const { data } = await vcApi.get('/link_group/v1/member/my_groups');
  return data;
}

/**
 * 应援团签到
 * @param group_id 应援团id
 * @param owner_id 爱豆ID(狗头)
 */
export async function groupSignApi(
  group_id: number,
  owner_id: number
): Promise<SupGroupsSignDto> {
  const { data } = await vcApi.get('/link_setting/v1/link_setting/sign_in', {
    params: {
      group_id,
      owner_id,
    },
  });
  return data;
}
