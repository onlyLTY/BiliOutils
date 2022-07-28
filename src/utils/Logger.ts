import type { LevelType, LogOptions, MessageType, SimpleLoggerOptions } from '@/types/log';
import * as fs from 'fs';
import { isServerless, isQingLongPanel } from './env';
import { isBoolean } from './is';
import { resolvePath } from './path';
import { getPRCDate } from './pure';

const LEVEL_VALUE = ['error', 'warn', 'info', 'verbose', 'debug'];

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
  const levelIndex = LEVEL_VALUE.indexOf(level);
  return levelIndex !== -1 ? LEVEL_VALUE.slice(0, levelIndex + 1) : LEVEL_VALUE;
}

function getLogLevel(level: LevelType | boolean) {
  if (isBoolean(level)) {
    return level ? LEVEL_VALUE : [];
  }
  return getLevelValues(level);
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

/**
 * 简单的 Logger
 */
export class SimpleLogger {
  static pushValue = '';
  static brChar = '\n';
  static emojis = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug',
  };
  protected options: SimpleLoggerOptions = {
    console: 'info',
    file: 'info',
    push: 'info',
  };
  protected consoleLeval: string[];
  protected fileLeval: string[];
  protected pushLeval: string[];
  protected noFile = false;
  protected logFile = resolvePath(`./logs/bt_combined-def.log`);
  protected errorFile = this.logFile;
  constructor(options: SimpleLoggerOptions = {}, public name = 'default') {
    this.mergeOptions(options);
    const { console: cl, file, push } = this.options;
    this.consoleLeval = getLogLevel(cl);
    this.fileLeval = getLogLevel(file);
    this.pushLeval = getLogLevel(push);
    this.noFile = isQingLongPanel() || isServerless();
    if (!this.noFile) {
      this.createLogFile();
    }
  }

  protected mergeOptions(options: Record<string, any>) {
    return Object.assign(this.options, options);
  }

  public log({ level }: LogOptions, message: MessageType, emoji?: string) {
    emoji = emoji || SimpleLogger.emojis[level];
    const prcTime = getPRCDate(),
      stderr = ['error', 'warn'].includes(level),
      payload = this.options.payload ? ` \u005b${this.options.payload}\u005d ` : ' ';
    if (this.consoleLeval.includes(level)) {
      this.conslole(
        `\u005b${emoji} ${formatTime(prcTime, false)}\u005d${payload}${message}\n`,
        stderr,
      );
    }
    if (!this.noFile && this.fileLeval.includes(level)) {
      this.file(`\u005b${emoji} ${formatTime(prcTime, true)}\u005d${payload}${message}\n`, stderr);
    }
    if (this.pushLeval.includes(level)) {
      this.push(
        `\u005b${emoji} ${formatTime(prcTime, false)}\u005d ${message}${SimpleLogger.brChar}`,
      );
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

  protected conslole(message: string, stderr: boolean) {
    if (stderr) {
      process.stderr.write(message);
      return;
    }
    process.stdout.write(message);
  }

  protected file(message: string, stderr: boolean) {
    if (stderr) {
      fs.appendFileSync(this.errorFile, message, 'utf-8');
    }
    fs.appendFileSync(this.logFile, message, 'utf-8');
  }

  protected push(message: string) {
    SimpleLogger.pushValue += message;
  }

  protected createLogFile() {
    // 如果不存在logs文件夹，则创建
    const logsPath = resolvePath('./logs');
    if (!fs.existsSync(logsPath)) {
      fs.mkdirSync(logsPath);
    }
  }
}

export const defLogger = new SimpleLogger({
  console: 'debug',
  file: 'debug',
  push: 'debug',
});
