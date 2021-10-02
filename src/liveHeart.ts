import { warpLog } from './utils/log';
import { Constant, JuryTask, TaskModule } from './config/globalVar';
import { apiDelay, sendMessage, getPRCDate, printVersion } from './utils';
import { random } from 'lodash';
import { liveHeartBySCF } from './service/liveHeart';
import updateTrigger from './utils/updateTrigger';

function setCron() {
  const pre = getPRCDate().getTime() + 52_000;
  const next = new Date(pre);
  const s = next.getSeconds(),
    m = next.getMinutes(),
    h = next.getHours();
  return `${s} ${m} ${h} * * * *`;
}

exports.main_handler = async (event, _context) => {
  console.log = warpLog();
  printVersion();

  const data = await liveHeartBySCF(event.Message);
  if (data === 0) {
    // 明天再说
    await updateTrigger(Constant.HEART_TRIGGER_NAME);
    return;
  }
  // 今天继续
  await updateTrigger(Constant.HEART_TRIGGER_NAME, data, setCron());
  return;
};
