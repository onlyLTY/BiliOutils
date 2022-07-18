/**
 * form https://github.com/dd178/BILI_judgement/blob/master/judgement.py
 */
import type { JuryCaseOpinion } from '@/dto/jury.dto';
import { TaskConfig } from '@/config/globalVar';
import {
  applyJury,
  getJuryCase,
  getJuryCaseViewpoint,
  getJuryCaseVote,
  juryCaseVote,
} from '@/net/jury.request';
import { apiDelay, getRandomItem, Logger, logger } from '@/utils';
import { JuryVote, JuryVoteResult } from '@/enums/jury.emum';
import { getRequestNameWrapper } from '@/utils/request';

const juryLogger = new Logger({ console: 'debug', file: 'debug', push: 'warn' }, 'jury');
const request = getRequestNameWrapper({ logger: juryLogger });

/**
 * 获取最多观点
 */
export function getMoreOpinion(caseId: string, opinions: JuryCaseOpinion[]) {
  const opinionStatistics: Record<string, number> = {};
  for (const opinion of opinions) {
    if (Reflect.has(opinionStatistics, opinion.vote)) {
      opinionStatistics[opinion.vote]++;
      continue;
    }
    opinionStatistics[opinion.vote] = 1;
  }
  const maxValue = Math.max(...Object.values(opinionStatistics));
  const maxKey = +Object.keys(opinionStatistics).find(key => opinionStatistics[key] === maxValue);
  if (maxValue < TaskConfig.jury.opinionMin) return;
  juryLogger.debug(
    `【${caseId}】的观点分布（观点id: 投票人数）${JSON.stringify(opinionStatistics)}`,
  );
  return opinions.find(opinion => opinion.vote === maxKey);
}

/**
 * 观点投票
 */
export async function voteJuryByOpinion(caseId: string) {
  try {
    const { list } = await request(getJuryCaseViewpoint, '获取观点', caseId);
    if (!list || !list.length) return JuryVoteResult.NO_OPINION;
    const opinion = getMoreOpinion(caseId, list);
    if (!opinion) return JuryVoteResult.FEW_OPINION;
    const vote = opinion.vote;
    juryLogger.info(`为【${caseId}】选择了【${JuryVote[vote]}】（${vote}）`);
    const { code, message } = await juryCaseVote(caseId, vote);
    if (code !== 0) {
      juryLogger.warn(`为案件【${caseId}】投票失败，【${code}】【${message}】`);
      return JuryVoteResult.ERROR;
    }
    juryLogger.info(
      `成功根据【${opinion.uname}】的观点为案件【${caseId}】投下【${JuryVote[vote]}】`,
    );
    return JuryVoteResult.SUCCESS;
  } catch (error) {
    juryLogger.error(`为案件【${caseId}】投票异常，错误信息：${error}`);
  }
  return JuryVoteResult.UNKNOWN;
}

/**
 * 默认投票
 */
export async function replenishVote(caseId: string, defaultVote: number) {
  try {
    const info = await getJuryCase(caseId);
    if (info.code !== 0) {
      juryLogger.error(
        `获取风纪委员案件信息失败，错误码：【${info.code}】，信息为：【${info.message}】`,
      );
      return false;
    }
    const selectedVote = info.data.vote_items[defaultVote];
    const vote = await juryCaseVote(caseId, selectedVote.vote);
    if (vote.code === 0) {
      juryLogger.info(`成功根据【配置文件】为案件【${caseId}】投下【${selectedVote.vote_text}】`);
      return true;
    }
    juryLogger.warn(`为案件【${caseId}】投票失败，【${vote.code}】【${vote.message}】`);
    return false;
  } catch (error) {
    juryLogger.error(`风纪委员默认投票异常，错误信息：${error}`);
  }
  return false;
}

/**
 * 确认案件
 */
async function caseConfirm(caseId: string) {
  try {
    const { code, message } = await juryCaseVote(caseId, 0);
    if (code !== 0) {
      juryLogger.warn(`确认案件【${caseId}】失败，【${code}】【${message}】`);
      throw new Error(message);
    }
    await apiDelay(12000, 20000);
  } catch (error) {
    juryLogger.error(`确认案件【${caseId}】异常，错误信息：${error.message}`);
    throw error;
  }
}

/**
 * 模式 1
 */
export async function mode1(err = 3) {
  const errRef = { value: err };
  while (errRef.value > 0) {
    const isReturn = await runMode1(errRef);
    if (isReturn) break;
    await apiDelay(2000, 5000);
  }
  if (errRef.value < 0) {
    juryLogger.error(`错误次数过多，结束任务！`);
  }
}

/**
 * 运行一轮模式 1
 */
async function runMode1(errRef: Ref<number>) {
  try {
    const { code, data, message } = await getJuryCaseVote();
    switch (code) {
      case 0:
        return await handleSuccess(data, errRef);
      case 25006:
        return await handleJudgeExpired(message);
      case 25008:
        return await handleNoNewCase(message);
      case 25014:
        return await handleCaseFull(message);
      default:
        return await handleOtherError(code, message, errRef);
    }
  } catch (error) {
    juryLogger.error(`风纪委员投票异常（模式 1），错误信息：${error}`);
    errRef.value -= 1;
  }
}

