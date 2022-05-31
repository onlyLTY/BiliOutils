/**
 * @param {{ node?: string; }} [options]
 */
export function baseConfig(options = {}) {
  const { node = '14' } = options;
  return {
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: 3.22,
          targets: {
            node,
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    comments: false,
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '#': './src/types',
          },
        },
      ],
    ],
    ignore: ['**/__test__', '**/*.test.ts', '**/*.spec.ts', '**/types', '**/dto'],
  };
}
