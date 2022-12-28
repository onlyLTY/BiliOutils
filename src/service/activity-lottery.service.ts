/**
 * 在抽奖次数中：
 * 大于等于 0 的表示正常抽奖次数，接下来进行抽奖或进入下一个
 * -1 表示获取抽奖次数上限或其他原因，接下来进入下一个
 * -2 表示被风控等已知无法继续进行的原因，直接结束任务
 */
import { TaskConfig, TaskModule } from '@/config/globalVar';
import { ActivityLotteryStatus } from '@/enums/activity-lottery.emum';
import { defHttp } from '@/net/api';
import { ActivityLotteryIdType } from '@/types';
import {
  base64Decode,
  deepMergeObject,
  getPRCDate,
  gzipDecode,
  isArray,
  isServerless,
  Logger,
  logger,
  mergeArray,
  pushIfNotExist,
  sleep,
} from '@/utils';
import { readJsonFile } from '@/utils/file';
import { existsSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import * as activityRequest from '../net/activity-lottery.request';
import { addAndDelBangumiFollow } from './bangumi.service';

const ltyLogger = new Logger({ console: 'debug', file: 'debug', push: 'warn' }, 'activity-lottery');

const EXPIRED_LIST: string[] = [];
const configPath = process.env.__BT_CONFIG_PATH__;
const FILE_PATH = configPath ? dirname(configPath) + '/bt_activityLottery.json' : undefined;

type LocalStatusDto = {
  last_update_at?: number;
  expired_list?: string[];
  activity_list?: ActivityLotteryIdType[];
  last_run_at?: Record<number, string>;
};

let okCount = 0;

/**
 * 进行转盘抽奖
 */
export async function activityLotteryService() {
  okCount = 0;
  const localStatus = getLocalStatus();
  const list = await getActivityLotteryList(localStatus);
  if (!list || list.length === 0) {
    return;
  }
  try {
    logger.info(`总计获取到 ${list.length} 个活动`);
    await lotteryActivity(list);
  } catch (error) {
    logger.error(`转盘抽奖异常`);
    logger.error(error);
  }
  logger.info(`转盘抽奖完成，共进行 ${okCount} 次转盘`);
  writeStatus(localStatus, list);
}

/**
 * 完成一个活动的次数获取、抽奖
 */
async function lotteryActivity(list: ActivityLotteryIdType[]) {
  for (const item of list) {
    const { sid, title } = item;
    // 检测活动是否过期
    const nums = await getLotteryMyTimes(sid);
    await sleep(80, 150);
    if (nums === -2) return;
    if (nums === -1) continue;

    // 添加抽奖次数（分享）
    if ((await addTimesContinue(sid)) === -2) return;
    // 添加抽奖次数（追番）
    const bangumi = TaskConfig.activityLottery.bangumi;
    if (item.bangumis?.length && !item.followBangumi && bangumi) {
      await addTimesByBangumis(item.bangumis);
      item.followBangumi = true;
    }

    // 获取当前抽奖的次数
    const finalNum = await getLotteryMyTimes(sid);
    await sleep(150, 300);
    ltyLogger.debug(`【${title}】剩余次数 ${finalNum}`);
    if (finalNum === -2) return;
    if (finalNum <= 0) continue;

    // 抽奖
    await doLotteryContinue(finalNum, item as ActivityLotteryIdType);
    // ltyLogger.verbose(`完成【${title}】转盘的抽奖`);
    await sleep(300, 500);
  }
}

/**
 * 获取列表
 */
async function getActivityLotteryList(localStatus: LocalStatusDto = {}) {
  if (localStatus && isTodayRun(localStatus.last_run_at)) {
    logger.info(`今天该账号已经运行过了`);
    return;
  }
  // 请求网络代码
  const netList = (await getActivityList(localStatus)) || [];
  // config 文件中的活动列表
  const { list: userList } = TaskConfig.activityLottery;
  return mergeArray(
    (localStatus.activity_list || [])
      .concat(netList)
      .concat(userList.filter(item => expiredIdsFilter(item, localStatus)) || []),
    'sid',
  );
}

/**
 * 获取抽奖次数
 */
export async function getLotteryMyTimes(sid: string) {
  try {
    const { code, message, data } = await activityRequest.getLotteryMyTimes(sid);
    if (code === 0) {
      return data.times;
    }
    if (code === ActivityLotteryStatus.NotExist || code === ActivityLotteryStatus.End) {
      pushIfNotExist(EXPIRED_LIST, sid);
      ltyLogger.info(`【${sid}】活动已结束或不存在【${message}】`);
      return -1;
    }
    logger.warn(`获取抽奖次数失败【${sid}】 ${code} ${message}`);
    return await commonError(code);
  } catch (error) {
    logger.error(`获取抽奖次数异常`);
    logger.error(error);
  }
  return -1;
}

/**
 * 完成抽奖
 */
export async function doLottery({ sid, title }: ActivityLotteryIdType) {
  try {
    const { code, message, data } = await activityRequest.doLottery(sid);
    if (code === 0) {
      okCount++;
      const { gift_name } = data?.[0] || {};
      if (!gift_name || gift_name.includes('未中奖')) {
        return -1;
      }
      logger.info(`【${title}】中奖【${gift_name}】`);
      pushIfNotExist(TaskModule.pushTitle, '【转盘】');
      return;
    }
    logger.warn(`【${title}】抽奖失败 ${code} ${message}`);
    if (code === ActivityLotteryStatus.NoTimes) {
      return -1;
    }
    return await commonError(code);
  } catch (error) {
    logger.error(`获取抽奖次数异常`);
    logger.error(error);
  }
  return -1;
}

/**
 * 增加次数
 */
export async function addTimes(sid: string) {
  try {
    const { code, message, data } = await activityRequest.addLotteryTimes(sid);
    if (code === 0) {
      return data.add_num ? data.add_num : -1;
    }
    if (code === ActivityLotteryStatus.Max) {
      return -1;
    }
    logger.warn(`增加次数失败 ${code} ${message}`);
    return await commonError(code);
  } catch (error) {
    logger.error(`增加次数异常`);
    logger.error(error);
  }
  return -1;
}

async function commonError(code: number | string) {
  if (code === ActivityLotteryStatus.Frequent || code === ActivityLotteryStatus.TooManyRequests) {
    await sleep(2000, 5000);
    return -1;
  }
  if (
    code === ActivityLotteryStatus.PreconditionFailed ||
    code === ActivityLotteryStatus.NetworkError
  ) {
    logger.warn(`可能被风控，停止抽奖`);
    return -2;
  }
  return -1;
}

/**
 * 连续增加次数
 */
export async function addTimesContinue(sid: string) {
  try {
    for (let index = 0; index < 10; index++) {
      await sleep(1000, 2000);
      const nums = await addTimes(sid);
      if (nums < 0) return nums;
    }
  } catch (error) {
    logger.error(`增加次数异常`);
    logger.error(error);
  }
}

/**
 * 通过追番添加次数
 */
export async function addTimesByBangumis(ssids: number[] = []) {
  for (let index = 0; index < ssids.length; index++) {
    const ssid = ssids[index];
    await addAndDelBangumiFollow(ssid);
    await sleep(1000, 2000);
  }
  await sleep();
}

export async function doLotteryContinue(num: number, item: ActivityLotteryIdType) {
  const [delay1, delay2] = TaskConfig.activityLottery.delay;
  const delay1Time = delay1 * 1000,
    delay2Time = delay2 * 1000;
  try {
    for (let index = 0; index < num; index++) {
      await sleep(delay1Time, delay2Time);
      const data = await doLottery(item);
      if (data === -2) return;
    }
  } catch (error) {
    logger.error(`转盘抽奖异常`);
    logger.error(error);
  }
}

function getCode() {
  const { customUrl, proxyPrefix } = TaskConfig.activityLottery;
  const header = {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
    },
    decompress: true,
    timeout: 10000,
  };
  const protocol = `\u0068\u0074\u0074\u0070\u0073`;
  let ghUrl = `${protocol}:\u002f\u002f\u0072\u0061\u0077.\u0067\u0069\u0074\u0068\u0075\u0062\u0075\u0073\u0065\u0072\u0063\u006f\u006e\u0074\u0065\u006e\u0074.\u0063\u006f\u006d\u002f\u004b\u0075\u0064\u006f\u0075\u0052\u0061\u006e\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061\u002f\u0061\u0063\u0074\u0069\u0076\u0069\u0074\u0079\u002f\u0064\u0061\u0074\u0061\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061.go`;
  if (proxyPrefix) {
    ghUrl = `${proxyPrefix}${ghUrl}`;
  }
  return Promise.any([ghUrl, customUrl].map(url => defHttp.get(url, header)));
}

