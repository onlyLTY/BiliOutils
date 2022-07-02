import { isArray, isNumber, isObject } from './is';
import { getUnixTime, md5, stringify } from './pure';
import * as crypto from 'crypto';

type Params = Record<string, string | boolean | number>;

/**
 * API 接口签名
 * @param params
 * @param appkey
 * @param appsec
 */
export function appSignString(params: Params = {}, appkey?: string, appsec?: string) {
  return getAppSign(params, appkey, appsec).query;
}

export function appSign(params: Params, appkey?: string, appsec?: string) {
  return getAppSign(params, appkey, appsec).sign;
}

function sortParams(params: Params) {
  const keys = Object.keys(params).sort();
  return keys.map(key => [key, params[key]]);
}

export function getSign(params: Params, appsec: string, noSign = false) {
  const query = stringify(sortParams(params));
  if (noSign) {
    return { query, sign: '' };
  }
  const sign = md5(query + appsec);
  return {
    query: query + '&sign=' + sign,
    sign,
  };
}

function getAppSign(
  params: Params,
  appkey = '1d8b6e7d45233436',
  appsec = '560c52ccd288fed045859ed18bffd973',
) {
  // if (!TaskConfig.accessKey) {
  //   return getSign(params, appsec, true);
  // }
  params = {
    ...params,
    // access_key: TaskConfig.accessKey,
    actionKey: 'appkey',
    appkey,
    platform: 'android',
    mobi_app: 'android',
    disable_rcmd: 0,
    build: 6780300,
    c_locale: 'zh_CN',
    s_locale: 'zh_CN',
    ts: getUnixTime(),
  };
  return getSign(params, appsec);
}

/**
 * 对象值转换为字符串
 */
function objectValueToString(params: Record<string, any>) {
  Object.keys(params).forEach(key => {
    if (isNumber(params[key])) {
      params[key] = params[key].toString();
      return;
    }
    if (isObject(params[key])) {
      objectValueToString(params[key]);
      return;
    }
    if (isArray(params[key])) {
      params[key] = params[key].map(item =>
        isObject(item) ? objectValueToString(item) : item.toString(),
      );
    }
  });
  return params;
}

export function clientSign(params: Params) {
  let data = JSON.stringify(objectValueToString(params));
  const alg = ['SHA512', 'SHA3-512', 'SHA384', 'SHA3-384', 'BLAKE2b512'];
  for (const a of alg) {
    data = crypto.createHash(a).update(data).digest('hex');
  }
  return data;
}

/**
 * 给昵称添加 ** （目的是变简短）
 */
export function conciseNickname(nickname = '') {
  const length = nickname.length;
  if (length <= 3) {
    return nickname;
  }
  const firstWord = nickname[0];
  const lastWord = nickname[length - 1];
  return `${firstWord}**${lastWord}`;
}
