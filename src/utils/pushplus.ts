import { TaskConfig } from '../config/globalVar';
import axios, { AxiosRequestConfig } from 'axios';

export async function pushplus(title: string, content: string) {
  if (!TaskConfig.PUSHPLUS_TOKEN) {
    return;
  }
  axios
    .post(
      'http://www.pushplus.plus/send',
      {
        token: TaskConfig.PUSHPLUS_TOKEN,
        content,
        title,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      } as AxiosRequestConfig,
    )
    .then(res => {
      const { msg, code } = res.data;
      if (code === 200) {
        console.log(msg);
        return;
      }
      console.log('pushplus 发送消息失败');
      console.log(code, msg);
    })
    .catch(reason => {
      console.log('pushplus 发送消息出现异常');
      console.log(reason.message);
    });
}

export default pushplus;
