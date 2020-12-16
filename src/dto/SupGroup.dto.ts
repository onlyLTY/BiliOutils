import { PureData } from './BiLiAbstractClass';

/**
 * 自己加入的应援团
 */
export class SupGroupsDto extends PureData {
  data: {
    list: {
      group_id: number;
      owner_uid: number;
      group_type: number;
      group_level: number;
      group_cover: string;
      group_name: string;
      group_notice: string;
      group_status: number;
      room_id: number;
      is_living: number;
      /** 粉丝勋章名字 */
      fans_medal_name: string;
    }[];
  };
}

/**
 * 应援团签到
 */
export class SupGroupsSignDto extends PureData {
  data: {
    /** 增加的经验值 */
    add_num: number;
    /**
     * 0 签到成功
     * 1 已经签到过了
     */
    status: 0 | 1;
    _gt_: number;
  };
}
