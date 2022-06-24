import { createBaseConfig, createRollupOption } from './build/rollup.config.base';

export default createRollupOption([
  createBaseConfig({
    input: 'index.cfc.ts',
    output: 'index.agc.js',
    replaceValues: {
      __IS_AGC__: 'true',
    },
    external: false,
  }),
]);
