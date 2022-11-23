/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestOptions } from './request';

declare module '@catlair/node-got' {
  export interface RequestOptions {
    withBiliCookie?: boolean;
  }
}
