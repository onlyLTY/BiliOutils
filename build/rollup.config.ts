import { createBaseConfig, createRollupOption } from './rollup.config.base';

export default createRollupOption([
  createBaseConfig({
    input: 'vm/cfc.ts',
    output: 'vm.cfc.js',
    node: '12.2',
  }),
  createBaseConfig({
    input: 'vm/fc.ts',
    output: 'vm.fc.js',
  }),
  createBaseConfig({
    input: 'vm/scf.ts',
    output: 'vm.scf.js',
  }),
]);
