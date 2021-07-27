import { AccountBaseProp, ApiBaseProp } from './BiLiBaseProp';

/** 硬币数量 */
export interface CoinBalanceDto extends AccountBaseProp {
  data: { money: number };
}

/** 关注列表 */
export interface FollowingsDto extends ApiBaseProp {
  data: Array<{ mid: number }>;
}

/** 获取指定up主的视频 */
export interface VideosByUpIdDto extends ApiBaseProp {
  data: {
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

/** 用户信息 */
export interface UserInfoNavDto extends ApiBaseProp {
  data: {
    isLogin: boolean;
    email_verified: number;
    //等级信息
    level_info: {
      current_level: number;
      current_min: number;
      current_exp: number;
      next_exp: number;
    };
    mid: number;
    mobile_verified: number;
    money: number;
    moral: number;
    scores: number;
    uname: string;
    /** 会员到期时间 */
    vipDueDate: number;
    /** 0无 1有 */
    vipStatus: 0 | 1;
    /** 0:无 1:月度 2:年度及以上 */
    vipType: 0 | 1 | 2;
    wallet: {
      mid: number;
      /** b 币数量（包含券） */
      bcoin_balance: number;
      /** b 币券数量 */
      coupon_balance: number;
      coupon_due_time: number;
    };
  };
}

/** 每日任务完成情况 */
export interface RewardDto extends ApiBaseProp {
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

/** 获取投币获得的经验 */
export interface CoinTodayExpDto extends ApiBaseProp {
  data: number;
}
