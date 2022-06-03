import { md5 } from '../utils/pure';

describe('编码', () => {
  test('md5 编码测试', () => {
    expect(md5('123')).toBe('202cb962ac59075b964b07152d234b70');
  });
});
