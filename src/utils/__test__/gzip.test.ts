import * as assert from 'assert';
import { gzipDecode, gzipEncode } from '../gzip';

// 来自百度的压缩结果
const zip = 'H4sIAAAAAAAAA1MtdXMzMFRFIgEi7dsyEgAAAA==';
const str = '！！！';
const emojiZip = 'H4sIAAAAAAAAA1MtdbEwdlEtdXE1tlQFsZ2BpJupmypM3NncFME2sQQA96V+EzAAAAA=';
const emojiStr = '😹🍟👵👉';

// 解压以后是否一致 true
assert(gzipDecode(zip) === str);
assert(gzipDecode(emojiZip) === emojiStr);

assert('\n');

// 压缩后是否一致 false
assert((gzipEncode(str) === zip) === false);
assert((gzipEncode(emojiStr) === emojiZip) === false);

assert('\n');

// 解压后再压缩是否一致 false
assert((gzipEncode(gzipDecode(zip)) === zip) === false);
assert((gzipEncode(gzipDecode(emojiZip)) === emojiZip) === false);

// 压缩后解压是否一致 true
assert(gzipDecode(gzipEncode(str)) === str);
assert(gzipDecode(gzipEncode(emojiStr)) === emojiStr);
