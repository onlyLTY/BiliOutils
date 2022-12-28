import { ApiBaseProp } from './bili-base-prop';

/**
 * 比赛集合
 */
export interface GuessCollectionDto extends ApiBaseProp {
  data: {
    list: {
      contest: {
        id: number;
      };
      questions: [
        {
          id: number;
          /** 竞猜标题，eg xxx vs xxx */
          title: string;
          stake_type: number;
          /** 是否已经竞猜 0 未 */
          is_guess: number;
          details: GuessDetails[];
          guess_season: unknown;
        },
      ];
    }[];
    page: { num: number; size: number; total: number };
  };
}

export interface GuessDetails {
  /** id */
  detail_id: number;
  /** 赔率 float*/
  odds: number;
  team_id: number;
  /** 队伍名称 */
  option: string;
  stake: number;
  income: number;
  correct: number;
}
