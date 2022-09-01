import type { OptionsOfUnknownResponseBody } from 'got';
import type { RequestOptions } from './request';

export interface VGotOptions extends OptionsOfUnknownResponseBody {
  params?: OptionsOfUnknownResponseBody['searchParams'];
  data?: any;
  baseURL?: string;
  requestOptions?: RequestOptions;
  httpsAgent?: any;
  httpAgent?: any;
}
