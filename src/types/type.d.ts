/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AxiosRequestConfig } from 'axios';
import type { RequestOptions } from './axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    requestOptions?: RequestOptions;
  }
}
