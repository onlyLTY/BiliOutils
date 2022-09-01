import { createBaseConfig, createRollupOption } from './rollup.config.base';

export default createRollupOption([
  createBaseConfig({
    input: 'vm/cfc.ts',
    output: 'vm.cfc.js',
    replaceValues: {
      __IS_CFC__: 'true',
    },
    node: '12.2',
    noTerser: true,
    external: false,
  }),
  createBaseConfig({
    input: 'vm/fc.ts',
    output: 'vm.fc.js',
    replaceValues: {
      __IS_FC__: 'true',
    },
    noTerser: true,
    external: false,
  }),
  createBaseConfig({
    input: 'vm/scf.ts',
    output: 'vm.scf.js',
    replaceValues: {
      __IS_SCF__: 'true',
    },
    noTerser: true,
    external: false,
  }),
]);
