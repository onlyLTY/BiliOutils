export const JuryVote = {
  1: '合适',
  2: '一般',
  3: '不合适',
  4: '无法判断',
  11: '好',
  12: '普通',
  13: '差',
  14: '无法判断',
};

/**
 * 投票返回结果
 */
export const JuryVoteResult = {
  UNKNOWN: -2,
  ERROR: -1,
  SUCCESS: 0,
  NO_OPINION: 1,
  /** Opinion 太少 */
  FEW_OPINION: 2,
} as const;

/**
 * 获取 vote 返回结果
 */
export const VoteResCode = {
  成功: 0,
  没有资格: 25005,
  资格过期: 25006,
  没有新案件: 25008,
  已完成: 25014,
} as const;
