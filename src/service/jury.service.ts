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
import { apiDelay, ENV, formatCron, getPRCDate, getRandomItem, Logger, logger } from '@/utils';
import { JuryVote, JuryVoteResult, VoteResCode } from '@/enums/jury.emum';
import { getRequestNameWrapper } from '@/utils/request';
import { JSON5 } from '@/utils/json5';

const juryLogger = new Logger({ console: 'debug', file: 'debug', push: 'warn' }, 'jury');
const request = getRequestNameWrapper({ logger: juryLogger });
const Count = {
  tatol: 0,
  confirm: 0,
  def: 0,
  opinion: 0,
  view: 0,
  error: 0,
};
function initCount() {
  Count.tatol = 0;
  Count.confirm = 0;
  Count.def = 0;
  Count.opinion = 0;
  Count.view = 0;
  Count.error = 0;
}

/**
 * 给案件投票
 */
function voteCase(caseId: string, vote: number) {
  try {
    Count.tatol++;
    return juryCaseVote(
      caseId,
      vote,
      getRandomItem(TaskConfig.jury.insiders),
      getRandomItem(TaskConfig.jury.anonymous),
    );
  } catch (error) {
    Count.error++;
    throw error;
  }
}

/**
 * 获取最多观点
 */
export function getMoreOpinion(caseId: string, opinions: JuryCaseOpinion[]) {
  const opinionStatistics: Record<string, number> = {};
  const { insiderWeight = 1 } = TaskConfig.jury;
  for (const opinion of opinions) {
    if (Reflect.has(opinionStatistics, opinion.vote)) {
      opinion.insiders
        ? opinionStatistics[opinion.vote]++
        : (opinionStatistics[opinion.vote] += insiderWeight);
      continue;
    }
    opinionStatistics[opinion.vote] = 1;
  }
  const maxValue = Math.max(...Object.values(opinionStatistics));
  const maxKey = +Object.keys(opinionStatistics).find(key => opinionStatistics[key] === maxValue)!;
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
    if (TaskConfig.jury.notOpinion.includes(vote2Option(opinion.vote))) {
      juryLogger.debug(`配置已经排除掉${JuryVote[opinion.vote]}，转为默认投票`);
      return JuryVoteResult.被排除;
    }

    const vote = opinion.vote;
    juryLogger.verbose(`为【${caseId}】选择了【${JuryVote[vote]}】（${vote}）`);
    await caseConfirm(caseId);
    Count.opinion++;

    const { code, message } = await voteCase(caseId, vote);
    if (code !== 0) {
      logger.warn(`为案件【${caseId}】投票失败，【${code}】【${message}】`);
      return JuryVoteResult.ERROR;
    }
    juryLogger.info(
      `成功根据【${opinion.uname}】的观点为案件【${caseId}】投下【${JuryVote[vote]}】`,
    );
    return JuryVoteResult.SUCCESS;
  } catch (error) {
    logger.error(`为案件【${caseId}】投票异常，错误信息：${error}`);
  }
  return JuryVoteResult.UNKNOWN;
}

/**
 * 把实际投票转为配置的投票
 */
function vote2Option(vote: number) {
  if (vote < 10) return vote - 1;
  return vote - 11;
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
    await caseConfirm(caseId);
    Count.def++;
    const vote = await voteCase(caseId, selectedVote.vote);
    if (vote.code === 0) {
      juryLogger.info(`成功根据【配置文件】为案件【${caseId}】投下【${selectedVote.vote_text}】`);
      return true;
    }
    logger.warn(`为案件【${caseId}】默认投票失败，【${vote.code}】【${vote.message}】`);
    return false;
  } catch (error) {
    logger.error(`风纪委员默认投票异常，错误信息：${error}`);
  }
  return false;
}

/**
 * 确认案件
 */
async function caseConfirm(caseId: string) {
  try {
    juryLogger.debug(`开始案件【${caseId}】`);
    Count.confirm++;
    const { code, message } = await voteCase(caseId, 0);
    if (code !== 0) {
      logger.warn(`确认案件【${caseId}】失败，【${code}】【${message}】`);
      throw new Error(message);
    }
    await apiDelay(12222, 17777);
  } catch (error) {
    logger.error(`确认案件【${caseId}】异常，错误信息：${error.message}`);
    throw error;
  }
}

export async function runJury(err = 3) {
  const errRef = { value: err };
  while (errRef.value > 0) {
    if (await runOneJury(errRef)) break;
    await apiDelay(2000, 5000);
  }
  await debugInfo();
  if (errRef.value <= 0) {
    logger.error(`错误次数过多，结束任务！`);
    return false;
  }
}

/**
 * 临时DEBUG
 */
