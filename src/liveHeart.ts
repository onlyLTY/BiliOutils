import { warpLog } from './utils/log';
import { Constant } from './config/globalVar';
import { getPRCDate, printVersion } from './utils';
import { liveHeartBySCF, liveHeart } from './service/liveHeart';
import updateTrigger from './utils/updateTrigger';

function setCron(time = 60_000) {
  time = time || 60_000;
  const pre = getPRCDate().getTime() + time;
  const next = new Date(pre);
  const s = next.getSeconds(),
    m = next.getMinutes(),
    h = next.getHours();
  return `${s} ${m} ${h} * * * *`;
}

exports.main_handler = async (event, _context) => {
  console.log = warpLog();
  printVersion();

  if (!event) {
    return await liveHeart();
  }

  let message;
  try {
    message = JSON.parse(event.Message);
  } catch (error) {}

  if (message && !message.d && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  const data = await liveHeartBySCF(event.Message);
  if (data === 0) {
    // 明天再说
    await updateTrigger(Constant.HEART_TRIGGER_NAME);
    return '今日完成';
  }

  if (data === 1) {
    await updateTrigger(
      Constant.HEART_TRIGGER_NAME,
      { hn: { v: 0 }, d: [{ seq: { v: 0 } }] },
      setCron(5_000),
    );
    return '等待继续下一轮';
  }
  await updateTrigger(Constant.HEART_TRIGGER_NAME, data, setCron(62_000 - data.d.length * 1000));
  return '等待继续下次心跳';
};
