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
  };
}
