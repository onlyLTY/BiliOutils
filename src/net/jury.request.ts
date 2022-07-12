import type { ApiBaseProp } from '@/dto/bili-base-prop';
import type {
  JuryCaseOpinionDto,
  JuryCaseNextDto,
  JuryInfoDto,
  JuryVotedCaseDto,
  JuryCaseInfoDto,
} from '@/dto/jury.dto';
import { TaskConfig } from '@/config/globalVar';
import { biliApi } from './api';
import { OriginURLs, RefererURLs } from '@/constant/biliUri';

function getCaseDetailHeader(case_id: string) {
  return {
    Origin: OriginURLs.www,
    Referer: `${RefererURLs.judge}case-detail/${case_id}`,
  };
}

/**
 * 获取当前账户风纪委员状态
 */
export function getJury() {
  return biliApi.get<JuryInfoDto>('x/credit/v2/jury/jury', {
    headers: {
      Origin: OriginURLs.www,
      Referer: RefererURLs.judge,
    },
  });
}

/**
 * 申请风纪委员资格
 */
export function applyJury() {
  return biliApi.post<ApiBaseProp>(
    'x/credit/v2/jury/apply',
    {
      csrf: TaskConfig.BILIJCT,
    },
    {
      headers: {
        Origin: OriginURLs.www,
      },
    },
  );
}

/**
 * 获取风纪委员案件信息
 */
export function getJuryCase(case_id: string) {
  return biliApi.get<JuryCaseInfoDto>(`x/credit/v2/jury/case/info?case_id=${case_id}`, {
    headers: getCaseDetailHeader(case_id),
  });
}

/**
 * 拉取一个案件用于风纪委员投票
 */
export function getJuryCaseVote() {
  return biliApi.get<JuryCaseNextDto>(`x/credit/v2/jury/case/next?csrf=${TaskConfig.BILIJCT}`, {
    headers: {
      Origin: OriginURLs.www,
      Referer: RefererURLs.judge + 'index',
    },
  });
}

/**
 * 获取风纪委员案件众议观点
 */
export function getJuryCaseViewpoint(case_id: string) {
  return biliApi.get<JuryCaseOpinionDto>(
    `x/credit/v2/jury/case/opinion?case_id=${case_id}&pn=1&ps=20`,
    {
      headers: getCaseDetailHeader(case_id),
    },
  );
}

/**
 * 风纪委员案件投票
 */
export function juryCaseVote(case_id: string, vote: number, insiders = 0, anonymous = 0) {
  return biliApi.post<ApiBaseProp<undefined>>(
    'x/credit/v2/jury/vote',
    {
      case_id,
      vote,
      csrf: TaskConfig.BILIJCT,
      insiders,
      anonymous,
    },
    {
      headers: getCaseDetailHeader(case_id),
    },
  );
}

/**
 * 获取最近20条已投票案件
 */
export function getJuryCaseList() {
  return biliApi.get<JuryVotedCaseDto>('x/credit/v2/jury/case/list?pn=1&ps=20', {
    headers: {
      Origin: OriginURLs.www,
      Referer: RefererURLs.judge + 'index',
    },
  });
}
