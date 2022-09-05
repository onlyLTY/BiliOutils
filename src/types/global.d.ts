/* eslint-disable no-var */
import type { Config } from './config';
declare global {
  var __BT_context__: {
    event: any;
    context: any;
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
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

  type UnPromisify<T> = T extends Promise<infer U> ? U : T;

  // 一定已经定义了
  type Defined<T> = T extends undefined ? never : T;

  // 将值作为类型
  type ValueOf<T> = T[keyof T];
}

export {};
