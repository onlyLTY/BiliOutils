import { loginByCookie, getCoinBalance } from '../net/userInfoRequest';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { apiDelay } from '../utils';
import { functionConfig } from '../config/configOffFun';

function estimatedDays(upLevelExp: number): number {
  const dailyExp = TaskConfig.BILI_TARGET_COINS * 10 + 15;
  const idealDays = upLevelExp / dailyExp;
  const coinSupportDays = TaskModule.money / (TaskConfig.BILI_TARGET_COINS - 1);
  if (idealDays < coinSupportDays) return Math.floor(idealDays);
  const needExp = upLevelExp - coinSupportDays * dailyExp;
  return Math.floor(needExp / 25 + coinSupportDays);
}

export default async function loginTask() {
  console.log('----【登录】----');
  try {
    const { data, message, code } = await loginByCookie();
    if (code === 65006 || code === -404) {
      console.log('登录错误', code, message);
      return;
    } else if (code !== 0) {
      console.log('登录错误', code, message);
    }
    await apiDelay();
    const { data: coinBalance } = await getCoinBalance(); //获取更精准的硬币数量
    if (data.isLogin) {
      console.log('登录成功: ', data.uname);
      console.log('硬币余额: ', coinBalance.money);
      TaskModule.money = coinBalance.money;

      /**等级相关信息 */
      const levelInfo = data.level_info;
      const currentLevel = levelInfo.current_level;
      //判断当前等级是否还需要投币
      if (currentLevel >= TaskConfig.BILI_TARGET_LEVEL) {
        TaskModule.coinsTask = 0;
      }
      console.log('当前等级: ', levelInfo.current_level);
      if (currentLevel >= 6) {
        functionConfig.shareAndWatch = false;
        functionConfig.addCoins = false;
        console.log('已经满级,不需要再投币了,做个白嫖怪吧');
      } else {
        const upLevelExp = levelInfo.next_exp - levelInfo.current_exp;
        //实际天数肯定会少一些
        console.log(
          `距离升级还需要${upLevelExp}经验,预计${estimatedDays(upLevelExp)}天`,
        );
      }

      /**大会员信息 */
      let vipTypeMsg: string = '';

      switch (data.vipType) {
        case 0:
          vipTypeMsg = '无大会员';
          break;
        case 1:
          vipTypeMsg = '月度大会员';
          break;
        case 2:
          vipTypeMsg = '年度大会员';
        default:
          break;
      }

      //判断是否过期,因为即使大会员过期,下面也会显示
      if (data.vipStatus === 0) {
        vipTypeMsg =
          vipTypeMsg === '无大会员' ? vipTypeMsg : vipTypeMsg + '[已过期]';
      }

      console.log('大会员状态: ', vipTypeMsg);
    } else {
      throw new Error(message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
