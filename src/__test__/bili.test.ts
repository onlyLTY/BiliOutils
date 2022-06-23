import { getSign } from '../utils/bili';

const appkey = '1d8b6e7d45233436';
const appsec = '560c52ccd288fed045859ed18bffd973';
const params = {
  id: 114514,
  str: '1919810',
  test: 'いいよ，こいよ',
  appkey,
};

describe('bili 工具测试', () => {
  test('app sign', () => {
    expect(getSign(params, appsec).query).toBe(
      `appkey=1d8b6e7d45233436&id=114514&str=1919810&test=%E3%81%84%E3%81%84%E3%82%88%EF%BC%8C%E3%81%93%E3%81%84%E3%82%88&sign=01479cf20504d865519ac50f33ba3a7d`,
    );
  });
});
