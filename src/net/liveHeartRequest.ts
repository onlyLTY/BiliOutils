import { stringify } from 'qs';

import axios from '.';
import { LiveHeartERequest, LiveHeartXRequest } from '../interface/LiveHeart';
import { LiveHeartEDto } from '../dto/Live.dto';

/**
 * 发送 E 请求
 */
export async function postE(postData: LiveHeartERequest): Promise<LiveHeartEDto> {
  const { data } = await axios.post(
    'https://live-trace.bilibili.com/xlive/data-interface/v1/x25Kn/E',
    stringify(postData),
  );
  return data;
}

/**
 * 发送 X 请求
 */
export async function postX(postData: LiveHeartXRequest): Promise<LiveHeartEDto> {
  const { data } = await axios.post(
    'https://live-trace.bilibili.com/xlive/data-interface/v1/x25Kn/X',
    stringify(postData),
  );
  return data;
}

/**
 * 不知道有啥用
 */
export async function heartBeat() {
  const { data } = await axios.get('https://api.live.bilibili.com/relation/v1/Feed/heartBeat');
  return data;
}
