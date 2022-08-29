export const PacketCmdEnum = {
  节奏风暴: 'NOTICE_MSG',
  弹幕消息: 'DANMU_MSG',
  红包开始: 'POPULARITY_RED_POCKET_START',
  红包中奖名单: 'POPULARITY_RED_POCKET_WINNER_LIST',
};

/**
 * 状态枚举
 */
export const ReturnStatus = {
  退出: 0,
  中场休眠: -1,
  风控休眠: -2,
  未获取到房间: -3,
};
