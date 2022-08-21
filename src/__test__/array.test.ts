import { mergeArray } from '@/utils/pure';

/**
 * 对象中：
 * sid 为唯一标识，如果有重复，则合并
 * id 为唯一标识，目的是用来判断到底谁把谁给覆盖了。
 * subjoin 为附加信息，用于验证非共用属性如何合并。
 */

function getTargetArray() {
  return [
    {
      sid: 'newLottery_3c4f311a-041b-11ed-9251-a4ae12675bc2',
      id: 1,
      title: '爱配音，上戏鲸APP！',
      subjoin: [123],
    },
    {
      sid: 'newLottery_8b3e37a8-e30f-11ec-9251-a4ae12675bc2',
      id: 2,
      title: '正义的算法',
    },
    {
      sid: 'newLottery_0444c4a9-f6c0-11ec-9251-a4ae12675bc2',
      id: 3,
      title: '我的租房日记·第二期',
    },
    {
      sid: 'newLottery_3c4f311a-041b-11ed-9251-a4ae12675bc2',
      id: 4,
      title: '谁便一个名字',
    },
  ];
}

const resultLeft = [
  {
    sid: 'newLottery_3c4f311a-041b-11ed-9251-a4ae12675bc2',
    id: 4,
    title: '谁便一个名字',
    subjoin: [123],
  },
  {
    sid: 'newLottery_8b3e37a8-e30f-11ec-9251-a4ae12675bc2',
    id: 2,
    title: '正义的算法',
  },
  {
    sid: 'newLottery_0444c4a9-f6c0-11ec-9251-a4ae12675bc2',
    id: 3,
    title: '我的租房日记·第二期',
  },
];

const resultRight = [
  {
    sid: 'newLottery_3c4f311a-041b-11ed-9251-a4ae12675bc2',
    id: 1,
    title: '爱配音，上戏鲸APP！',
    subjoin: [123],
  },
  {
    sid: 'newLottery_0444c4a9-f6c0-11ec-9251-a4ae12675bc2',
    id: 3,
    title: '我的租房日记·第二期',
  },
  {
    sid: 'newLottery_8b3e37a8-e30f-11ec-9251-a4ae12675bc2',
    id: 2,
    title: '正义的算法',
  },
];

describe('Array 方法测试', () => {
  test('mergeArray 合并数组', () => {
    expect(mergeArray(getTargetArray(), 'sid')).toEqual(resultLeft);
    expect(mergeArray(getTargetArray(), 'sid', false, 'right')).toEqual(resultRight);
  });
});
