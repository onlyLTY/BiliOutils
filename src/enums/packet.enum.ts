export const PacketCmdEnum = {
  节奏风暴: 'NOTICE_MSG',
  弹幕消息: 'DANMU_MSG',
  红包开始: 'POPULARITY_RED_POCKET_START',
  红包中奖名单: 'POPULARITY_RED_POCKET_WINNER_LIST',
  公共通知: 'COMMON_NOTICE_DANMAKU',
  停止直播列表: 'STOP_LIVE_ROOM_LIST',
  热门排行改变: 'HOT_RANK_CHANGED_V2',
  观看数改变: 'WATCHED_CHANGE',
  交互: 'INTERACT_WORD',
  横幅活动: 'WIDGET_BANNER',
  免费流量包推广: 'SPREAD_SHOW_FEET_V2',
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

/**
 * ws 操作码
 */
export const OpType = {
  心跳: 2,
  接收cmd: 5,
  认证: 7,
};
