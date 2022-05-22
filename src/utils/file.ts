import { existsSync, readFileSync } from 'node:fs';
import * as JSON5 from 'json5';
import { isString } from './is';
import { logger } from './log';

/**
 * 读取 json 文件
 * @param filePath 文件路径
 */
export function readJsonFile<T = any>(filePath: string): T {
  try {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8');
      return JSON5.parse(content);
    }
  } catch (error) {
    logger.error(`读取配置文件 ${filePath}`);
    jsonErrorHandle(error.message);
  }
}

export function jsonErrorHandle(message: string) {
  if (!isString(message)) {
    return;
  }
  throw new TypeError('配置文件存在，但是无法解析！可能 JSON5 格式不正确！');
}
