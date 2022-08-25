import { base64Decode, base64Encode, md5 } from '../utils/pure';

describe('编码', () => {
  test('md5 编码测试', () => {
    expect(md5('123')).toBe('202cb962ac59075b964b07152d234b70');
  });

  test('base64 编码测试', () => {
    expect(base64Encode('15|6|1|0')).toBe('MTV8NnwxfDA=');
    expect(base64Decode('MTV8NnwxfDA=')).toBe('15|6|1|0');
  });
});
