import * as json5 from 'json5';

interface JSON5Type {
  parse<T = any>(text: string, reviver?: ((this: any, key: string, value: any) => any) | null): T;
  stringify(
    value: any,
    replacer?: ((this: any, key: string, value: any) => any) | null,
    space?: string | number | null,
  ): string;
}

// 解决cjs mjs环境导致的路径问题
// @ts-ignore
export const JSON5: JSON5Type = json5.default ? json5.default : json5;
