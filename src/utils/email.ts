import { TaskConfig } from '../config/globalVar';
import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export default async function sendMail(title: string, text: string) {
  //发件邮箱,密码,收件邮箱,stmp地址[,端口]
  const user = TaskConfig.config.message?.email;
  if (!user || !user.pass || !user.from || !user.host) return;

  let transporter = nodemailer.createTransport({
    host: user.host,
    port: user.port || 465,
    secure: user.port === 465 ? false : true, // true for 465, false for other ports
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
