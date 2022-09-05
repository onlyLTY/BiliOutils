export async function handler(event, _context, callback) {
  const { useVm } = await import('./utils/vm/useVm');
  try {
    const isGetCode = await useVm('vm.cfc.js', undefined, event.USE_NETWORK_CODE);
    if (isGetCode) {
      return callback?.(null, isGetCode === true ? 'success' : isGetCode);
    }
    const { dailyTasks } = await import('./task/dailyTask');
    const message = await dailyTasks();
    callback?.(null, message);
  } catch (error) {
    callback?.(error);
  }
}
