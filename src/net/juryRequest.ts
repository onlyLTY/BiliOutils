import { TaskConfig } from '../config/globalVar';
import { stringify } from 'qs';
import {
  JuryCaseInfoDto,
  JuryCaseObtainDto,
  JuryInfoDto,
  JuryVoteDto,
  JuryVoteOpinionDto,
} from '../dto/Jury.dto';
import { biliApi } from './api';
import { JuryVoteOption } from '../interface/Jury';

/**
 * 获取个人仲裁信息
 */
export async function juryInfo(): Promise<JuryInfoDto> {
  const { data } = await biliApi.get('/x/credit/jury/jury');
  return data;
}

/**
 * 获取一个案件
 */
export async function juryCaseObtain(): Promise<JuryCaseObtainDto> {
  const { data } = await biliApi.post(
    '/x/credit/jury/caseObtain',
    stringify({
      csrf: TaskConfig.BILIJCT,
    }),
  );
  return data;
}

/**
 * 获取仲裁案件的详情
 * @param cid 仲裁案件id
 */
export async function juryCaseInfo(
  cid: number | string,
): Promise<JuryCaseInfoDto> {
  const { data } = await biliApi.get('/x/credit/jury/caseInfo', {
    params: {
      cid,
    },
  });
  return data;
}

/**
 * 给仲裁案件投票
 * @param cid 仲裁案件id
 * @param options 详细的投票信息
 */
export async function juryVote(
  cid: number | string,
  options?: JuryVoteOption,
): Promise<JuryVoteDto> {
  const { data } = await biliApi.post(
    '/x/credit/jury/vote',
    stringify({
      cid,
      csrf: TaskConfig.BILIJCT,
      ...options,
    }),
  );
  return data;
}

/**
 *
 * @param cid 仲裁案件id
 * @param otype 意见类型 1 支持删除 2 支持保留
 * @param pageNumber
 * @param pageSize
 */
export async function juryVoteOpinion(
  cid: number | string,
  otype: 1 | 2,
  pageNumber?,
  pageSize?,
): Promise<JuryVoteOpinionDto> {
  const { data } = await biliApi.get('/x/credit/jury/vote/opinion', {
    params: {
      pn: pageNumber,
      ps: pageSize,
      cid,
      otype,
    },
  });
  return data;
}
