import { isHexString } from '../is';
import { radixConvert, pad } from '../pure';

/**
 * 转为 protobuf 数字
 */
export function toProtobufNumber(str: string) {
  // 参数转为二进制
  if (!isHexString(str)) {
    str = radixConvert(str, 10, 2);
  }
  // 将 str 补齐为 7 的倍数
  const length = str.length;
  const remainder = length % 7;
  if (remainder !== 0) {
    str = pad(str, length + 7 - remainder);
  }
  // 把字符串按照 7 位分割
  const arr = str.match(/.{1,7}/g);
  if (!arr) return [];
  // 全部补齐为 1 开头的 8 位
  const newArr = arr.map(el => pad(pad(el, 7), 8, '1')).reverse();
  // 最后一个的第一位改为 0
  newArr[newArr.length - 1] = '0' + newArr[newArr.length - 1].slice(1);
  // 转为十进制数字
  return newArr.map(el => +radixConvert(el, 2, 10));
}
