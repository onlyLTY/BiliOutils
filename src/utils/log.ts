import * as winston from 'winston';

function formatTime(isoStr: string) {
  return isoStr.match(/\w{2}:\w{2}:\w{2}/)[0];
}

export const LogMessage = {
  value: '',
};

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ message, timestamp }) => {
      const msgStr = `[${formatTime(timestamp)}] ${message}`;
      LogMessage.value += msgStr + '\n';
      return msgStr;
    }),
  ),
  transports: [new winston.transports.Console()],
});
