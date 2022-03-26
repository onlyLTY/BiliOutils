import { logger } from '../utils/log';
import { clockIn } from '../net/mangaRequest';

export default async function mangaSign() {
  logger.info('----【漫画签到】----');
  try {
    const { code } = await clockIn();
    if (code == 0) {
      logger.info('漫画签到成功');
    } else {
      logger.info('漫画签到失败');
    }
  } catch (error) {
    /**
     * 这是axios报的错误,重复签到后返回的状态码是400
     * 所以将签到成功的情况忽略掉
     */
    if (error.response.status === 400) {
      logger.info('已经签到过了，跳过任务');
    } else {
      logger.info(`漫画签到异常 ${error.message}`);
    }
  }
}
