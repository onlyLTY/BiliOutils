/* eslint-disable no-var */
declare global {
  var VMThis: {
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    message?: string;
    error?: string | Error;
  };
  var BILITOOLS_CONFIG: string;
}

export {};
