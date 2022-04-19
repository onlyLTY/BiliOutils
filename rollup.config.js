import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import typescript from '@rollup/plugin-typescript';
const pkgJson = require('./package.json');

const extensions = ['.ts', '.js'];
const plugins = (config = { node: '12' }) => [
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
            node: config.node,
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
const external = Object.keys(pkgJson.dependencies);

export default [
  {
    plugins: plugins(),
    input: 'src/index.ts',
    output: {
      file: 'dist/rollup/index.js',
      format: 'cjs',
    },
  },
  {
    plugins: plugins({ node: '14' }),
    input: 'src/index.ts',
    output: {
      file: 'dist/rollup/cat_bili_ql.js',
      format: 'cjs',
    },
    external,
  },
  {
    input: 'src/index.scf.ts',
    output: {
      file: 'dist/rollup/index.scf.js',
      format: 'cjs',
    },
    plugins: plugins(),
  },
];
