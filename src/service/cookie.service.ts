import * as cookieReq from '@/net/cookie.request';
import { defaultFunc, encrypt } from '@/wasm/wasm_rsa_umd';
import { logger, sleep } from '@/utils';
import { TaskConfig } from '@/config/globalVar';

function convertToHex(str: string) {
  return str.split('').reduce((i, t) => i + t.charCodeAt(0).toString(16), '');
}

async function getCookieInfo() {
  try {
    const { data, code, message } = await cookieReq.getCookieInfo();
    if (code !== 0 || !data.refresh) {
      logger.warn(`获取 cookie 信息失败 ${code} ${message}`);
      return;
    }
    return data.timestamp;
  } catch (error) {
    logger.error('获取 cookie/info 异常');
    logger.error(error);
  }
}

async function getCorrespondCode(timestamp: number) {
  // await wasmInit.default();
  await defaultFunc();
  return encrypt({
    data: convertToHex(`refresh_${timestamp}`),
    digest: 'SHA256',
  });
}

(async () => {
  const str = await getCorrespondCode(123);
  console.log(
    str ===
      '2850e91ff7a03c09f4ed894fb3392180b901f5ca8d3180a955941f48b970995a5db5b43f146931a0844f1f695e6ba9688444b4e4fe32785a34168e6a1a3db7b7af22c8b85368208d2915ff25d5388ff861f8d5829bf12f752a28ecd6d3488cf70280b25ae3011f8a502ab76327511992e9babd590718869af1ba2ffd0b9149ad',
  );
})();

export async function getRefreshCsrf() {
  const timestamp = await getCookieInfo();
  if (!timestamp) {
    return;
  }
  const code = await getCorrespondCode(timestamp);
  try {
    await sleep(300);
    const html = await cookieReq.getCorrespondHtml(code);
    if (html) {
      return html.match(/<div id="1-name">(\w+)<\/div>/)?.[1];
    }
  } catch (error) {
    logger.error('获取 refresh_csrf 异常');
    logger.error(error);
  }
}

/**
 * 刷新 cookie
 */
export async function refreshCookie(refreshCsrf: string) {
  try {
    const { data, code } = await cookieReq.refreshCookie(refreshCsrf);
    if (code === 0) {
      return data.refresh_token;
    }
  } catch (error) {
    logger.error('刷新 cookie 异常');
    logger.error(error);
  }
}

/**
 * 确定 refreshToken
 */
export async function confirmRefreshToken(refreshToken: string) {
  try {
    const { code } = await cookieReq.confirmRefreshToken(refreshToken);
    if (code === 0) {
      logger.info('确定 refreshToken 成功');
      return true;
    }
  } catch (error) {
    logger.error('确定 refreshToken 异常');
    logger.error(error);
  }
}

export async function refreshCookieService() {
  const refreshToken = TaskConfig.acTimeValue,
    refreshCsrf = await getRefreshCsrf();
  if (!refreshCsrf) return;
  const newRefreshToken = await refreshCookie(refreshCsrf);
  if (!newRefreshToken) return;
  TaskConfig.acTimeValue = newRefreshToken;
  await confirmRefreshToken(refreshToken);
}
