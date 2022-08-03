import type { PointListDto, TaskCombineDto } from '@/dto/big-point.dto';
import type { PureDataProp } from '@/dto/bili-base-prop';
import { biliApi, biliHttp } from './api';
import { TaskConfig } from '@/config/globalVar';
import type { TaskCodeType } from '@/enums/big-point.emum';
import { appSignString } from '@/utils/bili';
import { RefererURLs } from '@/constant/biliUri';
import { getUnixTime } from '@/utils/pure';

const baseHeader = {
  'app-key': 'android64',
  env: 'prod',
  'user-agent': TaskConfig.mobileUA,
};

/**
 * 大积分签到
 */
export function signIn() {
  return biliApi.post<Omit<PureDataProp, 'data'>>(
    'pgc/activity/score/task/sign',
    appSignString({
      csrf: TaskConfig.BILIJCT,
    }),
    {
      headers: baseHeader,
    },
  );
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
      http2: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Referer: RefererURLs.bigPointTask,
        ...baseHeader,
        navtive_api_from: 'h5',
      },
    },
  );
}

export function susWin() {
  return biliApi.post<PureDataProp<Record<string, never>>>(
    'pgc/activity/deliver/susWin/receive',
    appSignString({
      csrf: TaskConfig.BILIJCT,
    }),
    {
      headers: baseHeader,
    },
  );
}

/**
 * 完成大积分每日任务
 */
export function complete(position: string) {
  return biliApi.post<PureDataProp>(
    'pgc/activity/deliver/task/complete',
    appSignString({
      csrf: TaskConfig.BILIJCT,
      position,
    }),
    {
      headers: {
        ...baseHeader,
        referer: RefererURLs.bigPoint,
      },
    },
  );
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
    `https://show.bilibili.com/api/activity/fire/common/event/dispatch?${appSignString({
      csrf: TaskConfig.BILIJCT,
    })}`,
    {
      eventId,
    },
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        ...baseHeader,
      },
    },
  );
}

/**
 * 获取大积分任务列表
 */
export function getTaskCombine() {
  return biliApi.get<TaskCombineDto>('x/vip_point/task/combine', {
    headers: baseHeader,
  });
}

/**
 * 积分记录
 */
export function getPointList() {
  return biliApi.get<PointListDto>(
    `x/vip_point/list?${appSignString({
      csrf: TaskConfig.BILIJCT,
      change_type: 1,
      pn: 1,
      ps: 10,
    })}`,
    {
      headers: baseHeader,
    },
  );
}
