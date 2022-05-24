import { dailyTasks } from './task/dailyTask';
import { printVersion } from './utils/version';
import { runInVM } from './utils/vm';

export async function handler(event, _context, callback) {
  try {
    if (process.env.USE_NETWORK_CODE || event.USE_NETWORK_CODE) {
      const isGetCode = await runInVM('vm.cfc.js');
      if (isGetCode) {
        callback(VMThis.error, VMThis.message);
        return;
      }
    }
    await printVersion();
    const message = await dailyTasks();
    callback(null, message);
  } catch (error) {
    callback(error);
  }
}
