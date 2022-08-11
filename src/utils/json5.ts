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

function getFleece() {
  const golden = require('golden-fleece');
  const fleece = golden.default ? golden.default : golden;
  return class {
    static parse(str: string) {
      return fleece.evaluate(str);
    }

    static stringify(obj: Record<string, any>) {
      return fleece.stringify(obj, {
        spaces: 2,
        singleQuotes: true,
      });
    }

    static patch(str: string, patch: Record<string, any>) {
      return fleece.patch(str, {
        ...this.parse(str),
        ...patch,
      });
    }
  };
}

// TODO: 不小心在 vm 中直接改变了依赖，现在只能动态的加载依赖了
let json5: JSON5Type;
export const JSON5 = new Proxy({} as JSON5Type, {
  get(_target, key) {
    if (!json5) {
      json5 = getJSON5() || getFleece();
    }
    return Reflect.get(json5, key);
  },
});
