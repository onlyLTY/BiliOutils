import WebSocket from 'ws';
import { TaskConfig } from '@/config/globalVar';
import { unzipSync } from 'zlib';
import { isNumber } from '../is';
import { getDanmuInfo } from '@/net/live.request';
import { PacketCmdEnum } from '@/enums/packet.enum';

interface TimerOptions {
  timer?: NodeJS.Timeout;
  timeout?: NodeJS.Timeout;
}

export const wsList = new Set<WebSocket>();
const timerMap = new Map<WebSocket, TimerOptions>();

export function closeWs(ws: WebSocket) {
  ws.close();
  wsList.delete(ws);
  clearWsTimer(ws);
}

export function clearWs() {
  wsList.forEach(ws => {
    ws.close();
    clearWsTimer(ws);
  });
  wsList.clear();
  timerMap.clear();
}

function clearWsTimer(ws: WebSocket) {
  const options = timerMap.get(ws);
  clearTimer(options || {});
  timerMap.delete(ws);
}

function clearTimer(options: TimerOptions) {
  const { timer, timeout } = options || {};
  timer && clearInterval(timer);
  timeout && clearTimeout(timeout);
}

interface PacketBody {
  cmd: string;
  data: any[];
}

interface Packet {
  packetLen: number;
  headerLen: number;
  ver: number;
  op: number;
  seq: number;
  body: (number | PacketBody)[];
}

export async function biliWS(room_id = 7734200, time = 0) {
  const { data } = await getDanmuInfo(room_id);
  const json = {
    uid: TaskConfig.USERID,
    roomid: room_id,
    protover: 1,
    platform: 'web',
    clientver: '1.6.3',
    key: data.token,
  };
  const ws = new WebSocket('wss://broadcastlv.chat.bilibili.com/sub');
  // const ws = new WebSocket('wss://hw-gz-live-comet-01.chat.bilibili.com/sub');

  // WebSocket 连接成功
  ws.addEventListener('open', () => {
    console.log(`WebSocket：直播间${room_id}已连接，将在${time / 1000}秒后断开连接`);
    ws.send(getCertification(JSON.stringify(json)).buffer);
    // 心跳包的定时器
    timerMap.set(ws, sendInterval());
  });

  // WebSocket 连接关闭
  ws.addEventListener('close', () => {
    console.log(`WebSocket：直播间${room_id}连接已关闭`);
  });

  ws.addEventListener('error', () => {
    closeWs(ws);
  });

  //WebSocket 接收数据
  ws.addEventListener('message', evt => {
    //对数据进行解码 decode方法
    const packet = decode(evt.data as Uint8Array);
    if (packet.op === 5) {
      packet?.body.forEach(body => {
        if (!isNumber(body) && body.cmd === PacketCmdEnum.红包中奖名单) {
          closeWs(ws);
          console.log(body.data);
        }
      });
    }
  });

  function sendInterval() {
    let timeout: NodeJS.Timer | undefined = undefined;
    const timer = setInterval(() => {
      console.log(`WebSocket：直播间${room_id}心跳包发送中`);
      ws.send(formatDataView().buffer);
    }, 30000);
    if (time > 0) {
      timeout = setTimeout(() => {
        console.log(`定时关闭连接${room_id}`);
        closeWs(ws);
      }, time);
    }
    return { timer, timeout };
  }

  return ws;
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
