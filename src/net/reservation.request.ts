import type { ReservationDto, ReserveButtonDto } from '@/dto/reservation.dto';
import type { ApiBaseProp } from '@/dto/bili-base-prop';
import { TaskConfig } from '@/config/globalVar';
import { OriginURLs } from '@/constant/biliUri';
import { biliApi, vcApi } from './api';

function getHeader(vmid: number | string) {
  return {
    origin: OriginURLs.space,
    referer: OriginURLs.space + `/${vmid}/`,
  };
}

/**
 * 获取预约列表
 */
export function reservation(vmid: number | string) {
  return biliApi.get<ReservationDto>(`x/space/reservation?vmid=${vmid}`, {
    headers: getHeader(vmid),
  });
}

/**
 * 预约
 * 75077 重复参加活动!
 */
export function reserve(sid: number, vmid?: number | string) {
  return biliApi.post<Omit<ApiBaseProp, 'data'>>(
    `x/space/reserve`,
    { sid, csrf: TaskConfig.BILIJCT, jsonp: 'jsonp' },
    { headers: getHeader(vmid || TaskConfig.USERID) },
  );
}
(async () => {
  console.log(JSON.stringify(await reservation(36081646)));
  console.log(JSON.stringify(await reserve(1199852)));
})();

// http://api.bilibili.com/x/space/reservation?vmid=36081646
// {
//   "code": 0,
//   "message": "0",
//   "ttl": 1,
//   "data": [
//   {
//   "sid": 1199852,
//   "name": "预告：【洛天依】用阿卡贝拉的方式打开经典《茉莉花》",
//   "total": 3810,
//   "stime": 1672060198,
//   "etime": 2147454847,
//   "is_follow": 0,
//   "state": 120,
//   "oid": "904264736",
//   "type": 1,
//   "up_mid": 36081646,
//   "reserve_record_ctime": 0,
//   "live_plan_start_time": 1672131600,
//   "show_total": true,
//   "subtitle": "",
//   "attached_badge_text": ""
//   }
//   ]
//   }

/**
 * 预约2/取消预约
 * @param cur_btn_status 1 预约 2 取消预约
 * @default 1
 */
export function reserveAttachCardButton(
  reserve_id: number,
  reserve_total: number,
  cur_btn_status: 1 | 2 = 1,
) {
  return vcApi.post<ReserveButtonDto>(
    `dynamic_mix/v1/dynamic_mix/reserve_attach_card_button`,
    { csrf: TaskConfig.BILIJCT, cur_btn_status, reserve_id, reserve_total },
    {
      headers: {
        origin: OriginURLs.www,
      },
    },
  );
}
