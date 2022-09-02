import type { RollupOptions } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
let pkgJson: Record<string, any>;
try {
  pkgJson = require('../package.json');
} catch {
  pkgJson = require('./package.json');
}

export const extensions = ['.ts', '.js'];
export const plugins = ({ node, replaceValues = {}, noTerser }: BaseConfigOption) => {
  return [
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
        ...replaceValues,
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
            useBuiltIns: 'usage',
            corejs: 3.25,
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
    noTerser ? undefined : terser(),
    sizes(),
  ].filter(Boolean);
};
const optionalDependencies = Object.keys(pkgJson.optionalDependencies);
const EXTERNAL = [...Object.keys(pkgJson.dependencies), ...optionalDependencies];
// 手动排除这些以前就有的依赖，减少体积
const baseDependencies = ['core-js', 'got', 'nodemailer', 'tunnel'];
export const vmDependencies = [...optionalDependencies, ...baseDependencies];

interface BaseConfigOption {
  input: string;
  output: string;
  node?: string;
  external?: boolean | string[];
  replaceValues?: Record<string, string>;
  noTerser?: boolean;
}

export function createBaseConfig(
  config: BaseConfigOption,
  options: RollupOptions = {},
  callback?: (option: RollupOptions) => RollupOptions,
): RollupOptions {
  const external = Array.isArray(config.external)
    ? config.external
    : config.external === false
    ? optionalDependencies
    : EXTERNAL;
  const rOptions: RollupOptions = {
    plugins: plugins(config),
    input: `src/${config.input}`,
    output: {
      file: `dist/rollup/${config.output}`,
      format: 'cjs',
      inlineDynamicImports: true,
    },
    external,
  };
  return {
    ...rOptions,
    ...options,
    ...(callback?.(rOptions) || {}),
  };
}

export function createRollupOption(options: RollupOptions[]) {
  return options;
}