/**
 * 模式2
 */
export async function mode2(err = 3) {
  const errRef = { value: err },
    caseIdList = [];
  while (errRef.value > 0) {
    const isReturn = await runMode2(errRef, caseIdList);
    if (isReturn) break;
    await apiDelay(2000, 5000);
  }
  if (errRef.value < 0) {
    juryLogger.error(`错误次数过多，结束任务！`);
  }
}

/**
 * 运行一轮模式 2
 */
async function runMode2(errRef: Ref<number>, caseIdList: string[]) {
  try {
    const { code, data, message } = await getJuryCaseVote();
    switch (code) {
      case 0:
        return await handleSuccess(data, errRef, caseIdList);
      case 25006:
        return await handleJudgeExpired(message);
      case 25008:
        return await handleNoNewCaseForMode2(message, caseIdList, errRef);
      case 25014:
        return await handleCaseFull(message);
      default:
        return await handleOtherError(code, message, errRef);
    }
  } catch (error) {
    juryLogger.error(`风纪委员投票异常（模式 2），错误信息：${error}`);
    errRef.value -= 1;
    await apiDelay(20000, 40000);
  }
}

/**
 * 获取风纪委员案件资格已经过期
 */
async function handleJudgeExpired(message: string) {
  logger.warn(`${message}`);
  await request(applyJury, '申请风纪委员');
  // 不管是否成功，目前是无法继续投票的
  return true;
}

/**
 * 获取风纪委员案件没有新的案件
 */
async function handleNoNewCase(message: string) {
  juryLogger.info(`${message}`);
  if (TaskConfig.jury.once) {
    return await waitFor();
  }
  return true;
}

/**
 * 休眠等待
 */
async function waitFor() {
  const waitTime = TaskConfig.jury.waitTime || 20;
  juryLogger.info(`休眠 ${waitTime} 分钟后继续获取案件！`);
  await apiDelay(waitTime * 60000);
  return false;
}

/**
 * 获取风纪委员案件没有新的案件
 */
async function handleNoNewCaseForMode2(message: string, caseIdList: string[], errRef: Ref<number>) {
  juryLogger.info(`${message}`);
  if (!caseIdList.length && TaskConfig.jury.once) {
    return await waitFor();
  }
  juryLogger.debug('没有新的案件，清空保存的案件！');
  for (const caseId of caseIdList) {
    // 删除 caseIdList 中的 caseId
    caseIdList.splice(caseIdList.indexOf(caseId), 1);
    if (errRef.value === 0) {
      logger.error(`错误次数过多，结束任务！`);
      return true;
    }
    await caseConfirm(caseId);
    if (!(await replenishVote(caseId, getRandomItem(TaskConfig.jury.vote)))) {
      errRef.value -= 1;
    }
    await apiDelay(10000, 20000);
  }
}

/**
 * 获取风纪委员案件案件已满
 */
async function handleCaseFull(message: string) {
  logger.info(`${message}`);
  return true;
}

/**
 * 获取风纪委员案件未知错误
 */
async function handleOtherError(code: number, message: string, errRef: Ref<number>) {
  juryLogger.warn(`获取风纪委员案件失败，错误码：【${code}】，信息为：【${message}】`);
  if (code === 25005) {
    logger.warn(`如果需要请手动申请风纪委员，对于从来没有当过的用户，我们默认你配置错误。`);
    return true;
  }
  errRef.value -= 1;
  await apiDelay(20000, 40000);
  return false;
}

/**
 * 获取风纪委员案件成功处理
 */
async function handleSuccess(
  { case_id = '' }: { case_id: string },
  errRef: Ref<number>,
  caseIdList?: string[],
) {
  if (!case_id) {
    errRef.value -= 1;
    return;
  }
  if (!caseIdList) {
    await caseConfirm(case_id);
  }
  const voteResult = await voteJuryByOpinion(case_id);
  if (voteResult === JuryVoteResult.SUCCESS) return;
  if (voteResult < JuryVoteResult.SUCCESS) {
    errRef.value -= 1;
    return;
  }
  if (caseIdList) {
    const isIncludes = caseIdList.includes(case_id);
    if (!isIncludes) {
      caseIdList.push(case_id);
      return;
    } else {
      // 删除 caseIdList 中的 caseId
      caseIdList.splice(caseIdList.indexOf(case_id), 1);
    }
  }
  const vote = await replenishVote(case_id, getRandomItem(TaskConfig.jury.vote));
  if (!vote) {
    errRef.value -= 1;
  }
}

/**
 * 开始投票
 */
export async function juryService() {
  const { mode } = TaskConfig.jury;
  try {
    switch (mode) {
      case 1:
        return await mode1();
      case 2:
        return await mode2();
      default:
        return;
    }
  } catch (error) {
    logger.error(`发生错误，错误信息为：${error}`);
  }
}
