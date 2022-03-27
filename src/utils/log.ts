import { getPRCDate } from './pure';
import * as winston from 'winston';

function formatTime(isoStr: string) {
  return isoStr.match(/\w{2}:\w{2}:\w{2}/)[0];
}

export const LogMessage = {
  value: '',
};

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: () => getPRCDate().toString(),
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.printf(({ message, timestamp, level }) => {
        const msgStr = `[${formatTime(timestamp)}] ${message}`;
        if (!['debug', 'verbose'].includes(level)) {
          LogMessage.value += msgStr + '\n';
        }
        return msgStr;
      }),
    }),
  ],
});
