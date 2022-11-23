import { TaskConfig } from '@/config/globalVar';
import { UserTaskProgress } from '@/dto/daily-battery.dto';
import { liveApi } from './api';

/**
 * 获取任务进度
 */
export function getUserTaskProgress() {
  return liveApi.get<UserTaskProgress>('xlive/app-ucenter/v1/userTask/GetUserTaskProgress');
}

/**
 * 领取任务奖励
 */
export function receiveTaskReward() {
  return liveApi.post('xlive/app-ucenter/v1/userTask/UserTaskReceiveRewards', {
    task_id: TaskConfig.USERID,
    csrf: TaskConfig.BILIJCT,
  });
}
