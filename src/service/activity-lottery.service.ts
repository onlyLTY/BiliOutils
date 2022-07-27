import { TaskConfig } from '@/config/globalVar';
import { ActivityLotteryStatus } from '@/enums/activity-lottery.emumm';
import { defHttp } from '@/net/api';
import { ActivityLotteryIdType } from '@/types';
import {
  base64Decode,
  deepMergeObject,
  getPRCDate,
  gzipDecode,
  isArray,
  isBoolean,
  isServerless,
  logger,
  pushIfNotExist,
  sleep,
  uniqueObjectArray,
} from '@/utils';
import { readJsonFile } from '@/utils/file';
import { writeFileSync } from 'fs';
import { dirname } from 'path';
import * as activityRequest from '../net/activity-lottery.request';

const EXPIRED_LIST: string[] = [];
const configPath = process.env.__BT_CONFIG_PATH__;
const FILE_PATH = configPath ? dirname(configPath) + '/bt_activityLottery.json' : undefined;

type LocalStatusDto = {
  last_update_at?: number;
  expired_list?: string[];
  activity_list?: ActivityLotteryIdType[];
  last_run_at?: Record<number, string>;
};

/**
 * 进行转盘抽奖
 */
export async function activityLotteryService() {
  const localStatus = getLocalStatus();
  if (isTodayRun(localStatus.last_run_at)) {
    logger.info(`今天该账号已经运行过了`);
    return;
  }
  const netList = await getActivityList(localStatus);
  const { list: userList } = TaskConfig.activityLottery;
  const list = uniqueObjectArray(
    netList.concat(userList.filter(item => expiredIdsFilter(item, localStatus)) || []),
    'sid',
  );
  if (!list || list.length === 0) {
    return;
  }
  try {
    for (const item of list) {
      const { sid, title } = item;
      const nums = await getLotteryMyTimes(sid);
      await sleep(80, 150);
      if (nums === true) return;
      if (nums === false) continue;
      if ((await addTimesContinue(sid)) === true) return;
      const finalNum = await getLotteryMyTimes(sid);
      await sleep(150, 300);
      logger.debug(`【${title}】剩余次数 ${finalNum}`);
      if (finalNum === true) return;
      if (finalNum === false || finalNum === 0) continue;
      await doLotteryContinue(finalNum, item as ActivityLotteryIdType);
      logger.verbose(`完成【${title}】转盘的抽奖`);
      await sleep(300, 500);
    }
  } catch (error) {
    logger.error(`转盘抽奖异常`);
    logger.error(error);
  }
  writeStatus(localStatus, netList);
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
    logger.warn(`获取抽奖次数失败【${sid}】 ${code} ${message}`);
    if (code === ActivityLotteryStatus.NotExist || code === ActivityLotteryStatus.End) {
      pushIfNotExist(EXPIRED_LIST, sid);
      return false;
    }
    return await commonError(code);
  } catch (error) {
    logger.error(`获取抽奖次数异常`);
    logger.error(error);
  }
  return false;
}

/**
 * 完成抽奖
 */
export async function doLottery({ sid, title }: ActivityLotteryIdType) {
  try {
    const { code, message, data } = await activityRequest.doLottery(sid);
    if (code === 0) {
      if (!data.gift_name || data.gift_name.includes('未中奖')) {
        return false;
      }
      logger.info(`【${title}】中奖【${data.gift_name}】`);
      return;
    }
    logger.warn(`【${title}】抽奖失败 ${code} ${message}`);
    if (code === ActivityLotteryStatus.NoTimes) {
      return false;
    }
    return await commonError(code);
  } catch (error) {
    logger.error(`获取抽奖次数异常`);
    logger.error(error);
  }
  return false;
}

/**
 * 增加次数
 */
export async function addTimes(sid: string) {
  try {
    const { code, message, data } = await activityRequest.addLotteryTimes(sid);
    if (code === 0) {
      return data.add_num ? data.add_num : false;
    }
    if (code === ActivityLotteryStatus.Max) {
      return false;
    }
    logger.warn(`增加次数失败 ${code} ${message}`);
    return await commonError(code);
  } catch (error) {
    logger.error(`增加次数异常`);
    logger.error(error);
  }
  return false;
}

async function commonError(code: number | string) {
  if (code === ActivityLotteryStatus.Frequent || code === ActivityLotteryStatus.TooManyRequests) {
    await sleep(2000, 5000);
    return false;
  }
  if (
    code === ActivityLotteryStatus.PreconditionFailed ||
    code === ActivityLotteryStatus.NetworkError
  ) {
    logger.warn(`可能被风控，停止抽奖`);
    return true;
  }
  return false;
}

