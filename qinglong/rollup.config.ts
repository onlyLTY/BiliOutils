import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

const extensions = ['.ts', '.js'];

export default {
  input: 'qinglong/cat_bili_ql.ts',
  output: {
    dir: 'qinglong',
    format: 'cjs',
    chunkFileNames: '[name].js',
  },
  external: ['crypto-js', 'lodash', 'nodemailer', 'axios', 'qs', 'pako'],
  preserveEntrySignatures: false,
  plugins: [
    babel({
      extensions,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            targets: {
              node: '14',
            },
          },
        ],
        '@babel/preset-typescript',
      ],
    }),
    commonjs({
      extensions,
    }),
    json(),
    terser(),
  ],
};
