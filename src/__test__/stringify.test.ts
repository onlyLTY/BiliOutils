import { stringify } from '../utils/pure';

const value = {
  demo: 1,
  statistics: {
    appId: 1,
    platform: 3,
    version: '6.74.0',
    abtest: '',
  },
};

const result =
  'demo=1&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.74.0%22%2C%22abtest%22%3A%22%22%7D';

describe('stringify 测试', () => {
  test('stringify 是否达到预期', () => {
    expect(stringify(value)).toBe(result);
  });
});
