import axios, { AxiosRequestConfig } from 'axios';
import * as nodemailer from 'nodemailer';

import { TaskConfig } from '../config/globalVar';

export async function pushplus(title: string, content: string) {
  if (!TaskConfig.PUSHPLUS_TOKEN) {
    return;
  }
  const plusApi = axios.create({
    baseURL: 'http://www.pushplus.plus',
    headers: {
      'content-type': 'application/json',
    },
  });
  const postData = {
    token: TaskConfig.PUSHPLUS_TOKEN,
    content,
    title,
  };

  try {
    // 发送消息
    const {
      data: { msg, code, data: msgNumberString },
    } = await plusApi.post('/send', postData);
    if (code !== 200) {
      console.log('pushplus 发送消息失败');
      console.log(code, msg);
      return;
    }

    // 获取发送结果
    // const {
    //   data: {
    //     data: { errorMessage, msgMsg },
    //   },
    // } = await plusApi.get(
    //   `/api/customer/message/sendMessageResult?messageId=${msgNumberString}`,
    // );
    // if (errorMessage) {
    //   console.log('pushplus:', errorMessage);
    //   return;
    // }
    // if (code !== 200) {
    //   console.log('pushplus:', msgMsg);
    //   return;
    // }
    // console.log('pushplus 发送成功');
  } catch (error) {
    console.log('pushplus 发送消息出现异常');
    console.log(error.message);
  }
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
