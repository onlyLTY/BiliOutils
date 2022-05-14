import { biliApi } from './api';
import { GuessCollectionDto } from '../dto/match-game.dto';
import { ApiBaseProp } from '../dto/bili-base-prop';
import { TaskConfig } from '../config/globalVar';

const csrf = TaskConfig.BILIJCT;
const csrf_token = csrf;

/**
 * 获取比赛集合
 * @param stime 开始时间
 * @param etime 结束时间
 */
export function getGuessCollection(stime = '', etime = ''): Promise<GuessCollectionDto> {
  return biliApi.get(
    `/x/esports/guess/collection/question?pn=1&ps=50&gid=&sids=&stime=${stime}&etime=${etime}`,
  );
}

/**
 * 预测
 * @param oid contestId
 * @param main_id questionId
 * @param detail_id team.detail_id
 * @param count 硬币数量
 */
export function guessAdd(
  oid: number,
  main_id: number,
  detail_id: number,
  count: number,
): Promise<ApiBaseProp> {
  const postData = {
    is_fav: 0,
    main_id,
    oid,
    detail_id,
    count,
    csrf,
    csrf_token,
  };
  return biliApi.post('/x/esports/guess/add', postData);
}
