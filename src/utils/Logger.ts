import type {
  LevelType,
  LoggerInitOptions,
  LoggerOptions,
  LogOptions,
  MessageType,
} from '@/types/log';
import * as fs from 'fs';
import * as path from 'path';
import { isServerless, isQingLongPanel } from './env';
import { getPRCDate } from './pure';

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
  return levelIndex !== -1 ? LEVEL_VALUE.slice(0, levelIndex + 1) : LEVEL_VALUE;
}

function resolvePath(str: string) {
  return path.resolve(process.cwd(), str);
}

export class Logger {
  static pushValue = '';
  static brChar = '\n';
  static emojis = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug',
  };
  private consoleLeval: string[];
  private fileLeval: string[];
  private pushLeval: string[];
  private month = getPRCDate().getMonth() + 1;
  private errorFile = resolvePath(`./logs/bt_error-${this.month}.log`);
  private logFile = resolvePath(`./logs/bt_combined-${this.month}.log`);
  private noFile = false;

  constructor(
    private options: LoggerOptions = { console: 'info', file: 'info', push: 'info' },
    public name = 'default',
  ) {
    this.consoleLeval = getLevelValues(this.options.console);
    this.fileLeval = getLevelValues(this.options.file);
    this.pushLeval = getLevelValues(this.options.push);
    this.noFile = isQingLongPanel() || isServerless();
    if (!this.noFile) {
      this.createLogFile();
    }
  }

  public log({ level }: LogOptions, message: MessageType, emoji?: string) {
    emoji = emoji || Logger.emojis[level];
    const prcTime = getPRCDate(),
      stderr = ['error', 'warn'].includes(level),
      payload = this.options.payload ? ` \u005b${this.options.payload}\u005d ` : ' ';
    if (this.consoleLeval.includes(level)) {
      this.Conslole(
        `\u005b${emoji} ${formatTime(prcTime, false)}\u005d${payload}${message}\n`,
        stderr,
      );
    }
    if (!this.noFile && this.fileLeval.includes(level)) {
      this.File(`\u005b${emoji} ${formatTime(prcTime, true)}\u005d${payload}${message}\n`, stderr);
    }
    if (this.pushLeval.includes(level)) {
      this.Push(`\u005b${emoji} ${formatTime(prcTime, false)}\u005d ${message}${Logger.brChar}`);
    }
  }

  public error(message: MessageType) {
    this.log({ level: 'error' }, message);
  }

  public warn(message: MessageType) {
    this.log({ level: 'warn' }, message);
  }

  public info(message: MessageType, emoji?: string) {
    this.log({ level: 'info' }, message, emoji);
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

  private createLogFile() {
    // 如果不存在logs文件夹，则创建
    const logsPath = resolvePath('./logs');
    if (!fs.existsSync(logsPath)) {
      fs.mkdirSync(logsPath);
    }
  }

  static setEmoji(useEmoji = true) {
    if (!useEmoji) {
      return;
    }
    this.emojis = {
      error: '❓',
      warn: '❔',
      info: '👻',
      verbose: '💬',
      debug: '🐛',
    };
  }

  static async init({ br, useEmoji }: LoggerInitOptions = {}) {
    this.pushValue = '';
    try {
      const { TaskConfig } = await import('@/config/globalVar');
      this.brChar = br || TaskConfig.message.br || '\n';
      this.setEmoji(useEmoji || TaskConfig.log.useEmoji);
    } catch {}
  }
}

export class EmptyLogger {
  constructor() {
    /** empty */
  }

  public log() {
    /** empty */
  }
  public error() {
    /** empty */
  }
  public warn() {
    /** empty */
  }
  public info() {
    /** empty */
  }
  public verbose() {
    /** empty */
  }
  public debug() {
    /** empty */
  }
}

export const defLogger = new Logger({
  console: 'debug',
  file: 'debug',
  push: 'debug',
});
