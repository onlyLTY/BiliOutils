import type { LiveHeartERequest, LiveHeartXRequest } from '../types/LiveHeart';
import type { LiveHeartEDto } from '../dto/live.dto';
import { defHttp } from './api';

/**
 * 发送 E 请求
 */
export function postE(postData: LiveHeartERequest): Promise<LiveHeartEDto> {
  return defHttp.post('https://live-trace.bilibili.com/xlive/data-interface/v1/x25Kn/E', postData);
}

/**
 * 发送 X 请求
 */
export function postX(postData: LiveHeartXRequest): Promise<LiveHeartEDto> {
  return defHttp.post('https://live-trace.bilibili.com/xlive/data-interface/v1/x25Kn/X', postData);
}

/**
 * 不知道有啥用
 */
export function heartBeat() {
  return defHttp.get('https://api.live.bilibili.com/relation/v1/Feed/heartBeat');
}
