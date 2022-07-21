import { existsSync, readFileSync } from 'fs';
import { isString } from './is';
import { JSON5 } from './json5';
import { defLogger } from './Logger';

/**
 * 读取 json 文件
 * @param filePath 文件路径
 */
export function readJsonFile<T = any>(filePath: string): T {
  try {
    let content: string;
    if (existsSync(filePath)) {
      content = readFileSync(filePath, 'utf-8');
    } else if (existsSync((filePath += '5'))) {
      content = readFileSync(filePath, 'utf-8');
    }
    if (!content) {
      return;
    }
    return JSON5.parse(content);
  } catch (error) {
    defLogger.error(error);
    jsonErrorHandle(error.message);
  }
}

export function jsonErrorHandle(message: string) {
  if (!isString(message)) {
    return;
  }
  if (message.includes('SyntaxError: JSON5')) {
    throw new SyntaxError('配置文件存在，但是无法解析！可能 JSON5 格式不正确！');
  }
  throw new Error(message);
}