/**
 * 连续增加次数
 */
export async function addTimesContinue(sid: string) {
  try {
    for (let index = 0; index < 10; index++) {
      await sleep(1000, 2000);
      const nums = await addTimes(sid);
      if (isBoolean(nums)) return nums;
    }
  } catch (error) {
    logger.error(`增加次数异常`);
    logger.error(error);
  }
}

export async function doLotteryContinue(num: number, item: ActivityLotteryIdType) {
  const [delay1, delay2] = TaskConfig.activityLottery.delay;
  const delay1Time = delay1 * 1000,
    delay2Time = delay2 * 1000;
  try {
    for (let index = 0; index < num; index++) {
      await sleep(delay1Time, delay2Time);
      const data = await doLottery(item);
      if (data) return;
    }
  } catch (error) {
    logger.error(`增加次数异常`);
    logger.error(error);
  }
}

function getCode() {
  const header = {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
    },
    decompress: true,
    timeout: 10000,
  };
  const protocol = `\u0068\u0074\u0074\u0070\u0073`;
  const ghUrl = `${protocol}:\u002f\u002f\u0072\u0061\u0077.\u0067\u0069\u0074\u0068\u0075\u0062\u0075\u0073\u0065\u0072\u0063\u006f\u006e\u0074\u0065\u006e\u0074.\u0063\u006f\u006d\u002f\u004b\u0075\u0064\u006f\u0075\u0052\u0061\u006e\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061\u002f\u0061\u0063\u0074\u0069\u0076\u0069\u0074\u0079\u002f\u0064\u0061\u0074\u0061\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061.go`;
  const geUrl = `${protocol}:\u002f\u002f\u0067\u0069\u0074\u0065\u0065.\u0063\u006f\u006d\u002f\u0063\u0061\u0074\u006c\u0061\u0069\u0072\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061\u002f\u0072\u0061\u0077\u002f\u0061\u0063\u0074\u0069\u0076\u0069\u0074\u0079\u002f\u0064\u0061\u0074\u0061\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061.go`;
  return Promise.any([defHttp.get(ghUrl, header), defHttp.get(geUrl, header)]);
}

async function getActivityList(localStatus?: LocalStatusDto): Promise<ActivityLotteryIdType[]> {
  const { isRequest } = TaskConfig.activityLottery;
  if (!isRequest) {
    return [];
  }
  logger.verbose(`获取活动列表`);
  try {
    const res = await getCode();
    const reslut: ActivityLotteryIdType[] = JSON.parse(gzipDecode(base64Decode(res.value)));
    if (!isArray(reslut)) {
      return localStatus?.activity_list || [];
    }
    if (localStatus && localStatus.expired_list) {
      return reslut.filter(item => expiredIdsFilter(item, localStatus));
    }
    return reslut;
  } catch (error) {
    logger.error(error);
  }
  return localStatus?.activity_list || [];
}

/**
 * 读取本地运行状态
 */
function getLocalStatus() {
  if (!FILE_PATH && isServerless()) {
    return;
  }
  try {
    return readJsonFile<LocalStatusDto>(FILE_PATH);
  } catch (error) {
    logger.debug(error);
  }
  return;
}

/**
 * 将运行状态写入文件
 */
function writeStatus(oldData: LocalStatusDto, activityList: ActivityLotteryIdType[] = []) {
  if (!FILE_PATH && isServerless()) {
    return;
  }
  try {
    let activity_list: ActivityLotteryIdType[] = activityList,
      expired_list: string[];
    if (EXPIRED_LIST.length) {
      pushIfNotExist(EXPIRED_LIST, ...(oldData?.expired_list || []));
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
    writeFileSync(FILE_PATH, JSON.stringify(deepMergeObject(oldData, activity_json), null, 2));
  } catch (error) {
    logger.debug(error);
  }
}

/**
 * 检测今天是否已经运行过
 */
function isTodayRun(lastRunAt: Record<number, string>) {
  return lastRunAt[TaskConfig.USERID]?.startsWith(
    getPRCDate().toLocaleString('zh-CN').substring(0, 9),
  );
}

function expiredIdsFilter(activity: ActivityLotteryIdType, localStatus: LocalStatusDto) {
  return localStatus.expired_list.indexOf(activity.sid) === -1;
}
