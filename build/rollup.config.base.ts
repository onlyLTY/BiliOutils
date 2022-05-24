import type { RollupOptions } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
let pkgJson;
try {
  pkgJson = require('../package.json');
} catch {
  pkgJson = require('./package.json');
}

export const extensions = ['.ts', '.js'];
export const plugins = (node?: string) => [
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
export const optionalDependencies = Object.keys(pkgJson.optionalDependencies);
export const external = [...Object.keys(pkgJson.dependencies), ...optionalDependencies];

interface BaseConfigOption {
  input: string;
  output: string;
  node?: string;
  external?: boolean;
}

export function createBaseConfig(config: BaseConfigOption): RollupOptions {
  return {
    plugins: plugins(config.node),
    input: `src/${config.input}`,
    output: {
      file: `dist/rollup/${config.output}`,
      format: 'cjs',
      inlineDynamicImports: true,
    },
    external: config.external === false ? optionalDependencies : external,
  };
}

export function createRollupOption(options: RollupOptions[]) {
  return options;
}
