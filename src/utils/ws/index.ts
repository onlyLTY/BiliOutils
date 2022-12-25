import { unzipSync } from 'zlib';
import { OpType } from '@/enums/packet.enum';
import { TextDecoder, TextEncoder } from 'util';

export interface PacketBody<T = any> {
  cmd: string;
  data: T;
}

export interface Packet {
  packetLen: number;
  headerLen: number;
  ver: number;
  op: number;
  seq: number;
  body: (number | PacketBody)[];
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

export function decode(buffer: Uint8Array) {
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

export function getCertification(json: string) {
  const bytes = str2bytes(json); // 字符串转bytes
  return formatDataView(
    {
      byteOffset: bytes.length,
      op: OpType.认证,
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

export function formatDataView(
  { byteOffset, packVer = 1, op = OpType.心跳, seq = 1 }: DataViewOptions = {},
  body?: number[],
) {
  let totalSize = 16;
  if (body && !byteOffset) {
    totalSize += body.length;
  } else if (byteOffset) {
    totalSize += byteOffset;
  }
  const dv = new DataView(new ArrayBuffer(totalSize));
  dv.setUint32(0, totalSize); // 封包总大小（头部大小 + 正文大小）
  dv.setUint16(4, 16); // 头部大小（一般为0x0010，16字节）
  dv.setUint16(6, packVer); // 协议版本: 0 - 3 （1 心跳及认证包正文不使用压缩）
  dv.setUint32(8, op); // 操作码（封包类型） 2 心跳包
  dv.setUint32(12, seq); // sequence，每次发包时向上递增
  body && body.forEach((d, i) => dv.setUint8(16 + i, d));
  return dv.buffer;
}
