module.exports = {
  rootDir: 'src/',
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
    '#/(.*)$': '<rootDir>/types/$1',
  },
};
