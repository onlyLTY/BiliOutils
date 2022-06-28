import type { TaskCombineDto } from '@/dto/big-point.dto';
import type { PureDataProp } from '@/dto/bili-base-prop';
import { biliApi, biliHttp } from './api';
import { TaskConfig } from '@/config/globalVar';
import { getUnixTime } from '@/utils/pure';
import type { TaskCodeType } from '@/enums/big-point.emum';
import { appSignString } from '@/utils/bili';

/**
 * 大积分签到
 */
export function signIn() {
  return biliApi.post<Omit<PureDataProp, 'data'>>('pgc/activity/score/task/sign', {
    csrf: TaskConfig.BILIJCT,
  });
}

/**
 * 大积分领取任务
 */
export function receiveTask(taskCode: TaskCodeType = 'ogvwatch') {
  return biliApi.post<PureDataProp>(
    'pgc/activity/score/task/receive',
    {
      csrf: TaskConfig.BILIJCT,
      ts: getUnixTime(),
      taskCode,
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  );
}

const baseParams = {
  platform: 'android',
  mobi_app: 'android',
  disable_rcmd: 0,
  build: 6780300,
  c_locale: 'zh_CN',
  s_locale: 'zh_CN',
  csrf: TaskConfig.BILIJCT,
};

export function susWin() {
  return biliApi.post<PureDataProp<Record<string, never>>>('pgc/activity/deliver/susWin/receive', {
    ...baseParams,
  });
}

/**
 * 完成大积分每日任务
 */
export function complete(position: string) {
  return biliApi.post<PureDataProp>('pgc/activity/deliver/task/complete', {
    ...baseParams,
    position,
  });
}

/**
 * 提交事件
 */
export function showDispatch(eventId: string) {
  return biliHttp.post<{
    code: number;
    message: string;
    data: never;
    errtag: number;
    ttl: number;
  }>(
    `https://show.bilibili.com/api/activity/fire/common/event/dispatch?${appSignString(
      baseParams,
    )}`,
    {
      eventId,
    },
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
}

/**
 * 获取大积分任务列表
 */
export function getTaskCombine() {
  return biliApi.get<TaskCombineDto>('x/vip_point/task/combine');
}
