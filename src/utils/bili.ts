import { md5, stringify } from './pure';

/**
 * API 接口签名
 * @param params
 * @param appkey
 * @param appsec
 */
export function getSignString(params: any, appkey: string, appsec: string) {
  params = {
    ...params,
    appkey,
  };
  // 对参数进行排序
  const keys = Object.keys(params).sort();
  const query = stringify(keys.map(key => [key, params[key]]));
  const sign = md5(query + appsec);
  return query + '&sign=' + sign;
}
