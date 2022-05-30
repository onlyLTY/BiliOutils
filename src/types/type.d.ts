/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AxiosRequestConfig } from 'axios';
import type { RequestOptions } from './request';

declare module 'axios' {
  export interface AxiosRequestConfig {
    requestOptions?: RequestOptions;
  }
}

declare module 'got' {
  export interface NormalizedOptions {
    requestOptions?: RequestOptions;
  }
}
