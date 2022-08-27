import { resolvePath } from '../path';
import * as fs from 'fs';

/**
 * 删除多久之前的日志文件
 */
export function deleteLogFile() {
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
      if (now.getTime() - time.getTime() > 1_296_000_000) {
        fs.unlinkSync(`${filePath}/${file}`);
      }
    });
  } catch {}
}
