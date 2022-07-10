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
import { apiDelay, getRandomItem, logger } from '@/utils';

/**
 * 获取最多观点
 */
export function getMoreOpinion(caseId: string, opinions: JuryCaseOpinion[]) {
  const opinionStatistics: Record<string, number> = {};
  for (const opinion of opinions) {
    if (Reflect.has(opinionStatistics, opinion['vote'])) {
      opinionStatistics[opinion['vote']] += 1;
    } else {
      opinionStatistics[opinion['vote']] = 1;
    }
  }
  // 获取最多的 key 值
  const mostOpinion = +Object.entries(opinionStatistics).find(
    ([_, val]) => val === Math.max(...Object.values(opinionStatistics)),
  )[0];

  logger.debug(`【${caseId}】的观点分布（观点id: 投票人数）${JSON.stringify(opinionStatistics)}`);
  return opinions.filter(opinion => opinion['vote'] === mostOpinion);
}

/**
 * 观点投票
 */
export async function voteOpinion(caseId: string, opinions: any[]) {
  try {
    const mostOpinion = getMoreOpinion(caseId, opinions);
    const opinion = getRandomItem(mostOpinion);
    logger.info(`为【${caseId}】选择了【${opinion['vote_text']}】（${opinion['vote']}）`);
    const { code, message } = await juryCaseVote(caseId, opinion['vote']);
    if (code !== 0) {
      logger.warn(`风纪委员投票失败，错误码：【${code}】，信息为：【${message}】`);
      return false;
    }
    logger.info(
      `成功根据【${opinion['uname']}】的观点为案件【${caseId}】投下【${opinion['vote_text']}】`,
    );
    return true;
  } catch (error) {
    logger.error(`风纪委员投票失败，错误信息：${error}`);
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
      const vote = await juryCaseVote(caseId, info['data']['vote_items'][defaultVote]['vote']);
      if (vote['code'] === 0) {
        logger.info(
          `成功根据【配置文件】为案件【${caseId}】投下【${info['data']['vote_items'][defaultVote]['vote_text']}】`,
        );
        return true;
      }
      logger.warn(`风纪委员投票失败，错误码：【${vote['code']}】，信息为：【${vote['message']}】`);
      return false;
    }
    logger.error(
      `获取风纪委员案件信息失败，错误码：【${info['code']}】，信息为：【${info['message']}】`,
    );
    return false;
  } catch (error) {
    logger.error(`风纪委员投票异常，错误信息：${error}`);
  }
  return false;
}

/**
 * 模式 1
 */
export async function mode1(err = 3) {
  for (; err > 0; ) {
    try {
      const next = await getJuryCaseVote();
      if (next['code'] === 0) {
        const caseId = next['data']['case_id'];
        const opinions = await getJuryCaseViewpoint(caseId);
        await juryCaseVote(caseId, 0);
        await apiDelay(10000, 20000);
        if (opinions['data']['list']) {
          const vote = await voteOpinion(caseId, opinions['data']['list']);
          if (!vote) {
            err -= 1;
          }
        } else {
          const vote = await replenishVote(caseId, getRandomItem(TaskConfig.jury.vote));
          if (!vote) {
            err -= 1;
          }
        }
      } else if (next['code'] === 25014) {
        logger.info(`${next['message']}`);
        return;
      } else if (next['code'] === 25008) {
        logger.info(`${next['message']}`);
        if (TaskConfig.jury.once) {
          logger.info(`休眠30分钟后继续获取案件！`);
          await apiDelay(1800000);
        } else {
          return;
        }
      } else if (next['code'] === 25006) {
        logger.warn(`${next['message']}`);
        const r = await applyJury();
        if (r['code'] !== 0) {
          logger.info(`${r}`);
          return;
        }
      } else {
        logger.warn(
          `获取风纪委员案件信息失败，错误码：【${next['code']}】，信息为：【${next['message']}】`,
        );
        err -= 1;
        await apiDelay(20000, 40000);
      }
    } catch (error) {
      logger.error(`风纪委员投票异常，错误信息：${error}`);
    }
  }
  logger.error(`错误次数过多，结束任务！`);
  return;
}

/**
 * 模式2
 */
export async function mode2(err = 3) {
  const caseIdList = [];
  for (; err > 0; ) {
    try {
      const next = await getJuryCaseVote();
      if (next['code'] === 0) {
        const caseId = next['data']['case_id'];
        const opinions = await getJuryCaseViewpoint(caseId);
        await juryCaseVote(caseId, 0);
        await apiDelay(10000, 20000);
        if (opinions['data']['list']) {
          if (!(await voteOpinion(caseId, opinions['data']['list']))) {
            err -= 1;
          }
        } else {
          caseIdList.push(caseId);
        }
      } else if (next['code'] === 25014) {
        logger.info(`${next['message']}`);
        return;
      } else if (next['code'] === 25008) {
        logger.info(`${next['message']}`);
        if (!caseIdList.length && TaskConfig.jury.once) {
          logger.info(`休眠30分钟后继续获取案件！`);
          await apiDelay(1800000);
        } else {
          for (const caseId of caseIdList) {
            // 删除 caseIdList 中的 caseId
            caseIdList.splice(caseIdList.indexOf(caseId), 1);
            if (err === 0) {
              logger.error(`错误次数过多，结束任务！`);
              return;
            }
            if (!(await replenishVote(caseId, getRandomItem(TaskConfig.jury.vote)))) {
              err -= 1;
            }
            await apiDelay(10000, 20000);
          }
        }
      } else if (next['code'] === 25006) {
        logger.warn(`${next['message']}`);
        const r = await applyJury();
        if (r['code'] !== 0) {
          logger.info(`${r}`);
          return;
        }
      } else {
        logger.warn(
          `获取风纪委员案件失败，错误码：【${next['code']}】，信息为：【${next['message']}】`,
        );
        err -= 1;
        await apiDelay(20000, 40000);
      }
    } catch (error) {
      logger.error(`发生错误，错误信息为：${error}`);
      err -= 1;
      await apiDelay(20000, 40000);
    }
  }
  logger.error(`错误次数过多，结束任务！`);
  return;
}

/**
 * 开始投票
 */
export async function juryService() {
  try {
    if (TaskConfig.jury.mode === 1) {
      await mode1();
    } else if (TaskConfig.jury.mode === 2) {
      await mode2();
    }
  } catch (error) {
    logger.error(`发生错误，错误信息为：${error}`);
  }
}
