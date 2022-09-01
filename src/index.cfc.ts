import { useVm } from './vm/useVm';

export async function handler(event, _context, callback) {
  try {
    if (await useVm('vm.scf.js', undefined, event.USE_NETWORK_CODE)) {
      return callback(VMThis.error, VMThis.message);
    }
    const { dailyTasks } = await import('./task/dailyTask');
    const message = await dailyTasks();
    callback(null, message);
  } catch (error) {
    callback(error);
  }
}
