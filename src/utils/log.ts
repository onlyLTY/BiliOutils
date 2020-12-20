/**
 * 临时解决日志问题
 */

import { TaskModule } from '../config/globalVar';

/**
 * 保留真正的log函数
 */
const _log = console.log;

function warpLog() {
  const ISO_TIME = new Date().toISOString().match(/\w{2}:\w{2}:\w{2}/)[0],
    HOURS = Number(ISO_TIME.split(':')[0]) + 8,
    bjHoursNum = HOURS > 24 ? HOURS - 24 : HOURS < 0 ? HOURS + 24 : HOURS,
    bjHoursStr = bjHoursNum.toString(),
    bjHours = bjHoursStr.length === 1 ? '0' + bjHoursStr : bjHoursStr,
    TIME = `[${bjHours + ISO_TIME.replace(/^\w{2}/, '')}] `;

  return (message?: any, ...optionalParams: any[]): void => {
    _log(message, ...optionalParams);
    let msgStr = message;
    for (const m of optionalParams) {
      msgStr += m;
    }
    TaskModule.appInfo += TIME + msgStr + '\n';
  };
}

export { _log, warpLog };
