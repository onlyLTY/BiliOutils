const pako = require('pako');

/**
 * gzip加密
 * @param str
 * @returns {*}
 */
export const gzipEncode = (str: string): string => {
  try {
    return Buffer.from(pako.gzip(escape(str), { to: 'string' }).toString(), 'binary').toString(
      'base64',
    );
  } catch (e) {
    return 'Error: 当前字符串不能被Gzip加密';
  }
};

/**
 * gzip解密
 * @param str
 * @returns {string}
 */
export const gzipDecode = (str: string): string => {
  try {
    const charData = Buffer.from(str, 'base64')
      .toString('binary')
      .split('')
      .map(x => x.charCodeAt(0));
    const data = pako.inflate(new Uint8Array(charData));
    const result = String.fromCharCode.apply(null, new Uint16Array(data));
    try {
      return unescape(result);
    } catch (ee) {
      return result;
    }
  } catch (e) {
    throw new Error('Error: 当前字符串不能被Gzip解密');
  }
};

export default { gzipDecode, gzipEncode };
