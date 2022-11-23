import { deepSetObject } from '../utils/pure';

const obj1 = {
  demo: 1,
  statistics: {
    appId: 1,
  },
};

const obj2 = {
  demo: 2,
  statistics: {
    appId: 2,
    platform: 3,
  },
  time: 3,
};

describe('object 测试', () => {
  test('为对象设置属性', () => {
    expect(deepSetObject(obj1, obj2)).toEqual({
      demo: 1,
      statistics: {
        appId: 1,
        platform: 3,
      },
      time: 3,
    });
  });
});
