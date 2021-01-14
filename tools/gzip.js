const btoa = require('btoa');
const atob = require('atob');
const pako = require('pako');

module.exports = (() => {
  /**
   * gzip加密
   * @param str
   * @returns {*}
   */
  let gzipEncode = (str) => {
    try {
      return btoa(pako.gzip(escape(str), { to: 'string' }));
    } catch (e) {
      return 'Error: 当前字符串不能被Gzip加密';
    }
  };

  /**
   * gzip解密
   * @param str
   * @returns {string}
   */
  let gzipDecode = (str) => {
    try {
      let charData = atob(str)
        .split('')
        .map((x) => x.charCodeAt(0));
      let data = pako.inflate(new Uint8Array(charData));
      let result = String.fromCharCode.apply(null, new Uint16Array(data));
      try {
        return unescape(result);
      } catch (ee) {
        return result;
      }
    } catch (e) {
      return 'Error: 当前字符串不能被Gzip解密';
    }
  };

  return {
    gzipEncode,
    gzipDecode,
  };
})();
