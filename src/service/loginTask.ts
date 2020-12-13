import { loginByCookie, getCoinBalance } from '../net/userInfoRequest';
import { TaskConfig, TaskModule } from '../config/globalVar';
import { apiDelay } from '../util';

export default async function loginTask() {
  console.log('----【登录】----');
  try {
    const { data, message } = await loginByCookie();
    await apiDelay();
    const { data: coinBalance } = await getCoinBalance(); //获取更精准的硬币数量
    if (data.isLogin) {
      console.log('登录成功: ', data.uname);
      console.log('硬币余额: ', coinBalance.money);
      TaskModule.money = coinBalance.money;

      /**等级相关信息 */
      const levelInfo = data.level_info;
      const currentLevel = levelInfo.current_level;
      //判断是否还需要投币
      if (currentLevel >= TaskConfig.BILI_TARGET_LEVEL) {
        TaskModule.coinsTask = 0;
      }
      console.log('当前等级: ', levelInfo.current_level);
      if (currentLevel >= 6) {
        console.log('已经满级,不需要再投币了,做个白嫖怪吧');
      } else {
        const upLevelExp = levelInfo.next_exp - levelInfo.current_exp;
        const upLevelDate =
          upLevelExp / (TaskConfig.BILI_TARGET_COINS * 10 + 15);
        console.log(
          `距离升级还需要${upLevelExp}经验,预计${upLevelDate.toFixed()}天`,
        );
      }

      /**大会员信息 */
      let vipTypeMsg: string = '无';

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
        vipTypeMsg = vipTypeMsg === '' ? vipTypeMsg : vipTypeMsg + '[已过期]';
      }

      console.log('大会员状态: ', vipTypeMsg);
    } else {
      throw new Error(message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
