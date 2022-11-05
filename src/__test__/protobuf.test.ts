import { parseProtobufNumber, toProtobufNumber } from '@/utils/http/protobuf';

describe('potobuf 数字测试', () => {
  test('整数转为 varint', () => {
    expect(toProtobufNumber('011000010000111101111011011100000011100011', 16)).toEqual([
      'e3',
      '81',
      'b7',
      'ef',
      'c3',
      '30',
    ]);
  });

  test('varint 转为 number', () => {
    expect(parseProtobufNumber('e381b7efc330')).toBe('011000010000111101111011011100000011100011');
  });
});
