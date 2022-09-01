interface JSON5Type {
  parse<T = any>(text: string, reviver?: ((this: any, key: string, value: any) => any) | null): T;
  stringify(
    value: any,
    replacer?: ((this: any, key: string, value: any) => any) | null,
    space?: string | number | null,
  ): string;
}

function getJSON5() {
  try {
    const json5 = require('json5');
    // 解决cjs mjs环境导致的路径问题
    // @ts-ignore
    return json5.default ? json5.default : json5;
  } catch {}
}

export const JSON5: JSON5Type = getJSON5();
