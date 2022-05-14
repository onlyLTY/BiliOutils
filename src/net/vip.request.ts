import type {
  ChargingDto,
  ChargingMessageDto,
  ReceiveVipPrivilegeDto,
} from '../dto/vip-privilege.dto';
import { TaskConfig } from '../config/globalVar';
import { biliApi } from './api';

/**
 * 领取年度大会员权益
 * @param type 1.大会员B币券；2.大会员福利
 */
export function receiveVipPrivilege(type = 1): Promise<ReceiveVipPrivilegeDto> {
  return biliApi.post('/x/vip/privilege/receive', {
    csrf: TaskConfig.BILIJCT,
    type,
  });
}

/**
 * 为 up 充电
 * @param bp_num 充电 b 币数量
 * @param is_bp_remains_prior B币充电请选择true
 * @param up_mid 	充电对象用户UID
 * @param otype 充电来源 空间充电/视频充电
 * @param oid 充电来源代码(UID 或者 稿件 avID)
 */
export function chargingForUp(
  bp_num = 50,
  is_bp_remains_prior = true,
  up_mid: number = TaskConfig.USERID,
  otype: 'up' | 'archive' = 'up',
  oid: number = up_mid,
): Promise<ChargingDto> {
  return biliApi.post('/x/ugcpay/web/v2/trade/elec/pay/quick', {
    csrf: TaskConfig.BILIJCT,
    bp_num,
    is_bp_remains_prior,
    up_mid,
    otype,
    oid,
  });
}

/**
 * 充电后留言
 * @param orderId 留言token
 * @param message 留言内容
 */
export function chargingCommentsForUp(
  orderId: string,
  message = '支持大佬一波',
): Promise<ChargingMessageDto> {
  return biliApi.post('/x/ugcpay/trade/elec/message', {
    csrf: TaskConfig.BILIJCT,
    message,
    order_id: orderId,
  });
}
