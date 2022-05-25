/* eslint-disable no-var */
import type { Config } from './config';
declare global {
  var VMThis: {
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    message?: string;
    error?: string | Error;
  };
  var BILITOOLS_CONFIG: Config;
}

export {};
