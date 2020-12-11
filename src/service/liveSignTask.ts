import { doLiveSign, webGetSignInfo } from '../net/liveRequest';

export async function liveSignTask() {
  console.log('----【直播签到】----');
  try {
    const { data } = await webGetSignInfo();
    if (data.status === 1) {
      console.log('已签到,跳过签到');
      console.log(`已经签到${data.hadSignDays}天,${data.specialText}`);
      return;
    }
  } catch (error) {}
  try {
    const { code, data, message } = await doLiveSign();
    if (code === 0) {
      console.log(
        `直播签到成功: ${data.text}, 特别信息: ${data.specialText}, 本月签到天数: ${data.hadSignDays}天;`
      );
    } else {
      console.log('直播签到失败: ', message);
    }
  } catch (error) {
    console.log('直播签到异常: ', error.message);
  }
}
