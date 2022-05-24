import type { RollupOptions } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
const pkgJson = require('../package.json');

const extensions = ['.ts', '.js'];
const plugins = (node?: string) => [
  nodeResolve({
    preferBuiltins: true,
  }),
  typescript({
    module: 'ESNext',
  }),
  replace({
    preventAssignment: true,
    values: {
      __BILI_VERSION__: `v${pkgJson.version}`,
    },
  }),
  babel({
    extensions,
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    babelrc: false,
    presets: [
      [
        '@babel/env',
        {
          targets: {
            node: node || '14',
          },
          modules: false,
        },
      ],
    ],
  }),
  commonjs({
    extensions,
  }),
  json(),
  terser(),
  sizes(),
];
const optionalDependencies = Object.keys(pkgJson.optionalDependencies);
const external = [...Object.keys(pkgJson.dependencies), ...optionalDependencies];

export default [
  {
    plugins: plugins('12.2'),
    input: 'src/vm/cfc.ts',
    output: {
      file: 'dist/rollup/vm.cfc.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    external,
  },
  {
    plugins: plugins(),
    input: 'src/vm/fc.ts',
    output: {
      file: 'dist/rollup/vm.fc.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    external,
  },
  {
    plugins: plugins(),
    input: 'src/vm/scf.ts',
    output: {
      file: 'dist/rollup/vm.scf.js',
      format: 'cjs',
      inlineDynamicImports: true,
    },
    external,
  },
] as RollupOptions[];
