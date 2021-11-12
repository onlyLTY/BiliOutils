import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

// 需要给 babel 提供的配置
//  "modules": false,
export default {
  input: 'dist/ql_index.js',
  output: {
    dir: 'qinglong',
    format: 'cjs',
    chunkFileNames: '[name].js',
  },
  preserveEntrySignatures: false,
  plugins: [commonjs(), json(), terser()],
};
