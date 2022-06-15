import { createBaseConfig, createRollupOption } from './build/rollup.config.base';

export default createRollupOption([
  createBaseConfig({
    input: 'index.ts',
    output: 'index.js',
    external: false,
  }),
  createBaseConfig(
    {
      input: 'index.ql.ts',
      output: 'cat_bili_ql.js',
      replaceValues: {
        __IS_QINGLONG__: 'true',
      },
      node: '16',
      noTerser: true,
    },
    null,
    option => ({
      external: (option.external as string[]).filter(dep => !['json5', 'core-js'].includes(dep)),
    }),
  ),
  createBaseConfig({
    input: 'index.cfc.ts',
    output: 'index.agc.js',
    replaceValues: {
      __IS_AGC__: 'true',
    },
    external: false,
  }),
]);
