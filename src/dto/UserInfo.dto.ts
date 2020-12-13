import { ApiAbstract } from './BiLiAbstractClass';
import { AccountAbstract } from './BiLiAbstractClass';

//硬币数量
export class CoinBalanceDto extends AccountAbstract {
  data: { money: number };
}

//关注列表
export class FollowingsDto extends ApiAbstract {
  data: Array<{ mid: number }>;
}

//获取指定up主的视频
export class VideosByUpIdDto extends ApiAbstract {
  'data': {
    media_list: Array<{
      id: number;
      page: number;
      title: string;
      type: number;
      link: number;
      bv_id: number;
      short_link: number;
      coin: {
        max_num: 1 | 2;
        coin_number: 0 | 1 | 2;
      };
    }>;
    has_more: boolean;
    total_count: number;
  };
}

//用户信息
export class UserInfoNavDto extends ApiAbstract {
  data?: {
    isLogin: boolean;
    //等级信息
    level_info: {
      current_level: number;
      current_min: number;
      current_exp: number;
      next_exp: number;
    };
    mid: number; //用户id
    money: number; //硬币
    moral: number;
    scores: number;
    uname: string;
    /** 会员到期时间 */
    vipDueDate: number;
    /** 0无 1有 */
    vipStatus: 0 | 1;
    /** 0:无 1:月度 2:年度及以上 */
    vipType: 0 | 1 | 2;
    vip_label: {
      text: number;
    };
  };
}

//每日任务完成情况
export class RewardDto extends ApiAbstract {
  data?: {
    login: boolean;
    watch: boolean;
    coins: number;
    share: boolean;
    email: boolean;
    tel: boolean;
    safe_question: boolean;
    identify_card: boolean;
  };
}

//获取投币获得的经验
export class CoinTodayExpDto extends ApiAbstract {
  'data': number;
}
