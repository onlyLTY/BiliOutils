import axios, { AxiosRequestConfig } from 'axios';
import * as nodemailer from 'nodemailer';

import { TaskConfig } from '../config/globalVar';

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

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(title: string, text: string) {
  //发件邮箱,密码,收件邮箱,stmp地址[,端口]
  const user = TaskConfig.config.message?.email;
  if (!user || !user.pass || !user.from || !user.host) return;

  const port: number = Number(user.port) || 465;

  let transporter = nodemailer.createTransport({
    host: user.host,
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: user.from,
      pass: user.pass,
    },
  });

  let info = await transporter.sendMail({
    from: `"BiliTools任务" <${user.from}>`, // sender address
    to: user.to, // list of receivers
    subject: title, // Subject line
    text: text, // plain text body
    // html: '<b>Hello world?</b>', // html body
  });

  console.log('邮件消息已发送: %s', info.messageId);
}
