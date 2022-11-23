import { ApiBaseProp } from './bili-base-prop';

/**
 * 任务进程
 */
export type UserTaskProgress = ApiBaseProp<{
  is_surplus: number;
  /** 0 未开始 1 进行中 2 可领取 3 已领取 */
  status: number;
  progress: number;
  target: number;
  wallet: {
    gold: number;
    silver: number;
  };
  linked_actions_progress: null;
}>;
