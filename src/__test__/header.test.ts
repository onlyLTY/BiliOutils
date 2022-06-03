import { mergeHeaders } from '../utils/pure';

const headers1 = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

const headers2 = {
  'content-type': 'application/x-www-form-urlencoded',
  'user-agent': 'xxxxxxxxxxxxxxxxx',
};

const headers = {
  'x-requested-with': 'XMLHttpRequest',
  'content-type': 'application/x-www-form-urlencoded',
  'user-agent': 'xxxxxxxxxxxxxxxxx',
};

describe('请求 header 测试', () => {
  test('合并 header', () => {
    expect(mergeHeaders(headers1, headers2)).toEqual(headers);
  });
});
