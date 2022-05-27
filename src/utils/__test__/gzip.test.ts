import { gzipDecode, gzipEncode } from '../gzip';

// 来自百度的压缩结果
const zip = 'H4sIAAAAAAAAA1MtdXMzMFRFIgEi7dsyEgAAAA==';
const str = '！！！';
const emojiZip = 'H4sIAAAAAAAAA1MtdbEwdlEtdXE1tlQFsZ2BpJupmypM3NncFME2sQQA96V+EzAAAAA=';
const emojiStr = '😹🍟👵👉';

// 解压以后是否一致 true
console.log(gzipDecode(zip) === str);
console.log(gzipDecode(emojiZip) === emojiStr);

console.log('\n');

// 压缩后是否一致 false
console.log(gzipEncode(str) === zip);
console.log(gzipEncode(emojiStr) === emojiZip);

console.log('\n');

// 解压后再压缩是否一致 false
console.log(gzipEncode(gzipDecode(zip)) === zip);
console.log(gzipEncode(gzipDecode(emojiZip)) === emojiZip);

console.log('\n');

// 压缩后解压是否一致 true
console.log(gzipDecode(gzipEncode(str)) === str);
console.log(gzipDecode(gzipEncode(emojiStr)) === emojiStr);
