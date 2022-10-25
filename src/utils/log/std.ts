import { ENV } from '../env';

/**
 * 写入 stdout
 */
export function writeOut(message: string) {
  process.stdout.write(message);
}

/**
 * 写入 stderr
 */
export function writeError(message: string) {
  // fc 不支持输出 stderr
  if (ENV.fc) {
    process.stdout.write(message);
    return;
  }
  process.stderr.write(message);
}