async function getActivityList(
  localStatus?: LocalStatusDto,
): Promise<ActivityLotteryIdType[] | undefined> {
  const { isRequest } = TaskConfig.activityLottery;
  if (!isRequest) {
    logger.info(`用户想要自己管理活动，不需要请求活动列表`);
    return;
  }
  logger.verbose(`通过网络获取活动列表`);
  try {
    const res = await getCode();
    const reslut: ActivityLotteryIdType[] = JSON.parse(gzipDecode(base64Decode(res.value)));
    if (!isArray(reslut)) {
      return;
    }
    if (localStatus && localStatus.expired_list) {
      return reslut.filter(item => expiredIdsFilter(item, localStatus));
    }
    return reslut;
  } catch (error) {
    logger.error(error);
  }
  return;
}

/**
 * 读取本地运行状态
 */
function getLocalStatus() {
  if (!FILE_PATH || !existsSync(FILE_PATH)) {
    return;
  }
  try {
    return readJsonFile<LocalStatusDto>(FILE_PATH);
  } catch (error) {
    ltyLogger.debug(error);
  }
  return;
}

/**
 * 将运行状态写入文件
 */
function writeStatus(oldData: LocalStatusDto = {}, activityList: ActivityLotteryIdType[] = []) {
  if (!FILE_PATH && isServerless()) {
    return;
  }
  try {
    let activity_list: ActivityLotteryIdType[] = activityList,
      expired_list: string[] = [];
    if (EXPIRED_LIST.length) {
      pushIfNotExist(EXPIRED_LIST, ...(oldData.expired_list || []));
      // 如果长度超过 30 则取前 30 个，避免列表无限增长
      expired_list = EXPIRED_LIST.length > 30 ? EXPIRED_LIST.slice(0, 30) : EXPIRED_LIST;
      activity_list = activity_list.filter(item =>
        expiredIdsFilter(item, { expired_list: EXPIRED_LIST }),
      );
    }
    const activity_json = {
      activity_list,
      expired_list,
      last_run_at: {
        [TaskConfig.USERID]: getPRCDate().toLocaleString('zh-CN'),
      },
      last_update_at: new Date().getTime(),
    };
    // 写入合并后的数据
    FILE_PATH &&
      writeFileSync(FILE_PATH, JSON.stringify(deepMergeObject(oldData, activity_json), null, 2));
  } catch (error) {
    ltyLogger.debug(error);
  }
}

/**
 * 检测今天是否已经运行过
 */
function isTodayRun(lastRunAt: Record<number, string> | undefined) {
  if (!lastRunAt) return false;
  return lastRunAt[TaskConfig.USERID]?.startsWith(
    getPRCDate().toLocaleString('zh-CN').split(' ')[0],
  );
}

function expiredIdsFilter(activity: ActivityLotteryIdType, { expired_list = [] }: LocalStatusDto) {
  return expired_list.indexOf(activity.sid) === -1;
}
