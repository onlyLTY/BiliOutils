import { getPRCDate } from './pure';

type MessageType = string | number | boolean | undefined | null;
type LevelType = 'error' | 'warn' | 'info' | 'verbose' | 'debug';

export const LogMessage = {
  value: '',
};

export const logger = {
  log,
  error: errorLogger,
  warn: warnLogger,
  info: infoLogger,
  verbose: verboseLogger,
  debug: debugLogger,
};

function formatTime(isoStr: string) {
  return isoStr.match(/\w{2}:\w{2}:\w{2}/)[0];
}

function getLevelValues(level: LevelType = 'debug') {
  const LEVEL_VALUE = ['error', 'warn', 'info', 'verbose', 'debug'];
  const levelIndex = LEVEL_VALUE.indexOf(level);
  return levelIndex > 0 ? LEVEL_VALUE.slice(0, levelIndex + 1) : LEVEL_VALUE;
}

function log(level: LevelType, message: MessageType) {
  const time = formatTime(getPRCDate().toString());
  if (getLevelValues().includes(level)) {
    const msgStr = `[${time}] ${message}`;
    LogMessage.value += msgStr + '\r\n';
  }
  console.log('[%s %s] %s', level, time, message);
}

function errorLogger(message: MessageType) {
  log('error', message);
}

function warnLogger(message: MessageType) {
  log('warn', message);
}

function infoLogger(message: MessageType) {
  log('info', message);
}

function verboseLogger(message: MessageType) {
  log('verbose', message);
}

function debugLogger(message: MessageType) {
  log('debug', message);
}
