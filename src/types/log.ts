export type MessageType = string | number | boolean | undefined | null;
export type LevelType = 'error' | 'warn' | 'info' | 'verbose' | 'debug';
export interface LoggerOptions {
  console?: LevelType;
  file?: LevelType;
  push?: LevelType;
  name?: string;
  payload?: string | number;
}
export interface LogOptions {
  level?: LevelType;
}
export type LoggerInitOptions = { br?: string; useEmoji?: boolean };
