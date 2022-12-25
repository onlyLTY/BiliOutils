import type { LiveRoomList } from '@/dto/live.dto';
import { PendentID } from '@/enums/live-lottery.enum';
import { getArea, getLiveRoom } from '@/net/live.request';
import { sleep, logger } from '@/utils';

interface LiveAreaType {
  areaId: string;
  parentId: string;
}

/**
 * 分类检测
 */
function pendentLottery(list: LiveRoomList[]) {
  const lotteryTime: LiveRoomList[] = [],
    lotteryPacket: LiveRoomList[] = [];
  list.forEach(item => {
    const num2 = item.pendant_info['2'];
    if (!num2) {
      return;
    }
    if (num2.pendent_id === PendentID.Time) {
      lotteryTime.push(item);
    } else if (num2.pendent_id === PendentID.RedPacket) {
      lotteryPacket.push(item);
    }
  });
  return { lotteryTime, lotteryPacket };
}

/**
 * 获取直播分区
 * @description 之所以是二维数组，是为了方便后面的递归，如果全部数据整合到一个数组中，会导致数据量过大，天选超时了可能都没请求完
 */
export async function getLiveArea(): Promise<LiveAreaType[][]> {
  try {
    const { data, code, message } = await getArea();
    if (code !== 0) {
      logger.info(`获取直播分区失败: ${code}-${message}`);
    }
    return data.data
      .map(item => item.list)
      .map(item => item.map(area => ({ areaId: area.id, parentId: area.parent_id })));
  } catch (error) {
    logger.error(`获取直播分区异常：`, error);
    throw error;
  }
}

/**
 * 获取直播间列表
 * @param areaId
 * @param parentId
 * @param page
 */
export async function getLotteryRoomList(
  areaId: string,
  parentId: string,
  page = 1,
  lotType: 'lottery' | 'redPack' = 'lottery',
): Promise<LiveRoomList[]> {
  try {
    await sleep(100);
    const { data, code, message } = await getLiveRoom(parentId, areaId, page);
    if (code !== 0) {
      logger.info(`获取直播间列表失败: ${code}-${message}`);
    }
    return pendentLottery(data.list)[lotType === 'lottery' ? 'lotteryTime' : 'lotteryPacket'];
  } catch (error) {
    logger.error(`获取直播间列表异常：`, error);
    throw error;
  }
}
