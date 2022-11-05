import { isHexString } from '../is';
import { radixConvert, pad } from '../pure';

/**
 * 转为 protobuf 数字
 * @param str 要转换的数字字符串
 * @param toRadix 转换后的进制
 * @param fromRadix 要转换的进制
 */
export function toProtobufNumber(str: string, toRadix = 10, fromRadix = 10) {
  // 参数转为二进制
  if (!isHexString(str)) {
    str = radixConvert(str, fromRadix, 2);
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
  const newArr = arr.map(el => pad(el, 8, '1')).reverse();
  // 最后一个的第一位改为 0
  newArr[newArr.length - 1] = '0' + newArr[newArr.length - 1].slice(1);
  // 转为十进制数字
  return newArr.map(el => radixConvert(el, 2, toRadix));
}

/**
 * 转换十进制数为 varint 格式
 * @param num 要转换的数字
 */
export function toVarint(num: number) {
  return toProtobufNumber(num.toString()).map(Number);
}

/**
 * 解析 protobuf 数字
 * @param str 要解析的数字字符串（十六进制）
 */
export function parseProtobufNumber(str: string) {
  // 字符串长度为偶数
  if (str.length % 2 !== 0) {
    str = '0' + str;
  }
  return (
    str
      .match(/.{1,2}/g) // 按照 2 位分割
      ?.reduce((acc, cur) => {
        acc.push(pad(radixConvert(cur, 16, 2))); // 转为二进制，补齐为 8 位
        return acc;
      }, [] as string[])
      .map(s => s.slice(1)) // 去掉第一位
      .reverse()
      .join('') || ''
  );
}
