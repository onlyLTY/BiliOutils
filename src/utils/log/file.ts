import { resolvePath } from '../path';
import * as fs from 'fs';
import { isServerless } from '@/utils/env';
import { MS2DATE } from '@/constant';

export function clearLogs() {
  // 如果是云函数则直接退出
  if (isServerless()) return;
  const day = Number(process.env.BILIOUTILS_LOG_CLEAR_DAY || 15);
  deleteLogLineByDay(day);
  deleteLogFile(day);
}

/**
 * 删除多久之前的日志文件
 */
export function deleteLogFile(day = 15) {
  try {
    const filePath = resolvePath(`./logs`);
    const allLogFiles = fs
      .readdirSync(filePath)
      .map(file => file.match(/^bt_(?:combined|error)-\d{4}-\d{1,2}(?:-\d{1,2})?\.log$/)?.[0] || '')
      .filter(Boolean);

    allLogFiles.forEach(file => {
      const timeStr = file
        .match(/\d{4}-\d{1,2}(?:-\d{1,2})?/)?.[0]
        .split('-')
        .map(i => i.padStart(2, '0'))
        .join('-')
        .padEnd(10, '-28');

      if (!timeStr) return;

      const time = new Date(timeStr),
        now = new Date();
      //  now > time 15 天吗
      if (now.getTime() - time.getTime() > day * MS2DATE) {
        fs.unlinkSync(`${filePath}/${file}`);
      }
    });
  } catch {}
}

/**
 * 删除文件中n天之前的日志
 * 找到满足条件的最后一行，然后删除之前的日志
 */
export function deleteLogLineByDay(day = 15) {
  try {
    const filePath = resolvePath(`./logs/bt_combined-def.log`);
    const file = fs.readFileSync(filePath, 'utf-8');
    const br = getBrChar(filePath);
    const lines = file.split(br);
    const index = lines.findIndex(line => {
      const linePrefix = line.match(/\[\w+\s(\d{4}\/\d{1,2}\/\d{1,2}\s\d{2}:\d{2}:\d{2})]/);
      if (!linePrefix) return false;
      return new Date().getTime() - new Date(linePrefix[1]).getTime() < day * MS2DATE;
    });
    // index 是从0开始的，所以刚好是要删除的行数
    fs.writeFileSync(filePath, lines.slice(index).join(br));
  } catch {}
}

/**
 * 获取文件的换行符
 */
export function getBrChar(file: string) {
  const fileContent = fs.readFileSync(file, 'utf-8');
  return fileContent.match(/\r?\n/)?.[0] || `\r\n`;
}
