import { loginByCookie, getCoinBalance } from '../net/userInfoRequest';
import { TaskModule } from '../globalVar';
import { apiDelay } from '../util';

export async function loginTask() {
  console.log('----【登录】----');
  try {
    const { data, message } = await loginByCookie();
    await apiDelay();
    const { data: coinBalance } = await getCoinBalance(); //获取更精准的硬币数量
    if (data.isLogin) {
      console.log('登录成功: ', data.uname);
      console.log('硬币余额: ', coinBalance.money);

      TaskModule.money = coinBalance.money;
    } else {
      throw new Error(message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
