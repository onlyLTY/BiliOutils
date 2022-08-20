import { defHttp } from '@/utils/http/def';
import { defLogger } from '@/utils/log/def';
import { appSignString } from '@/utils/bili';
import { CookieJar } from '@/utils/cookie';
import { RequestError } from 'got';

interface AcgTvLoginResponse {
  code: number;
  status: boolean;
  ts: number;
  data: {
    api_host: string;
    has_login: number;
    direct_login: number;
    user_info: { mid: string; uname: string; face: string };
    confirm_uri: string;
  };
}

export async function accessKey2Cookie(access_key: string) {
  const cookieJar = new CookieJar();
  await defHttp.get(
    `https://passport.bilibili.com/api/login/sso?${appSignString({
      access_key,
      gourl: 'https://account.bilibili.com/account/home',
    })}`,
    {
      cookieJar,
      requestOptions: { withCredentials: true },
    },
  );
  return cookieJar.getCookieString();
}

async function getAcgTvLogin(cookieJar: CookieJar) {
  try {
    const { data } = await defHttp.get<AcgTvLoginResponse>(
      'https://passport.bilibili.com/login/app/third?appkey=27eb53fc9058f8c3&api=http://link.acg.tv/forum.php&sign=67ec798004373253d60114caaad89a8c',
      {
        cookieJar,
      },
    );
    return data?.confirm_uri;
  } catch (error) {
    defLogger.error(error);
  }
}

export async function cookie2AccessKey(cookie: string) {
  const cookieJar = new CookieJar(cookie);
  const confirm_uri = await getAcgTvLogin(cookieJar);
  if (!confirm_uri) {
    return;
  }
  try {
    await defHttp.get(confirm_uri, { cookieJar });
  } catch (error) {
    if (error instanceof RequestError) {
      const url = error.request?.requestUrl;
      if (!url) {
        return;
      }
      const usp = new URLSearchParams(url.split('?')?.[1]);
      return usp.get('access_key');
    }
  }
}

export async function getNewCookie(cookie: string) {
  const access_key = await cookie2AccessKey(cookie);
  if (!access_key) {
    defLogger.error('获取 access_key 失败！');
    return;
  }
  return await accessKey2Cookie(access_key);
}
