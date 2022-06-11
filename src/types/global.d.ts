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

  type RecursivePartial<S> = {
    [p in keyof S]+?: S[p] extends object ? RecursivePartial<S[p]> : S[p];
  };

  type RecursiveRequired<S> = {
    [p in keyof S]-?: S[p] extends object ? RecursiveRequired<S[p]> : S[p];
  };

  type Ref<T> = {
    value: T;
  };
}

export {};
