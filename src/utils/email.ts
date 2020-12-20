import { envSymbolArray } from '../config/envUtil';
import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export default async function sendMail(title: string, text: string) {
  //发件邮箱,密码,收件邮箱,stmp地址[,端口]
  const user = envSymbolArray('NODE_MAIL');
  if (user.length < 4) return;

  let transporter = nodemailer.createTransport({
    host: user[3],
    port: user[4] || 465,
    secure: user[4] === 465 ? false : true, // true for 465, false for other ports
    auth: {
      user: user[0],
      pass: user[1],
    },
  });

  let info = await transporter.sendMail({
    from: `"BiliTools任务" <${user[0]}>`, // sender address
    to: user[2], // list of receivers
    subject: title, // Subject line
    text: text, // plain text body
    // html: '<b>Hello world?</b>', // html body
  });

  console.log('邮件消息已发送: %s', info.messageId);
}
