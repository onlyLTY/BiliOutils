import { ApiBaseProp, PureDataProp, ResponseCode } from './bili-base-prop';

/** 领取每月会员权益 */
export interface ReceiveVipPrivilegeDto extends ApiBaseProp {
  data: null;
}

/** 领取每月会员权益状态 */
export interface ReceiveVipMyDto extends ApiBaseProp {
  data: {
    /** type 1-5 除了 type 和 state 都是固定的 */
    list: {
      type: number;
      /** 1 已经领取 */
      state: 0 | 1;
      // 过期时间
      expire_time: 1656604799;
      // vip_type
      vip_type: 2;
      // 距离下次领取时间 单位天
      next_receive_days: number;
      /** 下次领取时间，eg. 1656777600 **/
      period_end_unix: number;
    }[];
    is_short_vip: boolean;
    is_freight_open: boolean;
  };
}

/** 给 UP 充电 */
export interface ChargingDto extends ApiBaseProp {
  message: '0';
  data: {
    /** 用户ID */
    mid: number;
    /** 目标ID */
    up_mid: number;
    /** 用于添加充电留言 */
    order_no: string;
    /** 充电贝壳数 */
    bp_num: number;
    /** 获得经验数 */
    exp: number;
    /** 4 成功 -2 低于20电池 -4 B币不足 */
    status: 4 | -2 | -4;
    /** 错误信息或空 '' */
    msg: string;
  };
}

export interface ChargingMessageDto extends PureDataProp {
  message: '0';
  /** 88203：不能重复留言 */
  code: ResponseCode | 88203;
}
