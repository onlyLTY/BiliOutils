import { TaskConfig } from '../config/globalVar';
import { stringify } from 'qs';
import axios from '../net';

export default function scSend(text: string, desp: string): void {
  const sckey = TaskConfig.config.message?.serverChan;
  if (!sckey) return;
  axios
    .post(
      `https://sc.ftqq.com/${sckey}.send`,
      stringify({
        text,
        desp,
      })
    )
    .then(() => {
      console.log('server酱推送成功');
    })
    .catch((err) => {
      console.warn(err);
    });
}
