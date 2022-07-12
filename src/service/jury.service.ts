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
import { apiDelay, getRandomItem, Logger } from '@/utils';
import { JuryVote } from '@/enums/jury.emum';

const juryLogger = new Logger({ console: 'debug', file: 'debug', push: 'warn' }, 'jury');

/**
 * 获取最多观点
 */
export function getMoreOpinion(caseId: string, opinions: JuryCaseOpinion[]) {
  const opinionStatistics: Record<string, number> = {};
  for (const opinion of opinions) {
    if (Reflect.has(opinionStatistics, opinion.vote)) {
      opinionStatistics[opinion.vote]++;
    } else {
      opinionStatistics[opinion.vote] = 1;
    }
  }
  // 获取值最大的键
  const maxKey = +Object.keys(opinionStatistics).reduce((a, b) =>
    opinionStatistics[a] > opinionStatistics[b] ? a : b,
  );
  juryLogger.debug(
    `【${caseId}】的观点分布（观点id: 投票人数）${JSON.stringify(opinionStatistics)}`,
  );
  return opinions.find(opinion => opinion.vote === maxKey) || { vote: 0, uname: '无' };
}

/**
 * 观点投票
 */
export async function voteOpinion(caseId: string, opinions: JuryCaseOpinion[]) {
  try {
    const opinion = getMoreOpinion(caseId, opinions);
    const vote = opinion.vote;
    juryLogger.info(`为【${caseId}】选择了【${JuryVote[vote]}】（${vote}）`);
    const { code, message } = await juryCaseVote(caseId, vote);
    if (code !== 0) {
      juryLogger.warn(`风纪委员投票失败，错误码：【${code}】，信息为：【${message}】`);
      return false;
    }
    juryLogger.info(
      `成功根据【${opinion.uname}】的观点为案件【${caseId}】投下【${JuryVote[vote]}】`,
    );
    return true;
  } catch (error) {
    juryLogger.error(`风纪委员投票失败，错误信息：${error}`);
  }
  return false;
}

/**
 * 默认投票
 */
export async function replenishVote(caseId: string, defaultVote: number) {
  try {
    const info = await getJuryCase(caseId);
    if (info['code'] === 0) {
      const selectedVote = info.data.vote_items[defaultVote];
      const vote = await juryCaseVote(caseId, selectedVote.vote);
      if (vote['code'] === 0) {
        juryLogger.info(`成功根据【配置文件】为案件【${caseId}】投下【${selectedVote.vote_text}】`);
        return true;
      }
      juryLogger.warn(
        `风纪委员投票失败，错误码：【${vote['code']}】，信息为：【${vote['message']}】`,
      );
      return false;
    }
    juryLogger.error(
      `获取风纪委员案件信息失败，错误码：【${info['code']}】，信息为：【${info['message']}】`,
    );
    return false;
  } catch (error) {
    juryLogger.error(`风纪委员投票异常，错误信息：${error}`);
  }
  return false;
}

/**
 * 模式 1
 */
export async function mode1(err = 3) {
  while (err > 0) {
    try {
      const { code: caseCode, data: caseData, message: caseMessage } = await getJuryCaseVote();
      if (caseCode === 25014) {
        juryLogger.info(`${caseMessage}`);
        return;
      }
      if (caseCode === 25008) {
        juryLogger.info(`${caseMessage}`);
        if (TaskConfig.jury.once) {
          juryLogger.info(`休眠30分钟后继续获取案件！`);
          await apiDelay(1800000);
          continue;
        }
        return;
      }
      if (caseCode === 25006) {
        juryLogger.warn(`${caseMessage}`);
        const r = await applyJury();
        if (r['code'] !== 0) {
          juryLogger.info(`${r}`);
          return;
        }
        continue;
      }
      if (caseCode === 0) {
        const caseId = caseData.case_id;
        const { data: opinionsData } = await getJuryCaseViewpoint(caseId);
        await juryCaseVote(caseId, 0);
        await apiDelay(10000, 20000);
        if (opinionsData.list) {
          const vote = await voteOpinion(caseId, opinionsData.list);
          if (!vote) {
            err -= 1;
          }
        } else {
          const vote = await replenishVote(caseId, getRandomItem(TaskConfig.jury.vote));
          if (!vote) {
            err -= 1;
          }
        }
        continue;
      }
      juryLogger.warn(
        `获取风纪委员案件信息失败，错误码：【${caseCode}】，信息为：【${caseMessage}】`,
      );
      err -= 1;
      await apiDelay(20000, 40000);
    } catch (error) {
      juryLogger.error(`风纪委员投票异常，错误信息：${error}`);
    }
  }
  if (err < 0) {
    juryLogger.error(`错误次数过多，结束任务！`);
  }
}

/**
 * 模式2
 */
export async function mode2(err = 3) {
  const caseIdList = [];
  while (err > 0) {
    try {
      const { code: caseCode, data: caseData, message: caseMessage } = await getJuryCaseVote();
      if (caseCode === 25006) {
        juryLogger.warn(`${caseMessage}`);
        const r = await applyJury();
        if (r['code'] !== 0) {
          juryLogger.info(`${r}`);
          return;
        }
        continue;
      }
      if (caseCode === 25008) {
        juryLogger.info(`${caseMessage}`);
        if (!caseIdList.length && TaskConfig.jury.once) {
          juryLogger.info(`休眠30分钟后继续获取案件！`);
          await apiDelay(1800000);
        } else {
          for (const caseId of caseIdList) {
            // 删除 caseIdList 中的 caseId
            caseIdList.splice(caseIdList.indexOf(caseId), 1);
            if (err === 0) {
              juryLogger.error(`错误次数过多，结束任务！`);
              return;
            }
            if (!(await replenishVote(caseId, getRandomItem(TaskConfig.jury.vote)))) {
              err -= 1;
            }
            await apiDelay(10000, 20000);
          }
        }
        continue;
      }
      if (caseCode === 25014) {
        juryLogger.info(`${caseMessage}`);
        return;
      }
      if (caseCode === 0) {
        const caseId = caseData.case_id;
        const { data: opinionsData } = await getJuryCaseViewpoint(caseId);
        await juryCaseVote(caseId, 0);
        await apiDelay(10000, 20000);
        if (opinionsData.list) {
          if (!(await voteOpinion(caseId, opinionsData.list))) {
            err -= 1;
          }
        } else {
          caseIdList.push(caseId);
        }
        continue;
      }
      juryLogger.warn(`获取风纪委员案件失败，错误码：【${caseCode}】，信息为：【${caseMessage}】`);
      err -= 1;
      await apiDelay(20000, 40000);
    } catch (error) {
      juryLogger.error(`发生错误，错误信息为：${error}`);
      err -= 1;
      await apiDelay(20000, 40000);
    }
  }
  if (err < 0) {
    juryLogger.error(`错误次数过多，结束任务！`);
  }
}

/**
 * 开始投票
 */
export async function juryService() {
  const { mode } = TaskConfig.jury;
  try {
    if (mode === 1) {
      return await mode1();
    }
    if (mode === 2) {
      return await mode2();
    }
  } catch (error) {
    juryLogger.error(`发生错误，错误信息为：${error}`);
  }
}
