import json
from webbrowser import get
from wasmer import engine, Store, Module, Instance, ImportObject, Function, FunctionType, Type
import numpy as np

store = Store()
import_object = ImportObject()

# Let's compile the module to be able to execute it!
module = Module(store, open('wasm_rsa_encrypt_bg.wasm', 'rb').read())

e = None
n = [None] * 32
n.append(None)
n.append(None)
n.append(True)
n.append(False)

def o(e: int):
    return n[e]

i = 0
a = None
a_flag = False
def get_a():
    global a
    global a_flag
    if not a_flag:
        a_flag = True
        a = np.frombuffer(e.memory.buffer, dtype=np.uint8)
    return a

def l(e, malloc, realloc):
    global i
    r = len(e)
    o = malloc(r)
    a = get_a()
    l = 0
    while l < r:
        n = ord(e[l])
        if n > 127:
            break
        a[o + l] = n
        l += 1
    i = l
    return o

s = None
s_flag = False
def get_s():
    global s
    global s_flag
    if not s_flag:
        s_flag = True
        s = np.frombuffer(e.memory.buffer, dtype=np.uint32)
    return s
  
b = len(n)
def g(e: int, n: int):
    return get_a()[e:e + n].tobytes()

def w(e):
    global b
    if b == len(n):
        n.append(len(n) + 1)
    t = b
    b = n[t]
    n[t] = e
    return t

def json_serialize(n: int, t: int):
    s = json.dumps(o(t) or None)
    a = l(s, e.__wbindgen_malloc, e.__wbindgen_realloc)
    get_s()[int(n / 4) + 1] = i
    get_s()[int(n / 4) + 0] = a

__wbindgen_json_serialize = Function(
    store,
    json_serialize,
    #             x         y           result
    FunctionType([Type.I32, Type.I32], [])
)

__wbg_self_1b7a39e3a92c949c = Function(
  store,
  lambda: 0,
  FunctionType([], [Type.I32])
)

def wbindgen_object_drop_ref(e):
    if e >= 36:
        n[e] = b
        b = e

__wbindgen_object_drop_ref = Function(
  store,
  wbindgen_object_drop_ref,
  FunctionType([Type.I32], [])
)

def wbg_new_59cb74e423758ede():
    return w(None)

__wbg_new_59cb74e423758ede = Function(
  store,
  lambda : 0,
  FunctionType([], [Type.I32])
)

def wbg_stack_558ba5917b466edd(n, t):
    r = l(o(t).stack, e.__wbindgen_malloc, e.__wbindgen_realloc)
    a = i
    get_s()[int(n / 4) + 1] = a
    get_s()[int(n / 4) + 0] = r

__wbg_stack_558ba5917b466edd = Function(
  store,
  wbg_stack_558ba5917b466edd,
  FunctionType([Type.I32, Type.I32], [])
)

__wbg_error_4bb6c2a97407129a = Function(
  store,
  lambda x, y: None,
  FunctionType([Type.I32, Type.I32], [])
)

__wbg_randomFillSync_d5bd2d655fdf256a = Function(
  store,
  lambda x, y, z: None,
  FunctionType([Type.I32, Type.I32, Type.I32], [])
)

__wbg_getRandomValues_f5e14ab7ac8e995d = Function(
  store,
  lambda x, y, z: None,
  FunctionType([Type.I32, Type.I32, Type.I32], [])
)

__wbg_crypto_968f1772287e2df0 = Function(
  store,
  lambda x: 0,
  FunctionType([Type.I32], [Type.I32])
)

def wbindgen_is_undefined(e):
    return o(e) is None

__wbindgen_is_undefined = Function(
  store,
  wbindgen_is_undefined,
  FunctionType([Type.I32], [Type.I32])
)

__wbg_getRandomValues_a3d34b4fee3c2869 = Function(
  store,
  lambda x: 0,
  FunctionType([Type.I32], [Type.I32])
)

__wbg_require_604837428532a733 = Function(
  store,
  lambda x, y: 0,
  FunctionType([Type.I32, Type.I32], [Type.I32])
)

import_object.register(
  "wbg",
  {
  "__wbindgen_json_serialize": __wbindgen_json_serialize,
  "__wbindgen_object_drop_ref": __wbindgen_object_drop_ref,
  "__wbg_new_59cb74e423758ede": __wbg_new_59cb74e423758ede,
  "__wbg_stack_558ba5917b466edd": __wbg_stack_558ba5917b466edd,
  "__wbg_error_4bb6c2a97407129a": __wbg_error_4bb6c2a97407129a,
  "__wbg_randomFillSync_d5bd2d655fdf256a": __wbg_randomFillSync_d5bd2d655fdf256a,
  "__wbg_getRandomValues_f5e14ab7ac8e995d": __wbg_getRandomValues_f5e14ab7ac8e995d,
  "__wbg_self_1b7a39e3a92c949c": __wbg_self_1b7a39e3a92c949c,
  "__wbg_crypto_968f1772287e2df0": __wbg_crypto_968f1772287e2df0,
  "__wbindgen_is_undefined": __wbindgen_is_undefined,
  "__wbg_getRandomValues_a3d34b4fee3c2869": __wbg_getRandomValues_a3d34b4fee3c2869,
  "__wbg_require_604837428532a733": __wbg_require_604837428532a733,
  }
)

instance = Instance(module, import_object)
e = instance.exports

def encrypt(params):
    a = w(params)
    e.encrypt(8, a)
    return g(get_s()[2], get_s()[3])

# print(encrypt({
#     "data": "726566726573685f313233",
#     "digest": 'SHA256',
# }))

print(e.encrypt(8, 0))
