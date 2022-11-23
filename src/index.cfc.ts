export async function handler(event, _context, callback) {
  try {
    const { dailyTasks } = await import('./task/dailyTask');
    const message = await dailyTasks();
    callback?.(null, message);
  } catch (error) {
    callback?.(error);
  }
}

(async () => {
  await handler({}, {}, () => {
    console.log('done');
  });
})();
