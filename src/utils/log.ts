import { TaskConfig } from '@/config/globalVar';
import { defLogger, Logger, EmptyLogger } from './Logger';

export { Logger, defLogger };

export const logger = new Logger({
  console: 'debug',
  file: 'debug',
  push: TaskConfig.log.pushLevel,
});

export const emptyLogger = new EmptyLogger() as unknown as Logger;
