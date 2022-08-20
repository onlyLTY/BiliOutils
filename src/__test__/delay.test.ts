import { getDelayTime } from '@/utils/pure';

describe('delayTime 测试', () => {
  test('delayTime 返回值是否在区间', () => {
    // 测试 ms
    expect(getDelayTime('1ms')).toEqual([1]);
    expect(getDelayTime('1ms-200ms')).toEqual([1, 200]);

    // 测试 s
    expect(getDelayTime('1s')).toEqual([1000]);
    expect(getDelayTime('1s-200s')).toEqual([1000, 200000]);

    // 测试 m
    expect(getDelayTime('10m')).toEqual([600000]);
    expect(getDelayTime('10m-20m')).toEqual([600000, 1200000]);

    // 测试无单位
    expect(getDelayTime('10')).toEqual([600000]);
    expect(getDelayTime('10-20')).toEqual([600000, 1200000]);

    // 测试 h
    expect(getDelayTime('1h')).toEqual([3600000]);
    expect(getDelayTime('1h-4h')).toEqual([3600000, 14400000]);

    // 测试混合单位
    expect(getDelayTime('1ms-1')).toEqual([1, 60000]);
    expect(getDelayTime('1m-2h')).toEqual([60000, 7200000]);

    // 错误处理
    expect(getDelayTime('1d')).toEqual([0]);
    expect(getDelayTime('1m-')).toEqual([60000, 0]);
    expect(getDelayTime('-1m')).toEqual([0, 60000]);
    expect(getDelayTime('-')).toEqual([0, 0]);
    expect(getDelayTime('asdasdjk')).toEqual([0]);
  });
});
