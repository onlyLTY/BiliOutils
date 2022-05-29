import { TaskConfig } from '@/config/globalVar';
import { OriginURLs } from '@/constant/biliUri';
import type { SessionDto } from '@/dto/session.dto';
import { vcApi } from './api';

/**
 * 获取会话
 */
export function getSession({ session_type } = { session_type: 1 }) {
  return vcApi.get<SessionDto>(
    `/session_svr/v1/session_svr/get_sessions?session_type=${session_type}&group_fold=1&unfollow_fold=1&sort_rule=2&build=0&mobi_app=web`,
  );
}

/**
 * 读取会话
 */
export function readSession({
  talker_id,
  session_type,
  ack_seqno,
}: {
  talker_id: string;
  session_type: number;
  ack_seqno: string;
}) {
  return vcApi.post(
    '/session_svr/v1/session_svr/update_ack',
    {
      talker_id,
      session_type,
      ack_seqno,
      build: 0,
      mobi_app: 'web',
      csrf_token: TaskConfig.BILIJCT,
      csrf: TaskConfig.BILIJCT,
    },
    {
      headers: {
        origin: OriginURLs.message,
      },
    },
  );
}

/**
 * 删除会话
 */
export function deleteSession({
  talker_id,
  session_type,
}: {
  talker_id: number;
  session_type: number;
}) {
  return vcApi.post('/session_svr/v1/session_svr/remove_session', {
    talker_id,
    session_type,
    build: 0,
    mobi_app: 'web',
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT,
  });
}
