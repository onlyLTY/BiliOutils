import * as fs from 'fs';
import path from 'path';
import { TextEncoder } from 'util';

let e: any;
const n: any[] = [];
function o(e: number) {
  return n[e];
}
let i = 0,
  a: Uint8Array;
function getA() {
  if (!a) {
    a = new Uint8Array(e.memory.buffer as ArrayBuffer);
  }
  return a;
}
const f = new TextEncoder();
function u(e: string, n: Uint8Array) {
  const a = f.encodeInto(e, n);
  console.log(a);
  return a;
}

function l(
  e: string,
  malloc: (arg0: number) => number,
  realloc: (arg0: number, arg1: number, arg2: number) => number,
) {
  if (!realloc) {
    const t = f.encode(e),
      r = malloc(t.length);
    i = t.length;
    return r;
  }
  let r = e.length,
    o = malloc(r);
  const a = getA();
  let l = 0;
  for (; l < r; l++) {
    const n = e.charCodeAt(l);
    if (n > 127) break;
    a[o + l] = n;
  }
  if (l !== r) {
    if (l !== 0) {
      e = e.slice(l);
      const temp_r = l + 3 * e.length;
      o = realloc(o, r, temp_r);
      r = temp_r;
    }
    const n = getA().subarray(o + l, o + r);
    l += u(e, n).written;
  }
  i = l;
  return o;
}
let s: Int32Array;
function getS() {
  if (!s || s.buffer !== e.memory.buffer) {
    s = new Int32Array(e.memory.buffer);
  }
  return s;
}
let b = n.length;
const d = new TextDecoder('utf-8');
function g(e: number, n: number) {
  return d.decode(getA().subarray(e, e + n));
}

function w(e: any) {
  b === n.length && n.push(n.length + 1);
  const t = b;
  b = n[t];
  n[t] = e;
  return t;
}

export function encrypt(params: { data: string; digest: string }) {
  try {
    const a = w(params);
    console.log(a);
    e.encrypt(8, a);
    return g(getS()[2], getS()[3]);
  } finally {
    // e.__wbindgen_free(t1, wasmInit);
  }
}

function emptyFunc() {
  return;
}

export async function defaultFunc() {
  const importObject = { wbg: {} } as { wbg: Record<string, any> };
  importObject.wbg.__wbindgen_json_serialize = function (n: number, t: number) {
    const a = l(JSON.stringify(o(t) || null), e.__wbindgen_malloc, e.__wbindgen_realloc);
    getS()[n / 4 + 1] = i;
    getS()[n / 4 + 0] = a;
  };
  importObject.wbg.__wbg_self_1b7a39e3a92c949c = emptyFunc;
  importObject.wbg.__wbg_log_da30ae7b677263c7 = emptyFunc;
  importObject.wbg.__wbindgen_object_drop_ref = emptyFunc;
  importObject.wbg.__wbg_new_59cb74e423758ede = emptyFunc;
  importObject.wbg.__wbg_stack_558ba5917b466edd = function (n: number, t: any) {
    const r = l(o(t).stack, e.__wbindgen_malloc, e.__wbindgen_realloc),
      a = i;
    getS()[n / 4 + 1] = a;
    getS()[n / 4 + 0] = r;
  };
  importObject.wbg.__wbg_error_4bb6c2a97407129a = emptyFunc;
  importObject.wbg.__wbg_randomFillSync_d5bd2d655fdf256a = emptyFunc;
  importObject.wbg.__wbg_getRandomValues_f5e14ab7ac8e995d = emptyFunc;
  importObject.wbg.__wbg_crypto_968f1772287e2df0 = emptyFunc;
  importObject.wbg.__wbindgen_is_undefined = emptyFunc;
  importObject.wbg.__wbg_getRandomValues_a3d34b4fee3c2869 = emptyFunc;
  importObject.wbg.__wbg_require_604837428532a733 = emptyFunc;
  const { instance } = await WebAssembly.instantiate(
    fs.readFileSync(path.resolve(__dirname, '../wasm/wasm_rsa_encrypt_bg.wasm')),
    importObject,
  );
  e = instance.exports;
  return e;
}
