import { readFileSync } from 'fs';
import { resolve } from 'path';
import { toVarint } from '@/utils/http/protobuf';

async function instantiate(module, imports = {} as any) {
  const __module0 = imports.index;
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
      'Date.now': Date.now,
    }),
    index: Object.assign(Object.create(__module0), {
      toVarint(i) {
        return (
          __lowerArray(
            (pointer, value) => {
              new Int32Array(memory.buffer)[pointer >>> 2] = value;
            },
            3,
            2,
            __module0.toVarint(i),
          ) || __notnull()
        );
      },
    }),
  };
  const {
    instance: { exports },
    // @ts-ignore
  } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf(
    {
      createDataFlow(mangaId, mangaNum, u) {
        mangaId = __retain(__lowerString(mangaId) || __notnull());
        mangaNum = __retain(__lowerString(mangaNum) || __notnull());
        u = __lowerString(u) || __notnull();
        try {
          return __liftArray(
            pointer => new Int32Array(memory.buffer)[pointer >>> 2],
            2,
            exports.createDataFlow(mangaId, mangaNum, u) >>> 0,
          );
        } finally {
          __release(mangaId);
          __release(mangaNum);
        }
      },
    },
    exports,
  );
  function __liftString(pointer) {
    if (!pointer) return null;
    const end = (pointer + new Uint32Array(memory.buffer)[(pointer - 4) >>> 2]) >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let start = pointer >>> 1,
      string = '';
    while (end - start > 1024)
      string += String.fromCharCode(...memoryU16.subarray(start, (start += 1024)));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __lowerString(value) {
    if (value == null) return 0;
    const length = value.length,
      pointer = exports.__new(length << 1, 1) >>> 0,
      memoryU16 = new Uint16Array(memory.buffer);
    for (let i = 0; i < length; ++i) memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
    return pointer;
  }
  function __liftArray(liftElement, align, pointer) {
    if (!pointer) return null;
    const memoryU32 = new Uint32Array(memory.buffer),
      dataStart = memoryU32[(pointer + 4) >>> 2],
      length = memoryU32[(pointer + 12) >>> 2],
      values = new Array(length);
    for (let i = 0; i < length; ++i) values[i] = liftElement(dataStart + ((i << align) >>> 0));
    return values;
  }
  function __lowerArray(lowerElement, id, align, values) {
    if (values == null) return 0;
    const length = values.length,
      buffer = exports.__pin(exports.__new(length << align, 0)) >>> 0,
      header = exports.__pin(exports.__new(16, id)) >>> 0,
      memoryU32 = new Uint32Array(memory.buffer);
    memoryU32[(header + 0) >>> 2] = buffer;
    memoryU32[(header + 4) >>> 2] = buffer;
    memoryU32[(header + 8) >>> 2] = length << align;
    memoryU32[(header + 12) >>> 2] = length;
    for (let i = 0; i < length; ++i) lowerElement(buffer + ((i << align) >>> 0), values[i]);
    exports.__unpin(buffer);
    exports.__unpin(header);
    return header;
  }
  const refcounts = new Map();
  function __retain(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount) refcounts.set(pointer, refcount + 1);
      else refcounts.set(exports.__pin(pointer), 1);
    }
    return pointer;
  }
  function __release(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount === 1) exports.__unpin(pointer), refcounts.delete(pointer);
      else if (refcount) refcounts.set(pointer, refcount - 1);
      else throw Error(`invalid refcount '${refcount}' for reference '${pointer}'`);
    }
  }
  function __notnull() {
    throw TypeError('value must not be null');
  }
  return adaptedExports;
}

export async function wasmInit(): Promise<{
  createDataFlow: (mangaId: string, mangaNum: string, u: string) => number[];
}> {
  return await instantiate(readFileSync(resolve(__dirname, 'manga.wasm')), {
    index: {
      toVarint,
    },
  });
}
