/**
 * 石头剪刀布手势
 */
export const RPS = {
  石头: 1,
  剪刀: 2,
  布: 3,
  0: '错误',
  1: '石头',
  2: '剪刀',
  3: '布',
} as const;

/**
 * 猜拳输赢
 */
export const RPSResult = {
  输: 1,
  赢: 2,
  平: 3,
  1: '输',
  2: '赢',
  3: '平',
} as const;

/**
 * 回合输赢
 */
export const RoundResult = {
  赢: 1,
  输: 2,
  1: '赢',
  2: '输',
} as const;
