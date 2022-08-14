// @ts-nocheck
import * as fs from 'fs';
import path from 'path';
import { TextEncoder } from 'util';

export const wasmInit = {
  decrypt,
  default: defaultFunc,
  encrypt,
};

const e1 = {
    875: (e: { exports: { (err: any): void; keys(): any[]; resolve: any; id: number } }) => {
      function n(err: string) {
        throw new Error("Cannot find module '" + err + "'");
      }
      n.keys = () => [];
      n.resolve = n;
      n.id = 875;
      e.exports = n;
    },
  },
  n1 = {};
function t1(r: string | number) {
  const o = n1[r];
  if (o !== undefined) return o.exports;
  const i = (n1[r] = { exports: {} });
  e1[r](i, i.exports, t1);
  return i.exports;
}

let e: any;
const n = new Array(32);
function o(e: string | number) {
  return n[e];
}
n.fill(undefined);
n.push(undefined, null, true, false);
let i = 0,
  a = null;
function c() {
  if (a === null || a.buffer !== e.memory.buffer) {
    a = new Uint8Array(e.memory.buffer);
  }
  return a;
}
const f = new TextEncoder();
const u =
  'function' == typeof f.encodeInto
    ? function (e: string, n: Uint8Array) {
        return f.encodeInto(e, n);
      }
    : function (e: any, n: any) {
        const t = f.encode(e);
        return n.set(t), { read: e.length, written: t.length };
      };
function l(e: string, n: (arg0: number) => any, t: (arg0: any, arg1: any, arg2: number) => any) {
  if (t === undefined) {
    const t = f.encode(e),
      r = n(t.length);
    c()
      .subarray(r, r + t.length)
      .set(t);
    i = t.length;
    return r;
  }
  let r = e.length,
    o = n(r);
  const a = c();
  let l = 0;
  for (; l < r; l++) {
    const n = e.charCodeAt(l);
    if (n > 127) break;
    a[o + l] = n;
  }
  if (l !== r) {
    0 !== l && (e = e.slice(l)), (o = t(o, r, (r = l + 3 * e.length)));
    const n = c().subarray(o + l, o + r);
    l += u(e, n).written;
  }
  return (i = l), o;
}
let s = null;
function _() {
  return (null !== s && s.buffer === e.memory.buffer) || (s = new Int32Array(e.memory.buffer)), s;
}
let b = n.length;
const d = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
function g(e: any, n: any) {
  return d.decode(c().subarray(e, e + n));
}
function w(e: any) {
  b === n.length && n.push(n.length + 1);
  const t = b;
  b = n[t];
  n[t] = e;
  return t;
}
function encrypt(params: { data: string; digest: string }) {
  try {
    e.encrypt(8, w(params));
    return g(_()[2], _()[3]);
  } finally {
    e.__wbindgen_free(t1, wasmInit);
  }
}
function decrypt(n: any) {
  try {
    e.decrypt(8, w(n));
    return g(_()[2], _()[3]);
  } finally {
    e.__wbindgen_free(t1, wasmInit);
  }
}
// function p(e: number, n: number) {
//   return c().subarray(e / 1, e / 1 + n);
// }
d.decode();
async function defaultFunc() {
  const importObject = { wbg: {} } as { wbg: any };
  importObject.wbg.__wbindgen_json_serialize = function (n: number, t: any) {
    const r = o(t);
    const a = l(JSON.stringify(void 0 === r ? null : r), e.__wbindgen_malloc, e.__wbindgen_realloc),
      c = i;
    (_()[n / 4 + 1] = c), (_()[n / 4 + 0] = a);
  };
  importObject.wbg.__wbg_log_da30ae7b677263c7 = function (e: any, n: any) {
    g(e, n);
  };
  importObject.wbg.__wbindgen_object_drop_ref = function (e: number) {
    e < 36 || ((n[e] = b), (b = e));
  };
  importObject.wbg.__wbg_new_59cb74e423758ede = function () {
    return w(new Error());
  };
  importObject.wbg.__wbg_stack_558ba5917b466edd = function (n: number, t: any) {
    const r = l(o(t).stack, e.__wbindgen_malloc, e.__wbindgen_realloc),
      a = i;
    (_()[n / 4 + 1] = a), (_()[n / 4 + 0] = r);
  };
  importObject.wbg.__wbg_error_4bb6c2a97407129a = function (n: any, t: any) {
    try {
      console.error(g(n, t));
    } finally {
      e.__wbindgen_free(n, t);
    }
  };
  importObject.wbg.__wbg_randomFillSync_d5bd2d655fdf256a = function (_e: any, _n: any, _t: any) {
    // o(e).randomFillSync(p(n, t));
  };
  importObject.wbg.__wbg_getRandomValues_f5e14ab7ac8e995d = function (_e: any, _n: any, _t: any) {
    // o(e).getRandomValues(p(n, t));
  };
  importObject.wbg.__wbg_self_1b7a39e3a92c949c = function () {
    try {
      return w(self.self);
    } catch (err) {
      e.__wbindgen_exn_store(w(err));
    }
  };
  importObject.wbg.__wbg_crypto_968f1772287e2df0 = function (_e: any) {
    // return w(o(e).crypto);
  };
  importObject.wbg.__wbindgen_is_undefined = function (e: any) {
    return o(e) === undefined;
  };
  importObject.wbg.__wbg_getRandomValues_a3d34b4fee3c2869 = function (_e: any) {
    // return w(o(e).getRandomValues);
  };
  importObject.wbg.__wbg_require_604837428532a733 = function (_e: any, _n: any) {
    // return w(t(875)(g(e, n)));
  };
  const { instance } = await WebAssembly.instantiate(
    fs.readFileSync(path.resolve(__dirname, '../wasm/wasm_rsa_encrypt_bg.wasm')),
    importObject,
  );
  e = instance.exports;
  return e;
}
