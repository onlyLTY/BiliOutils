import type { ApiBaseProp } from '@/dto/bili-base-prop';
import type { JuryCaseDto, JuryCaseNextDto, JuryInfoDto, JuryVotedCaseDto } from '@/dto/jury.dto';
import { TaskConfig } from '@/config/globalVar';
import { biliApi } from './api';

/**
 * 获取当前账户风纪委员状态
 */
export function getJury() {
  return biliApi.get<JuryInfoDto>('x/credit/v2/jury/jury');
}

/**
 * 申请风纪委员资格
 */
export function applyJury() {
  return biliApi.post<ApiBaseProp>('x/credit/v2/jury/apply', {
    csrf: TaskConfig.BILIJCT,
  });
}

/**
 * 获取风纪委员案件信息
 */
export function getJuryCase(case_id: string) {
  return biliApi.get<ApiBaseProp>(`x/credit/v2/jury/case/info?case_id=${case_id}`);
}

/**
 * 拉取一个案件用于风纪委员投票
 */
export function getJuryCaseVote() {
  return biliApi.get<JuryCaseNextDto>(`x/credit/v2/jury/case/next?csrf=${TaskConfig.BILIJCT}`);
}

/**
 * 获取风纪委员案件众议观点
 */
export function getJuryCaseViewpoint(case_id: string) {
  return biliApi.get<JuryCaseDto>(`x/credit/v2/jury/case/opinion?case_id=${case_id}&pn=1&ps=20`);
}

/**
 * 风纪委员案件投票
 */
export function juryCaseVote(case_id: string, vote: number, insiders = 0, anonymous = 0) {
  return biliApi.post<ApiBaseProp>('x/credit/v2/jury/vote', {
    case_id,
    vote,
    csrf: TaskConfig.BILIJCT,
    insiders,
    anonymous,
  });
}

/**
 * 获取最近20条已投票案件
 */
export function getJuryCaseList() {
  return biliApi.get<JuryVotedCaseDto>('x/credit/v2/jury/case/list?pn=1&ps=20');
}
