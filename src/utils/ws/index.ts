import type { RedPackListDto } from '@/dto/bili-ws.dto';
import WebSocket from 'ws';
import { TaskConfig } from '@/config/globalVar';
import { unzipSync } from 'zlib';
import { isNumber } from '../is';
import { getDanmuInfo } from '@/net/live.request';
import { PacketCmdEnum } from '@/enums/packet.enum';
import { logger } from '../log';
import { noWinRef } from '@/store/red-packet';
import { TextDecoder, TextEncoder } from 'util';

interface TimerOptions {
  timer?: NodeJS.Timeout;
  timeout?: NodeJS.Timeout;
}

function isRedPackWs(body: number | PacketBody): body is PacketBody<RedPackListDto> {
  return !isNumber(body) && body.cmd === PacketCmdEnum.红包中奖名单 && body.data.lot_id;
}

export const wsMap = new Map<number, WebSocket>();
const timerMap = new Map<number, TimerOptions>();

export function closeWs(roomid: number) {
  wsMap.get(roomid)?.close();
  wsMap.delete(roomid);
  clearWsTimer(roomid);
}

export function clearWs() {
  wsMap.forEach((ws, roomid) => {
    ws.close();
    clearWsTimer(roomid);
  });
  wsMap.clear();
  timerMap.clear();
}

export function addWs(room_id: number, ws: WebSocket) {
  // 取消旧的 ws
  wsMap.get(room_id)?.close();
  wsMap.set(room_id, ws);
}

function clearWsTimer(roomid: number) {
  const options = timerMap.get(roomid);
  if (options) {
    clearTimer(options);
    timerMap.delete(roomid);
  }
}

function clearTimer(options: TimerOptions) {
  const { timer, timeout } = options || {};
  timer && clearInterval(timer);
  timeout && clearTimeout(timeout);
}

interface PacketBody<T = any> {
  cmd: string;
  data: T;
}

interface Packet {
  packetLen: number;
  headerLen: number;
  ver: number;
  op: number;
  seq: number;
  body: (number | PacketBody)[];
}

async function getWsLink(room_id: number) {
  try {
    const { data } = await getDanmuInfo(room_id);
    return {
      token: data.token,
      uri: data.host_list?.[0].host,
    };
  } catch (error) {
    logger.error(error);
  }
}

export async function biliDmWs(room_id: number, time = 0) {
  const wsLink = await getWsLink(room_id);
  if (!wsLink) return;
  const json = {
    uid: TaskConfig.USERID,
    roomid: room_id,
    protover: 1,
    platform: 'web',
    clientver: '1.6.3',
    key: wsLink.token,
  };
  const ws = new WebSocket(`wss://${wsLink.uri || 'broadcastlv.chat.bilibili.com'}/sub`);

  // WebSocket 连接成功
  ws.addEventListener('open', () => {
    // console.log(`WebSocket：直播间${room_id}已连接，将在${time / 1000}秒后断开连接`);
    ws.send(getCertification(JSON.stringify(json)).buffer);
    // 心跳包的定时器
    timerMap.set(room_id, sendInterval());
  });

  // WebSocket 连接关闭
  ws.addEventListener('close', () => {
    // console.log(`WebSocket：直播间${room_id}连接已关闭`);
    clearWsTimer(room_id);
  });

  ws.addEventListener('error', () => {
    closeWs(room_id);
  });

  function sendInterval() {
    let timeout: NodeJS.Timeout | undefined = undefined;
    const timer = setInterval(() => {
      ws.send(formatDataView().buffer);
    }, 30000);
    if (time > 0) {
      timeout = setTimeout(() => {
        closeWs(room_id);
      }, time);
    }
    return { timer, timeout };
  }

  return ws;
}

export function bindMessageForRedPacket(ws: WebSocket, room_id: number, msgCallback?: () => void) {
  ws.addEventListener('message', evt => {
    // 对数据进行解码 decode方法
    const packet = decode(evt.data as Uint8Array);
    if (packet.op === 5) {
      packet?.body.forEach(body => {
        if (!isRedPackWs(body)) return;
        closeWs(room_id);
        const my = body.data.winner_info.find(item => item[0] === TaskConfig.USERID);
        if (my) {
          logger.debug(`直播间${room_id}，恭喜您获得${body.data.awards[my[3]].award_name}`);
          noWinRef.value = 0;
        }
        msgCallback && msgCallback();
      });
    }
  });
}

export function bindMessageForLottery(ws: WebSocket) {
  ws.addEventListener('message', () => {
    // console.log(evt.data);
  });
}

function str2bytes(str: string) {
  return Array.from(new TextEncoder().encode(str));
}

function readInt(buffer: Record<number, number>, start: number, len: number) {
  let result = 0;
  for (let i = len - 1; i >= 0; i--) {
    result += Math.pow(256, len - i - 1) * buffer[start + i];
  }
  return result;
}

function decode(buffer: Uint8Array) {
  const textDecoder = new TextDecoder('utf-8');
  const result: Packet = {
    packetLen: readInt(buffer, 0, 4),
    headerLen: readInt(buffer, 4, 2),
    ver: readInt(buffer, 6, 2),
    op: readInt(buffer, 8, 4),
    seq: readInt(buffer, 12, 4),
    body: [],
  };

  if (result.op === 5) {
    result.body = [];
    let offset = 0;
    while (offset < buffer.length) {
      const packetLen = readInt(buffer, offset, 4);
      const dataSlice = buffer.slice(offset + 16, offset + packetLen);
      let body: string;
      if (result.ver === 2) {
        body = textDecoder.decode(unzipSync(dataSlice));
      } else {
        body = textDecoder.decode(dataSlice);
      }
      // eslint-disable-next-line no-control-regex
      body?.split(/[\x00-\x1f]+/)?.forEach(item => {
        try {
          result.body.push(JSON.parse(item));
        } catch {}
      });
      offset += packetLen;
    }
  }
  return result;
}

function getCertification(json: string) {
  const bytes = str2bytes(json); // 字符串转bytes
  return formatDataView(
    {
      byteOffset: bytes.length,
      op: 7,
    },
    bytes,
  );
}

interface DataViewOptions {
  // 偏移量
  byteOffset?: number;
  // 协议版本: 0 - 3 （1 心跳及认证包正文不使用压缩）
  packVer?: number;
  // 操作码（封包类型） 2 心跳包
  op?: number;
  // sequence 次序
  seq?: number;
}

function formatDataView(
  { byteOffset, packVer = 1, op = 2, seq = 1 }: DataViewOptions = {},
  body?: number[],
) {
  let totalSize = 16;
  if (body && !byteOffset) {
    totalSize += body.length;
  } else if (byteOffset) {
    totalSize += byteOffset;
  }
  const dv = new DataView(new ArrayBuffer(totalSize));
  dv.setUint32(0, totalSize), // 封包总大小（头部大小 + 正文大小）
    dv.setUint16(4, 16), // 头部大小（一般为0x0010，16字节）
    dv.setUint16(6, packVer), // 协议版本: 0 - 3 （1 心跳及认证包正文不使用压缩）
    dv.setUint32(8, op), // 操作码（封包类型） 2 心跳包
    dv.setUint32(12, seq); // sequence，每次发包时向上递增
  body && body.forEach((d, i) => dv.setUint8(16 + i, d));
  return dv;
}
