export const SeedMessageResult = {
  Success: 0,
  // 不可抗力
  Unresistant: 11000,
  // 发送过于频繁
  TooFrequently: 10030,
  // 未知
  Unknown: -1,
} as const;
