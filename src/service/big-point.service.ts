import type { TaskCodeType } from '@/enums/big-point.emum';
import type { CommonTaskItem, SingTaskHistory, Taskinfo } from '@/dto/big-point.dto';
import {
  complete,
  getTaskCombine,
  receiveTask,
  showDispatch,
  signIn,
  susWin,
} from '@/net/big-point.request';
import { videoHeartbeat } from '@/net/video.request';
import { TaskCode } from '@/enums/big-point.emum';
import { apiDelay, getUnixTime, logger, random } from '@/utils';
import { TaskModule } from '@/config/globalVar';

/**
 * 查看当前状态
 */
async function getTaskStatus() {
  try {
    const { code, data, message } = await getTaskCombine();
    if (code !== 0) {
      logger.error(`查看当前状态失败: ${code} ${message}`);
    }
    return data;
  } catch (error) {
    logger.error(error);
  }
}

export async function bigPointService() {
  const taskStatus = await getTaskStatus();
  if (!taskStatus) {
    return;
  }
  const {
    vip_info: { status, type },
    point_info: { point },
    task_info,
  } = taskStatus;
  if (!baseInfo(status, type, point)) return;
  if (task_info.score_month >= task_info.score_limit) {
    logger.info('本月积分已领取完');
    return;
  }
  const signCode = await sign(task_info.sing_task_item?.histories);
  if (signCode === -401) {
    logger.error('出现非法访问异常，可能账号存在异常，放弃大积分任务');
    return;
  }
  await apiDelay(100, 200);
  // 判断是否领取了任务
  if (await getTask(task_info)) {
    await apiDelay(100, 200);
    await doDailyTask(await getTaskStatus());
  } else {
    await doDailyTask(taskStatus);
  }
}

/**
 * 完成每日任务
 */
async function doDailyTask(taskStatus: UnPromisify<ReturnType<typeof getTaskStatus>>) {
  if (!taskStatus || !taskStatus.task_info) return;
  const TaskItems = taskStatus.task_info.modules?.at(-1)?.common_task_item;
  if (!TaskItems) {
    logger.info('没有需要完成的每日任务');
    return;
  }
  const waitTaskItems = TaskItems.filter(taskItem => {
    if (taskItem.vip_limit > TaskModule.vipType) return false;
    // 似乎没有意义，但是为了保险起见
    if (taskItem.complete_times >= taskItem.max_times) return false;
    if (taskItem.state === 1) return true;
  });
  await handleDailyTask(waitTaskItems);
}

/**
 * 处理每一个每日任务
 */
async function handleDailyTask(taskItems: CommonTaskItem[]) {
  for (const taskItem of taskItems) {
    switch (taskItem.task_code) {
      case 'ogvwatch':
        await watchTask(taskItem.complete_times);
        break;
      case 'filmtab':
        await completeTask('tv_channel', '浏览影视频道');
        break;
      case 'animatetab':
        await completeTask('jp_channel', '浏览追番频道');
        break;
      case 'vipmallbuy':
        await vipMallBuy();
        break;
      default:
        break;
    }
    await apiDelay(1000, 3000);
  }
}

/**
 * 观看视频任务
 */
async function watchTask(completeTimes: number) {
  // 随机获取一集
  function createEpid(prefix: string, min: number, max: number, exclude: number[] = []) {
    let epid = random(min, max);
    while (exclude.includes(epid)) {
      epid = random(min, max);
    }
    return Number(prefix + epid);
  }
  try {
    const epid = createEpid('327', 107, 134, [122, 123]);
    const watchTime = completeTimes === 1 ? random(905, 1800) : random(1805, 2000);
    // 播放西游记
    await videoHeartbeat({
      start_ts: getUnixTime() - watchTime,
      realtime: watchTime,
      played_time: random(1000) + watchTime,
      real_played_time: watchTime,
      refer_url: 'https://www.bilibili.com/bangumi/media/md28229051/',
      epid,
    });
    logger.info(`观看视频任务完成`);
  } catch (error) {
    logger.error(error);
    logger.error(`观看视频任务出现异常：${error.message}`);
  }
}

/**
 * complete 每日任务
 */
async function completeTask(taskCode: string, msg: string) {
  try {
    await susWin();
    apiDelay(1000, 2000);
    const { code: comCode, message: comMsg } = await complete(taskCode);
    if (comCode !== 0) {
      logger.error(`${msg}失败: ${comCode} ${comMsg}`);
      return;
    }
    logger.info(`${msg}每日任务完成`);
  } catch (error) {
    logger.error(error);
    logger.error(`每日任务${msg}出现异常：${error.message}`);
  }
}

/**
 * 浏览会员购
 */
async function vipMallBuy() {
  try {
    const { code, message } = await showDispatch('hevent_oy4b7h3epeb');
    if (code === 0) {
      logger.info(`浏览会员购每日任务完成`);
      return;
    }
    logger.error(`浏览会员购失败: ${code} ${message}`);
  } catch (error) {
    logger.error(error);
    logger.error(`每日任务会员购出现异常：${error.message}`);
  }
}

/**
 * 签到
 */
async function sign(histories: SingTaskHistory[]) {
  if (!histories || !histories.length) {
    return;
  }
  const today = histories.find(history => history.is_today);
  if (!today) {
    return;
  }
  if (today.signed) {
    logger.info('今日已签到');
    return;
  }
  try {
    const { code, message } = await signIn();
    if (code === 0) {
      logger.info(`签到成功`);
      return code;
    }
    logger.error(`签到失败: ${code} ${message}`);
    return code;
  } catch (error) {
    logger.error(error);
  }
  return -1;
}

/**
 * 领取任务
 * @returns true 领取成功
 */
async function getTask(taskinfo: Taskinfo) {
  function filterTask(taskItem: CommonTaskItem) {
    if (!taskItem) return false;
    if (taskItem.vip_limit > TaskModule.vipType) return false;
    if (taskItem.state === 0) return true;
  }
  const taskItems = taskinfo.modules.at(-1)?.common_task_item?.filter(filterTask);
  if (!taskItems || !taskItems.length) {
    logger.info('没有需要领取的任务');
    return false;
  }
  await getManyTask(taskItems.map(taskItem => taskItem.task_code));
  logger.info('领取任务完成');
  return true;
}

/**
 * 基本信息输出和判断
 * @returns true: 可以继续执行任务
 */
async function baseInfo(status: number, type: number, point: number) {
  logger.info(`当前积分: ${point}`);
  if (status === 0 || type === 0) {
    logger.warn('当前无大会员，无法继续执行任务');
    return;
  }
  return true;
}

/**
 * 领取单个任务
 */
async function getOneTask(taskCode: TaskCodeType) {
  try {
    const { code, message } = await receiveTask(taskCode);
    if (code === 0) {
      return true;
    }
    logger.error(`领取任务${TaskCode[taskCode]}失败: ${code} ${message}`);
  } catch (error) {
    logger.error(error);
  }
}

/**
 * 领取多个任务
 */
async function getManyTask(taskCodes: string[]) {
  for (const taskCode of taskCodes) {
    await getOneTask(taskCode as TaskCodeType);
    await apiDelay(100, 300);
  }
}
