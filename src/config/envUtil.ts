/**
 * 取得环境变量,并将字符串转化为数字
 * @param key 环境变量名称
 *
 * 不能转化成数字的返回0
 */
export function envToNumber(key: string): number | undefined {
  const value = process.env[key];
  if (value === undefined) return undefined;
  const valueNum = Number(value);
  if (typeof valueNum === 'number' && !isNaN(valueNum)) {
    return valueNum;
  }
}

/**
 * 将符号分割的字符串转换为数组
 * @param key 变量名
 * @param symbol 符号字符串[默认英文逗号]
 * @param isNumber 是否需要转换成数字数组[默认不]
 */
export function envSymbolArray(
  key: string,
  symbol: string = ',',
  isNumber: boolean = false
): Array<any> {
  const envString = process.env[key];
  let value: any = envString ? envString.split(symbol) : [];
  if (isNumber) value = value.map((el) => Number(el));
  return value;
}

/**
 * 取得环境变量,并将字符串转化为布尔
 * @param key 环境变量名称
 *
 * 默认返回false
 */
export function envToBoolean(key: string): boolean {
  const value = process.env[key];
  if (value === 'true') {
    return true;
  }
  return false;
}

/**
 *  从环境变量中获取值,判断是否开启某功能
 * @param key 环境变量名称
 *
 */
export function isOnFunction(key: string): boolean | undefined {
  const value = process.env[key];
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
}
