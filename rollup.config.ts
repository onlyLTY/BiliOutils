import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import typescript from '@rollup/plugin-typescript';
const pkgJson = require('./package.json');

const extensions = ['.ts', '.js'];
const plugins = () => [
  nodeResolve({
    preferBuiltins: true,
  }),
  typescript({
    module: 'ESNext',
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
            node: '14',
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
const optionalDependencies = ['@alicloud/fc2', 'tencentcloud-sdk-nodejs'];
const external = [...Object.keys(pkgJson.dependencies), ...optionalDependencies];

export default [
  {
    plugins: plugins(),
    input: 'src/index.ts',
    output: {
      file: 'dist/rollup/index.js',
      format: 'cjs',
    },
    external: optionalDependencies,
  },
  {
    plugins: plugins(),
    input: 'src/index.ts',
    output: {
      file: 'dist/rollup/cat_bili_ql.js',
      format: 'cjs',
    },
    external,
  },
  {
    plugins: plugins(),
    input: 'src/index.cfc.ts',
    output: {
      file: 'dist/rollup/index.agc.js',
      format: 'cjs',
    },
    external: optionalDependencies,
  },
];
