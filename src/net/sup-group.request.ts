import type { SupGroupsDto, SupGroupsSignDto } from '../dto/sup-group.dto';
import { vcApi } from './api';

/**
 * 获取自己的应援团
 */
export function getMyGroupsApi(): Promise<SupGroupsDto> {
  return vcApi.get('/link_group/v1/member/my_groups');
}

/**
 * 应援团签到
 * @param group_id 应援团id
 * @param owner_id 爱豆ID(狗头)
 */
export function groupSignApi(group_id: number, owner_id: number): Promise<SupGroupsSignDto> {
  return vcApi.get('/link_setting/v1/link_setting/sign_in', {
    params: {
      group_id,
      owner_id,
    },
  });
}
