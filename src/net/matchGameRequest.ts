import { stringify } from 'qs';

import { biliApi } from './api';
import { GuessCollectionDto } from '../dto/matchGameDto';
import { ApiBaseProp } from '../dto/BiLiBaseProp';
import { TaskConfig } from '../config/globalVar';

const csrf = TaskConfig.BILIJCT;
const csrf_token = csrf;

/**
 * 获取比赛集合集合
 * @param stime 开始时间
 * @param etime 结束时间
 */
export async function getGuessCollection(stime = '', etime = ''): Promise<GuessCollectionDto> {
  const { data } = await biliApi.get(
    `/x/esports/guess/collection/question?pn=1&ps=50&gid=&sids=&stime=${stime}&etime=${etime}`,
  );
  return data;
}

/**
 * 预测
 * @param oid contestId
 * @param main_id questionId
 * @param detail_id team.detail_id
 * @param count 硬币数量
 */
export async function guessAdd(
  oid: number,
  main_id: number,
  detail_id: number,
  count: number,
): Promise<ApiBaseProp> {
  const postData = stringify({
    is_fav: 0,
    main_id,
    oid,
    detail_id,
    count,
    csrf,
    csrf_token,
  });
  const { data } = await biliApi.post('/x/esports/guess/add', postData);
  return data;
}
