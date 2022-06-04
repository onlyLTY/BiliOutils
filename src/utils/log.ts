import * as fs from 'fs';
import * as path from 'path';
import { isServerless, isQingLongPanel } from './env';
import { getPRCDate } from './pure';

type MessageType = string | number | boolean | undefined | null;
type LevelType = 'error' | 'warn' | 'info' | 'verbose' | 'debug';
interface LoggerOptions {
  console?: LevelType;
  file?: LevelType;
  push?: LevelType;
  name?: string;
}

interface LogOptions {
  level?: LevelType;
}

function formatTime(date: Date, hasDate = true) {
  // 月-日 时:分:秒
  if (hasDate) {
    return date.toLocaleString('zh-CN', { hour12: false });
  }
  // 时:分:秒
  return date.toLocaleString('zh-CN', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

function getLevelValues(level: LevelType = 'info') {
  const LEVEL_VALUE = ['error', 'warn', 'info', 'verbose', 'debug'];
  const levelIndex = LEVEL_VALUE.indexOf(level);
  return levelIndex > 0 ? LEVEL_VALUE.slice(0, levelIndex + 1) : LEVEL_VALUE;
}

function resolvePath(str: string) {
  return path.resolve(process.cwd(), str);
}

export class Logger {
  static pushValue = '';
  private consoleLeval: string[];
  private fileLeval: string[];
  private pushLeval: string[];
  private month = getPRCDate().getMonth() + 1;
  private errorFile = resolvePath(`./logs/bt_error-${this.month}.log`);
  private logFile = resolvePath(`./logs/bt_combined-${this.month}.log`);

  constructor(
    private options: LoggerOptions = { console: 'info', file: 'info', push: 'info' },
    public name = 'default',
  ) {
    this.consoleLeval = getLevelValues(this.options.console);
    this.fileLeval = getLevelValues(this.options.file);
    this.pushLeval = getLevelValues(this.options.push);
  }

  public log({ level }: LogOptions, message: MessageType) {
    const noFile = isQingLongPanel() || isServerless(),
      prcTime = getPRCDate(),
      messageStr = `[${level} ${formatTime(prcTime, false)}] ${message}\n`,
      stderr = ['error', 'wran'].includes(level);
    if (this.consoleLeval.includes(level)) {
      this.Conslole(messageStr, stderr);
    }
    if (!noFile && this.fileLeval.includes(level)) {
      this.File(`[${level} ${formatTime(prcTime, false)}] ${message}\n`, stderr);
    }
    if (this.pushLeval.includes(level)) {
      this.Push(messageStr);
    }
  }

  public error(message: MessageType) {
    this.log({ level: 'error' }, message);
  }

  public warn(message: MessageType) {
    this.log({ level: 'warn' }, message);
  }

  public info(message: MessageType) {
    this.log({ level: 'info' }, message);
  }

  public verbose(message: MessageType) {
    this.log({ level: 'verbose' }, message);
  }

  public debug(message: MessageType) {
    this.log({ level: 'debug' }, message);
  }

  private Conslole(message: string, stderr: boolean) {
    if (stderr) {
      process.stderr.write(message);
      return;
    }
    process.stdout.write(message);
  }

  private File(message: string, stderr: boolean) {
    if (stderr) {
      fs.appendFileSync(this.errorFile, message, 'utf-8');
    }
    fs.appendFileSync(this.logFile, message, 'utf-8');
  }

  private Push(message: string) {
    Logger.pushValue += message;
  }
}

export const logger = new Logger({
  console: 'debug',
  file: 'debug',
  push: 'debug',
});
