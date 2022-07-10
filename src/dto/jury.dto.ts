import { ApiBaseProp } from './bili-base-prop';

/**
 * 个人仲裁信息
 */
export type JuryInfoDto = ApiBaseProp<{
  /** 总仲裁数量 */
  caseTotal: number;
  face: string;
  /**当前剩余天数 */
  restDays: number;
  /**当前裁决胜率 */
  rightRadio: number;
  /**是否具有资格 1:有 2:过期 */
  status: 1 | 2;
  uname: string;
}>;

export type JuryCaseDto = ApiBaseProp<{
  total: number;
  list: JuryCaseOpinion[];
}>;

export interface JuryCaseOpinion {
  opid: number;
  mid: number;
  uname: string;
  face: string;
  vote: number;
  vote_text: string;
  content: string;
  /** 匿名 */
  anonymous: 0 | 1;
  like: number;
  hate: number;
  like_status: number;
  vote_time: number;
  /** 会看  */
  insiders: 0 | 1;
}

export type JuryCaseNextDto = ApiBaseProp<{
  case_id: string;
}>;

export type JuryVotedCaseDto = ApiBaseProp<{
  total: number;
  list: JuryVotedCase[];
}>;

export interface JuryVotedCase {
  case_id: string;
  case_type: number;
  status: number;
  vote: number;
  vote_text: string;
  vote_time: number;
}
