import { isArray, isNumber, isObject } from './is';
import { md5, stringify } from './pure';
import * as crypto from 'crypto';

type Params = Record<string, string | boolean | number>;

/**
 * API 接口签名
 * @param params
 * @param appkey
 * @param appsec
 */
export function getSignString(params: Params, appkey: string, appsec: string) {
  return getAppSign(params, appkey, appsec).query;
}

export function appSign(params: Params, appkey: string, appsec: string) {
  return getAppSign(params, appkey, appsec).sign;
}

function sortParams(params: Params) {
  const keys = Object.keys(params).sort();
  return keys.map(key => [key, params[key]]);
}

function getAppSign(params: Params, appkey: string, appsec: string) {
  params = {
    ...params,
    appkey,
  };
  const query = stringify(sortParams(params));
  const sign = md5(query + appsec);
  return {
    query: query + '&sign=' + sign,
    sign,
  };
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
