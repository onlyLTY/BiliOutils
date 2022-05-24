import { dailyTasks } from './task/dailyTask';
import { printVersion } from './utils/version';

export async function handler(_event, _context, callback) {
  try {
    await printVersion();
    const message = await dailyTasks();
    callback(null, message);
  } catch (error) {
    callback(error);
  }
}
