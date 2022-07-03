import { logger } from '../utils/log';
import { doLiveSign, webGetSignInfo } from '../net/live.request';

export default async function liveSignTask() {
  logger.info('----【直播签到】----');
  try {
    const { data } = await webGetSignInfo();
    if (data.status === 1) {
      logger.info('已签到，跳过签到');
      logger.info(`已经签到${data.hadSignDays}天，${data.specialText}`);
      return;
    }
  } catch (error) {
    logger.debug(`直播签到，${error.message}`);
  }
  try {
    const { code, data, message } = await doLiveSign();
    if (code === 0) {
      logger.info(
        `直播签到成功: ${data.text}，特别信息: ${data.specialText}，本月签到天数: ${data.hadSignDays}天;`,
      );
    } else {
      logger.warn(`直播签到失败: ${code} ${message}`);
    }
  } catch (error) {
    logger.error(`直播签到异常: ${error.message}`);
  }
}
