import { taskExportOrder, biliTasks } from '@/task';
import { TaskConfig } from './globalVar';

function funHandle() {
  const functionConfig = TaskConfig.function;
  // TODO: 兼容处理 liveSendMessage
  if (functionConfig.liveIntimacy && TaskConfig.intimacy.liveSendMessage) {
    functionConfig.liveSendMessage = false;
  }
  // TODO: 兼容处理 mangaSign
  if (functionConfig.mangaTask && TaskConfig.manga.sign) {
    functionConfig.mangaSign = false;
  }
  return functionConfig;
}

/**
 * 按照配置清空函数
 */
export function getWaitRuningFunc() {
  // 这是使用了黑魔法，也是迫不得已
  // rollup 压缩代码后可能导致变量名变化，就找不到相应函数的，所以才改用下标的方式记录
  const functionConfig = funHandle();
  const result: typeof biliTasks = [];
  taskExportOrder.forEach((key, index) => {
    if (functionConfig[key]) {
      result.push(biliTasks[index]);
    }
  });
  return result.map(async func => (await func()).default);
}
