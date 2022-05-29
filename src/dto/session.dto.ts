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

interface Sessionlist {
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
