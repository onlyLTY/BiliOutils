import { gzipSync, unzipSync } from 'zlib';

// 与百度对比
// 百度使用 escape/unescape，而我使用 encodeURIComponent/decodeURIComponent
// 存在不兼容的情况：
// 从百度压缩，此处解压是必须完成的，所以使用了 unicode2str
// 从此处压缩，百度解压不必要，就 encodeURIComponent 即可（无法在百度解压成功）

/**
 * gzip
 * @param str
 * @returns {*}
 */
export function gzipEncode(str: string): string {
  try {
    return gzipSync(encodeURIComponent(str)).toString('base64');
  } catch (e) {
    return 'Error: 当前字符串不能被Gzip压缩';
  }
}

/**
 * ungzip
 * @param str
 * @returns {string}
 */
export function gzipDecode(str: string): string {
  try {
    const result = unzipSync(Buffer.from(str, 'base64')).toString();
    try {
      return decodeURIComponent(unicode2str(result));
    } catch (error) {
      // 兼容百度的在线压缩
      return unescape(result);
    }
  } catch (e) {
    throw new Error('Error: 当前字符串不能被Gzip解压');
  }
}

/**
 * unicode 转字符串
 */
export function unicode2str(str: string): string {
  return str.replace(/\\u([\d\w]{4})/gi, (_match, grp) => String.fromCodePoint(parseInt(grp, 16)));
}

export default { gzipDecode, gzipEncode };
