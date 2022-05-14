import { TaskConfig } from './config/globalVar';
// 使用 import 会失效，因为 import 会提升
// 但是目标文件使用的 require 并不会提升
TaskConfig.config = null;
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
