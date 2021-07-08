import { ApiAbstract, PureData, ResponseCode } from './BiLiAbstractClass';

/** 领取每月会员权益 */
export class ReceiveVipPrivilegeDto extends ApiAbstract {
  data?: null;
}

/** 给 UP 充电 */
export class ChargingDto extends ApiAbstract {
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

export class ChargingMessageDto extends PureData {
  message: '0';
  /** 88203：不能重复留言 */
  code: ResponseCode | 88203;
}
