import type { LoggerInitOptions, LoggerOptions, MessageType } from '@/types/log';
import { TaskConfig, TaskModule } from '@/config/globalVar';
import { defLogger, EmptyLogger, SimpleLogger } from './def';
import { clearLogs } from '@/utils/log/file';
import { resolvePath } from '../path';
import { getPRCDate } from '../pure';

export { defLogger, clearLogs };
export const emptyLogger = new EmptyLogger() as unknown as Logger;

export class Logger extends SimpleLogger {
  constructor(protected options: LoggerOptions = {}, public name = 'default') {
    super(options);
    this.mergeOptions({ ...options, fileSplit: 'day' } as LoggerOptions);
    const thisTime = getPRCDate(),
      thisFullYear = thisTime.getFullYear(),
      thisMonth = thisTime.getMonth() + 1;
    if (options.fileSplit === 'day') {
      this.setFilename(`${thisFullYear}-${thisMonth}-${thisTime.getDate()}`);
    } else {
      this.setFilename(`${thisFullYear}-${thisMonth}`);
    }
  }

  protected setFilename(file: string) {
    this.errorFile = resolvePath(`./logs/bt_error-${file}.log`);
    this.logFile = resolvePath(`./logs/bt_combined-${file}.log`);
  }

  public error(message: MessageType | Error, error?: Error) {
    super.error(message, error);
    TaskModule.hasError = true;
  }

  static setEmoji(useEmoji = true) {
    if (!useEmoji) {
      return;
    }
    SimpleLogger.emojis = {
      error: '❓',
      warn: '❔',
      info: '👻',
      verbose: '💬',
      debug: '🐛',
    };
  }

  static async init({ br, useEmoji }: LoggerInitOptions = {}) {
    this.setEmoji(useEmoji || TaskConfig.log.useEmoji);
    SimpleLogger.pushValue = '';
    SimpleLogger.brChar = br || TaskConfig.message.br || '\n';
  }

  static async push(title = '日志推送') {
    const { sendMessage } = await import('@/utils/sendNotify');
    return sendMessage(title, this.pushValue);
  }
}

export const logger = new Logger({
  console: TaskConfig.log.consoleLevel,
  file: TaskConfig.log.fileLevel,
  push: TaskConfig.log.pushLevel,
  payload: process.env.BILITOOLS_IS_ASYNC && TaskConfig.USERID,
});

export const _logger = new Logger({
  console: 'debug',
  file: false,
  push: false,
  payload: 'cat',
});
