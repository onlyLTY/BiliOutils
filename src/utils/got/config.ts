import { defaultHeaders } from '@/constant/biliUri';

export function getOptions() {
  return {
    timeout: 10000,
    headers: {
      'content-type': defaultHeaders['content-type'],
      'user-agent': defaultHeaders['user-agent'],
      'accept-language': defaultHeaders['accept-language'],
      'accept-encoding': defaultHeaders['accept-encoding'],
    },
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // 忽略重复请求
      ignoreCancelToken: true,
      // 是否携带 bili cookie
      withBiliCookie: true,
    },
  };
}
