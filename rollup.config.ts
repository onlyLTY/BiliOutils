import { createBaseConfig, createRollupOption } from './build/rollup.config.base';

export default createRollupOption([
  createBaseConfig({
    input: 'index.ts',
    output: 'index.js',
    external: false,
  }),
  createBaseConfig({
    input: 'index.ts',
    output: 'cat_bili_ql.js',
  }),
  createBaseConfig({
    input: 'index.cfc.ts',
    output: 'index.agc.js',
    external: false,
  }),
]);
