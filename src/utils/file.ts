import { existsSync, readFileSync, writeFileSync } from 'fs';
import { isString } from './is';
import { JSON5 } from './json5';
import { defLogger } from './Logger';

/**
 * 读取 json 文件
 * @param filePath 文件路径
 */
export function readJsonFile<T = any>(filePath: string): T | undefined {
  try {
    let content: string;
    if (existsSync(filePath)) {
      content = readFileSync(filePath, 'utf-8');
    }
    if (content!) {
      return JSON5.parse(content);
    }
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

/**
 * 通过用户 id 匹配并替换 cookie
 */
export function replaceAllCookie(filePath: string, userId: number | string, newCookie: string) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const DedeUserID = `DedeUserID=${userId}`;
    const reg = new RegExp(`['"](.*${DedeUserID}.*)['"]`, 'g');
    const newJson5 = content.replaceAll(reg, substring => {
      const quote = substring.at(0);
      return `${quote}${newCookie}${quote}`;
    });
    writeFileSync(filePath, newJson5);
    return true;
  } catch (error) {
    defLogger.error(error);
  }
}
