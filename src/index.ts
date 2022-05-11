import { TaskConfig } from './config/globalVar';
import { printVersion } from './utils/effect';
import liveHeart from './task/liveHeart';
import { dailyTasks } from './task/dailyTask';
import { liveLottery } from './task/liveLottery';

process.env.IS_LOCAL = 'true';

(async function dailyMain() {
  printVersion();

  // 特殊任务列表
  const taskList: (() => Promise<any>)[] = [];
  const funcList = TaskConfig.config.function;
  if (funcList.liveHeart) {
    taskList.push(liveHeart);
  }
  if (funcList.liveLottery) {
    taskList.push(liveLottery);
  }

  return await dailyTasks(async () => {
    for (const task of taskList) {
      await task();
    }
  });
})();
