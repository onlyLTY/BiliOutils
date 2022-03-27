import { UserInfoNavDto } from '../dto/UserInfo.dto';
import { TaskModule } from '../config/globalVar';
import { loginByCookie } from '../net/userInfoRequest';
import { logger } from '../utils/log';

type UserNav = UserInfoNavDto['data'];

function getBCoinBalance(data: UserNav) {
  TaskModule.bCoinCouponBalance = data.wallet?.coupon_balance || 0;
}

export async function updateNav() {
  try {
    const { data, message, code } = await loginByCookie();
    if (code !== 0) {
      logger.warn(`获取用户信息失败：${code} ${message}`);
      return;
    }
    getBCoinBalance(data);
  } catch (error) {
    logger.error(`获取用户信息异常：${error.message}`);
  }
}

export default updateNav;
