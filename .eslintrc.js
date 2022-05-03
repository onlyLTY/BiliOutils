module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-empty': ['error', { allowEmptyCatch: true }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^ignore' },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': [
      'off',
      {
        ignoreRestArgs: true,
        fixToUnknown: true,
      },
    ],
  },
};
