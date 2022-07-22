import { DoubleMessageProp } from './bili-base-prop';

export interface SessionDto {
  code: number;
  msg: string;
  message: string;
  ttl: number;
  data: SessionlistData;
}

interface SessionlistData {
  session_list: Sessionlist[];
  has_more: number;
  anti_disturb_cleaning: boolean;
  is_address_list_empty: number;
  show_level: boolean;
}

export interface Sessionlist {
  talker_id: number;
  session_type: number;
  at_seqno: number;
  top_ts: number;
  group_name: string;
  group_cover: string;
  is_follow: number;
  is_dnd: number;
  ack_seqno: number;
  ack_ts: number;
  session_ts: number;
  unread_count: number;
  last_msg: Lastmsg;
  group_type: number;
  can_fold: number;
  status: number;
  max_seqno: number;
  new_push_msg: number;
  setting: number;
  is_guardian: number;
  is_intercept: number;
  is_trust: number;
  system_msg_type: number;
  live_status: number;
  biz_msg_unread_count: number;
  user_label?: any;
}

interface Lastmsg {
  sender_uid: number;
  receiver_type: number;
  receiver_id: number;
  msg_type: number;
  content: string;
  msg_seqno: number;
  timestamp: number;
  at_uids?: any;
  msg_key: number;
  msg_status: number;
  notify_code: string;
  new_face_version: number;
}

export type SessionHistoryDto = DoubleMessageProp<{
  messages: SessionMessageDto[];
  has_more: number;
  min_seqno: number;
  max_seqno: number;
}>;

export interface SessionMessageDto {
  sender_uid: number;
  receiver_type: number;
  receiver_id: number;
  msg_type: number;
  content: string;
  msg_seqno: number;
  timestamp: number;
  at_uids: number[];
  msg_key: number;
  msg_status: number;
  notify_code: string;
  new_face_version: number;
}

/**
 * message type 10
 */
export interface SessionMessage10Dto {
  title: string;
  text: string;
  jump_text: string;
  jump_uri: string;
  modules?: any;
  jump_text_2: string;
  jump_uri_2: string;
  jump_text_3: string;
  jump_uri_3: string;
  notifier?: any;
  jump_uri_config: {
    all_uri: string;
    text: string;
  };

  jump_uri_2_config: {
    text: string;
  };
  jump_uri_3_config: {
    text: string;
  };
  biz_content?: any;
}

/**
 * message type 1
 */
export interface SessionMessage1Dto {
  content: string;
}
