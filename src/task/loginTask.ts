import { loginByCookie, getCoinBalance } from '../net/user-info.request';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { apiDelay } from '../utils';
import { functionConfig } from '../config/funcConfig';
import { UserInfoNavDto } from '../dto/user-info.dto';
import { logger } from '../utils/log';

type UserNavData = UserInfoNavDto['data'];

function estimatedDays(upLevelExp: number): number {
  if (TaskConfig.BILI_TARGET_COINS <= 0) return upLevelExp / 15;
  const dailyExp = TaskConfig.BILI_TARGET_COINS * 10 + 15;
  const idealDays = upLevelExp / dailyExp;
  const coinSupportDays = TaskModule.money / (TaskConfig.BILI_TARGET_COINS - 1);
  if (idealDays < coinSupportDays) return Math.floor(idealDays);
  const needExp = upLevelExp - coinSupportDays * dailyExp;
  return needExp / 25 + coinSupportDays;
}

function setLevelInfo(data: UserNavData) {
  /**等级相关信息 */
  const levelInfo = data.level_info;
  const currentLevel = levelInfo.current_level;
  //判断当前等级是否还需要投币
  if (currentLevel >= TaskConfig.BILI_TARGET_LEVEL) {
    TaskModule.coinsTask = 0;
  }
  logger.info(`当前等级: ${levelInfo.current_level}`);
  if (currentLevel >= 6) {
    functionConfig.shareAndWatch = false;
    functionConfig.addCoins = false;
    logger.info('已经满级，不需要再投币了，做个白嫖怪吧');
  } else {
    const upLevelExp = levelInfo.next_exp - levelInfo.current_exp;
    //实际天数肯定会少一些
    logger.info(
      `距离升级还需要 ${upLevelExp} 经验，预计 ${estimatedDays(upLevelExp).toFixed(2)} 天`,
    );
  }
}

function setVipStatus(data: UserNavData) {
  /**大会员信息 */
  let vipTypeMsg = '';

  TaskModule.vipType = data.vipType;

  switch (data.vipType) {
    case 0:
      vipTypeMsg = '无大会员';
      break;
    case 1:
      vipTypeMsg = '月度大会员';
      break;
    case 2:
      vipTypeMsg = '年度大会员';
      break;
    default:
      break;
  }

  //判断是否过期,因为即使大会员过期,下面也会显示
  if (data.vipStatus === 0) {
    vipTypeMsg = vipTypeMsg === '无大会员' ? vipTypeMsg : vipTypeMsg + '[已过期]';
  }

  logger.info(`大会员状态: ${vipTypeMsg}`);
}

/**
 * 给昵称添加 ** （目的是变简短）
 */
function conciseNickname(nickname: string) {
  const length = nickname.length;
  if (length <= 3) {
    return nickname;
  }
  const firstWord = nickname[0];
  const lastWord = nickname[length - 1];
  return `${firstWord}**${lastWord}`;
}

async function setUserInfo(data: UserNavData) {
  try {
    const { data: coinBalance } = await getCoinBalance(); //获取更精准的硬币数量
    logger.info(`登录成功: ${data.uname}`);
    logger.info(`硬币余额: ${coinBalance.money || 0}`);
    TaskModule.nickname = conciseNickname(data.uname);
    TaskModule.money = coinBalance.money || 0;
    TaskModule.userLevel = data.level_info.current_level;
    TaskModule.bCoinCouponBalance = data.wallet?.coupon_balance || 0;

    setLevelInfo(data);
    setVipStatus(data);
  } catch (error) {
    logger.error(`获取硬币信息异常: ${error.message}`);
  }
}

export default async function loginTask() {
  logger.info('----【登录】----');
  try {
    const { data, message, code } = await loginByCookie();
    if (code === 65006 || code === -404) {
      logger.error(`登录错误 ${code} ${message}`);
      return;
    } else if (code !== 0) {
      logger.error(`登录错误 ${code} ${message}`);
      return;
    }
    if (!data.isLogin) {
      throw new Error('接口返回为未登录');
    }
    await apiDelay();
    await setUserInfo(data);
  } catch (error) {
    throw new Error(error.message);
  }
}
