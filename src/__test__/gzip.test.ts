import { gzipDecode, gzipEncode } from '../utils/gzip';

// 来自百度的压缩结果
const zip = 'H4sIAAAAAAAAA1MtdXMzMFRFIgEi7dsyEgAAAA==';
const str = '！！！';
const emojiZip = 'H4sIAAAAAAAAA1MtdbEwdlEtdXE1tlQFsZ2BpJupmypM3NncFME2sQQA96V+EzAAAAA=';
const emojiStr = '😹🍟👵👉';

describe('配置 gzip 测试', () => {
  test('压缩以后是否一致', () => {
    expect(gzipEncode(str)).not.toBe(zip);
    expect(gzipEncode(emojiStr)).not.toBe(emojiZip);
  });

  test('解压以后是否一致', () => {
    expect(gzipDecode(zip)).toBe(str);
    expect(gzipDecode(emojiZip)).toBe(emojiStr);
  });

  test('压缩后解压是否一致', () => {
    expect(gzipDecode(gzipEncode(str))).toBe(str);
    expect(gzipDecode(gzipEncode(emojiStr))).toBe(emojiStr);
  });

  test('解压后再压缩是否一致', () => {
    expect(gzipEncode(gzipDecode(zip))).not.toBe(zip);
    expect(gzipEncode(gzipDecode(emojiZip))).not.toBe(emojiZip);
  });
});
