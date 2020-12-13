import { ApiAbstract } from './BiLiAbstractClass';

/**
 * 个人仲裁信息
 */
export class JuryInfoDto extends ApiAbstract {
  'data'?: {
    /** 总总裁数量 */
    caseTotal: number;
    face: string;
    /**当前剩余天数 */
    restDays: number;
    /**当前裁决胜率 */
    rightRadio: number;
    /**是否具有资格 1:有 2:过期 */
    status: 1 | 2;
    uname: string;
  };
}

/**
 * 仲裁内容
 */
export class juryCaseDto extends ApiAbstract {
  data;
}
