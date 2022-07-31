import * as fleece from 'golden-fleece';

export class JSON5 {
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
}

// import * as json5 from 'json5';

// interface JSON5Type {
//   parse<T = any>(text: string, reviver?: ((this: any, key: string, value: any) => any) | null): T;
//   stringify(
//     value: any,
//     replacer?: ((this: any, key: string, value: any) => any) | null,
//     space?: string | number | null,
//   ): string;
// }

// // 解决cjs mjs环境导致的路径问题
// // @ts-ignore
// export const JSON5: JSON5Type = json5.default ? json5.default : json5;
