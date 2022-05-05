import { dailyTasks } from './task/dailyTask';

export function handler(_event, _context, callback) {
  dailyTasks()
    .then(message => {
      callback(null, message);
    })
    .catch(err => {
      callback(err);
    });
}
