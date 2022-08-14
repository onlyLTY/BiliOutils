import { checkVersion } from '../utils/version';

describe('版本测试', () => {
  test('检查版本是否需要更新', () => {
    const version1 = 'v6.74.0';
    const latestTag1 = 'v6.74.0';
    // 如果版本相同，则不需要更新
    expect(checkVersion(version1, latestTag1)).toBeFalsy();
    const version2a = 'v6.74.2';
    const version2b = 'v6.74.2-rc0';
    const version2c = 'v6.74.3-beta.0';
    const latestTag2 = 'v6.74.0';
    // 如果版本更新，则不需要更新
    expect(checkVersion(version2a, latestTag2)).toBeFalsy();
    expect(checkVersion(version2b, latestTag2)).toBeFalsy();
    expect(checkVersion(version2c, latestTag2)).toBeFalsy();
    const version3a = 'v2.74.3';
    const version3b = 'v6.73.3';
    const version3c = 'v6.74.2';
    const version3d = 'v6.74.2-rc0';
    const latestTag3 = 'v6.74.3';
    // 如果版本更旧，则需要更新
    expect(checkVersion(version3a, latestTag3)).toBeTruthy();
    expect(checkVersion(version3b, latestTag3)).toBeTruthy();
    expect(checkVersion(version3c, latestTag3)).toBeTruthy();
    expect(checkVersion(version3d, latestTag3)).toBeTruthy();
  });
});