export async function debugInfo() {
  logger.verbose(`\n[debug] ${JSON5.stringify(Count, null, 2)}`);
  const vote = Count.def + Count.opinion;
  if (vote !== Count.confirm) {
    logger.warn(
      `[debug] 最终投票数（${Count.def},${Count.opinion}）与确认案件数（${Count.confirm}）不一致`,
    );
  }
  if (vote + Count.confirm !== Count.tatol) {
    logger.warn(`[debug] 获取到案件信息的次数与投票次数不一致！`);
  }
  if (Count.error > 0) {
    logger.warn(`[debug] 投票过程中出现了${Count.error}次错误`);
  }
}

/**
 * 运行一轮
 */
async function runOneJury(errRef: Ref<number>) {
  try {
    const { code, data, message } = await getJuryCaseVote();
    switch (code) {
      case VoteResCode.成功:
        Count.view++;
        return await handleSuccess(data, errRef);
      case VoteResCode.资格过期:
        return await handleJudgeExpired(message);
      case VoteResCode.没有新案件:
        return await handleNoNewCase(message, errRef);
      case VoteResCode.已完成:
        return await handleCaseFull(message);
      default:
        return await handleOtherError(code, message, errRef);
    }
  } catch (error) {
    logger.error(`风纪委员投票异常，错误信息：${error}`);
    errRef.value -= 1;
    await apiDelay(5000, 10000);
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
async function handleNoNewCase(message: string, errRef?: Ref<number>) {
  juryLogger.info(`${message}`);
  if (!TaskConfig.jury.once && errRef) {
    return true;
  }
  // 判断是云函数
  if (ENV.fc || ENV.scf) {
    const r = await waitForServerless();
    // 如果失败还是保持原来的逻辑
    if (r) {
      logger.info(`通过新建云函数休眠！`);
      return true;
    }
  }
  return await waitFor();
}

/**
 * 更新云函数
 */
async function waitForServerless() {
  if (!TaskConfig.jury.newTrigger) {
    return false;
  }
  const { dailyHandler, getClinet } = await import('@/utils/serverless');
  const client = await getClinet(dailyHandler.slsType);
  if (!client.client) return false;

  const now = getPRCDate(),
    nowMinutes = now.getMinutes() + (TaskConfig.jury.waitTime || 20),
    minutes = nowMinutes % 60,
    hours = now.getHours() + (nowMinutes >= 60 ? 1 : 0);

  const triggerTime = formatCron({ hours, minutes }, dailyHandler.slsType);
  juryLogger.info(`更新云函数定时器为：${triggerTime.string}`);
  try {
    return await client?.createTrigger(
      {
        TriggerDesc: triggerTime.value,
        TriggerName: 'jury_wait',
      },
      { task: 'loginTask,judgement,noPush' },
    );
  } catch (error) {
    juryLogger.debug(error.message);
  }
  return false;
}

async function deleteServerless() {
  if (!(ENV.fc || ENV.scf)) return false;
  if (!TaskConfig.jury.newTrigger) return false;
  try {
    const { dailyHandler, getClinet } = await import('@/utils/serverless');
    const client = await getClinet(dailyHandler.slsType);
    if (!client.client) return false;

    return await client?.deleteTrigger('jury_wait');
  } catch (error) {
    juryLogger.debug(error.message);
  }
  return false;
}

/**
 * 获取风纪委员案件案件已满
 */
async function handleCaseFull(message: string) {
  logger.info(`${message}`);
  await deleteServerless();
  return true;
}

/**
 * 获取风纪委员案件未知错误
 */
async function handleOtherError(code: number, message: string, errRef: Ref<number>) {
  logger.warn(`获取风纪委员案件失败，错误码：【${code}】，信息为：【${message}】`);
  if (code === VoteResCode.没有资格) {
    logger.warn(`如果需要请手动申请风纪委员，对于从来没有当过的用户，我们默认你配置错误。`);
    return true;
  }
  errRef.value -= 1;
  await apiDelay(20000, 40000);
  return false;
}

async function isByOpinion(case_id: string) {
  if (TaskConfig.jury.opinion) {
    return await voteJuryByOpinion(case_id);
  }
  return JuryVoteResult.不参考;
}

/**
 * 获取风纪委员案件成功处理
 */
async function handleSuccess({ case_id = '' }: { case_id: string }, errRef: Ref<number>) {
  if (!case_id) {
    errRef.value -= 1;
    return;
  }
  const voteResult = await isByOpinion(case_id);
  if (voteResult === JuryVoteResult.SUCCESS) return;
  if (voteResult < JuryVoteResult.SUCCESS) {
    errRef.value -= 1;
    return;
  }
  const suc = await replenishVote(case_id, getRandomItem(TaskConfig.jury.vote));
  if (!suc) {
    errRef.value -= 1;
  }
}

/**
 * 开始投票
 */
export async function juryService() {
  try {
    initCount();
    return await runJury();
  } catch (error) {
    logger.error(`jury 错误信息为：${error}`);
  }
}
