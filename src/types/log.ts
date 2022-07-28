export type MessageType = string | number | boolean | undefined | null;
export type LevelType = 'error' | 'warn' | 'info' | 'verbose' | 'debug';
export interface SimpleLoggerOptions {
  console?: LevelType | boolean;
  file?: LevelType | boolean;
  push?: LevelType | boolean;
  name?: string;
  payload?: string | number;
}
export interface LoggerOptions extends SimpleLoggerOptions {
  /** 日志文件分割方式，按天 */
  fileSplit?: 'day' | 'month';
}
export interface LogOptions {
  level?: LevelType;
}
export type LoggerInitOptions = { br?: string; useEmoji?: boolean };
