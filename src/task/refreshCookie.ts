import { TaskConfig } from '@/config/globalVar';
import { refreshCookieService } from '@/service/cookie.service';
import { logger } from '../utils/log';

export default async function refreshCookie() {
  if (!TaskConfig.cookie || !TaskConfig.acTimeValue) {
    return;
  }
  logger.info('----【刷新 cookie】----');
  try {
    await refreshCookieService();
  } catch (error) {
    logger.error(`刷新 cookie 异常: ${error}`);
  }
}

(async () => {
  refreshCookieService();
})();
