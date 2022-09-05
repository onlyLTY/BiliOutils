'use strict';

var zlib = require('zlib');
var crypto = require('crypto');
require('vm');
var path = require('path');
var fs = require('fs');
var got = require('got');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n["default"] = e;
	return Object.freeze(n);
}

var crypto__namespace = /*#__PURE__*/_interopNamespace(crypto);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var path__namespace = /*#__PURE__*/_interopNamespace(path);
var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var got__default = /*#__PURE__*/_interopDefaultLegacy(got);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$c =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$b = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$a = fails$b;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$a(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$9 = fails$b;

var functionBindNative = !fails$9(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$b = Function.prototype.call;

var functionCall = NATIVE_BIND$3 ? call$b.bind(call$b) : function () {
  return call$b.apply(call$b, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$4 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var bind$2 = FunctionPrototype$2.bind;
var call$a = FunctionPrototype$2.call;
var uncurryThis$f = NATIVE_BIND$2 && bind$2.bind(call$a, call$a);

var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
  return fn && uncurryThis$f(fn);
} : function (fn) {
  return fn && function () {
    return call$a.apply(fn, arguments);
  };
};

var uncurryThis$e = functionUncurryThis;

var toString$6 = uncurryThis$e({}.toString);
var stringSlice$2 = uncurryThis$e(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$2(toString$6(it), 8, -1);
};

var uncurryThis$d = functionUncurryThis;
var fails$8 = fails$b;
var classof$4 = classofRaw$1;

var $Object$4 = Object;
var split = uncurryThis$d(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$8(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$4(it) == 'String' ? split(it, '') : $Object$4(it);
} : $Object$4;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$4 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$3 = isNullOrUndefined$4;

var $TypeError$a = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$4 = function (it) {
  if (isNullOrUndefined$3(it)) throw $TypeError$a("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;

var toIndexedObject$4 = function (it) {
  return IndexedObject(requireObjectCoercible$3(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$f = function (argument) {
  return typeof argument == 'function';
};

var isCallable$e = isCallable$f;

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var SPECIAL_DOCUMENT_ALL = typeof documentAll == 'undefined' && documentAll !== undefined;

var isObject$9 = SPECIAL_DOCUMENT_ALL ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable$e(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable$e(it);
};

var global$b = global$c;
var isCallable$d = isCallable$f;

var aFunction = function (argument) {
  return isCallable$d(argument) ? argument : undefined;
};

var getBuiltIn$6 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$b[namespace]) : global$b[namespace] && global$b[namespace][method];
};

var uncurryThis$c = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$c({}.isPrototypeOf);

var getBuiltIn$5 = getBuiltIn$6;

var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

var global$a = global$c;
var userAgent = engineUserAgent;

var process$1 = global$a.process;
var Deno = global$a.Deno;
var versions = process$1 && process$1.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version$1;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version$1 = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version$1 && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version$1 = +match[1];
  }
}

var engineV8Version = version$1;

/* eslint-disable es-x/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$7 = fails$b;

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$7(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es-x/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$4 = getBuiltIn$6;
var isCallable$c = isCallable$f;
var isPrototypeOf$4 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$4('Symbol');
  return isCallable$c($Symbol) && isPrototypeOf$4($Symbol.prototype, $Object$3(it));
};

var $String$3 = String;

var tryToString$3 = function (argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$b = isCallable$f;
var tryToString$2 = tryToString$3;

var $TypeError$9 = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$5 = function (argument) {
  if (isCallable$b(argument)) return argument;
  throw $TypeError$9(tryToString$2(argument) + ' is not a function');
};

var aCallable$4 = aCallable$5;
var isNullOrUndefined$2 = isNullOrUndefined$4;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$2(func) ? undefined : aCallable$4(func);
};

var call$9 = functionCall;
var isCallable$a = isCallable$f;
var isObject$8 = isObject$9;

var $TypeError$8 = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$a(fn = input.toString) && !isObject$8(val = call$9(fn, input))) return val;
  if (isCallable$a(fn = input.valueOf) && !isObject$8(val = call$9(fn, input))) return val;
  if (pref !== 'string' && isCallable$a(fn = input.toString) && !isObject$8(val = call$9(fn, input))) return val;
  throw $TypeError$8("Can't convert object to primitive value");
};

var shared$3 = {exports: {}};

var global$9 = global$c;

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$4 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$4(global$9, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$9[key] = value;
  } return value;
};

var global$8 = global$c;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$8[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.25.0',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.25.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$2 = requireObjectCoercible$4;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$4 = function (argument) {
  return $Object$2(requireObjectCoercible$2(argument));
};

var uncurryThis$b = functionUncurryThis;
var toObject$3 = toObject$4;

var hasOwnProperty = uncurryThis$b({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$3(it), key);
};

var uncurryThis$a = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$5 = uncurryThis$a(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
};

var global$7 = global$c;
var shared$2 = shared$3.exports;
var hasOwn$a = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$7.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$a = function (name) {
  if (!hasOwn$a(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$a(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var call$8 = functionCall;
var isObject$7 = isObject$9;
var isSymbol$1 = isSymbol$2;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$9 = wellKnownSymbol$a;

var $TypeError$7 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$7(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$8(exoticToPrim, input, pref);
    if (!isObject$7(result) || isSymbol$1(result)) return result;
    throw $TypeError$7("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$2 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$6 = global$c;
var isObject$6 = isObject$9;

var document$1 = global$6.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$8 = descriptors;
var fails$6 = fails$b;
var createElement = documentCreateElement$1;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$8 && !fails$6(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$7 = descriptors;
var call$7 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$3 = createPropertyDescriptor$4;
var toIndexedObject$3 = toIndexedObject$4;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$9 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$3(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$9(O, P)) return createPropertyDescriptor$3(!call$7(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$6 = descriptors;
var fails$5 = fails$b;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$6 && fails$5(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$5 = isObject$9;

var $String$2 = String;
var $TypeError$6 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$9 = function (argument) {
  if (isObject$5(argument)) return argument;
  throw $TypeError$6($String$2(argument) + ' is not an object');
};

var DESCRIPTORS$5 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$8 = anObject$9;
var toPropertyKey = toPropertyKey$2;

var $TypeError$5 = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$5 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$8(O);
  P = toPropertyKey(P);
  anObject$8(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$8(O);
  P = toPropertyKey(P);
  anObject$8(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$5('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$4 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$4;

var createNonEnumerableProperty$5 = DESCRIPTORS$4 ? function (object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor$2(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$2 = {exports: {}};

var DESCRIPTORS$3 = descriptors;
var hasOwn$8 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$3 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$8(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$3 || (DESCRIPTORS$3 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$9 = functionUncurryThis;
var isCallable$9 = isCallable$f;
var store$1 = sharedStore;

var functionToString = uncurryThis$9(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$9(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$1 = store$1.inspectSource;

var global$5 = global$c;
var isCallable$8 = isCallable$f;

var WeakMap$1 = global$5.WeakMap;

var weakMapBasicDetection = isCallable$8(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$1 = shared$3.exports;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$4 = global$c;
var uncurryThis$8 = functionUncurryThis;
var isObject$4 = isObject$9;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$7 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = global$4.TypeError;
var WeakMap = global$4.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis$8(store.get);
  var wmhas = uncurryThis$8(store.has);
  var wmset = uncurryThis$8(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$7(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$7(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$7(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var fails$4 = fails$b;
var isCallable$7 = isCallable$f;
var hasOwn$6 = hasOwnProperty_1;
var DESCRIPTORS$2 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule = internalState;

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$3 = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS$2 && !fails$4(function () {
  return defineProperty$3(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$6(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS$2) defineProperty$3(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$6(options, 'arity') && value.length !== options.arity) {
    defineProperty$3(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$6(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$2) defineProperty$3(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$6(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$7(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

var isCallable$6 = isCallable$f;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$1 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$6(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$2.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$1 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$4 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;

var max$1 = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$3(index);
  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity$2(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$3 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$2 = toIndexedObject$4;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$3;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$2($this);
    var length = lengthOfArrayLike$2(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var uncurryThis$7 = functionUncurryThis;
var hasOwn$5 = hasOwnProperty_1;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$1 = uncurryThis$7([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$5(hiddenKeys$2, key) && hasOwn$5(O, key) && push$1(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$5(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$1(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$3 = getBuiltIn$6;
var uncurryThis$6 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$7 = anObject$9;

var concat = uncurryThis$6([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$7(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$4 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;

var copyConstructorProperties$3 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$1.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$3 = fails$b;
var isCallable$5 = isCallable$f;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$5(detection) ? fails$3(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$3 = global$c;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var defineBuiltIn = defineBuiltIn$1;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties$2 = copyConstructorProperties$3;
var isForced = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$3;
  } else if (STATIC) {
    target = global$3[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$3[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$2(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$1 = FunctionPrototype.apply;
var call$6 = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$6.bind(apply$1) : function () {
  return call$6.apply(apply$1, arguments);
});

var isCallable$4 = isCallable$f;

var $String$1 = String;
var $TypeError$4 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$4(argument)) return argument;
  throw $TypeError$4("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$5 = functionUncurryThis;
var anObject$6 = anObject$9;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$5(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$6(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var defineProperty$2 = objectDefineProperty.f;

var proxyAccessor$1 = function (Target, Source, key) {
  key in Target || defineProperty$2(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

var isCallable$3 = isCallable$f;
var isObject$3 = isObject$9;
var setPrototypeOf$2 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$2 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$3(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject$3(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$2($this, NewTargetPrototype);
  return $this;
};

var wellKnownSymbol$8 = wellKnownSymbol$a;

var TO_STRING_TAG$3 = wellKnownSymbol$8('toStringTag');
var test = {};

test[TO_STRING_TAG$3] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$2 = isCallable$f;
var classofRaw = classofRaw$1;
var wellKnownSymbol$7 = wellKnownSymbol$a;

var TO_STRING_TAG$2 = wellKnownSymbol$7('toStringTag');
var $Object$1 = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$3 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$2(O.callee) ? 'Arguments' : result;
};

var classof$2 = classof$3;

var $String = String;

var toString$4 = function (argument) {
  if (classof$2(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var toString$3 = toString$4;

var normalizeStringArgument$2 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$3(argument);
};

var isObject$2 = isObject$9;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$2 = function (O, options) {
  if (isObject$2(options) && 'cause' in options) {
    createNonEnumerableProperty$2(O, 'cause', options.cause);
  }
};

var uncurryThis$4 = functionUncurryThis;

var $Error$1 = Error;
var replace$1 = uncurryThis$4(''.replace);

var TEST = (function (arg) { return String($Error$1(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var errorStackClear = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error$1.prepareStackTrace) {
    while (dropEntries--) stack = replace$1(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

var fails$2 = fails$b;
var createPropertyDescriptor$1 = createPropertyDescriptor$4;

var errorStackInstallable = !fails$2(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor$1(1, 7));
  return error.stack !== 7;
});

var getBuiltIn$2 = getBuiltIn$6;
var hasOwn$3 = hasOwnProperty_1;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var isPrototypeOf$3 = objectIsPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var copyConstructorProperties$1 = copyConstructorProperties$3;
var proxyAccessor = proxyAccessor$1;
var inheritIfRequired = inheritIfRequired$1;
var normalizeStringArgument$1 = normalizeStringArgument$2;
var installErrorCause$1 = installErrorCause$2;
var clearErrorStack$1 = errorStackClear;
var ERROR_STACK_INSTALLABLE$1 = errorStackInstallable;
var DESCRIPTORS$1 = descriptors;

var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$2.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn$3(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn$2('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument$1(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$1(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE$1) createNonEnumerableProperty$1(result, 'stack', clearErrorStack$1(result.stack, 2));
    if (this && isPrototypeOf$3(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause$1(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf$1) setPrototypeOf$1(WrappedError, BaseError);
    else copyConstructorProperties$1(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$1 && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties$1(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$1(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */

var $$6 = _export;
var global$2 = global$c;
var apply = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global$2[WEB_ASSEMBLY];

var FORCED$1 = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$1);
  $$6({ global: true, constructor: true, arity: 1, forced: FORCED$1 }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$1);
    $$6({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$1 }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});

function gzipEncode(str) {
  try {
    return zlib.gzipSync(encodeURIComponent(str)).toString('base64');
  } catch (e) {
    return 'Error: 当前字符串不能被Gzip压缩';
  }
}
function gzipDecode(str) {
  try {
    const result = zlib.unzipSync(Buffer.from(str, 'base64')).toString();

    try {
      return decodeURIComponent(unicode2str(result));
    } catch (error) {
      return unescape(result);
    }
  } catch (e) {
    throw new Error('Error: 当前字符串不能被Gzip解压');
  }
}
function unicode2str(str) {
  return str.replace(/\\u([\d\w]{4})/gi, (_match, grp) => String.fromCodePoint(parseInt(grp, 16)));
}

var defineProperty$1 = objectDefineProperty.f;
var hasOwn$2 = hasOwnProperty_1;
var wellKnownSymbol$6 = wellKnownSymbol$a;

var TO_STRING_TAG$1 = wellKnownSymbol$6('toStringTag');

var setToStringTag$1 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$2(target, TO_STRING_TAG$1)) {
    defineProperty$1(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
  }
};

var $$5 = _export;
var global$1 = global$c;
var setToStringTag = setToStringTag$1;

$$5({ global: true }, { Reflect: {} });

// Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
setToStringTag(global$1.Reflect, 'Reflect', true);

const isQingLongPanel = () => {
  return Boolean(process.env.IS_QING_LONG || '__IS_QINGLONG__' === 'true' || process.env.QL_BRANCH);
};
function isCFC() {
  return global.IS_CFC || '__IS_CFC__' === 'true';
}
function isAGC() {
  return global.IS_CFC || '__IS_AGC__' === 'true';
}
function setConfigFileName() {
  const defaultConfigFileName = isQingLongPanel() ? 'cat_bili_config' : 'config',
        ext = '.json';
  const {
    BILITOOLS_FILE_NAME
  } = process.env;

  if (BILITOOLS_FILE_NAME) {
    if (BILITOOLS_FILE_NAME.endsWith(ext)) {
      return BILITOOLS_FILE_NAME;
    }

    return `${BILITOOLS_FILE_NAME}${ext}`;
  }

  return defaultConfigFileName + ext;
}
function isFC() {
  const keys = Object.keys(process.env);
  const tags = ['securityToken', 'accessKeyID', 'accessKeySecret', 'FC_FUNCTION_MEMORY_SIZE', 'FC_FUNC_CODE_PATH', 'FC_RUNTIME_VERSION'];
  return keys.filter(key => tags.includes(key)).length >= 3 || 'true' === 'true';
}
function isSCF() {
  const keys = Object.keys(process.env);
  const isSCF = keys.filter(key => key.startsWith('SCF_')).length >= 10;
  const isTENCENTCLOUD = keys.filter(key => key.startsWith('TENCENTCLOUD_')).length >= 3;
  return isSCF && isTENCENTCLOUD || '__IS_SCF__' === 'true';
}
function isServerless() {
  return isSCF() || isFC() || isAGC() || isCFC();
}

const toString$2 = Object.prototype.toString;
function is(val, type) {
  return toString$2.call(val) === `[object ${type}]`;
}
function isDef(val) {
  return typeof val !== 'undefined';
}
function isUnDef(val) {
  return !isDef(val);
}
function isObject$1(val) {
  return val !== null && is(val, 'Object');
}
function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject$1(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}
function isDate(val) {
  return is(val, 'Date');
}
function isNull(val) {
  return val === null;
}
function isNullAndUnDef(val) {
  return isUnDef(val) && isNull(val);
}
function isNullOrUnDef(val) {
  return isUnDef(val) || isNull(val);
}
function isNumber(val) {
  return is(val, 'Number');
}
function isPromise(val) {
  return is(val, 'Promise') && isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
}
function isString(val) {
  return is(val, 'String');
}
function isFunction(val) {
  return typeof val === 'function';
}
function isBoolean(val) {
  return is(val, 'Boolean');
}
function isRegExp$1(val) {
  return is(val, 'RegExp');
}
function isArray(val) {
  return val && Array.isArray(val);
}
function isWindow(val) {
  return typeof window !== 'undefined' && is(val, 'Window');
}
function isElement(val) {
  return isObject$1(val) && !!val.tagName;
}
function isMap(val) {
  return is(val, 'Map');
}
const isServer = typeof window === 'undefined';
const isClient = !isServer;
function isUrl(path) {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
function isEmail(val) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(val);
}

function resolvePath(str) {
  return path__default["default"].resolve(process.cwd(), str);
}

const defaultComments = ['棒', '棒唉', '棒耶', '加油~', 'UP加油!', '支持~', '支持支持！', '催更啦', '顶顶', '留下脚印~', '干杯', 'bilibili干杯', 'o(*￣▽￣*)o', '(｡･∀･)ﾉﾞ嗨', '(●ˇ∀ˇ●)', '( •̀ ω •́ )y', '(ง •_•)ง', '>.<', '^_~'];
const kaomoji = ['(⌒▽⌒)', '（￣▽￣）', '(=・ω・=)', '(｀・ω・´)', '(〜￣△￣)〜', '(･∀･)', '(°∀°)ﾉ', '(￣3￣)', '╮(￣▽￣)╭', '_(:3」∠)_', '( ´_ゝ｀)', '←_←', '→_→', '(<_<)', '(>_>)', '(;¬_¬)', '(ﾟДﾟ≡ﾟдﾟ)!?', 'Σ(ﾟдﾟ;)', 'Σ( ￣□￣||)', '(´；ω；`)', '（/TДT)/', '(^・ω・^ )', '(｡･ω･｡)', '(●￣(ｴ)￣●)', 'ε=ε=(ノ≧∇≦)ノ', '(´･_･`)', '(-_-#)', '（￣へ￣）', '(￣ε(#￣) Σ', 'ヽ(`Д´)ﾉ', '（#-_-)┯━┯', '(╯°口°)╯(┴—┴', '←◡←', '( ♥д♥)', 'Σ>―(〃°ω°〃)♡→', '⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄', '(╬ﾟдﾟ)▄︻┻┳═一', '･*･:≡(　ε:)', '(汗)', '(苦笑)'];
const DAILY_RUN_TIME = '17:30:00-23:40:00';
const MS2DATE = 86_400_000;
const MS2HOUR = 3_600_000;
const LOTTERY_EXCLUDE = ['舰', '船', '航海', '代金券', '优惠券', '自拍', '照', '写真', '图', '提督', '车车一局', '再来一局', '游戏道具'];
const LOTTERY_INCLUDE = ['谢'];
const LOTTERY_UP_BLACKLIST = [65566781, 1277481241, 1643654862, 603676925];
const TODAY_MAX_FEED = 1500;

const MAX_MINUTES = 59,
      MAX_HOURS = 23,
      DAILY_MIN_HOURS = 19;
function getMonthHasDays(now) {
  const nowTime = now || getPRCDate(),
        year = nowTime.getFullYear(),
        month = nowTime.getMonth() + 1,
        smallMonth = [4, 6, 9, 11];
  const isLeapYear = year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;

  if (month === 2) {
    return isLeapYear ? 29 : 28;
  } else if (smallMonth.includes(month)) {
    return 30;
  } else {
    return 31;
  }
}
function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, t => {
    const e = crypto__namespace.randomBytes(1)[0] % 16;
    return (t === 'x' ? e : 3 & e | 8).toString(16);
  });
}
function getPRCDate() {
  const now = new Date(),
        nowTime = now.getTime(),
        timezone = now.getTimezoneOffset() / 60;
  return new Date(nowTime + (timezone + 8) * MS2HOUR);
}
function getDateString(now) {
  const nowTime = now || getPRCDate();
  const year = nowTime.getFullYear(),
        month = nowTime.getMonth() + 1,
        day = nowTime.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}
function jsonp2Object(jsonp) {
  const jsonpData = jsonp.replace(/^\w+\(/, '').replace(/\)$/, '');
  return JSON.parse(jsonpData);
}
function getPageNum(n, m) {
  return Math.ceil(m / n);
}
function setCron(time = 60_000, slsType) {
  time = time || 60_000;
  const pre = getPRCDate().getTime() + time;
  const next = new Date(pre);
  const seconds = next.getSeconds(),
        minutes = next.getMinutes(),
        hours = next.getHours();
  return formatCron({
    hours,
    minutes,
    seconds
  }, slsType);
}
function random(lower, upper, floating) {
  if (floating && typeof floating !== 'boolean') {
    upper = floating = undefined;
  }

  if (floating === undefined) {
    if (typeof upper === 'boolean') {
      floating = upper;
      upper = undefined;
    } else if (typeof lower === 'boolean') {
      floating = lower;
      lower = undefined;
    }
  }

  if (lower === undefined && upper === undefined) {
    lower = 0;
    upper = 1;
  } else if (upper === undefined) {
    upper = lower;
    lower = 0;
  }

  lower = Number(lower);
  upper = Number(upper);

  if (lower > upper) {
    const temp = lower;
    lower = upper;
    upper = temp;
  }

  if (floating || lower % 1 || upper % 1) {
    const rand = Math.random();
    return Math.min(lower + rand * (upper - lower + parseFloat('1e-' + ((rand + '').length - 1))), upper);
  }

  return lower + Math.floor(Math.random() * (upper - lower + 1));
}
function randomDailyRunTime(dailyRunTime = DAILY_RUN_TIME, slsType) {
  const taskTime = dailyRunTime.split('-');
  const startTime = taskTime[0].split(':').map(str => +str);
  const endTime = taskTime[1].split(':').map(str => +str);
  const hours = random(startTime[0] ?? DAILY_MIN_HOURS, endTime[0] ?? MAX_HOURS);
  let minutes = 0;

  if (hours == startTime[0]) {
    minutes = random(startTime[1], MAX_MINUTES);
  } else if (hours == endTime[0]) {
    minutes = random(endTime[1]);
  } else {
    minutes = random(MAX_MINUTES);
  }

  let seconds = 0;

  if (hours == startTime[0]) {
    seconds = random(startTime[2], MAX_MINUTES);
  } else if (hours == endTime[0]) {
    seconds = random(endTime[2]);
  } else {
    seconds = random(MAX_MINUTES);
  }

  return formatCron({
    seconds,
    hours,
    minutes
  }, slsType);
}
function formatCron({
  hours,
  minutes,
  seconds
}, type) {
  seconds = seconds || 0;
  let value;

  switch (type) {
    case 'scf':
      value = `${seconds} ${minutes} ${hours} * * * *`;
      break;

    case 'fc':
      value = `${seconds} ${minutes} ${hours} * * *`;
      break;

    case 'cfc':
      value = `corn(${minutes} ${hours} * * *)`;
      break;

    default:
      value = `${seconds} ${minutes} ${hours} * * * *`;
  }

  return {
    value,
    string: `${hours}:${minutes}:${seconds}`
  };
}
function randomString(length, lower) {
  const chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += getRandomItem(chars);
  }

  if (lower) {
    return result.toLowerCase();
  }

  return result;
}
function getVisitId() {
  const randomNum = random(1, 9);
  const randomStr = randomString(10, true);
  return `${randomNum}${randomStr}0`;
}
function pushIfNotExist(array, ...item) {
  item.forEach(i => {
    if (!array.includes(i)) {
      array.push(i);
    }
  });
}
function getNewObject(object) {
  return object || {};
}
function cloneObject(object, deep = false) {
  if (!isObject$1(object)) {
    return object;
  }

  if (Array.isArray(object)) {
    return object.map(item => cloneObject(item, deep));
  }

  if (deep) {
    return Object.keys(object).reduce((result, key) => {
      result[key] = cloneObject(object[key], deep);
      return result;
    }, {});
  }

  return Object.assign({}, object);
}
function deepMergeObject(target, source) {
  if (target === undefined || source === undefined) {
    return target || source;
  }

  if (!isObject$1(target) || !isObject$1(source)) {
    return source;
  }

  if (Array.isArray(target) && Array.isArray(source)) {
    return target.concat(source);
  }

  return Object.keys(source).reduce((result, key) => {
    result[key] = deepMergeObject(target[key], source[key]);
    return result;
  }, target);
}
function stringify(entries) {
  if (!isObject$1(entries) && !isArray(entries)) {
    return entries;
  }

  const searchParams = new URLSearchParams();

  if (!Array.isArray(entries)) {
    entries = Object.entries(entries);
  }

  entries.forEach(([key, value]) => {
    if (isObject$1(value)) {
      searchParams.append(key, JSON.stringify(value));
      return;
    }

    searchParams.append(key, String(value));
  });
  return searchParams.toString();
}
function getRandomItem(indexable) {
  return indexable[random(indexable.length - 1)];
}
function md5(str, uppercase = false) {
  const hash = crypto__namespace.createHash('md5');
  hash.update(str);
  return uppercase ? hash.digest('hex').toUpperCase() : hash.digest('hex');
}
function mergeHeaders(headers = {}, headersToMerge = {}) {
  function toLowerCase(object) {
    return Object.keys(object).reduce((result, key) => {
      result[key.toLowerCase()] = object[key];
      return result;
    }, {});
  }

  return Object.assign({}, toLowerCase(headers), toLowerCase(headersToMerge));
}
function arr2numArr(strArr) {
  return strArr && strArr.map(str => Number(str)).filter(num => num > 0 && num % 1 === 0);
}
function base64Encode(str) {
  return Buffer.from(str).toString('base64');
}
function base64Decode(str) {
  return Buffer.from(str, 'base64').toString();
}
function isTodayInTimeArr(timeArr) {
  if (!timeArr || !timeArr.length) {
    return true;
  }

  const today = getPRCDate().getDate();
  return timeArr.includes(today);
}
function isToday(date, isUnix = true) {
  if (isNumber(date)) {
    date = isUnix ? new Date(date * 1000) : new Date(date);
  }

  return getPRCDate().toDateString() === date.toDateString();
}
function getUnixTime() {
  return Math.floor(new Date().getTime() / 1000);
}
function getBuvid(prefix = 'XY') {
  return `${prefix}${crypto__namespace.randomBytes(16).toString('hex').toUpperCase()}`;
}
function uniqueObjectArray(arr, key) {
  return arr.filter((item, index, self) => {
    return self.findIndex(i => i[key] === item[key]) === index;
  });
}
class Sleep {
  static wait(delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    });
  }

  static waitSync(delay) {
  }

}
function getDelayTime(delay = '') {
  return delay.split('-').map(t => {
    if (/\d+ms$/.test(t)) {
      return parseInt(t);
    }

    if (/\d+s$/.test(t)) {
      return parseInt(t) * 1000;
    }

    if (/\d+$/.test(t) || /\d+m(in)?$/.test(t)) {
      return parseInt(t) * 60000;
    }

    if (/\d+h$/.test(t)) {
      return parseInt(t) * 3600000;
    }

    return 0;
  });
}
function mergeArray(arr, key, deep = false, direction = 'left') {
  const reduceKey = direction === 'right' ? 'reduceRight' : 'reduce',
        mergeFunc = deep ? deepMergeObject : Object.assign;
  return arr[reduceKey]((result, item) => {
    const index = result.findIndex(i => i[key] === item[key]);

    if (index > -1) {
      result[index] = mergeFunc(result[index], item);
    } else {
      result.push(item);
    }

    return result;
  }, []);
}

const LEVEL_VALUE = ['error', 'warn', 'info', 'verbose', 'debug'];

function formatTime(date, hasDate = true) {
  if (hasDate) {
    return date.toLocaleString('zh-CN', {
      hour12: false
    });
  }

  return date.toLocaleString('zh-CN', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
}

function getLevelValues(level = 'info') {
  const levelIndex = LEVEL_VALUE.indexOf(level);
  return levelIndex !== -1 ? LEVEL_VALUE.slice(0, levelIndex + 1) : LEVEL_VALUE;
}

function getLogLevel(level) {
  if (isBoolean(level)) {
    return level ? LEVEL_VALUE : [];
  }

  return getLevelValues(level);
}

class EmptyLogger {
  constructor() {}

  log() {}

  error() {}

  warn() {}

  info() {}

  verbose() {}

  debug() {}

}
class SimpleLogger {
  static pushValue = '';
  static brChar = '\n';
  static emojis = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug'
  };
  options = {
    console: 'info',
    file: 'info',
    push: 'info'
  };
  noFile = false;
  logFile = resolvePath(`./logs/bt_combined-def.log`);
  errorFile = this.logFile;

  constructor(options = {}, name = 'default') {
    this.name = name;
    this.mergeOptions(options);
    const {
      console: cl,
      file,
      push
    } = this.options;
    this.consoleLeval = getLogLevel(cl);
    this.fileLeval = getLogLevel(file);
    this.pushLeval = getLogLevel(push);
    this.noFile = isQingLongPanel() || isServerless();

    if (!this.noFile) {
      this.createLogFile();
    }
  }

  mergeOptions(options) {
    return Object.assign(this.options, options);
  }

  log({
    level = 'info'
  }, message, emoji) {
    emoji = emoji || SimpleLogger.emojis[level];
    const prcTime = getPRCDate(),
          stderr = ['error', 'warn'].includes(level),
          payload = this.options.payload ? ` \u005b${this.options.payload}\u005d ` : ' ';

    if (this.consoleLeval.includes(level)) {
      this.conslole(`\u005b${emoji} ${formatTime(prcTime, false)}\u005d${payload}${message}\n`, stderr);
    }

    if (!this.noFile && this.fileLeval.includes(level)) {
      this.file(`\u005b${emoji} ${formatTime(prcTime, true)}\u005d${payload}${message}\n`, stderr);
    }

    if (this.pushLeval.includes(level)) {
      this.push(`\u005b${emoji} ${formatTime(prcTime, false)}\u005d ${message}${SimpleLogger.brChar}`);
    }
  }

  error(message) {
    this.log({
      level: 'error'
    }, message);
  }

  warn(message) {
    this.log({
      level: 'warn'
    }, message);
  }

  info(message, emoji) {
    this.log({
      level: 'info'
    }, message, emoji);
  }

  verbose(message) {
    this.log({
      level: 'verbose'
    }, message);
  }

  debug(message) {
    this.log({
      level: 'debug'
    }, message);
  }

  conslole(message, stderr) {
    if (stderr) {
      process.stderr.write(message);
      return;
    }

    process.stdout.write(message);
  }

  file(message, stderr) {
    if (stderr) {
      fs__namespace.appendFileSync(this.errorFile, message, 'utf-8');
    }

    fs__namespace.appendFileSync(this.logFile, message, 'utf-8');
  }

  push(message) {
    SimpleLogger.pushValue += message;
  }

  createLogFile() {
    const logsPath = resolvePath('./logs');

    if (!fs__namespace.existsSync(logsPath)) {
      fs__namespace.mkdirSync(logsPath);
    }
  }

}
const defLogger = new SimpleLogger({
  console: 'debug',
  file: 'debug',
  push: 'debug'
});

class SystemConfig {
  static configFileName = setConfigFileName();
  static isQingLongPanel = isQingLongPanel();
}

var isObject = isObject$9;
var classof$1 = classofRaw$1;
var wellKnownSymbol$5 = wellKnownSymbol$a;

var MATCH = wellKnownSymbol$5('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof$1(it) == 'RegExp');
};

var anObject$5 = anObject$9;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject$5(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var call$5 = functionCall;
var hasOwn$1 = hasOwnProperty_1;
var isPrototypeOf$2 = objectIsPrototypeOf;
var regExpFlags = regexpFlags;

var RegExpPrototype = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn$1(R, 'flags') && isPrototypeOf$2(RegExpPrototype, R)
    ? call$5(regExpFlags, R) : flags;
};

var uncurryThis$3 = functionUncurryThis;
var toObject$2 = toObject$4;

var floor = Math.floor;
var charAt$1 = uncurryThis$3(''.charAt);
var replace = uncurryThis$3(''.replace);
var stringSlice$1 = uncurryThis$3(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject$2(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt$1(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice$1(str, 0, position);
      case "'": return stringSlice$1(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt$1(ch, 1) : captures[f - 1] + charAt$1(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var $$4 = _export;
var call$4 = functionCall;
var uncurryThis$2 = functionUncurryThis;
var requireObjectCoercible$1 = requireObjectCoercible$4;
var isCallable$1 = isCallable$f;
var isNullOrUndefined$1 = isNullOrUndefined$4;
var isRegExp = isRegexp;
var toString$1 = toString$4;
var getMethod$2 = getMethod$4;
var getRegExpFlags = regexpGetFlags;
var getSubstitution = getSubstitution$1;
var wellKnownSymbol$4 = wellKnownSymbol$a;

var REPLACE = wellKnownSymbol$4('replace');
var $TypeError$3 = TypeError;
var indexOf = uncurryThis$2(''.indexOf);
uncurryThis$2(''.replace);
var stringSlice = uncurryThis$2(''.slice);
var max = Math.max;

var stringIndexOf = function (string, searchValue, fromIndex) {
  if (fromIndex > string.length) return -1;
  if (searchValue === '') return fromIndex;
  return indexOf(string, searchValue, fromIndex);
};

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$$4({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible$1(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (!isNullOrUndefined$1(searchValue)) {
      IS_REG_EXP = isRegExp(searchValue);
      if (IS_REG_EXP) {
        flags = toString$1(requireObjectCoercible$1(getRegExpFlags(searchValue)));
        if (!~indexOf(flags, 'g')) throw $TypeError$3('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod$2(searchValue, REPLACE);
      if (replacer) {
        return call$4(replacer, searchValue, O, replaceValue);
      }
    }
    string = toString$1(O);
    searchString = toString$1(searchValue);
    functionalReplace = isCallable$1(replaceValue);
    if (!functionalReplace) replaceValue = toString$1(replaceValue);
    searchLength = searchString.length;
    advanceBy = max(1, searchLength);
    position = stringIndexOf(string, searchString, 0);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString$1(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice(string, endOfLastMatch);
    }
    return result;
  }
});

var objectDefineProperties = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
var objectKeys$1 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$4 = anObject$9;
var toIndexedObject = toIndexedObject$4;
var objectKeys = objectKeys$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$4(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$1 = getBuiltIn$6;

var html$1 = getBuiltIn$1('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var anObject$3 = anObject$9;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$3(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$3 = wellKnownSymbol$a;
var create$1 = objectCreate;
var defineProperty = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$3('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$1(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var $$3 = _export;
var toObject$1 = toObject$4;
var lengthOfArrayLike$1 = lengthOfArrayLike$3;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var addToUnscopables = addToUnscopables$1;

// `Array.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$$3({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject$1(this);
    var len = lengthOfArrayLike$1(O);
    var relativeIndex = toIntegerOrInfinity$1(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

addToUnscopables('at');

var $$2 = _export;
var uncurryThis$1 = functionUncurryThis;
var requireObjectCoercible = requireObjectCoercible$4;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toString = toString$4;
var fails$1 = fails$b;

var charAt = uncurryThis$1(''.charAt);

var FORCED = fails$1(function () {
  // eslint-disable-next-line es-x/no-array-string-prototype-at -- safe
  return '𠮷'.at(-2) !== '\uD842';
});

// `String.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$$2({ target: 'String', proto: true, forced: FORCED }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt(S, k);
  }
});

function getJSON5() {
  try {
    const json5 = require('json5');

    return json5.default ? json5.default : json5;
  } catch {}
}

function getFleece() {
  const golden = require('golden-fleece');

  const fleece = golden.default ? golden.default : golden;
  return class {
    static parse(str) {
      return fleece.evaluate(str);
    }

    static stringify(obj) {
      return fleece.stringify(obj, {
        spaces: 2,
        singleQuotes: true
      });
    }

    static patch(str, patch) {
      return fleece.patch(str, { ...this.parse(str),
        ...patch
      });
    }

  };
}

let json5;
const JSON5 = new Proxy({}, {
  get(_target, key) {
    if (!json5) {
      json5 = getJSON5() || getFleece();
    }

    return Reflect.get(json5, key);
  }

});

function readJsonFile(filePath) {
  try {
    let content;

    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf-8');
    }

    if (content) {
      return JSON5.parse(content);
    }
  } catch (error) {
    defLogger.debug(`加载路径为 ${filePath} 的文件失败`);
    defLogger.error(error);
    jsonErrorHandle(error.message);
  }
}
function jsonErrorHandle(message) {
  if (!isString(message)) {
    return;
  }

  if (message.includes('SyntaxError: JSON5')) {
    throw new SyntaxError('配置文件存在，但是无法解析！可能 JSON5 格式不正确！');
  }

  throw new Error(message);
}

function getCookieJSON(cookie) {
  if (!cookie) return {};
  const matchArray = cookie.match(/([^;=]+)(?:=([^;]*))?/g);
  if (!matchArray) return {};
  return matchArray.reduce((pre, cur) => {
    const [key, value] = cur.trim().split('=');
    pre[key] = encodeCookieValue(value);
    return pre;
  }, {});
}

function getSetCookieValue(setCookieArray) {
  let cookieStr = '';
  setCookieArray.forEach(setCookie => cookieStr += setCookie.split('; ')[0] + '; ');

  if (cookieStr.endsWith('; ')) {
    cookieStr = cookieStr.substring(0, cookieStr.length - 2 || 0);
  }

  return cookieStr;
}

function encodeCookieValue(val) {
  return encodeURIComponent(val).replaceAll('%7C', '|').replaceAll('%2B', '+').replaceAll('%25', '%').replaceAll('*', '%2A');
}

function encodeCookie(cookie) {
  return getCookieString(getCookieJSON(cookie));
}

function getCookieString(obj) {
  const string = Object.keys(obj).reduce((pre, cur) => pre + `${cur}=${obj[cur]}; `, '');
  return string.substring(0, string.length - 2 || 0);
}

function getCookie(cookie, setCookie) {
  if (!cookie && cookie !== '') return '';
  if (isString(setCookie)) setCookie = [setCookie];
  if (!setCookie || setCookie.length === 0) return cookie;
  return getCookieString({ ...getCookieJSON(cookie),
    ...getCookieJSON(getSetCookieValue(setCookie))
  });
}
function getCookieItem(cookie, key) {
  if (!cookie) return null;
  const reg = `(?:^|)${key}=([^;]*)(?:;|$)`;
  const r = cookie.match(reg);
  return r ? r[1] : null;
}
function getUserId(cookie) {
  return Number(getCookieItem(cookie, 'DedeUserID')) || 0;
}
function getBiliJct(cookie) {
  return getCookieItem(cookie, 'bili_jct') || '';
}
function getLIVE_BUVID(cookie) {
  return getCookieItem(cookie, 'LIVE_BUVID') || '';
}
class CookieJar {
  constructor(cookie) {
    if (cookie) {
      this.cookie = cookie;
    }
  }

  getCookieString() {
    return this.cookie;
  }

  setCookie(rawCookie) {
    this.cookie = getCookie(this.cookie, rawCookie);
  }

  toJSON() {
    return getCookieJSON(this.cookie);
  }

  getCookieItem(key) {
    return getCookieItem(this.cookie, key);
  }

}
function isBiliCookie(cookie) {
  return Boolean(cookie && cookie.length > 90 && ['bili_jct', 'SESSDATA', 'DedeUserID'].every(str => cookie.includes(str)));
}

const resolveCWD = str => path__namespace.resolve(process.cwd(), str);

const resolveDir = str => path__namespace.resolve(__dirname, '../', str);

const configPathArr = Array.from(new Set([resolveCWD('./config/config.dev.json'), resolveCWD(`./config/${SystemConfig.configFileName}`), resolveCWD(`./${SystemConfig.configFileName}`), resolveDir(`./config/${SystemConfig.configFileName}`), resolveDir(`./${SystemConfig.configFileName}`)]));
const qlOldConfigArr = ['./config.json', resolveCWD('./config/config.json')];

function getEnvConfig() {
  const {
    BILITOOLS_CONFIG,
    BILI_SCF_CONFIG,
    BILI_CONFIG
  } = process.env;
  const config = BILITOOLS_CONFIG || BILI_SCF_CONFIG || BILI_CONFIG;

  if (!config) {
    return undefined;
  }

  try {
    return JSON5.parse(gzipDecode(config.trim()));
  } catch (error) {
    defLogger.error(error);
    throw new Error('环境中的配置不是有效的 JSON 字符串！');
  }
}

function handleMultiUserConfig(config) {
  let newConfig;
  const isArrayConf = isArray(config);

  if (isArrayConf) {
    newConfig = config;
  } else {
    newConfig = config.account.filter(conf => conf.cookie);
  }

  if (newConfig.length === 0) {
    return undefined;
  }

  defLogger.warn('在单用户场景下配置了多用户，我们将放弃多余的配置');
  const conf = newConfig[0];

  if (!isArrayConf && Reflect.has(conf, 'account')) {
    conf.message = Object.assign(config.message || {}, conf.message);
  }

  return conf;
}

function setConfig() {
  if (globalThis.BILITOOLS_CONFIG) {
    return globalThis.BILITOOLS_CONFIG;
  }

  if (SystemConfig.isQingLongPanel) {
    configPathArr.splice(0, 1);
    configPathArr.push(...qlOldConfigArr);
  }

  for (let index = 0; index < configPathArr.length; index++) {
    let filepath = configPathArr[index];
    const config = readJsonFile(filepath) || readJsonFile(filepath += '5');

    if (config) {
      defLogger.verbose(`读取配置文件 ${filepath}`);
      process.env.__BT_CONFIG_PATH__ = filepath;
      return config;
    }
  }

  return getEnvConfig();
}

function getConfig(more) {
  const config = checkConfig(setConfig(), more);

  if (isArray(config) && config.length === 0) {
    defLogger.error('配置文件为空，或配置的cookie缺少三要素（bili_jct, SESSDATA, DedeUserID）！');
  }

  return config;
}
function checkConfig(config, more = false) {
  if (!config) {
    throw new Error('获取配置失败！未找到配置文件！');
  }

  if (more) {
    return filterMultiUserConfig(isMultiUserConfig(config) ? config : [config]);
  }

  if (isMultiUserConfig(config)) {
    const multiUserConfig = handleMultiUserConfig(config);

    if (multiUserConfig) {
      return multiUserConfig;
    }
  }

  if (!config.cookie) {
    throw new Error('配置文件中没有 cookie！');
  }

  return config;
}

function isMultiUserConfig(config) {
  if (Array.isArray(config)) {
    return true;
  }

  return Boolean(config.account && config.account.length);
}

function filterMultiUserConfig(config) {
  const filter = conf => isBiliCookie(conf.cookie);

  if (Array.isArray(config)) {
    return config.filter(filter);
  }

  return config.account.filter(filter);
}

var _process$env$PUSHPLUS;
const defaultConfig = {
  cookie: '',
  accessKey: '',
  message: {
    br: '\n',
    email: {
      host: 'smtp.163.com',
      port: 465
    },
    pushplusToken: (_process$env$PUSHPLUS = process.env.PUSHPLUS_TOKEN) === null || _process$env$PUSHPLUS === void 0 ? void 0 : _process$env$PUSHPLUS.trim(),
    api: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000,
      url: '',
      proxy: {
        host: '',
        port: 443,
        auth: ''
      },
      data: {}
    }
  },
  function: {
    silver2Coin: true,
    liveSignTask: true,
    addCoins: true,
    mangaSign: false,
    shareAndWatch: true,
    supGroupSign: false,
    liveSendMessage: false,
    useCouponBp: false,
    charging: false,
    getVipPrivilege: false,
    giveGift: false,
    matchGame: false,
    liveLottery: false,
    liveRedPack: false,
    batchUnfollow: false,
    liveIntimacy: false,
    mangaTask: false,
    bigPoint: false,
    liveFamine: false,
    judgement: false,
    activityLottery: false
  },
  log: {
    pushLevel: 'debug',
    consoleLevel: 'debug',
    fileLevel: 'debug',
    useEmoji: true,
    fileSplit: 'month'
  },
  limit: {
    level6: true,
    coins5: true
  },
  apiDelay: [2, 6],
  userAgent: '',
  dailyRunTime: DAILY_RUN_TIME,
  targetLevel: undefined,
  stayCoins: undefined,
  targetCoins: undefined,
  customizeUp: undefined,
  giftUp: undefined,
  chargeUpId: undefined,
  chargePresetTime: undefined,
  matchCoins: undefined,
  matchSelection: undefined,
  matchDiff: undefined,
  match: {
    coins: 2,
    selection: 1,
    diff: 7
  },
  charge: {},
  couponBalance: {
    mid: 0,
    presetTime: [10, 20],
    use: '充电'
  },
  gift: {
    mids: [],
    id: [1, 30607, 30426, 31531, 31674],
    name: []
  },
  coin: {
    customizeUp: [],
    targetLevel: 6,
    stayCoins: 0,
    targetCoins: 5,
    todayCoins: 0
  },
  sls: {
    name: '',
    description: '',
    region: 'ap-chengdu',
    dailyRunTime: DAILY_RUN_TIME
  },
  lottery: {
    excludeAward: LOTTERY_EXCLUDE,
    includeAward: LOTTERY_INCLUDE,
    blackUid: LOTTERY_UP_BLACKLIST,
    isMoveTag: true,
    moveTag: '天选时刻',
    pageNum: 2,
    actFollowMsg: 'read',
    scanFollow: undefined,
    skipNeedFollow: false,
    mayBeWinMsg: true
  },
  redPack: {},
  intimacy: {
    liveSendMessage: true,
    liveLike: true,
    liveHeart: false,
    whiteList: [],
    blackList: [],
    limitFeed: TODAY_MAX_FEED
  },
  jury: {
    mode: 1,
    once: true,
    vote: [0, 0, 1],
    opinionMin: 3,
    waitTime: 20,
    insiders: 0.8
  },
  manga: {
    sign: true,
    buy: false,
    mc: [],
    name: [],
    love: true,
    buyInterval: 2,
    buyWeek: []
  },
  exchangeCoupon: {
    num: 1,
    delay: 2000
  },
  activity: {
    liveFamineTime: 400
  },
  bigPoint: {
    isRetry: true,
    isWatch: true,
    epids: [],
    watchDelay: 40
  },
  activityLottery: {
    list: [],
    isRequest: false,
    delay: [1.8, 3.2],
    bangumi: false,
    follow: false
  },
  BILIJCT: '',
  USERID: 0
};
function getDefaultConfig() {
  return cloneObject(defaultConfig, true);
}
function mergeConfig(config) {
  return configValueHandle(oldConfigHandle(deepMergeObject(getDefaultConfig(), beforeMergeConfig(config))));
}
const compatibleMap = {
  targetLevel: ['coin', 'targetLevel'],
  stayCoins: ['coin', 'stayCoins'],
  targetCoins: ['coin', 'targetCoins'],
  customizeUp: ['coin', 'customizeUp'],
  giftUp: ['gift', 'mids'],
  chargeUpId: ['charge', 'mid'],
  chargePresetTime: ['charge', 'presetTime'],
  matchCoins: ['match', 'coins'],
  matchSelection: ['match', 'selection'],
  matchDiff: ['match', 'diff']
};

function oldConfigHandle(config) {
  var _config$couponBalance, _config$couponBalance2;

  Object.keys(compatibleMap).forEach(oldKey => {
    if (config[oldKey] !== undefined) {
      const [newKey, newKey2] = compatibleMap[oldKey];
      config[newKey] = getNewObject(config[newKey]);
      config[newKey][newKey2] = config[oldKey];
    }

    delete config[oldKey];
  });
  (_config$couponBalance = config.couponBalance).mid || (_config$couponBalance.mid = config.charge.mid);
  (_config$couponBalance2 = config.couponBalance).presetTime || (_config$couponBalance2.presetTime = config.charge.presetTime);
  return config;
}

function configValueHandle(config) {
  setConstValue(config);
  const {
    coin,
    gift,
    match,
    couponBalance
  } = config;

  if (!isArray(config.apiDelay)) {
    config.apiDelay = [Number(config.apiDelay)];
  } else {
    config.apiDelay = arr2numArr(config.apiDelay);
  }

  coin.customizeUp = arr2numArr(coin.customizeUp);
  gift.mids = arr2numArr(gift.mids);
  const couponBalanceUse = couponBalance.use;

  switch (couponBalanceUse) {
    case 'battery':
      couponBalance.use = '电池';
      break;

    case 'charge':
      couponBalance.use = '充电';
      break;

    default:
      couponBalance.use = '充电';
      break;
  }

  if (gift.mids.length === 0) {
    gift.mids = coin.customizeUp;
  }

  if (!couponBalance.mid) {
    couponBalance.mid = config.USERID;
  }

  if (coin.targetCoins > 5) {
    coin.targetCoins = 5;
  }

  if (match.coins > 10) {
    match.coins = 10;
  }

  return config;
}

function setConstValue(config) {
  setCookieValue(config, config.cookie);
  return config;
}

function setCookieValue(config, cookie) {
  config.BILIJCT = getBiliJct(cookie);
  config.USERID = getUserId(cookie);
  return config;
}

function beforeMergeConfig(config) {
  const {
    message
  } = config;

  if (message && isString(message.api)) {
    const url = message.api;
    message.api = cloneObject(defaultConfig.message.api, true);
    message.api.url = url;
    message.api.method = 'GET';
  }

  return config;
}

const ContentTypeEnum = {
  FORM_URLENCODED: 'application/x-www-form-urlencoded; charset=UTF-8'
};

const OriginURLs = {
  account: 'https://account.bilibili.com',
  live: 'https://live.bilibili.com',
  space: 'https://space.bilibili.com',
  message: 'https://message.bilibili.com',
  www: 'https://www.bilibili.com',
  manga: 'https://manga.bilibili.com'
};
const RefererURLs = {
  www: 'https://www.bilibili.com/',
  bigPoint: 'https://big.bilibili.com/mobile/bigPoint',
  bigPointTask: 'https://big.bilibili.com/mobile/bigPoint/task',
  judge: 'https://www.bilibili.com/judgement/'
};
const baseURLs = {
  account: 'https://account.bilibili.com',
  live: 'https://api.live.bilibili.com',
  api: 'https://api.bilibili.com',
  manga: 'https://manga.bilibili.com',
  vc: 'https://api.vc.bilibili.com',
  liveTrace: 'https://live-trace.bilibili.com'
};
const defaultHeaders = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36 Edg/101.0.1210.32',
  'content-type': ContentTypeEnum.FORM_URLENCODED,
  'accept-language': 'zh-CN,zh;q=0.9',
  'accept-encoding': 'gzip, deflate, br'
};
function getAndroidUA({
  version = '6.78.0',
  phone = 'MI 10 Pro',
  build = '6780300',
  channel = 'xiaomi',
  os = '10'
} = {}) {
  return `Mozilla/5.0 BiliDroid/${version} (bbcallen@gmail.com) os/android model/${phone} mobi_app/android build/${build} channel/${channel} innerVer/${channel} osVer/${os} network/2`;
}

let _taskConfig;

const TaskConfig = new Proxy({}, {
  get(_target, key) {
    if (!_taskConfig) {
      initialize();
    }

    return Reflect.get(_taskConfig, key);
  },

  set(_target, key, value) {
    if (key === 'config' && value) {
      initialize(value);
      return true;
    }

    return Reflect.set(_taskConfig, key, value);
  }

});

class TaskModuleTemplate {
  static money = 0;
  static coinsTask = 5;
  static share = false;
  static watch = false;
  static couponBalance = 0;
  static vipType = 0;
  static vipStatus = 0;
  static userLevel = 0;
  static pushTitle = [];
}

let TaskModule;
function initialize(config) {
  if (!config) {
    config = getConfig(false);
  }

  const userConfig = mergeConfig(config);
  const buvid = getCookieBuvid(userConfig.cookie);
  _taskConfig = { ...userConfig,
    mobileUA: getAndroidUA(),
    cookie: encodeCookie(`${userConfig.cookie}; Buvid=${buvid}`),
    buvid
  };
  TaskModule = class extends TaskModuleTemplate {};
  TaskModule.coinsTask = _taskConfig.coin.targetCoins;
}

function getCookieBuvid(cookie) {
  const buvid = getCookieItem(cookie, 'Buvid');
  if (buvid && buvid !== 'undefined') return buvid;
  return getBuvid();
}
class BiliCookieJar {
  async getCookieString() {
    return TaskConfig.cookie;
  }

  async setCookie(rawCookie) {
    TaskConfig.cookie = getCookie(TaskConfig.cookie, rawCookie);
  }

}

function apiDelay(delayTime, delayTime2) {
  return Sleep.wait(getDelay(delayTime, delayTime2));
}
function apiDelaySync(delayTime, delayTime2) {
  Sleep.waitSync(getDelay(delayTime, delayTime2));
}
const sleep = apiDelay;
const sleepSync = apiDelaySync;

function getDelay(delayTime, delayTime2) {
  if (delayTime && delayTime2) {
    return random(delayTime, delayTime2);
  }

  if (delayTime) {
    return delayTime;
  }

  const API_DELAY = TaskConfig.apiDelay;

  if (API_DELAY.length === 1) {
    return API_DELAY[0] * 1000;
  }

  return random(API_DELAY[0] || 2, API_DELAY[1] || 6) * 1000;
}

const emptyLogger = new EmptyLogger();
class Logger extends SimpleLogger {
  constructor(options = {}, name = 'default') {
    super(options);
    this.options = options;
    this.name = name;
    this.mergeOptions({ ...options,
      fileSplit: 'day'
    });
    const thisTime = getPRCDate(),
          thisFullYear = thisTime.getFullYear(),
          thisMonth = thisTime.getMonth() + 1;

    if (options.fileSplit === 'day') {
      this.setFilename(`${thisFullYear}-${thisMonth}-${thisTime.getDate()}`);
    } else {
      this.setFilename(`${thisFullYear}-${thisMonth}`);
    }
  }

  setFilename(file) {
    this.errorFile = resolvePath(`./logs/bt_error-${file}.log`);
    this.logFile = resolvePath(`./logs/bt_combined-${file}.log`);
  }

  static setEmoji(useEmoji = true) {
    if (!useEmoji) {
      return;
    }

    SimpleLogger.emojis = {
      error: '❓',
      warn: '❔',
      info: '👻',
      verbose: '💬',
      debug: '🐛'
    };
  }

  static async init({
    br,
    useEmoji
  } = {}) {
    this.setEmoji(useEmoji || TaskConfig.log.useEmoji);
    SimpleLogger.pushValue = '';
    SimpleLogger.brChar = br || TaskConfig.message.br || '\n';
  }

}
const logger = new Logger({
  console: TaskConfig.log.consoleLevel,
  file: TaskConfig.log.fileLevel,
  push: TaskConfig.log.pushLevel,
  payload: process.env.BILITOOLS_IS_ASYNC && TaskConfig.USERID
});

var index$3 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	defLogger: defLogger,
	emptyLogger: emptyLogger,
	Logger: Logger,
	logger: logger
});

var index$2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	gzipEncode: gzipEncode,
	gzipDecode: gzipDecode,
	unicode2str: unicode2str,
	apiDelay: apiDelay,
	apiDelaySync: apiDelaySync,
	sleep: sleep,
	sleepSync: sleepSync,
	getCookieJSON: getCookieJSON,
	encodeCookie: encodeCookie,
	getCookie: getCookie,
	getCookieItem: getCookieItem,
	getUserId: getUserId,
	getBiliJct: getBiliJct,
	getLIVE_BUVID: getLIVE_BUVID,
	CookieJar: CookieJar,
	isBiliCookie: isBiliCookie,
	isQingLongPanel: isQingLongPanel,
	isCFC: isCFC,
	isAGC: isAGC,
	setConfigFileName: setConfigFileName,
	isFC: isFC,
	isSCF: isSCF,
	isServerless: isServerless,
	defLogger: defLogger,
	emptyLogger: emptyLogger,
	Logger: Logger,
	logger: logger,
	getMonthHasDays: getMonthHasDays,
	createUUID: createUUID,
	getPRCDate: getPRCDate,
	getDateString: getDateString,
	jsonp2Object: jsonp2Object,
	getPageNum: getPageNum,
	setCron: setCron,
	random: random,
	randomDailyRunTime: randomDailyRunTime,
	formatCron: formatCron,
	randomString: randomString,
	getVisitId: getVisitId,
	pushIfNotExist: pushIfNotExist,
	getNewObject: getNewObject,
	cloneObject: cloneObject,
	deepMergeObject: deepMergeObject,
	stringify: stringify,
	getRandomItem: getRandomItem,
	md5: md5,
	mergeHeaders: mergeHeaders,
	arr2numArr: arr2numArr,
	base64Encode: base64Encode,
	base64Decode: base64Decode,
	isTodayInTimeArr: isTodayInTimeArr,
	isToday: isToday,
	getUnixTime: getUnixTime,
	getBuvid: getBuvid,
	uniqueObjectArray: uniqueObjectArray,
	Sleep: Sleep,
	getDelayTime: getDelayTime,
	mergeArray: mergeArray,
	is: is,
	isDef: isDef,
	isUnDef: isUnDef,
	isObject: isObject$1,
	isEmpty: isEmpty,
	isDate: isDate,
	isNull: isNull,
	isNullAndUnDef: isNullAndUnDef,
	isNullOrUnDef: isNullOrUnDef,
	isNumber: isNumber,
	isPromise: isPromise,
	isString: isString,
	isFunction: isFunction,
	isBoolean: isBoolean,
	isRegExp: isRegExp$1,
	isArray: isArray,
	isWindow: isWindow,
	isElement: isElement,
	isMap: isMap,
	isServer: isServer,
	isClient: isClient,
	isUrl: isUrl,
	isEmail: isEmail
});

var fails = fails$b;

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn = hasOwnProperty_1;
var isCallable = isCallable$f;
var toObject = toObject$4;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

var uncurryThis = functionUncurryThis;
var aCallable$3 = aCallable$5;
var NATIVE_BIND = functionBindNative;

var bind$1 = uncurryThis(uncurryThis.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$3(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var iterators = {};

var wellKnownSymbol$2 = wellKnownSymbol$a;
var Iterators$1 = iterators;

var ITERATOR$1 = wellKnownSymbol$2('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$1] === it);
};

var classof = classof$3;
var getMethod$1 = getMethod$4;
var isNullOrUndefined = isNullOrUndefined$4;
var Iterators = iterators;
var wellKnownSymbol$1 = wellKnownSymbol$a;

var ITERATOR = wellKnownSymbol$1('iterator');

var getIteratorMethod$2 = function (it) {
  if (!isNullOrUndefined(it)) return getMethod$1(it, ITERATOR)
    || getMethod$1(it, '@@iterator')
    || Iterators[classof(it)];
};

var call$3 = functionCall;
var aCallable$2 = aCallable$5;
var anObject$2 = anObject$9;
var tryToString$1 = tryToString$3;
var getIteratorMethod$1 = getIteratorMethod$2;

var $TypeError$2 = TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable$2(iteratorMethod)) return anObject$2(call$3(iteratorMethod, argument));
  throw $TypeError$2(tryToString$1(argument) + ' is not iterable');
};

var call$2 = functionCall;
var anObject$1 = anObject$9;
var getMethod = getMethod$4;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$1(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$2(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$1(innerResult);
  return value;
};

var bind = functionBindContext;
var call$1 = functionCall;
var anObject = anObject$9;
var tryToString = tryToString$3;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike = lengthOfArrayLike$3;
var isPrototypeOf$1 = objectIsPrototypeOf;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$2;
var iteratorClose = iteratorClose$1;

var $TypeError$1 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$2 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError$1(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$1(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$1(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf$1(ResultPrototype, result)) return result;
  } return new Result(false);
};

var $$1 = _export;
var isPrototypeOf = objectIsPrototypeOf;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var copyConstructorProperties = copyConstructorProperties$3;
var create = objectCreate;
var createNonEnumerableProperty = createNonEnumerableProperty$5;
var createPropertyDescriptor = createPropertyDescriptor$4;
var clearErrorStack = errorStackClear;
var installErrorCause = installErrorCause$2;
var iterate$1 = iterate$2;
var normalizeStringArgument = normalizeStringArgument$2;
var wellKnownSymbol = wellKnownSymbol$a;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Error = Error;
var push = [].push;

var $AggregateError = function AggregateError(errors, message /* , options */) {
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var isInstance = isPrototypeOf(AggregateErrorPrototype, this);
  var that;
  if (setPrototypeOf) {
    that = setPrototypeOf($Error(), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype);
  } else {
    that = isInstance ? this : create(AggregateErrorPrototype);
    createNonEnumerableProperty(that, TO_STRING_TAG, 'Error');
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message));
  if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(that, 'stack', clearErrorStack(that.stack, 1));
  installErrorCause(that, options);
  var errorsArray = [];
  iterate$1(errors, push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

if (setPrototypeOf) setPrototypeOf($AggregateError, $Error);
else copyConstructorProperties($AggregateError, $Error, { name: true });

var AggregateErrorPrototype = $AggregateError.prototype = create($Error.prototype, {
  constructor: createPropertyDescriptor(1, $AggregateError),
  message: createPropertyDescriptor(1, ''),
  name: createPropertyDescriptor(1, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$$1({ global: true, constructor: true, arity: 2 }, {
  AggregateError: $AggregateError
});

var newPromiseCapability = {};

var aCallable$1 = aCallable$5;

var $TypeError = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw $TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$1(resolve);
  this.reject = aCallable$1(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability.f = function (C) {
  return new PromiseCapability(C);
};

var perform$1 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var $ = _export;
var call = functionCall;
var aCallable = aCallable$5;
var getBuiltIn = getBuiltIn$6;
var newPromiseCapabilityModule = newPromiseCapability;
var perform = perform$1;
var iterate = iterate$2;

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var AggregateError = getBuiltIn('AggregateError');
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aCallable(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        remaining++;
        call(promiseResolve, C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

const transformRequestHook = (res, options = {}) => {
  const {
    isTransformResponse,
    isReturnNativeResponse
  } = options;

  if (isReturnNativeResponse) {
    return res;
  }

  if (isTransformResponse === false) {
    return res.body;
  }

  const {
    body
  } = res;

  if (options.isJsonp && isString(body)) {
    return jsonp2Object(body);
  }

  try {
    if (isString(body) && body.startsWith('{')) {
      return JSON.parse(body);
    }
  } catch {}

  return body;
};

function axiosHandle(options) {
  if (!isString(options.url)) {
    var _options$url;

    options.url = (_options$url = options.url) === null || _options$url === void 0 ? void 0 : _options$url.toString();
  }

  if (isObject$1(options.params) && !isString(options.searchParams)) {
    options.searchParams = { ...options.searchParams,
      ...options.params
    };
  }

  options.headers || (options.headers = {});
  const contentType = options.headers['content-type'],
        isFormUrlencoded = contentType === null || contentType === void 0 ? void 0 : contentType.startsWith('application/x-www-form-urlencoded');

  if (isObject$1(options.data)) {
    if (isFormUrlencoded) {
      options.body = stringify(options.data);
    } else {
      options.json = options.data;
    }
  }

  if (isString(options.data) && isFormUrlencoded) {
    options.body = options.data;
  }

  function setAgent(pro) {
    if (!options.agent) {
      options.agent = {};
    }

    options.agent[pro] = options[`${pro}Agent`];
  }

  if (options.httpAgent) {
    setAgent('http');
  }

  if (options.httpsAgent) {
    setAgent('https');
  }

  if (options.url && options.url.startsWith('/')) {
    options.url = options.url.substring(1);
  }

  return options;
}

class VGot {
  name = 'VGot';

  constructor(options) {
    if (options.baseURL) {
      options.prefixUrl = options.baseURL;
    }

    this.options = options;
  }

  init() {
    if (!this.cookieJar) {
      this.cookieJar = new CookieJar();
    }

    this.gotInstance = got__default["default"].extend(this.options, {
      cookieJar: this.cookieJar
    });
  }

  request(options) {
    const {
      requestOptions = {},
      headers = {}
    } = this.options;
    options.requestOptions = Object.assign({}, requestOptions, options.requestOptions);
    options.headers = mergeHeaders(headers, options.headers);

    if (requestOptions.retry) {
      options.retry = requestOptions.retry;
    }

    options = axiosHandle(options);
    return new Promise((resolve, reject) => {
      this.gotInstance(options).then(res => {
        if (isFunction(transformRequestHook)) {
          try {
            const ret = transformRequestHook(res, options.requestOptions);
            resolve(ret);
          } catch (error) {
            reject(error || new Error('请求错误!'));
          }

          return;
        }

        resolve(res);
      }).catch(error => {
        if (error.response) {
          error.response.status = error.response.statusCode;
        }

        reject(error);
      });
    });
  }

  get(options, config) {
    if (isString(options)) {
      return this.request({ ...config,
        method: 'GET',
        url: options
      });
    }

    return this.request({ ...options,
      method: 'GET'
    });
  }

  post(options, data, config) {
    if (isString(options)) {
      return this.request({ ...config,
        method: 'POST',
        url: options,
        data
      });
    }

    return this.request({ ...options,
      method: 'POST'
    });
  }

  put(url, data, config) {
    return this.request({ ...config,
      method: 'PUT',
      url,
      data
    });
  }

  delete(url, data, config) {
    return this.request({ ...config,
      method: 'DELETE',
      url,
      data
    });
  }

  patch(url, data, config) {
    return this.request({ ...config,
      method: 'PATCH',
      url,
      data
    });
  }

}

function getOptions() {
  return {
    timeout: 10000,
    headers: {
      'content-type': defaultHeaders['content-type'],
      'user-agent': defaultHeaders['user-agent'],
      'accept-language': defaultHeaders['accept-language'],
      'accept-encoding': defaultHeaders['accept-encoding']
    },
    requestOptions: {
      isTransformResponse: true,
      ignoreCancelToken: true,
      withBiliCookie: true
    }
  };
}

function createRequest$1(opt = {}) {
  const vgot = new VGot(deepMergeObject(getOptions(), opt));
  vgot.init();
  return vgot;
}
const defHttp = createRequest$1({
  requestOptions: {
    withBiliCookie: false
  }
});

class BiliGot extends VGot {
  cookieJar = undefined;

  constructor(options) {
    super(options);
    const {
      withBiliCookie,
      withCredentials
    } = this.options.requestOptions || {};

    if (withBiliCookie) {
      this.cookieJar = new BiliCookieJar();
    } else if (withCredentials) {
      this.cookieJar = new CookieJar();
    }
  }

}

function createRequest(opt = {}) {
  const biliGot = new BiliGot(deepMergeObject(getOptions(), opt));
  biliGot.init();
  return biliGot;
}
const biliHttp = createRequest();

if (defHttp.name === 'VAxios') ;

const notice = async msg => {
  defLogger.info(msg || `阿里云 FC 测试ing`);
};

async function dailyMain(event, context) {
  notice();
  const {
    dailyHandle
  } = await Promise.resolve().then(function () { return index$1; });
  return await dailyHandle({
    event,
    context,
    slsType: 'fc'
  });
}
async function runTasks(payload) {
  try {
    const {
      runInputBiliTask
    } = await Promise.resolve().then(function () { return index; });
    const payloadJson = JSON5.parse(payload);

    if (payloadJson.task) {
      await runInputBiliTask(payloadJson.task);
      return true;
    }
  } catch {}

  return false;
}

(async () => {
  logger.info('开始执行网络代码');
  const eventJson = JSON5.parse(event.toString());
  let isReturn = false;

  if (eventJson.payload) {
    isReturn = await runTasks(eventJson.payload);
  }

  if (isReturn) {
    VMThis.message = 'success';
    VMThis.resolve('success');
    return;
  }

  const caller = dailyMain;
  caller(eventJson, context).then(message => {
    VMThis.message = message;
    VMThis.resolve(VMThis.message);
  }).catch(err => {
    VMThis.error = err;
    VMThis.reject(VMThis.error);
  });
})();

async function dailyTasks(cb, ...cbArg) {
  const {
    getBiliTask
  } = await Promise.resolve().then(function () { return index; });
  const {
    apiDelay,
    logger,
    Logger
  } = await Promise.resolve().then(function () { return index$2; });
  const {
    getWaitRuningFunc
  } = await Promise.resolve().then(function () { return configOffFun; });
  const {
    sendMessage
  } = await Promise.resolve().then(function () { return sendNotify$1; });
  const {
    printVersion
  } = await Promise.resolve().then(function () { return version; });
  await Logger.init();
  await printVersion();

  try {
    const loginTask = await getBiliTask('loginTask');
    await loginTask();
  } catch (error) {
    logger.error(`登录失败: ${error}`);
    await sendMessage('登录失败', Logger.pushValue);
    return '未完成';
  }

  const biliArr = getWaitRuningFunc();

  for await (const asyncFun of biliArr) {
    try {
      await asyncFun();
    } catch (error) {
      logger.error(`${asyncFun.name}失败: ${error}`);
    } finally {
      await apiDelay();
    }
  }

  cb && (await cb(...cbArg));
  await sendMessage('每日完成', Logger.pushValue);
  return '完成';
}

function getPayload(slsType, event) {
  return slsType === 'scf' ? event.Message : event.payload;
}

async function getUpdateTrigger(slsType, event, context) {
  const caller = slsType === 'scf' ? (await Promise.resolve().then(function () { return updateScfTrigger$1; })).default : (await Promise.resolve().then(function () { return updateFcTrigger$1; })).default;
  return (...args) => caller(event, context, ...args);
}

async function dailyHandle({
  event,
  context,
  slsType
}) {
  const payload = getPayload(slsType, event),
        updateTrigger = await getUpdateTrigger(slsType, event, context);
  let message;

  try {
    if (payload) {
      message = JSON5.parse(payload);
    }
  } catch (error) {}

  if (message && message.lastTime === getPRCDate().getDate().toString()) {
    return '今日重复执行';
  }

  return await dailyTasks(updateTrigger);
}

var index$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	dailyHandle: dailyHandle
});

const biliTaskArray = [['loginTask', () => Promise.resolve().then(function () { return loginTask$1; })], ['exchangeCoupon', () => Promise.resolve().then(function () { return exchangeCoupon$1; })], ['liveSignTask', () => Promise.resolve().then(function () { return liveSignTask$1; })], ['addCoins', () => Promise.resolve().then(function () { return addCoins$1; })], ['bigPoint', () => Promise.resolve().then(function () { return bigPoint$1; })], ['shareAndWatch', () => Promise.resolve().then(function () { return shareAndWatch$1; })], ['silver2Coin', () => Promise.resolve().then(function () { return silver2Coin$1; })], ['mangaSign', () => Promise.resolve().then(function () { return mangaSign$1; })], ['mangaTask', () => Promise.resolve().then(function () { return mangaTask$1; })], ['supGroupSign', () => Promise.resolve().then(function () { return supGroupSign$1; })], ['liveSendMessage', () => Promise.resolve().then(function () { return liveSendMessage$1; })], ['useCouponBp', () => Promise.resolve().then(function () { return useCouponBp$1; })], ['charging', () => Promise.resolve().then(function () { return charging$1; })], ['getVipPrivilege', () => Promise.resolve().then(function () { return getVipPrivilege$1; })], ['matchGame', () => Promise.resolve().then(function () { return matchGame$1; })], ['giveGift', () => Promise.resolve().then(function () { return giveGift$1; })], ['liveIntimacy', () => Promise.resolve().then(function () { return liveIntimacy$1; })], ['batchUnfollow', () => Promise.resolve().then(function () { return batchUnfollow$1; })], ['liveLottery', () => Promise.resolve().then(function () { return liveLottery$1; })], ['liveRedPack', () => Promise.resolve().then(function () { return liveRedPack$1; })], ['activityLottery', () => Promise.resolve().then(function () { return activityLottery$1; })], ['liveFamine', () => Promise.resolve().then(function () { return liveFamine$1; })], ['judgement', () => Promise.resolve().then(function () { return judgement$1; })]];
const biliTasks = new Map(biliTaskArray);
async function getBiliTask(funcName) {
  const biliTask = biliTasks.get(funcName);

  if (!biliTask) {
    return () => Promise.resolve(0);
  }

  return (await biliTask()).default;
}
function getInputBiliTask(taskNameStr) {
  const taskNameArr = taskNameStr.split(',');
  const taskArr = [];
  taskNameArr.forEach(name => {
    const task = biliTasks.get(name);

    if (task) {
      taskArr.push(task);
    }
  });
  return taskArr.map(async func => (await func()).default);
}
async function runInputBiliTask(taskNameStr) {
  const {
    logger,
    Logger
  } = await Promise.resolve().then(function () { return index$3; });
  const {
    sendMessage
  } = await Promise.resolve().then(function () { return sendNotify$1; });
  await Logger.init();
  logger.info(`开始执行自定义任务！`);
  const taskArr = getInputBiliTask(taskNameStr);

  for await (const task of taskArr) {
    await task();
  }

  logger.info(`----【版本信息】----`);
  const {
    printVersion
  } = await Promise.resolve().then(function () { return version; });
  await printVersion();
  await sendMessage('任务完成', Logger.pushValue);
}

var index = /*#__PURE__*/Object.freeze({
	__proto__: null,
	biliTaskArray: biliTaskArray,
	biliTasks: biliTasks,
	'default': biliTasks,
	getBiliTask: getBiliTask,
	getInputBiliTask: getInputBiliTask,
	runInputBiliTask: runInputBiliTask
});

function funHandle() {
  const functionConfig = TaskConfig.function;

  if (functionConfig.liveIntimacy && TaskConfig.intimacy.liveSendMessage) {
    functionConfig.liveSendMessage = false;
  }

  if (functionConfig.mangaTask && TaskConfig.manga.sign) {
    functionConfig.mangaSign = false;
  }

  return functionConfig;
}

function getWaitRuningFunc() {
  const functionConfig = funHandle();
  const result = [];
  biliTasks.forEach((task, key) => functionConfig[key] && result.push(task));
  return result.map(async func => (await func()).default);
}

var configOffFun = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getWaitRuningFunc: getWaitRuningFunc
});

function appSignString(params = {}, appkey, appsec) {
  return getAppSign(params, appkey, appsec).query;
}

function sortParams(params) {
  const keys = Object.keys(params).sort();
  return keys.map(key => [key, params[key]]);
}

function getSign(params, appsec, noSign = false) {
  const query = stringify(sortParams(params));

  if (noSign) {
    return {
      query,
      sign: ''
    };
  }

  const sign = md5(query + appsec);
  return {
    query: query + '&sign=' + sign,
    sign
  };
}

function getAppSign(params, appkey = '1d8b6e7d45233436', appsec = '560c52ccd288fed045859ed18bffd973') {
  var _require;

  params = { ...params,
    platform: 'android',
    mobi_app: 'android',
    disable_rcmd: 0,
    build: 6780300,
    c_locale: 'zh_CN',
    s_locale: 'zh_CN',
    ts: getUnixTime()
  };
  params.access_key = params.access_key || ((_require = require("../config/globalVar")) === null || _require === void 0 ? void 0 : _require.TaskConfig.access_key);

  if (!params.access_key) {
    delete params.access_key;
    return getSign(params, appsec, true);
  }

  delete params.csrf;
  delete params.csrf_token;
  params = { ...params,
    actionKey: 'appkey',
    appkey
  };
  return getSign(params, appsec);
}

function objectValueToString(params) {
  Object.keys(params).forEach(key => {
    if (isNumber(params[key])) {
      params[key] = params[key].toString();
      return;
    }

    if (isObject$1(params[key])) {
      objectValueToString(params[key]);
      return;
    }

    if (isArray(params[key])) {
      params[key] = params[key].map(item => isObject$1(item) ? objectValueToString(item) : item.toString());
    }
  });
  return params;
}

function clientSign(params) {
  let data = JSON.stringify(objectValueToString(params));
  const alg = ['SHA512', 'SHA3-512', 'SHA384', 'SHA3-384', 'BLAKE2b512'];

  for (const a of alg) {
    data = crypto__namespace.createHash(a).update(data).digest('hex');
  }

  return data;
}
function conciseNickname(nickname = '') {
  const length = nickname.length;

  if (length <= 3) {
    return nickname;
  }

  const firstWord = nickname[0];
  const lastWord = nickname[length - 1];
  return `${firstWord}**${lastWord}`;
}

let MyProcessEnv = {};

function initEnv() {
  var _TaskConfig$message;

  function upperCaseToHump(str) {
    return str.toLowerCase().replace(/_(\w)/g, (_match, t) => t.toUpperCase());
  }

  const envName = ['GOBOT_URL', 'GOBOT_TOKEN', 'GOBOT_QQ', 'SCKEY', 'QQ_SKEY', 'QQ_MODE', 'BARK_PUSH', 'BARK_SOUND', 'BARK_GROUP', 'TG_BOT_TOKEN', 'TG_USER_ID', 'TG_PROXY_AUTH', 'TG_PROXY_HOST', 'TG_PROXY_PORT', 'TG_API_HOST', 'DD_BOT_TOKEN', 'DD_BOT_SECRET', 'QYWX_KEY', 'QYWX_AM', 'IGOT_PUSH_KEY', 'PUSH_PLUS_TOKEN', 'PUSH_PLUS_USER'];
  const message = TaskConfig.message || {};
  MyProcessEnv = initProcessEnv(MyProcessEnv);
  envName.forEach(name => {
    const value = message[upperCaseToHump(name)] || message[name] || process.env[name];

    if (value) {
      var _value$trim;

      MyProcessEnv[name] = (_value$trim = value.trim) === null || _value$trim === void 0 ? void 0 : _value$trim.call(value);
    }
  });

  if ((_TaskConfig$message = TaskConfig.message) !== null && _TaskConfig$message !== void 0 && _TaskConfig$message.pushplusToken) {
    MyProcessEnv.PUSH_PLUS_TOKEN = TaskConfig.message.pushplusToken;
  }
}

const timeout = 15000;

function initProcessEnv(processEnv = {}) {
  MyProcessEnv.SCKEY = '';
  MyProcessEnv.BARK_PUSH = '';
  MyProcessEnv.BARK_SOUND = '';
  MyProcessEnv.BARK_GROUP = 'QingLong';
  MyProcessEnv.TG_BOT_TOKEN = '';
  MyProcessEnv.TG_USER_ID = '';
  MyProcessEnv.TG_PROXY_HOST = '';
  MyProcessEnv.TG_PROXY_PORT = '';
  MyProcessEnv.TG_PROXY_AUTH = '';
  MyProcessEnv.TG_API_HOST = 'api.telegram.org';
  MyProcessEnv.DD_BOT_TOKEN = '';
  MyProcessEnv.DD_BOT_SECRET = '';
  MyProcessEnv.QYWX_KEY = '';
  MyProcessEnv.QYWX_AM = '';
  MyProcessEnv.IGOT_PUSH_KEY = '';
  MyProcessEnv.PUSH_PLUS_TOKEN = '';
  MyProcessEnv.PUSH_PLUS_USER = '';
  MyProcessEnv.QQ_SKEY = '';
  MyProcessEnv.QQ_MODE = '';
  return processEnv;
}

async function sendNotify(text, desp, params = {}, author = '\n\n本通知 By：https://github.com/KudouRan/BiliTools') {
  initEnv();
  desp += author;
  await Promise.all([serverNotify(text, desp), pushPlusNotify(text, desp)]);
  await Promise.all([BarkNotify(text, desp, params), tgBotNotify(text, desp), ddBotNotify(text, desp), qywxBotNotify(text, desp), qywxamNotify(text, desp), iGotNotify(text, desp, params), sendMail(text, desp), customApi(text, desp), CoolPush(text, desp)]);
}

async function sendMail(title, text) {
  var _TaskConfig$message2;

  const user = (_TaskConfig$message2 = TaskConfig.message) === null || _TaskConfig$message2 === void 0 ? void 0 : _TaskConfig$message2.email;
  if (!user || !user.pass || !user.from || !user.host) return;
  const {
    createTransport
  } = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('nodemailer')); });
  const port = Number(user.port) || 465;
  const transporter = createTransport({
    host: user.host,
    port: port,
    secure: port === 465,
    auth: {
      user: user.from,
      pass: user.pass
    }
  });
  const info = await transporter.sendMail({
    from: `${title} <${user.from}>`,
    to: user.to,
    subject: title,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
    text: text.replace(/\n/g, '\r\n')
  });
  logger.info(`邮件消息已发送: ${info.messageId}`);
}

async function customApi(title, text) {
  try {
    const apiTemplate = TaskConfig.message.api;
    if (!apiTemplate || !apiTemplate.url) return;
    const {
      data,
      proxy,
      timeout,
      headers
    } = apiTemplate;
    const method = apiTemplate.method.toUpperCase() || 'POST';
    const options = {
      method: method,
      timeout,
      headers,
      url: ''
    };
    options.url = apiTemplate.url.replace('{title}', encodeURIComponent(title)).replace('{text}', encodeURIComponent(text));

    if (proxy.host) {
      const tunnel = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('tunnel')); });
      const httpsAgent = tunnel.httpsOverHttp({
        proxy: {
          host: proxy.host,
          port: +proxy.port,
          proxyAuth: proxy.auth
        },
        maxSockets: 1
      });
      Object.assign(options, {
        httpsAgent
      });
    }

    const keys = Object.keys(data);

    if (keys.length) {
      keys.forEach(key => {
        if (data[key] === '{text}') {
          data[key] = text;
        }

        if (data[key] === '{title}') {
          data[key] = title;
        }
      });
      Object.assign(options, {
        data
      });
    }

    await defHttp.request(options);
    logger.info(`自定义接口消息已发送！`);
  } catch (error) {
    logger.info(`自定义接口消息发送失败: ${error}`);
    logger.error(error);
  }
}

function serverNotify(text, desp, time = 2100) {
  return new Promise(resolve => {
    const SCKEY = MyProcessEnv.SCKEY;

    if (SCKEY) {
      desp = desp.replace(/[\n\r]/g, '\n\n');
      const options = {
        url: SCKEY.includes('SCT') ? `https://sctapi.ftqq.com/${SCKEY}.send` : `https://sc.ftqq.com/${SCKEY}.send`,
        data: `text=${text}&desp=${desp}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout
      };
      setTimeout(() => {
        defHttp.post(options).then(data => {
          if (data.errno === 0 || data.data.errno === 0) {
            logger.info('server酱发送通知消息成功🎉');
          } else if (data.errno === 1024) {
            logger.info(`server酱发送通知消息异常: ${data.errmsg}`);
          } else {
            logger.info(`server酱发送通知消息异常\n${JSON.stringify(data)}`);
          }
        }).catch(err => {
          logger.info('server酱发送通知调用API失败！！');
          logger.info(err);
        }).finally(() => {
          resolve('');
        });
      }, time);
    } else {
      resolve('');
    }
  });
}

function CoolPush(text, desp) {
  return new Promise(resolve => {
    const {
      QQ_SKEY,
      QQ_MODE
    } = MyProcessEnv;

    if (QQ_SKEY) {
      const options = {
        url: `https://push.xuthus.cc/${QQ_MODE}/${QQ_SKEY}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {},
        params: {}
      };
      text = text.replace(/京豆/g, '豆豆');
      desp = desp.replace(/京豆/g, '');
      desp = desp.replace(/🐶/g, '');
      desp = desp.replace(/红包/g, 'H包');

      if (QQ_MODE === 'email') {
        options.data = {
          t: text,
          c: desp
        };
      } else {
        options.data = `${text}\n\n${desp}`;
      }

      const pushMode = function (t) {
        switch (t) {
          case 'send':
            return '个人';

          case 'group':
            return 'QQ群';

          case 'wx':
            return '微信';

          case 'ww':
            return '企业微信';

          case 'email':
            return '邮件';

          default:
            return '未知方式';
        }
      };

      defHttp.post(options).then(data => {
        if (data.code === 200) {
          logger.info(`酷推发送${pushMode(QQ_MODE)}通知消息成功🎉`);
        } else if (data.code === 400) {
          logger.info(`QQ酷推(Cool Push)发送${pushMode(QQ_MODE)}推送失败：${data.msg}`);
        } else if (data.code === 503) {
          logger.info(`QQ酷推出错，${data.message}：${data.data}`);
        } else {
          logger.info(`酷推推送异常: ${JSON.stringify(data)}`);
        }
      }).catch(err => {
        logger.info(`发送${pushMode(QQ_MODE)}通知调用API失败！！`);
        logger.info(err);
      }).finally(() => {
        resolve('');
      });
    } else {
      resolve('');
    }
  });
}

function BarkNotify(text, desp, params = {}) {
  return new Promise(resolve => {
    const {
      BARK_PUSH,
      BARK_SOUND,
      BARK_GROUP
    } = MyProcessEnv;

    if (BARK_PUSH) {
      const options = {
        url: `${BARK_PUSH}/${encodeURIComponent(text)}/${encodeURIComponent(desp)}?sound=${BARK_SOUND}&group=${BARK_GROUP}&${stringify(params)}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout
      };
      defHttp.get(options).then(data => {
        if (data.code === 200) {
          logger.info('Bark APP发送通知消息成功🎉');
        } else {
          logger.info(`Bark APP发送通失败：${data.message}`);
        }
      }).catch(err => {
        logger.info('Bark APP发送通知调用API失败！！');
        logger.error(err);
      }).finally(() => {
        resolve('');
      });
    }

    resolve('');
  });
}

function tgBotNotify(text, desp) {
  return new Promise(async resolve => {
    const {
      TG_BOT_TOKEN,
      TG_USER_ID,
      TG_API_HOST,
      TG_PROXY_HOST,
      TG_PROXY_PORT,
      TG_PROXY_AUTH
    } = MyProcessEnv;

    if (TG_BOT_TOKEN && TG_USER_ID) {
      const options = {
        url: `https://${TG_API_HOST}/bot${TG_BOT_TOKEN}/sendMessage`,
        data: `chat_id=${TG_USER_ID}&text=${text}\n\n${desp}&disable_web_page_preview=true`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout
      };

      if (TG_PROXY_HOST && TG_PROXY_PORT) {
        const tunnel = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('tunnel')); });
        const httpsAgent = tunnel.httpsOverHttp({
          proxy: {
            host: TG_PROXY_HOST,
            port: +TG_PROXY_PORT,
            proxyAuth: TG_PROXY_AUTH
          },
          maxSockets: 1
        });
        Object.assign(options, {
          httpsAgent
        });
      }

      defHttp.post(options).then(data => {
        if (data.ok) {
          logger.info('Telegram发送通知消息成功🎉。');
        } else if (data.error_code === 400) {
          logger.info('请主动给bot发送一条消息并检查接收用户ID是否正确。');
        } else if (data.error_code === 401) {
          logger.info('Telegram bot token 填写错误。');
        }
      }).catch(err => {
        logger.info('telegram发送通知消息失败！！');
        logger.info(err);
      }).finally(() => {
        resolve('');
      });
    } else {
      resolve('');
    }
  });
}

function ddBotNotify(text, desp) {
  return new Promise(resolve => {
    const {
      DD_BOT_TOKEN,
      DD_BOT_SECRET
    } = MyProcessEnv;
    const options = {
      url: `https://oapi.dingtalk.com/robot/send?access_token=${DD_BOT_TOKEN}`,
      data: {
        msgtype: 'text',
        text: {
          content: ` ${text}\n\n${desp}`
        }
      },
      headers: {
        'Content-Type': 'application/json'
      },
      timeout
    };

    if (!DD_BOT_TOKEN) {
      resolve('');
      return;
    }

    if (DD_BOT_SECRET) {
      const crypto = require('crypto');

      const dateNow = Date.now();
      const hmac = crypto.createHmac('sha256', DD_BOT_SECRET);
      hmac.update(`${dateNow}\n${DD_BOT_SECRET}`);
      const result = encodeURIComponent(hmac.digest('base64'));
      options.url = `${options.url}&timestamp=${dateNow}&sign=${result}`;
    }

    defHttp.post(options).then(data => {
      if (data.errcode === 0) {
        logger.info('钉钉发送通知消息成功🎉。');
      } else {
        logger.info(`钉钉发送通知失败：${data.errmsg}`);
      }
    }).catch(err => {
      logger.info('钉钉发送通知消息失败！！');
      logger.info(err);
    });
    resolve('');
  });
}

function qywxBotNotify(text, desp) {
  return new Promise(resolve => {
    const {
      QYWX_KEY
    } = MyProcessEnv;
    const options = {
      url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${QYWX_KEY}`,
      data: {
        msgtype: 'text',
        text: {
          content: ` ${text}\n\n${desp}`
        }
      },
      headers: {
        'Content-Type': 'application/json'
      },
      timeout
    };

    if (QYWX_KEY) {
      defHttp.post(options).then(data => {
        if (data.errcode === 0) {
          logger.info('企业微信发送通知消息成功🎉。');
        } else {
          logger.info(`企业微信发送通知失败：${data.errmsg}`);
        }
      }).catch(err => {
        logger.info('企业微信发送通知消息失败！！');
        logger.info(err);
      }).finally(() => {
        resolve('');
      });
    }

    resolve('');
  });
}

function ChangeUserId(desp) {
  const {
    QYWX_AM
  } = MyProcessEnv;
  const QYWX_AM_AY = QYWX_AM === null || QYWX_AM === void 0 ? void 0 : QYWX_AM.split(',');

  if (QYWX_AM_AY[2]) {
    const userIdTmp = QYWX_AM_AY[2].split('|');
    let userId = '';

    for (let i = 0; i < userIdTmp.length; i++) {
      const count2 = '签到号 ' + (i + 1);

      if (desp.match(count2)) {
        userId = userIdTmp[i];
      }
    }

    if (!userId) userId = QYWX_AM_AY[2];
    return userId;
  } else {
    return '@all';
  }
}

function qywxamNotify(text, desp) {
  return new Promise(resolve => {
    const QYWX_AM = MyProcessEnv.QYWX_AM;

    if (QYWX_AM) {
      const QYWX_AM_AY = QYWX_AM.split(',');
      const options_accesstoken = {
        url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken`,
        data: {
          corpid: `${QYWX_AM_AY[0]}`,
          corpsecret: `${QYWX_AM_AY[1]}`
        },
        headers: {
          'Content-Type': 'application/json'
        },
        timeout
      };
      defHttp.post(options_accesstoken).then(data => {
        const html = desp.replace(/\n/g, '<br/>');
        const accesstoken = data.access_token;
        let options;

        switch (QYWX_AM_AY[4]) {
          case '0':
            options = {
              msgtype: 'textcard',
              textcard: {
                title: `${text}`,
                description: `${desp}`,
                url: 'https://github.com/whyour/qinglong',
                btntxt: '更多'
              }
            };
            break;

          case '1':
            options = {
              msgtype: 'text',
              text: {
                content: `${text}\n\n${desp}`
              }
            };
            break;

          default:
            options = {
              msgtype: 'mpnews',
              mpnews: {
                articles: [{
                  title: `${text}`,
                  thumb_media_id: `${QYWX_AM_AY[4]}`,
                  author: `智能助手`,
                  content_source_url: ``,
                  content: `${html}`,
                  digest: `${desp}`
                }]
              }
            };
        }

        if (!QYWX_AM_AY[4]) {
          options = {
            msgtype: 'text',
            text: {
              content: `${text}\n\n${desp}`
            }
          };
        }

        options = {
          url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accesstoken}`,
          data: {
            touser: `${ChangeUserId(desp)}`,
            agentid: `${QYWX_AM_AY[3]}`,
            safe: '0',
            ...options
          },
          headers: {
            'Content-Type': 'application/json'
          }
        };
        defHttp.post(options).then(data => {
          if (data.errcode === 0) {
            logger.info('成员ID:' + ChangeUserId(desp) + '企业微信应用消息发送通知消息成功🎉。');
          } else {
            logger.info(`企业微信应用：${data.errmsg}`);
          }
        }).catch(err => {
          logger.info('成员ID:' + ChangeUserId(desp) + '企业微信应用消息发送通知消息失败！！');
          logger.info(err);
        }).finally(() => {
          resolve('');
        });
      }).catch(err => {
        logger.error('企业微信应用消息发送通知消息失败！！');
        logger.error(err);
      });
    } else {
      resolve('');
    }
  });
}

function iGotNotify(text, desp, params = {}) {
  return new Promise(resolve => {
    const {
      IGOT_PUSH_KEY
    } = MyProcessEnv;

    if (IGOT_PUSH_KEY) {
      const IGOT_PUSH_KEY_REGX = new RegExp('^[a-zA-Z0-9]{24}$');

      if (!IGOT_PUSH_KEY_REGX.test(IGOT_PUSH_KEY)) {
        logger.info('您所提供的IGOT_PUSH_KEY无效');
        resolve('');
        return;
      }

      const options = {
        url: `https://push.hellyw.com/${IGOT_PUSH_KEY.toLowerCase()}`,
        data: `title=${text}&content=${desp}&${stringify(params)}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout
      };
      defHttp.post(options).then(data => {
        if (typeof data === 'string') data = JSON.parse(data);

        if (data.ret === 0) {
          logger.info('iGot发送通知消息成功🎉');
        } else {
          logger.info(`iGot发送通知消息失败：${data.errMsg}`);
        }
      }).catch(err => {
        logger.info('iGot发送通知调用API失败！！');
        logger.info(err);
      }).finally(() => {
        resolve('');
      });
    } else {
      resolve('');
    }
  });
}

function pushPlusNotify(text, desp) {
  return new Promise(resolve => {
    const {
      PUSH_PLUS_TOKEN,
      PUSH_PLUS_USER
    } = MyProcessEnv;

    if (PUSH_PLUS_TOKEN) {
      desp = desp.replace(/[\n\r]/g, '<br>');
      const data = {
        token: `${PUSH_PLUS_TOKEN}`,
        title: `${text}`,
        content: `${desp}`,
        topic: `${PUSH_PLUS_USER}`
      };
      const options = {
        url: `https://www.pushplus.plus/send`,
        data,
        headers: {
          'Content-Type': ' application/json'
        },
        timeout
      };
      defHttp.post(options).then(data => {
        if (data.code === 200) {
          logger.info(`push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息完成。`);
        } else {
          logger.info(`push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息失败：${data.msg}`);
        }
      }).catch(err => {
        logger.info(`push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'}通知消息失败！！`);
        logger.info(err);
      }).finally(() => {
        resolve('');
      });
    } else {
      resolve('');
    }
  });
}

async function sendMessage$1(title, text) {
  logger.info('----【消息推送】----');
  title = `Bili-${conciseNickname(TaskModule === null || TaskModule === void 0 ? void 0 : TaskModule.nickname) || TaskConfig.USERID}-${title}`;

  if (TaskModule.pushTitle.length) {
    title = `${title}-${TaskModule.pushTitle.join('')}`;
  }

  await sendNotify(title, text, undefined, '');
}

var sendNotify$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	sendMessage: sendMessage$1
});

async function getLatestVersion() {
  const options = {
    timeout: 6000
  };

  try {
    const data = await Promise.any([defHttp.get('https://api.github.com/repos/KudouRan/BiliTools/releases/latest', options), defHttp.get('https://gitee.com/api/v5/repos/KudouRan/BiliTools/releases/latest', options)]);
    return data.tag_name;
  } catch (error) {
    return;
  }
}

async function printVersion() {
  const {
    logger
  } = await Promise.resolve().then(function () { return index$3; });
  let version = 'v0.5.8-stable';

  if (version.includes('.')) {
    logger.info(`当前版本【v0.5.8-stable】`);
  } else {
    version = '';
  }

  try {
    if (!version) {
      version = 'v' + (getVersionByPkg() || getVersionByFile());
      logger.info(`当前版本【${version}】`);
    }

    if (!version) {
      return;
    }

    const latestTag = await getLatestVersion();

    if (latestTag && checkVersion(version, latestTag)) {
      logger.info(`可更新：最新版本【${latestTag}】`);
    }
  } catch {}
}

function getVersionByPkg() {
  try {
    return require("../../package.json").version;
  } catch {}
}

function getVersionByFile() {
  try {
    return fs__namespace.readFileSync(path__namespace.resolve(__dirname, '../version.txt'), 'utf8').trim();
  } catch {}
}

function checkVersion(version, latestTag) {
  if (version.startsWith('v')) {
    version = version.substring(1);
  }

  if (latestTag.startsWith('v')) {
    latestTag = latestTag.substring(1);
  }

  if (version === latestTag) {
    return false;
  }

  const versionArr = version.split('.').slice(0, 3),
        latestTagArr = latestTag.split('.').slice(0, 3);

  for (let i = 0; i < versionArr.length; i++) {
    const versionNum = parseInt(versionArr[i]),
          latestTagNum = parseInt(latestTagArr[i]);

    if (isNaN(versionNum) || isNaN(latestTagNum)) {
      return true;
    }

    if (versionNum < latestTagNum) {
      return true;
    }

    if (versionNum > latestTagNum) {
      return false;
    }
  }

  return false;
}

var version = /*#__PURE__*/Object.freeze({
	__proto__: null,
	printVersion: printVersion,
	checkVersion: checkVersion
});

async function getSDK$1() {
  try {
    return await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('tencentcloud-sdk-nodejs')); });
  } catch {
    logger.warn('tencentcloud-sdk-nodejs not found，运行 cd src && yarn add tencentcloud-sdk-nodejs');
  }
}

async function updateScfTrigger (event, context, {
  customArg,
  triggerDesc
} = {}) {
  if (!event.TriggerName) {
    return false;
  }

  if (!process.env.TENCENT_SECRET_ID || !process.env.TENCENT_SECRET_KEY) {
    logger.info('环境变量不存在TENCENT_SECRET_ID和TENCENT_SECRET_KEY');
    return false;
  }

  const sdk = await getSDK$1();

  if (!sdk) {
    return false;
  }

  const ScfClient = sdk.scf.v20180416.Client;
  const FUNCTION_NAME = context.function_name;
  const TRIGGER_NAME = event.TriggerName;
  const clientConfig = {
    credential: {
      secretId: process.env.TENCENT_SECRET_ID.trim(),
      secretKey: process.env.TENCENT_SECRET_KEY.trim()
    },
    region: context.tencentcloud_region,
    profile: {
      httpProfile: {
        endpoint: 'scf.tencentcloudapi.com'
      }
    }
  };
  const client = new ScfClient(clientConfig);

  async function createTrigger(params) {
    const today = getPRCDate();
    params.CustomArgument = JSON.stringify({ ...customArg,
      lastTime: today.getDate().toString()
    });

    try {
      return await client.CreateTrigger(params);
    } catch ({
      code,
      message
    }) {
      logger.error(`创建trigger失败 ${code} => ${message}`);
      return false;
    }
  }

  async function deleteTrigger(params) {
    try {
      return await client.DeleteTrigger(params);
    } catch ({
      code,
      message
    }) {
      logger.warn(`删除trigger失败 ${code} => ${message}`);
      return false;
    }
  }

  async function getHasTrigger() {
    try {
      const {
        Triggers
      } = await client.ListTriggers({
        FunctionName: FUNCTION_NAME
      });
      const triggerIndex = Triggers === null || Triggers === void 0 ? void 0 : Triggers.findIndex(trigger => trigger.TriggerName === TRIGGER_NAME);
      return triggerIndex !== -1;
    } catch ({
      code,
      message
    }) {
      logger.error(`获取trigger失败 ${code} => ${message}`);
      return false;
    }
  }

  async function aSingleUpdate() {
    const runTime = triggerDesc || randomDailyRunTime(TaskConfig.dailyRunTime, 'scf');
    const params = {
      FunctionName: FUNCTION_NAME,
      TriggerName: TRIGGER_NAME,
      Type: 'timer',
      TriggerDesc: runTime.value,
      Qualifier: '$DEFAULT'
    };
    const hasTrigger = await getHasTrigger();
    logger.info(`修改时间为：${runTime.string}`);

    if (hasTrigger) {
      const deleteResult = await deleteTrigger(params);

      if (!deleteResult) {
        return false;
      }
    }

    return !!(await createTrigger(params));
  }

  let updateResults = false,
      runningTotalNumber = 2;

  while (!updateResults && runningTotalNumber) {
    updateResults = await aSingleUpdate();
    runningTotalNumber--;
  }

  return updateResults;
}

var updateScfTrigger$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': updateScfTrigger
});

async function getSDK() {
  try {
    return await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@alicloud/fc2')); });
  } catch {
    logger.warn('@alicloud/fc2 not found，运行 yarn add @alicloud/fc2');
  }
}

async function updateFcTrigger (event, context, {
  customArg,
  triggerDesc
} = {}) {
  if (!event.triggerName) {
    return false;
  }

  if (!process.env.ALI_SECRET_ID || !process.env.ALI_SECRET_KEY) {
    logger.info('环境变量不存在ALI_SECRET_ID和ALI_SECRET_KEY');
    return false;
  }

  const sdk = await getSDK();

  if (!sdk) {
    return false;
  }

  const FCClient = sdk.default;
  const FUNCTION_NAME = context.function.name;
  const TRIGGER_NAME = event.triggerName;
  const SERVICE_NAME = context.service.name;
  const client = new FCClient(context.accountId, {
    accessKeyID: process.env.ALI_SECRET_ID.trim(),
    accessKeySecret: process.env.ALI_SECRET_KEY.trim(),
    region: context.region
  });

  async function updateTrigger(cron) {
    const today = getPRCDate();
    const cronExpression = `CRON_TZ=Asia/Shanghai ${cron}`;

    try {
      return await client.updateTrigger(SERVICE_NAME, FUNCTION_NAME, TRIGGER_NAME, {
        triggerConfig: {
          cronExpression,
          payload: JSON.stringify({ ...customArg,
            lastTime: today.getDate().toString()
          })
        }
      });
    } catch (error) {
      logger.error(`更新trigger失败 ${error.message}`);
      return false;
    }
  }

  async function aSingleUpdate() {
    const runTime = triggerDesc || randomDailyRunTime(TaskConfig.dailyRunTime, 'fc');
    logger.info(`修改时间为：${runTime.string}`);
    return !!(await updateTrigger(runTime.value));
  }

  let updateResults = false,
      runningTotalNumber = 2;

  while (!updateResults && runningTotalNumber) {
    updateResults = await aSingleUpdate();
    runningTotalNumber--;
  }

  return updateResults;
}

var updateFcTrigger$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': updateFcTrigger
});

const accountApi = createRequest({
  baseURL: baseURLs.account,
  headers: {
    'user-agent': TaskConfig.userAgent
  }
});
const liveApi = createRequest({
  baseURL: baseURLs.live,
  headers: {
    Referer: RefererURLs.www,
    'user-agent': TaskConfig.userAgent
  }
});
const biliApi = createRequest({
  baseURL: baseURLs.api,
  headers: {
    Referer: RefererURLs.www,
    'user-agent': TaskConfig.userAgent
  }
});
const mangaApi = createRequest({
  baseURL: baseURLs.manga,
  headers: {
    'user-agent': TaskConfig.userAgent
  }
});
const vcApi = createRequest({
  baseURL: baseURLs.vc,
  headers: {
    'user-agent': TaskConfig.userAgent,
    Referer: RefererURLs.www
  }
});
const liveTraceApi = createRequest({
  baseURL: baseURLs.liveTrace,
  headers: {
    'user-agent': TaskConfig.userAgent
  }
});

function loginByCookie() {
  return biliApi.get('x/web-interface/nav', {
    headers: {
      Origin: OriginURLs.account
    }
  });
}
function getDailyTaskRewardInfo() {
  return biliApi.get('x/member/web/exp/reward');
}
function getDonateCoinExp() {
  return biliApi.get('x/web-interface/coin/today/exp');
}
function getCoinHistory() {
  return biliApi.get('x/member/web/coin/log?jsonp=jsonp', {
    headers: {
      origin: OriginURLs.account
    }
  });
}
function getCoinBalance() {
  return accountApi.get('site/getCoin');
}
function getFollowings(vmid, pageNumber = 1, pageSize = 50, order = 'desc', order_type = 'attention') {
  return biliApi.get('x/relation/followings', {
    params: {
      vmid,
      pn: pageNumber,
      ps: pageSize,
      order,
      order_type
    }
  });
}
function getFollowingsByTag(pageNumber = 1, pageSize = 50, tagId = -10) {
  return biliApi.get('x/relation/tag', {
    params: {
      tagid: tagId,
      pn: pageNumber,
      ps: pageSize
    }
  });
}
function getSpecialFollowings(pageNumber = 1, pageSize = 50) {
  return getFollowingsByTag(pageNumber, pageSize, -10);
}
function getUser(mid) {
  return biliApi.get(`x/space/acc/info?mid=${mid}&jsonp=jsonp`);
}
function createTag(name) {
  return biliApi.post('x/relation/tag/create', {
    tag: name,
    jsonp: 'jsonp',
    csrf: TaskConfig.BILIJCT
  });
}
function modeRelation(mid, action = 1) {
  return biliApi.post('x/relation/modify', {
    fid: mid,
    act: action,
    re_src: 11,
    spmid: '333.999.0.0',
    jsonp: 'jsonp',
    csrf: TaskConfig.BILIJCT
  });
}
function unFollow(mid) {
  return modeRelation(mid, 2);
}
function moveToTag(mid, tagId) {
  return biliApi.post('x/relation/tags/addUsers?cross_domain=true', {
    fids: mid,
    tagids: tagId,
    csrf: TaskConfig.BILIJCT
  }, {
    headers: {
      Origin: OriginURLs.space
    }
  });
}
function getTags() {
  return biliApi.get('x/relation/tags?jsonp=jsonp&callback=__jp3', {
    headers: {
      Referer: 'https://space.bilibili.com/1/fans/follow?tagid=0'
    },
    requestOptions: {
      isJsonp: true
    }
  });
}

async function request$1(reqFunc, options = {
  transform: true
}, ...args) {
  const thatlogger = getLogger(options.logger);
  const {
    name,
    successCode = 0,
    transform,
    okMsg
  } = options;

  try {
    const resp = await reqFunc(...args);
    const {
      code,
      message,
      msg,
      data
    } = resp || {};

    if (code !== successCode) {
      thatlogger.warn(`${name || reqFunc.name}请求失败：${code} ${message || msg}`);
    }

    if (okMsg) {
      thatlogger.info(okMsg);
    }

    if (transform === false) {
      return resp;
    }

    return data;
  } catch (error) {
    thatlogger.error(`${name || reqFunc.name}请求出现异常`);
    thatlogger.error(error);
  }

  return {};
}

function getLogger(loggerOption) {
  if (loggerOption === undefined) {
    return logger;
  } else if (isBoolean(loggerOption)) {
    return loggerOption ? logger : emptyLogger;
  } else {
    return loggerOption;
  }
}

function getRequestNameWrapper(options = {}) {
  return (reqFunc, name, ...args) => request$1(reqFunc, { ...options,
    name
  }, ...args);
}

function estimatedDays(upLevelExp) {
  const {
    targetCoins
  } = TaskConfig.coin;
  if (targetCoins <= 0) return upLevelExp / 15;
  const dailyExp = targetCoins * 10 + 15;
  const idealDays = upLevelExp / dailyExp;
  const coinSupportDays = TaskModule.money / (targetCoins - 1);
  if (idealDays < coinSupportDays) return Math.floor(idealDays);
  const needExp = upLevelExp - coinSupportDays * dailyExp;
  return needExp / 25 + coinSupportDays;
}

function setLevelInfo(data) {
  const levelInfo = data.level_info;
  const currentLevel = levelInfo.current_level;

  if (currentLevel >= TaskConfig.coin.targetLevel && TaskConfig.limit.level6) {
    TaskModule.coinsTask = 0;
  }

  logger.info(`当前等级: ${levelInfo.current_level}`);

  if (currentLevel < 6) {
    const upLevelExp = levelInfo.next_exp - levelInfo.current_exp;
    logger.info(`距升级还需 ${upLevelExp} 经验，预计 ${estimatedDays(upLevelExp).toFixed(2)} 天`);
    return;
  }

  if (TaskConfig.limit.level6) {
    logger.info('已经满级（关闭部分功能）');
    const funcs = TaskConfig.function;
    funcs.shareAndWatch = false;
    funcs.addCoins = false;
  } else {
    logger.info('已经满级，但要求继续（投币，分享等）');
  }
}

function setVipStatus(data) {
  let vipTypeMsg = '';
  TaskModule.vipType = data.vipType;
  TaskModule.vipStatus = data.vipStatus;

  switch (data.vipType) {
    case 0:
      vipTypeMsg = '无大会员';
      break;

    case 1:
      vipTypeMsg = '月度大会员';
      break;

    case 2:
      vipTypeMsg = '年度大会员';
      break;
  }

  if (data.vipStatus === 0) {
    vipTypeMsg = vipTypeMsg === '无大会员' ? vipTypeMsg : vipTypeMsg + '[已过期]';
  }

  logger.info(`大会员状态: ${vipTypeMsg}`);
}

async function setUserInfo(data) {
  try {
    var _data$wallet;

    const {
      money
    } = await request$1(getCoinBalance);
    logger.info(`登录成功: ${data.uname}`);
    logger.info(`硬币余额: ${money || 0}`);
    TaskModule.nickname = data.uname;
    TaskModule.money = money || 0;
    TaskModule.userLevel = data.level_info.current_level;
    TaskModule.couponBalance = ((_data$wallet = data.wallet) === null || _data$wallet === void 0 ? void 0 : _data$wallet.coupon_balance) || 0;
    setLevelInfo(data);
    setVipStatus(data);
  } catch (error) {
    logger.error(`获取硬币信息异常: ${error.message}`);
    logger.debug(error);
  }
}

async function loginTask() {
  logger.info('----【登录】----');
  const {
    data,
    message,
    code
  } = await loginByCookie();

  if (code !== 0) {
    logger.error(`登录错误 ${code} ${message}`);
    throw new Error(message);
  }

  if (!data.isLogin) {
    throw new Error('接口返回为未登录');
  }

  await apiDelay();
  await setUserInfo(data);
}

var loginTask$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	setVipStatus: setVipStatus,
	'default': loginTask
});

function clockIn(platform = 'android') {
  return mangaApi.post('twirp/activity.v1.Activity/ClockIn', {
    platform
  });
}
function getFavoriteList$1(page_num = 1, page_size = 50, order = 1) {
  return mangaApi.post(`twirp/bookshelf.v1.Bookshelf/ListFavorite?platform=web`, {
    page_num,
    page_size,
    order,
    wait_free: 0
  });
}
function getCoupons(page_num = 1, page_size = 50) {
  return mangaApi.post(`twirp/user.v1.User/GetCoupons?platform=web`, {
    not_expired: true,
    page_num,
    page_size,
    tab_type: 1
  });
}
function getMangaDetail(comic_id) {
  return mangaApi.post(`twirp/comic.v1.Comic/ComicDetail`, {
    device: 'android',
    version: '4.16.0',
    comic_id: comic_id
  });
}
function getBuyInfo(ep_id) {
  return mangaApi.post(`twirp/comic.v1.Comic/GetEpisodeBuyInfo?platform=web`, {
    ep_id
  });
}
function buyManga$1(ep_id, coupon_id, buy_method = 2, auto_pay_gold_status = 0) {
  return mangaApi.post(`twirp/comic.v1.Comic/BuyEpisode?&platform=web`, {
    buy_method,
    ep_id,
    coupon_id,
    auto_pay_gold_status
  });
}
function searchManga$1(keyword, page_num = 1, page_size = 9) {
  return mangaApi.post(`twirp/comic.v1.Comic/Search?device=pc&platform=web`, {
    keyword,
    page_num,
    page_size
  });
}
function getMangaPoint() {
  return mangaApi.post('twirp/pointshop.v1.Pointshop/GetUserPoint');
}
function exchangeMangaShop(product_id = 195, point = 100, product_num = 1) {
  return mangaApi.post(`twirp/pointshop.v1.Pointshop/Exchange`, {
    product_id,
    point,
    product_num
  });
}
function takeSeasonGift$1() {
  return mangaApi.post(`twirp/user.v1.Season/TakeSeasonGifts`, {
    id: 0,
    is_teenager: 0,
    no_recommend: 0,
    season_id: 30,
    take_type: 1,
    ts: new Date().getTime()
  });
}

let expireCouponNum;

async function getExpireCouponNum() {
  expireCouponNum = 0;

  try {
    const {
      code,
      msg,
      data
    } = await getCoupons();

    if (code !== 0) {
      logger.error(`获取漫读券失败：${code} ${msg}`);
      return;
    }

    const {
      user_coupons
    } = data;

    if (user_coupons.length === 0) {
      logger.info('没有漫读券，跳过任务');
      return;
    }

    const coupons = user_coupons.filter(coupon => coupon.will_expire !== 0);
    expireCouponNum = coupons.reduce((acc, coupon) => acc + coupon.remain_amount, 0);
    return expireCouponNum;
  } catch (error) {
    logger.error(`获取漫读券异常: ${error}`);
  }
}

async function getFavoriteList() {
  try {
    const {
      code,
      msg,
      data
    } = await getFavoriteList$1();

    if (code === 0) {
      return data;
    }

    logger.error(`获取追漫列表失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`获取追漫列表异常: ${error}`);
  }
}

async function getMangaEpList(comic_id) {
  try {
    const {
      code,
      msg,
      data
    } = await getMangaDetail(comic_id);

    if (code !== 0) {
      logger.error(`获取漫画详情失败：${code} ${msg}`);
      return;
    }

    if (!data || !data.ep_list) {
      return;
    }

    const {
      disable_coupon_amount,
      ep_list
    } = data;
    const epList = disable_coupon_amount ? ep_list.slice(disable_coupon_amount) : ep_list;
    return epList.filter(ep => ep.is_locked);
  } catch (error) {
    logger.error(`获取漫画详情异常: ${error}`);
  }
}

async function getBuyCoupon(ep_id) {
  try {
    const {
      code,
      msg,
      data
    } = await getBuyInfo(ep_id);

    if (code !== 0) {
      logger.error(`获取购买信息失败：${code} ${msg}`);
      return;
    }

    if (!data) {
      return;
    }

    if (!data.is_locked) return;

    if (!data.allow_coupon) {
      logger.info(`漫画 ${ep_id} 不支持漫读券`);
      return;
    }

    if (data.recommend_coupon_id === 0 || data.remain_coupon === 0) {
      expireCouponNum = 0;
      logger.info('没有足够的漫读券了');
      return;
    }

    if (!data.remain_lock_ep_num) {
      logger.info(`漫画${data.comic_id}已经全部购买了`);
      return;
    }

    return data.recommend_coupon_id;
  } catch (error) {
    logger.error(`获取购买信息异常: ${error}`);
  }
}

async function buyOneEpManga(ep_id) {
  try {
    const couponId = await getBuyCoupon(ep_id);

    if (!couponId) {
      return true;
    }

    const {
      code,
      msg
    } = await buyManga$1(ep_id, couponId);

    if (code !== 0) {
      logger.error(`购买漫画失败：${code} ${msg}`);
      return;
    }

    expireCouponNum--;
    logger.info(`购买漫画成功`);
  } catch (error) {
    logger.error(`购买漫画异常: ${error}`);
  }
}

async function searchManga(keyword) {
  try {
    const {
      code,
      msg,
      data
    } = await searchManga$1(keyword);

    if (code === 0) {
      return data;
    }

    logger.error(`搜索漫画失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`搜索漫画异常: ${error}`);
  }
}

async function buyManga(comic_id) {
  const epList = await getMangaEpList(comic_id);

  if (!epList || epList.length === 0) {
    return false;
  }

  for (let index = 0; index < epList.length; index++) {
    await apiDelay(100);
    if (await buyOneEpManga(epList[index].id)) return true;
  }
}

async function buyMangaByMc() {
  const {
    mc
  } = TaskConfig.manga;

  if (mc.length === 0) {
    return;
  }

  for (let index = 0; index < mc.length; index++) {
    if (expireCouponNum <= 0) return;
    const mcId = mc[index];
    await buyManga(mcId);
  }
}

async function buyMangaByName() {
  const {
    name
  } = TaskConfig.manga;

  if (name.length === 0) {
    return;
  }

  for (let index = 0; index < name.length; index++) {
    if (expireCouponNum <= 0) return;
    const keyword = name[index];
    const mangas = await searchManga(keyword);

    if (!mangas || mangas.list.length === 0) {
      continue;
    }

    const manga = mangas.list.find(mange => mange.title === keyword);

    if (!manga) {
      continue;
    }

    await buyManga(manga.id);
  }
}

async function buyMangaByLove() {
  const {
    love
  } = TaskConfig.manga;

  if (!love || expireCouponNum <= 0) {
    return;
  }

  const favoriteList = await getFavoriteList();

  if (!favoriteList || favoriteList.length === 0) {
    return;
  }

  for (let index = 0; index < favoriteList.length; index++) {
    if (expireCouponNum <= 0) return;
    const favorite = favoriteList[index];
    await buyManga(favorite.comic_id);
  }
}

async function buyMangaService() {
  const {
    buy
  } = TaskConfig.manga;

  if (!buy) {
    return;
  }

  if (!isTodayRunning()) {
    logger.info('非购买漫画时间，不购买');
    return;
  }

  expireCouponNum = await getExpireCouponNum();

  if (!expireCouponNum) {
    return;
  }

  if (expireCouponNum < 1) {
    logger.info('没有即将过期的漫读券，跳过任务');
    return;
  }

  logger.info('开始购买漫画');
  await buyMangaByMc();
  await buyMangaByName();
  await buyMangaByLove();

  function isTodayRunning() {
    const {
      buyWeek,
      buyInterval
    } = TaskConfig.manga;
    if (buyInterval === 1) return true;
    const now = new Date();
    const weekDay = now.getDay();
    const today = now.getDate();
    return buyWeek.includes(weekDay) || today % buyInterval - 1 === 0;
  }
}
async function mangaSign$2() {
  const {
    sign
  } = TaskConfig.manga;

  if (!sign) {
    return;
  }

  logger.info('开始签到');

  try {
    const {
      code
    } = await clockIn();

    if (code == 0) {
      logger.info('漫画签到成功');
    } else {
      logger.warn('漫画签到失败');
    }
  } catch (error) {
    const {
      status,
      statusCode
    } = error.response || {};

    if (status === 400 || statusCode === 400) {
      logger.info('已经签到过了，跳过任务');
    } else {
      logger.error(`漫画签到异常 ${error.message}`);
    }
  }
}
async function takeSeasonGift() {
  try {
    const {
      code,
      msg
    } = await takeSeasonGift$1();
    if (code === 0) return;

    if (code === 7) {
      logger.debug(`获取任务礼包失败：${msg}`);
      return;
    }

    logger.error(`获取任务礼包失败：${msg}`);
  } catch (error) {
    logger.error(`获取任务礼包异常: ${error}`);
  }
}
async function exchangeCoupon$2(num) {
  try {
    const {
      code,
      msg = ''
    } = await exchangeMangaShop(195, num * 100, num);

    if (code === 4) {
      return true;
    }

    if (code === 0) {
      logger.info(`兑换商品成功，兑换数量：${num}`);
      return;
    }

    if (code === 1 && msg.includes('快')) {
      logger.debug(msg);
      return true;
    }

    if (code === 2 && msg.includes('库存') && getPRCDate().getHours() === 12 && getPRCDate().getMinutes() < 2) {
      logger.debug('库存不足，但时间是 12:02 之前，尝试重新兑换');
      return true;
    }

    logger.warn(`兑换商品失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`商城兑换异常: ${error}`);
  }
}
async function exchangeCouponService() {
  const {
    num: exchangeCouponNum,
    delay
  } = TaskConfig.exchangeCoupon;

  if (exchangeCouponNum < 1) {
    return;
  }

  logger.info(`开始兑换漫读券，预设数量：${exchangeCouponNum}`);
  let num = exchangeCouponNum;
  const {
    point
  } = await request$1(getMangaPoint, {
    name: '获取积分'
  });
  const pointNum = parseInt(point, 10) || 0,
        buyCouponNum = Math.floor(pointNum / 100);
  logger.info(`当前积分：${pointNum}`);

  if (buyCouponNum < num) {
    num = buyCouponNum;
  }

  if (buyCouponNum < 1) {
    logger.info('可兑换的漫读券数量不足 1，跳过任务');
    return;
  }

  let isRepeat = true;

  while (isRepeat) {
    isRepeat = await exchangeCoupon$2(num);
    await apiDelay(delay - 50, delay + 150);
  }
}

async function exchangeCoupon() {
  logger.info('----【漫画兑换任务】----');

  try {
    await exchangeCouponService();
  } catch (error) {
    logger.error(`漫画兑换任务异常: ${error}`);
  }
}

var exchangeCoupon$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': exchangeCoupon
});

function doLiveSign() {
  return liveApi.get('/xlive/web-ucenter/v1/sign/DoSign');
}
function webGetSignInfo() {
  return liveApi.get('/xlive/web-ucenter/v1/sign/WebGetSignInfo');
}
function exchangeSilver2Coin() {
  return liveApi.post('/xlive/revenue/v1/wallet/silver2coin', {
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT
  });
}
function exchangeBattery(couponBalance) {
  const pay_bp = couponBalance * 1000;
  return liveApi.post('xlive/revenue/v1/order/createOrder', {
    platform: 'pc',
    pay_bp,
    context_id: 6726252,
    context_type: 1,
    goods_id: 1,
    goods_num: couponBalance,
    goods_type: 2,
    ios_bp: 0,
    common_bp: pay_bp,
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT,
    visit_id: getVisitId()
  });
}
function exchangeStatus() {
  return liveApi.get('/xlive/revenue/v1/wallet/getStatus');
}
function getMyWallet() {
  return liveApi.get('/xlive/revenue/v1/wallet/myWallet?need_bp=1&need_metal=1&platform=pc');
}
function sendMessage(roomid, msg) {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  msg || (msg = random(10).toString());
  return liveApi.post('/msg/send', {
    color: 5566168,
    fontsize: 25,
    mode: 1,
    msg,
    rnd: Date.now(),
    roomid,
    bubble: 0,
    csrf,
    csrf_token
  });
}
function getFansMedalPanel(page = 1, pageSize = 50) {
  return liveApi.get(`xlive/app-ucenter/v1/fansMedal/panel?page=${page}&page_size=${pageSize}`);
}
function getGiftBagList(roomId = 3394945) {
  const time = new Date().getTime();
  return liveApi.get(`/xlive/web-room/v1/gift/bag_list?t=${time}&room_id=${roomId}`);
}
function getLiveFansMedal(pageNum = 1, pageSize = 10) {
  if (pageNum > 10) {
    pageNum = 10;
  }

  return liveApi.get(`/xlive/app-ucenter/v1/user/GetMyMedals?page=${pageNum}&page_size=${pageSize}`);
}
function sendBagGift({
  ruid,
  gift_num,
  bag_id,
  gift_id,
  roomid
}) {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  const postData = {
    gift_id,
    ruid,
    gift_num,
    bag_id,
    biz_id: roomid,
    rnd: new Date().getTime(),
    send_ruid: 0,
    storm_beat_id: 0,
    metadata: '',
    price: 0,
    visit_id: '',
    csrf,
    platform: 'pc',
    biz_code: 'Live',
    csrf_token,
    uid: TaskConfig.USERID
  };
  return liveApi.post('/xlive/revenue/v2/gift/sendBag', postData, {
    headers: {
      Origin: OriginURLs.live
    }
  });
}
function getArea() {
  return liveApi.get('/xlive/web-interface/v1/index/getWebAreaList?source_id=2');
}
function getLiveRoom(parentArea, areaId, page = 1) {
  return liveApi.get(`/xlive/web-interface/v1/second/getList?platform=web&parent_area_id=${parentArea}&area_id=${areaId}&page=${page}`);
}
function checkLottery(roomId) {
  return liveApi.get(`/xlive/lottery-interface/v1/Anchor/Check?roomid=${roomId}`);
}
function joinLottery(options) {
  return liveApi.post(`/xlive/lottery-interface/v1/Anchor/Join`, { ...options,
    csrf: TaskConfig.BILIJCT,
    csrf_token: TaskConfig.BILIJCT,
    visit_id: getVisitId(),
    platform: 'pc'
  });
}
function checkRedPacket(roomId) {
  return liveApi.get(`/xlive/lottery-interface/v1/lottery/getLotteryInfoWeb?roomid=${roomId}`);
}
function joinRedPacket(params) {
  return liveApi.post(`/xlive/lottery-interface/v1/popularityRedPocket/RedPocketDraw`, { ...params,
    spm_id: '444.8.red_envelope.extract',
    jump_from: '',
    session_id: '',
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT,
    visit_id: ''
  });
}
function getFollowLiveRoomList(page = 1, page_size = 9) {
  return liveApi.get(`/xlive/web-ucenter/user/following?page=${page}&page_size=${page_size}`);
}

async function liveSignTask() {
  logger.info('----【直播签到】----');

  try {
    const {
      data
    } = await webGetSignInfo();

    if (data.status === 1) {
      logger.info('已签到，跳过签到');
      logger.info(`已经签到${data.hadSignDays}天，${data.specialText}`);
      return;
    }
  } catch (error) {
    logger.debug(`直播签到，${error.message}`);
  }

  try {
    const {
      code,
      data,
      message
    } = await doLiveSign();

    if (code === 0) {
      logger.info(`直播签到成功: ${data.text}，特别信息: ${data.specialText}，本月签到天数: ${data.hadSignDays}天;`);
    } else {
      logger.warn(`直播签到失败: ${code} ${message}`);
    }
  } catch (error) {
    logger.error(`直播签到异常: ${error.message}`);
  }
}

var liveSignTask$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': liveSignTask
});

function addShare(aid) {
  const reqData = {
    csrf: TaskConfig.BILIJCT,
    aid
  };
  return biliApi.post('/x/web-interface/share/add', reqData);
}
function getRegionRankingVideos(rid = 1, day = 3) {
  return biliApi.get('/x/web-interface/ranking/region', {
    params: {
      rid,
      day
    }
  });
}
function getRecommendVideos(ps = 2) {
  return biliApi.get(`x/web-interface/index/top/rcmd?fresh_type=12&version=1&ps=${ps}`);
}
function uploadVideoHeartbeat(aid, playedTime) {
  return biliApi.post('/x/click-interface/web/heartbeat', {
    aid,
    played_time: playedTime
  });
}
function videoHeartbeat({
  start_ts,
  aid = 243332804,
  cid = 209599683,
  type = 4,
  sub_type = 5,
  dt = 2,
  play_type = 0,
  realtime = 0,
  played_time = 10,
  real_played_time = 0,
  refer_url = '',
  sid = 33622,
  epid = 327107
}) {
  return biliApi.post('x/click-interface/web/heartbeat', {
    start_ts,
    mid: TaskConfig.USERID,
    aid,
    cid,
    type,
    sub_type,
    dt,
    play_type,
    realtime,
    played_time,
    real_played_time,
    refer_url,
    bsource: '',
    sid,
    epid,
    spmid: '666.25',
    from_spmid: '..0.0',
    csrf: TaskConfig.BILIJCT
  });
}
function addBangumi(season_id) {
  return biliApi.post('pgc/web/follow/add', {
    season_id,
    csrf: TaskConfig.BILIJCT
  });
}
function cancelBangumi(season_id) {
  return biliApi.post('pgc/web/follow/del', {
    season_id,
    csrf: TaskConfig.BILIJCT
  });
}

function getUserNavNum(mid) {
  return biliApi.get(`x/space/navnum?mid=${mid}`);
}
function searchVideosByUpId(upId, pageSize = 30, pageNumber = 1, keyword = '') {
  return biliApi.get('x/space/arc/search', {
    params: {
      jsonp: 'jsonp',
      order: 'pubdate',
      keyword,
      pn: pageNumber,
      tid: 0,
      ps: pageSize,
      mid: upId
    }
  });
}
function searchAudiosByUpId(uid, pageSize = 30, pageNumber = 1) {
  return biliApi.get('audio/music-service/web/song/upper', {
    params: {
      jsonp: 'jsonp',
      order: 1,
      pn: pageNumber,
      ps: pageSize,
      uid
    }
  });
}
function searchArticlesByUpId(mid, pageSize = 12, pageNumber = 1) {
  return biliApi.get('x/space/article', {
    params: {
      callback: '__test',
      jsonp: 'jsonp',
      sort: 'publish_time',
      pn: pageNumber,
      ps: pageSize,
      mid
    },
    requestOptions: {
      isJsonp: true
    }
  });
}
function getVideoRelation({
  aid,
  bvid
}) {
  return biliApi.get('x/web-interface/archive/relation', {
    params: {
      aid,
      bvid
    }
  });
}
function addCoinForVideo(aid, multiply, selectLike = 1) {
  return biliApi.post('x/web-interface/coin/add', {
    aid,
    multiply,
    selectLike,
    csrf: TaskConfig.BILIJCT
  });
}
function addCoinForAudio(sid, coin = 1) {
  return biliHttp.post('https://www.bilibili.com/audio/music-service-c/web/coin/add', {
    sid,
    multiply: coin,
    csrf: TaskConfig.BILIJCT
  });
}
function addCoinForArticle(upid, aid, coin = 1) {
  return biliApi.post('x/web-interface/coin/add', {
    aid,
    upid,
    avtype: 2,
    multiply: coin,
    csrf: TaskConfig.BILIJCT
  });
}
function getMusicCoin(sid) {
  return biliHttp.get(`https://www.bilibili.com/audio/music-service-c/web/coin/audio?sid=${sid}`);
}
function getArticleInfo(id) {
  return biliApi.get(`x/article/viewinfo?id=${id}&mobi_app=pc&from=web`);
}

const TypeEnum = {
  video: '视频',
  audio: '音乐',
  article: '专栏'
};
const SourceEnum = {
  customizeUp: '自定义UP',
  specialFollow: '特别关注',
  follow: '关注',
  recommend: '首页推荐',
  regionRank: '分区排行'
};

function getRandmonNum([video, audio, article]) {
  const total = video + audio + article;

  if (!total) {
    return;
  }

  const num = random(0, total - 1);
  let tempNum = num;

  if (num < video) {
    return {
      coinType: TypeEnum.video,
      page: getPageNum(30, tempNum + 1),
      index: tempNum % 30
    };
  }

  const mid = video + audio;
  tempNum = num - video;

  if (num < mid) {
    return {
      coinType: TypeEnum.audio,
      page: getPageNum(30, tempNum + 1),
      index: tempNum % 30
    };
  }

  tempNum = num - mid;
  return {
    coinType: TypeEnum.article,
    page: getPageNum(12, tempNum + 1),
    index: tempNum % 12
  };
}

async function getAidByFollowing(special = false) {
  try {
    const uid = TaskConfig.USERID;
    const {
      data,
      message,
      code
    } = await (special ? getSpecialFollowings() : getFollowings(uid));
    const followList = special ? data : data.list;

    if (!followList || followList.length === 0) {
      return {
        msg: '没有关注列表',
        code: 1
      };
    }

    if (code === 0) {
      await apiDelay();
      const {
        mid
      } = getRandomItem(followList) || {};
      return await getIdByRandom(mid);
    }

    return {
      msg: special ? `未获取到特别关注列表: ${code}-${message}` : `未获取到关注列表: ${code}-${message}`,
      code: -1
    };
  } catch (error) {
    return {
      msg: error.message,
      code: -2
    };
  }
}
async function getAidByRecommend() {
  try {
    const {
      code,
      data,
      message
    } = await getRecommendVideos(4);

    if (code !== 0) {
      return {
        msg: `未获取到首页推荐列表: ${code}-${message}`,
        code: -1
      };
    }

    const {
      id,
      title,
      owner
    } = getRandomItem(data.item);
    return {
      code: 0,
      data: {
        id,
        title,
        coinType: TypeEnum.video,
        author: owner.name
      }
    };
  } catch (error) {
    return {
      msg: error.message,
      code: -2
    };
  }
}
async function getAidByRegionRank() {
  const arr = [1, 3, 4, 5, 160, 22, 119];
  const rid = getRandomItem(arr);

  try {
    const {
      data,
      message,
      code
    } = await getRegionRankingVideos(rid, 3);

    if (code !== 0) {
      return {
        msg: `未获取到排行信息: ${code}-${message}`,
        code: -1
      };
    }

    const {
      aid,
      title,
      author
    } = getRandomItem(data);
    return {
      code: 0,
      data: {
        id: Number(aid),
        title,
        coinType: TypeEnum.video,
        author
      }
    };
  } catch (error) {
    return {
      msg: error.message,
      code: -2
    };
  }
}
async function getAidByCustomizeUp() {
  const customizeUp = TaskConfig.coin.customizeUp;

  if (customizeUp.length === 0) {
    return {
      code: 1,
      msg: '没有自定义up主'
    };
  }

  const a = getRandomItem(customizeUp);
  return await getIdByRandom(a);
}
async function getIdByRandom(mid) {
  if (!mid) {
    return {
      code: 1,
      msg: '用户id不存在'
    };
  }

  try {
    const {
      code,
      data,
      message
    } = await getUserNavNum(mid);

    if (code) {
      return {
        msg: `通过mid获取随机投稿失败: ${code}-${message}`,
        code: -1
      };
    }

    await apiDelay();
    const {
      video,
      audio,
      article
    } = data;
    const randmonNumData = getRandmonNum([video, audio, article]);

    if (!randmonNumData) {
      return {
        msg: '用户没有投稿',
        code: 1
      };
    }

    const {
      coinType,
      page,
      index
    } = randmonNumData,
          handle = {
      [TypeEnum.video]: getVideoByRandom,
      [TypeEnum.audio]: getAudioByRandom,
      [TypeEnum.article]: getArticleByRandom
    },
          handleData = await handle[coinType](mid, page, index);

    if (handleData.message) {
      return {
        msg: handleData.message,
        code: -1
      };
    }

    return {
      code: 0,
      data: handleData
    };
  } catch (error) {
    logger.debug(error);
    return {
      msg: error.message,
      code: -2
    };
  }
}

async function getVideoByRandom(mid, page, index) {
  const {
    code,
    data,
    message
  } = await searchVideosByUpId(mid, 30, page);

  if (code) {
    return {
      message
    };
  }

  const {
    aid,
    title,
    author,
    copyright
  } = data.list.vlist[index];
  return {
    coinType: TypeEnum.video,
    id: aid,
    title,
    author,
    copyright
  };
}

async function getAudioByRandom(mid, page, index) {
  const {
    code,
    data,
    msg
  } = await searchAudiosByUpId(mid, 30, page);

  if (code) {
    return {
      message: msg
    };
  }

  const {
    data: list
  } = data;
  const {
    id,
    uname,
    title
  } = list[index];
  return {
    coinType: TypeEnum.audio,
    id,
    title,
    author: uname
  };
}

async function getArticleByRandom(mid, page, index) {
  const {
    code,
    data,
    message
  } = await searchArticlesByUpId(mid, 12, page);

  if (code) {
    return {
      message
    };
  }

  const {
    articles
  } = data;
  const {
    id,
    title,
    author: {
      name
    }
  } = articles[index];
  return {
    coinType: TypeEnum.article,
    id,
    title,
    author: name,
    mid
  };
}

function getAidBySpecialFollowing() {
  return getAidByFollowing(true);
}

const idFuncArray = [['customizeUp', getAidByCustomizeUp], ['specialFollow', getAidBySpecialFollowing], ['follow', getAidByFollowing], ['recommend', getAidByRecommend], ['regionRank', getAidByRegionRank]];
const idFuncMap = new Map(idFuncArray);
const aidFuncName = new class {
  keys = Array.from(idFuncMap.keys());
  titles = SourceEnum;
  value = 'customizeUp';

  constructor() {
    var _TaskConfig$coin$cust;

    if (!((_TaskConfig$coin$cust = TaskConfig.coin.customizeUp) !== null && _TaskConfig$coin$cust !== void 0 && _TaskConfig$coin$cust.length)) {
      this.next();
    }
  }

  next() {
    const index = this.keys.indexOf(this.value) + 1;

    if (index === this.keys.length) {
      return this.value = 'regionRank';
    }

    return this.value = this.keys[index];
  }

  get title() {
    return this.titles[this.value];
  }

}();
async function getAidByByPriority() {
  const idFunc = idFuncMap.get(aidFuncName.value);
  await apiDelay();
  return (idFunc === null || idFunc === void 0 ? void 0 : idFunc()) || getAidByRecommend();
}
async function coinToId({
  id,
  coin = 1,
  coinType = '视频',
  mid
}) {
  const handle = {
    [TypeEnum.video]: addCoinForVideo,
    [TypeEnum.audio]: addCoinForAudio,
    [TypeEnum.article]: (id, coin = 1) => addCoinForArticle(mid, id, coin)
  };
  const handleData = await handle[coinType](Number(id), coin);
  return {
    code: handleData.code,
    message: handleData.message || handleData.msg
  };
}
async function getTodayCoinNum(defCoin) {
  const exp = await getTodayExp();
  if (exp) return exp;
  const coin = await getTodayCoin();
  return coin || defCoin || TaskConfig.coin.todayCoins;
}

async function getTodayExp() {
  try {
    const {
      data: coinExp,
      code
    } = await getDonateCoinExp();

    if (code === 0) {
      return coinExp / 10;
    }
  } catch (error) {
    logger.debug(`获取投币数量异常 ${error.message}`);
  }
}

async function getTodayCoin() {
  try {
    const {
      code,
      message,
      data
    } = await getCoinHistory();

    if (code !== 0) {
      logger.warn(`获取投币消耗硬币失败：${code} ${message}`);
      return;
    }

    const list = data.list;

    if (!list || !list.length) {
      return;
    }

    const today = list.filter(item => {
      if (item.delta !== -2 && item.delta !== -1) return false;
      const {
        reason,
        time
      } = item;
      if (!reason || !time) return;
      if (!reason.startsWith('给') || !reason.endsWith('打赏')) return;
      if (time.startsWith(getDateString())) return true;
      return false;
    }).reduce((acc, item) => acc + item.delta, 0);
    return Math.abs(today);
  } catch (error) {
    logger.debug(`获取投币消耗硬币异常 ${error.message}`);
  }
}

async function getVideoCoinNum(aid) {
  const {
    coin
  } = await request$1(getVideoRelation, undefined, {
    aid
  });
  return coin ?? 0;
}

async function getAudioCoinNum(sid) {
  const coin = await request$1(getMusicCoin, undefined, sid);
  return isNumber(coin) ? coin : 0;
}

async function getArticleCoinNum(id) {
  const {
    coin
  } = await request$1(getArticleInfo, undefined, id);
  return coin ?? 0;
}

async function getContributionCoin(coinType, id) {
  try {
    const handle = {
      [TypeEnum.video]: getVideoCoinNum,
      [TypeEnum.audio]: getAudioCoinNum,
      [TypeEnum.article]: getArticleCoinNum
    };
    return handle[coinType](Number(id));
  } catch (error) {
    logger.warn(`获取稿件还能投币数量异常 ${error.message}`);
    return 0;
  }
}

async function checkCoin() {
  const coinNum = await getTodayCoinNum();
  const targetCoinsDiff = TaskModule.money - TaskConfig.coin.stayCoins;
  let coins = 0;

  if (TaskModule.coinsTask === 0) {
    logger.info(`今日投币数量：${coinNum}，还需投币0颗，经验够了，不想投了`);
  } else if (targetCoinsDiff <= 0) {
    logger.info(`今日投币数量：${coinNum}，还需投币0颗，硬币不够了，不投币了`);
  } else if (targetCoinsDiff < TaskModule.coinsTask) {
    coins = targetCoinsDiff;
    logger.info(`投币数量: ${coinNum}，还能投币数量: ${targetCoinsDiff}颗;(目标${TaskModule.coinsTask}颗，忽略部分投币)`);
  } else {
    coins = TaskModule.coinsTask - coinNum;
    logger.info(`投币数量：${coinNum}，还需投币数量: ${coins}颗;(目标${TaskModule.coinsTask}颗)`);
  }

  TaskModule.coinsTask = coins;
}
async function checkShareAndWatch() {
  try {
    const {
      data,
      message,
      code
    } = await getDailyTaskRewardInfo();

    if (code != 0) {
      logger.warn(`状态获取失败: ${code} ${message}`);
      return;
    }

    const {
      share,
      watch
    } = data;
    logger.info(`每日分享: ${share ? '已完成' : '[未完成]'}`);
    logger.info(`每日播放: ${watch ? '已完成' : '[未完成]'}`);
    TaskModule.share = share;
    TaskModule.watch = watch;
  } catch (error) {
    logger.error(`每日分享/播放检测出现异常: ${error.message}`);
  }
}

let MAX_COUNT = 5;

function initMaxCount() {
  if (!TaskConfig.limit.coins5) {
    MAX_COUNT = TaskModule.coinsTask;
    return;
  }

  MAX_COUNT = TaskModule.coinsTask > 5 ? 5 : TaskModule.coinsTask;
}

async function addCoins() {
  logger.info('----【每日投币】----');
  await checkCoin();

  if (!TaskModule.coinsTask) {
    logger.info('跳过投币，今日已完成');
    return;
  }

  const state = {
    eCount: 0,
    num: 0,
    prevCode: -999,
    fillCount: 0,
    prevFillId: 0,
    eAidCount: 0,
    refresh: true
  };
  let isReturn = false;
  initMaxCount();

  while (TaskModule.coinsTask > 0 && !isReturn && state.eCount < 5 && state.num < MAX_COUNT) {
    isReturn = await coinHandle(state);
  }

  if (state.eCount >= 5) logger.info(`出现异常/错误5次，自动退出投币`);
  logger.info(`一共成功投币${state.num}颗`);
  logger.info(`硬币还剩${TaskModule.money}颗`);
}

async function coinHandle(state) {
  state.refresh && (await setCoinsTask(state.num));
  state.refresh = false;

  if (TaskModule.coinsTask < 1 || TaskModule.money < 1) {
    return true;
  }

  const {
    data,
    code,
    msg
  } = await getAidByByPriority();

  if (code === 1) {
    aidFuncName.next();
    return false;
  }

  if (!data || !data.id || code !== 0) {
    msg && logger.debug(msg);
    state.eAidCount++;

    if (state.eAidCount >= 10) {
      logger.warn(`获取稿件错误次数超过 10 次，自动退出投币`);
      return true;
    }

    return false;
  }

  if (state.prevFillId === data.id) {
    aidFuncName.next();
    return false;
  }

  if (!TaskModule.videoAid && data.coinType === '视频') {
    TaskModule.videoAid = data.id;
  }

  await apiDelay();
  state.refresh = true;
  return await coinToIdOnce(data, state);
}

async function setCoinsTask(num) {
  const coinNum = await getTodayCoinNum(num);
  const coins = TaskConfig.coin.targetCoins - coinNum;
  TaskModule.coinsTask = coins > 0 ? coins : 0;
}

function getCoin(contributionCoin, coin, copyright) {
  if (contributionCoin >= 2) return 0;
  if (TaskModule.coinsTask === 1 || MAX_COUNT - coin === 1) return 1;
  if (Number(copyright) === 2) return 1 - contributionCoin;
  return 2 - contributionCoin;
}

async function coinToIdOnce(data, state) {
  const {
    id,
    coinType,
    mid,
    copyright
  } = data;
  const contributionCoin = await getContributionCoin(coinType, id);
  const coin = getCoin(contributionCoin, state.num, copyright);
  if (coin < 1) return coinFilledHandle(id, state);

  try {
    const coinData = await coinToId({
      id,
      coinType,
      mid,
      coin
    });

    if (!id) {
      state.eCount++;
      return false;
    }

    switch (coinData.code) {
      case 0:
        return coinSuccessHandle(state, data, coin);

      case 34005:
        return coinFilledHandle(id, state);

      case -104:
      case -111:
        return coinErrorHandle(id, coinData);

      default:
        return coinOtherHandle(state, data, coinData);
    }
  } catch (error) {
    state.eCount++;
    logger.error(`投币异常 ${error.message}`);
  }

  return false;
}

function coinFilledHandle(id, state) {
  state.fillCount++;
  state.prevFillId = id;
  logger.verbose(`当前稿件[${id}]不能再投币了`);

  if (state.fillCount >= 3) {
    logger.warn(`该类型的用户组似乎没有币可投了`);
    state.fillCount = 0;
    aidFuncName.next();
  }

  return false;
}

function coinSuccessHandle(state, {
  author,
  id,
  coinType
}, coin) {
  TaskModule.money -= coin;
  TaskModule.coinsTask -= coin;
  state.num += coin;
  logger.info(`给${aidFuncName.title}【${author}】的${coinType}：${id} 投币${coin}颗`);
  return false;
}

function coinErrorHandle(id, coinData) {
  logger.warn(`${id} ${coinData.message} 无法继续进行投币`);
  return true;
}

function coinOtherHandle(state, {
  id,
  coinType
}, coinData) {
  state.eCount++;
  logger.warn(`给${aidFuncName.title}的${coinType} ${id} 投币失败 ${coinData.code} ${coinData.message}`);

  if (state.prevCode === coinData.code) {
    logger.warn(`出现同一错误，默认无法继续投币`);
    return true;
  }

  state.prevCode = coinData.code;
  return false;
}

var addCoins$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': addCoins
});

const baseHeader = {
  'app-key': 'android64',
  env: 'prod',
  'user-agent': TaskConfig.mobileUA
};
function signIn() {
  return biliApi.post('pgc/activity/score/task/sign', appSignString({
    csrf: TaskConfig.BILIJCT
  }), {
    headers: baseHeader
  });
}
function receiveTask(taskCode = 'ogvwatch') {
  return biliApi.post('pgc/activity/score/task/receive', {
    csrf: TaskConfig.BILIJCT,
    ts: getUnixTime(),
    taskCode
  }, {
    http2: true,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Referer: RefererURLs.bigPointTask,
      ...baseHeader,
      navtive_api_from: 'h5'
    }
  });
}
function susWin() {
  return biliApi.post('pgc/activity/deliver/susWin/receive', appSignString({
    csrf: TaskConfig.BILIJCT
  }), {
    headers: baseHeader
  });
}
function complete(position) {
  return biliApi.post('pgc/activity/deliver/task/complete', appSignString({
    csrf: TaskConfig.BILIJCT,
    position
  }), {
    headers: { ...baseHeader,
      referer: RefererURLs.bigPoint
    }
  });
}
function showDispatch(eventId) {
  return biliHttp.post(`https://show.bilibili.com/api/activity/fire/common/event/dispatch?${appSignString({
    csrf: TaskConfig.BILIJCT
  })}`, {
    eventId
  }, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...baseHeader
    }
  });
}
function getTaskCombine() {
  return biliApi.get('x/vip_point/task/combine', {
    headers: baseHeader
  });
}
function getPointList() {
  return biliApi.get(`x/vip_point/list?${appSignString({
    csrf: TaskConfig.BILIJCT,
    change_type: 1,
    pn: 1,
    ps: 10
  })}`, {
    headers: baseHeader
  });
}

const TaskCode = {
  ogvwatch: '观看正片',
  tvodbuy: '购买视频',
  vipmallbuy: '购买商品',
  bonus: '大会员福利',
  privilege: '浏览会员权益',
  '626act': '浏览“我的哔哩小屋”',
  animatetab: '浏览追番',
  filmtab: '浏览影视',
  vipmallview: '浏览会员购'
};

const bigLogger = new Logger({
  console: 'debug',
  file: 'debug',
  push: 'warn'
}, 'big-point');
let isRetry = false;
let isError = false;

async function getTaskStatus() {
  try {
    const {
      code,
      data,
      message
    } = await getTaskCombine();

    if (code !== 0) {
      logger.error(`查看当前状态失败: ${code} ${message}`);
      return;
    }

    return data;
  } catch (error) {
    logger.error(error);
  }
}

async function bigPointService() {
  isRetry = false;
  isError = false;
  const taskStatus = await getTaskStatus();

  if (!taskStatus) {
    return;
  }

  const {
    vip_info: {
      status,
      type
    },
    point_info: {
      point
    },
    task_info
  } = taskStatus;
  if (!baseInfo(status, type, point)) return;

  if (task_info.score_month >= task_info.score_limit) {
    logger.info('本月积分已领取完');
    return;
  }

  const isEmpty = await bigPointTask(taskStatus);

  if (isEmpty) {
    return await printPoint();
  }

  const cfgIsRetry = TaskConfig.bigPoint.isRetry;

  if (cfgIsRetry) {
    isRetry = true;
    await apiDelay(isBoolean(cfgIsRetry) ? 5000 : cfgIsRetry * 1000);
    await bigPointTask(taskStatus);
  }

  return await printPoint();
}

async function bigPointTask(taskStatus) {
  var _task_info$sing_task_;

  const {
    task_info
  } = taskStatus;
  const signCode = await sign((_task_info$sing_task_ = task_info.sing_task_item) === null || _task_info$sing_task_ === void 0 ? void 0 : _task_info$sing_task_.histories);

  if (signCode === -401) {
    logger.error('出现非法访问异常，可能账号存在异常，放弃大积分任务');
    isError = true;
    return;
  }

  await apiDelay(100, 200);

  if (await getTask(task_info)) {
    await apiDelay(100, 200);
    return await doDailyTask(await getTaskStatus());
  }

  return await doDailyTask(taskStatus);
}

async function doDailyTask(taskStatus) {
  var _taskStatus$task_info, _taskStatus$task_info2;

  if (!taskStatus || !taskStatus.task_info) return;
  const TaskItems = (_taskStatus$task_info = taskStatus.task_info.modules) === null || _taskStatus$task_info === void 0 ? void 0 : (_taskStatus$task_info2 = _taskStatus$task_info.at(-1)) === null || _taskStatus$task_info2 === void 0 ? void 0 : _taskStatus$task_info2.common_task_item;

  if (!TaskItems) {
    logger.info('没有需要完成的每日任务');
    return;
  }

  const waitTaskItems = TaskItems.filter(taskItem => {
    if (taskItem.vip_limit > TaskModule.vipType) return false;
    if (taskItem.complete_times >= taskItem.max_times) return false;
    if (taskItem.state === 1) return true;
  });

  if (waitTaskItems.length === 0) {
    return true;
  }

  await handleDailyTask(waitTaskItems);
}

async function handleDailyTask(taskItems) {
  for (const taskItem of taskItems) {
    switch (taskItem.task_code) {
      case 'ogvwatch':
        await watchTask(taskItem.complete_times);
        break;

      case 'filmtab':
        await completeTask('tv_channel', '浏览影视频道');
        break;

      case 'animatetab':
        await completeTask('jp_channel', '浏览追番频道');
        break;

      case 'vipmallview':
        await vipMallView();
        break;
    }

    await apiDelay(1000, 3000);
  }
}

async function watchTask(completeTimes) {
  if (!TaskConfig.bigPoint.isWatch) {
    return;
  }

  function createEpid(prefix, min, max, exclude = []) {
    let epid = random(min, max);

    while (exclude.includes(epid)) {
      epid = random(min, max);
    }

    return Number(prefix + epid);
  }

  const {
    epids,
    watchDelay = 40
  } = TaskConfig.bigPoint;
  await apiDelay(watchDelay * 1000);

  try {
    let epid;

    if (epids && epids.length > 0) {
      epid = getRandomItem(epids);
      bigLogger.debug(`使用随机视频: ${epid}`);
    } else {
      bigLogger.debug('使用默认视频（西游记随机集数）');
      epid = createEpid('327', 107, 134, [122, 123]);
    }

    const watchTime = completeTimes === 1 ? random(905, 1800) : random(1805, 2000);
    await videoHeartbeat({
      start_ts: getUnixTime() - watchTime,
      realtime: watchTime,
      played_time: random(1000) + watchTime,
      real_played_time: watchTime,
      refer_url: 'https://www.bilibili.com/bangumi/media/md28229051/',
      epid
    });
    bigLogger.debug(`观看视频任务 ✓`);
  } catch (error) {
    logger.error(error);
    logger.error(`观看视频任务出现异常：${error.message}`);
  }
}

async function completeTask(taskCode, msg) {
  try {
    await susWin();
    apiDelay(1000, 2000);
    const {
      code: comCode,
      message: comMsg
    } = await complete(taskCode);

    if (comCode !== 0) {
      logger.error(`${msg}失败: ${comCode} ${comMsg}`);
      return;
    }

    bigLogger.debug(`${msg}每日任务 ✓`);
  } catch (error) {
    logger.error(error);
    logger.error(`每日任务${msg}出现异常：${error.message}`);
  }
}

async function vipMallView() {
  try {
    const {
      code,
      message
    } = await showDispatch('hevent_oy4b7h3epeb');

    if (code === 0) {
      bigLogger.debug(`浏览会员购每日任务 ✓`);
      return;
    }

    logger.error(`浏览会员购失败: ${code} ${message}`);
  } catch (error) {
    logger.error(error);
    logger.error(`每日任务会员购出现异常：${error.message}`);
  }
}

async function sign(histories) {
  if (!histories || !histories.length) {
    return;
  }

  const today = histories.find(history => history.is_today);

  if (!today) {
    return;
  }

  if (today.signed) {
    !isRetry && bigLogger.debug('今日已签到 ✓');
    return;
  }

  try {
    const {
      code,
      message
    } = await signIn();

    if (code === 0) {
      bigLogger.debug(`签到成功 ✓`);
      return code;
    }

    logger.error(`签到失败: ${code} ${message}`);
    isError = true;
    return code;
  } catch (error) {
    logger.error(error);
  }

  return -1;
}

async function getTask(taskinfo) {
  var _taskinfo$modules$at, _taskinfo$modules$at$;

  function filterTask(taskItem) {
    if (!taskItem) return false;
    if (taskItem.vip_limit > TaskModule.vipType) return false;
    if (taskItem.state === 0) return true;
  }

  const taskItems = (_taskinfo$modules$at = taskinfo.modules.at(-1)) === null || _taskinfo$modules$at === void 0 ? void 0 : (_taskinfo$modules$at$ = _taskinfo$modules$at.common_task_item) === null || _taskinfo$modules$at$ === void 0 ? void 0 : _taskinfo$modules$at$.filter(filterTask);

  if (!taskItems || !taskItems.length) {
    return false;
  }

  await getManyTask(taskItems.map(taskItem => taskItem.task_code));
  bigLogger.debug('领取任务完成');
  return true;
}

async function baseInfo(status, type, point) {
  logger.info(`当前积分: ${point}`);

  if (status === 0 || type === 0) {
    logger.warn('当前无大会员，无法继续执行任务');
    return;
  }

  return true;
}

async function getOneTask(taskCode) {
  try {
    const {
      code,
      message
    } = await receiveTask(taskCode);

    if (code === 0) {
      return true;
    }

    logger.error(`领取任务${TaskCode[taskCode]}失败: ${code} ${message}`);
  } catch (error) {
    logger.error(error);
  }
}

async function getManyTask(taskCodes) {
  for (const taskCode of taskCodes) {
    await getOneTask(taskCode);
    await apiDelay(100, 300);
  }
}

async function getPoint() {
  const keyword = ['观看任意', '签到', '10秒'];

  try {
    const {
      code,
      data,
      message
    } = await getPointList();

    if (code !== 0) {
      logger.warn(`获取今日积分失败: ${code} ${message}`);
      return;
    }

    return data.big_point_list.filter(item => isToday(item.change_time) && keyword.some(key => item.remark.includes(key))).reduce((num, item) => num + item.point, 0);
  } catch (error) {
    logger.error(error);
  }
}

async function printPoint() {
  const todayPoint = await getPoint();
  if (!isDef(todayPoint)) return;

  if (todayPoint > 75) {
    logger.info(`今日获取积分【${todayPoint}】√`);
    return;
  }

  logger.error(`今日获取积分【${todayPoint}】, 部分任务未成功 ×`);

  if (todayPoint === 0 && !isError) {
    logger.info('可能是完成获取，但是接口数据延迟。');
  }
}

async function bigPoint() {
  logger.info('----【大会员积分】----');

  try {
    if (TaskModule.vipType === 0 || TaskModule.vipStatus === 0) {
      logger.info('当前不是大会员，跳过任务');
      return;
    }

    await bigPointService();
  } catch (error) {
    logger.error(`大会员积分任务异常: ${error.message}`);
  }
}

var bigPoint$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': bigPoint
});

async function shareAndWatch() {
  logger.info('----【分享/播放视频】----');
  await checkShareAndWatch();

  if (TaskModule.share && TaskModule.watch) {
    logger.info('已完成，跳过分享/播放');
    return;
  }

  const aid = TaskModule.videoAid || (await getVideoAid());

  if (!aid) {
    return;
  }

  if (!TaskModule.share) {
    await apiDelay();
    await request$1(addShare, {
      name: '分享视频',
      okMsg: '分享视频成功！'
    }, aid);
  }

  if (!TaskModule.watch) {
    await apiDelay();
    await request$1(uploadVideoHeartbeat, {
      name: '播放视频',
      okMsg: '播放视频成功！'
    }, aid, random(4, 60));
  }
}
async function getVideo() {
  for (let errCount = 5; errCount > 0; errCount--) {
    var _biliav$data;

    const biliav = await getAidByByPriority();

    if (biliav.code !== 0) {
      return await getAidByRecommend();
    }

    if (biliav && ((_biliav$data = biliav.data) === null || _biliav$data === void 0 ? void 0 : _biliav$data.coinType) === '视频') {
      return biliav;
    }
  }

  return await getAidByRecommend();
}

async function getVideoAid() {
  try {
    const biliav = await getVideo();

    if (biliav.code === 0) {
      const {
        id,
        author,
        title
      } = biliav.data || {};
      logger.debug(`获取视频: ${title} --up【${author}】`);
      return id;
    } else {
      logger.warn(`获取视频失败 ${biliav.msg}`);
      return;
    }
  } catch (error) {
    logger.error(`获取视频出现异常: ${error.message}`);
    return;
  }
}

var shareAndWatch$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': shareAndWatch,
	getVideo: getVideo
});

async function silver2Coin() {
  logger.info('----【银瓜子兑换硬币】----');

  try {
    const {
      data,
      code,
      message
    } = await exchangeStatus();

    if (code != 0) {
      logger.info(`获取瓜子详情失败 ${message}`);
    }

    if (data.silver_2_coin_left === 0) {
      logger.info('今日已兑换一次');
    } else if (data.silver < 700) {
      logger.info('兑换失败，你瓜子不够了');
    } else {
      const {
        message
      } = await exchangeSilver2Coin();
      logger.info(`兑换硬币： ${message}`);
      await getMyWallet();
    }
  } catch (error) {
    logger.error(`操作异常 ${error.message}`);
  }
}

var silver2Coin$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': silver2Coin
});

async function mangaSign() {
  logger.info('----【漫画签到】----');
  logger.warn('漫画签到任务移动到了漫画任务中，请修改为新的任务');
  await mangaSign$2();
}

var mangaSign$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': mangaSign
});

async function mangaTask() {
  logger.info('----【漫画任务】----');

  try {
    await mangaSign$2();
    await takeSeasonGift();
    await buyMangaService();
  } catch (error) {
    logger.error(`漫画任务异常: ${error}`);
  }
}

var mangaTask$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': mangaTask
});

function getMyGroupsApi() {
  return vcApi.get('/link_group/v1/member/my_groups');
}
function groupSignApi(group_id, owner_id) {
  return vcApi.get('/link_setting/v1/link_setting/sign_in', {
    params: {
      group_id,
      owner_id
    }
  });
}

async function getMyGroups() {
  try {
    const {
      data,
      code,
      message
    } = await getMyGroupsApi();

    if (code === 0) {
      return (data === null || data === void 0 ? void 0 : data.list) || [];
    }

    logger.warn(`获取自己的应援团异常失败: ${message}`);
    return [];
  } catch (error) {
    logger.error(`获取自己的应援团异常: ${error}`);
  }
}

async function supGroupSign() {
  logger.info('----【应援团签到】----');
  const myGroups = await getMyGroups();
  if (!myGroups) return;
  await apiDelay();
  const countRef = {
    value: 0
  };

  for (let i = 0; i < myGroups.length; i++) {
    const group = myGroups[i];
    await groupSign(group, countRef);
  }

  logger.info(`签到结束，成功${countRef.value}/${myGroups.length}`);
}

async function groupSign(group, countRef) {
  try {
    const {
      data,
      code,
      message
    } = await groupSignApi(group.group_id, group.owner_uid);

    if (code !== 0) {
      logger.warn(`[${group.group_name}]签到失败 ${message}`);
      return;
    }

    if (data.status === 0) {
      countRef.value++;
    } else {
      logger.verbose(`签到失败: ${data.status} ${message}`);
    }
  } catch (error) {
    logger.error(`签到异常 ${error.message}`);
  } finally {
    await apiDelay(400, 1000);
  }
}

var supGroupSign$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': supGroupSign
});

function likeLiveRoom(roomid) {
  return liveApi.post(`xlive/web-ucenter/v1/interact/likeInteract`, {
    roomid,
    csrf: TaskConfig.BILIJCT,
    csrf_token: TaskConfig.BILIJCT
  });
}
function liveMobileHeartBeat({
  buvid = getBuvid(),
  gu_id = randomString(43).toLocaleUpperCase(),
  visit_id = randomString(32).toLocaleLowerCase(),
  uuid = createUUID(),
  click_id = createUUID(),
  room_id,
  up_id,
  uid,
  up_level = 40,
  up_session = '',
  parent_id = 11,
  area_id = 376
}) {
  const baseData = {
    platform: 'android',
    uuid,
    buvid,
    seq_id: '1',
    room_id,
    parent_id,
    area_id,
    timestamp: String(parseInt(String(new Date().getTime() / 1000)) - 60),
    secret_key: 'axoaadsffcazxksectbbb',
    watch_time: '60',
    up_id: up_id || !uid,
    up_level,
    jump_from: '30000',
    gu_id,
    play_type: '0',
    play_url: '',
    s_time: '0',
    data_behavior_id: '',
    data_source_id: '',
    up_session,
    visit_id,
    watch_status: '',
    click_id,
    session_id: '-99998',
    player_type: '0',
    client_ts: String(parseInt(String(new Date().getTime() / 1000)))
  };
  const data = { ...baseData,
    ts: parseInt(String(new Date().getTime() / 1000)),
    client_sign: clientSign(baseData),
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT
  };
  return liveTraceApi.post('xlive/data-interface/v1/heartbeat/mobileHeartBeat', data);
}

const SeedMessageResult = {
  Success: 0,
  Unresistant: 11000,
  TooFrequently: 10030,
  Unknown: -1
};

const messageArray = kaomoji.concat('1', '2', '3', '4', '5', '6', '7', '8', '9', '签到', '哈哈');
const liveLogger$1 = new Logger({
  console: 'debug',
  file: 'debug',
  push: 'warn',
  payload: TaskModule.nickname
}, 'live');
const sendMessageFailList = new Map();
async function getFansMealList() {
  let totalNumber = 99,
      pageNumber = 0;
  const list = [];

  try {
    while (pageNumber < totalNumber) {
      await apiDelay(200, 600);
      const {
        code,
        message,
        data
      } = await getFansMedalPanel(pageNumber + 1, 10);

      if (code !== 0) {
        logger.verbose(`获取勋章信息失败 ${code} ${message}`);
        return list;
      }

      if (!data) {
        return list;
      }

      totalNumber = data.page_info.total_page;
      pageNumber = data.page_info.current_page;
      list.push(...data.list, ...data.special_list);
    }

    return list;
  } catch (error) {
    logger.error(`获取勋章异常 ${error.message}`);
    return list;
  }
}
function filterFansMedalList(list) {
  if (!list || list.length === 0) return [];
  return list.filter(fansMedalFilter);
}

function fansMedalFilter({
  room_info,
  medal
}) {
  if (!(room_info !== null && room_info !== void 0 && room_info.room_id)) return false;
  if (medal.level >= 20) return false;
  if (medal.today_feed >= medal.day_limit) return false;
  if (medal.today_feed >= TODAY_MAX_FEED) return false;
  const {
    whiteList,
    blackList
  } = TaskConfig.intimacy;

  if (!whiteList || !whiteList.length) {
    if (blackList && (blackList.includes(room_info.room_id) || blackList.includes(medal.target_id))) {
      return false;
    }

    return true;
  }

  if (whiteList.includes(room_info.room_id) || whiteList.includes(medal.target_id)) {
    return true;
  }

  return false;
}

async function sendOneMessage(roomid, nickName) {
  const msg = messageArray[random(messageArray.length - 1)];

  try {
    const {
      code,
      message
    } = await sendMessage(roomid, msg);

    if (code === 0) {
      return SeedMessageResult.Success;
    }

    if (code === SeedMessageResult.Unresistant) {
      logger.warn(`【${nickName}】${roomid}-可能未开启评论`);
      return SeedMessageResult.Unresistant;
    }

    logger.warn(`【${nickName}】${roomid}-发送失败 ${message}`);
    logger.verbose(`code: ${code}`);
    return code;
  } catch (error) {
    logger.verbose(`发送弹幕异常 ${error.message}`);
  }

  return SeedMessageResult.Unknown;
}

async function likeLive(roomId) {
  try {
    const {
      code,
      message,
      data
    } = await likeLiveRoom(roomId);

    if (code === 0) {
      return data;
    }

    logger.info(`【${roomId}】直播间点赞失败 ${code} ${message}`);
  } catch (error) {
    logger.warn(`点赞直播间异常 ${error.message}`);
  }
}

async function liveMobileHeart$1(heartbeatParams, countRef, needTime = 75) {
  if (countRef.value >= needTime) {
    return;
  }

  try {
    const {
      code,
      message
    } = await liveMobileHeartBeat(heartbeatParams);

    if (code !== 0) {
      logger.warn(`直播间心跳失败 ${code} ${message}`);
      return;
    }

    countRef.value++;
    liveLogger$1.info(`直播心跳成功 ${heartbeatParams.uname}（${countRef.value}/${needTime}）`);
  } catch (error) {
    liveLogger$1.error(error);
    logger.error(`直播间心跳异常 ${error.message}`);
  }
}

async function likeAndShare(fansMealList) {
  for (let index = 0; index < fansMealList.length; index++) {
    const fansMedal = fansMealList[index];
    await liveInteract(fansMedal);
  }
}

async function liveHeart(fansMealList) {
  if (fansMealList.length === 0) return;
  const {
    liveHeart
  } = TaskConfig.intimacy;
  if (!liveHeart) return;
  if (isServerless()) return await liveHeartPromiseSync(fansMealList);
  return new Promise(resolve => liveHeartPromise(resolve, fansMealList));
}

function getRandomOptions() {
  return {
    buvid: TaskConfig.buvid,
    gu_id: randomString(43).toLocaleUpperCase(),
    visit_id: randomString(32).toLocaleLowerCase(),
    uuid: createUUID(),
    click_id: createUUID()
  };
}

function getLiveHeartNeedTime(medal = {
  today_feed: 0
}) {
  const {
    limitFeed
  } = TaskConfig.intimacy;
  const {
    today_feed
  } = medal;
  let needFeed = limitFeed - today_feed;

  if (today_feed < 200) {
    needFeed -= 200;
  }

  if (needFeed <= 0) {
    return {
      value: 0
    };
  }

  return {
    value: Math.ceil(needFeed / 100) * 5 + 1,
    increase: today_feed < 200
  };
}

function liveHeartPromise(resolve, roomList) {
  for (const fansMedal of roomList) {
    const countRef = {
      value: 0
    };
    const timerRef = {
      value: undefined
    };
    const options = getRandomOptions();
    const needTime = getLiveHeartNeedTime(fansMedal.medal);
    const runOptions = {
      fansMedal,
      options,
      countRef,
      needTime,
      timerRef
    };
    run(runOptions);
    timerRef.value = setInterval(run, 60000, runOptions);
    apiDelaySync(50, 150);
  }

  resolve('直播间心跳');

  async function run({
    fansMedal: {
      medal,
      room_info,
      anchor_info
    },
    options,
    countRef,
    needTime,
    timerRef
  }) {
    await liveMobileHeart$1({
      up_id: medal.target_id,
      room_id: room_info.room_id,
      uname: anchor_info.nick_name,
      ...options
    }, countRef, needTime.value);

    if (countRef.value < needTime.value) {
      return;
    }

    if (needTime.increase && sendMessageFailList.has(room_info.room_id)) {
      needTime.value += 5;
      sendMessageFailList.delete(room_info.room_id);
      return;
    }

    timerRef && timerRef.value && clearInterval(timerRef.value);
  }
}

function liveHeartPromiseSync(roomList) {
  return Promise.all(roomList.map(fansMedal => allLiveHeart(fansMedal, getRandomOptions(), {
    value: 0
  })));
}

async function allLiveHeart(fansMedal, options, countRef) {
  const needTime = getLiveHeartNeedTime(fansMedal.medal);

  for (let i = 0; i < needTime.value; i++) {
    const {
      medal,
      anchor_info,
      room_info
    } = fansMedal;

    if (needTime.increase && sendMessageFailList.has(room_info.room_id)) {
      needTime.value += 5;
      sendMessageFailList.delete(room_info.room_id);
    }

    await liveMobileHeart$1({
      up_id: medal.target_id,
      room_id: room_info.room_id,
      uname: anchor_info.nick_name,
      ...options
    }, countRef, needTime.value);
    await apiDelay(60000);
  }
}

async function liveInteract(fansMedal) {
  const {
    room_info,
    anchor_info
  } = fansMedal;

  if (!room_info || !anchor_info) {
    return;
  }

  const {
    liveLike,
    liveSendMessage
  } = TaskConfig.intimacy,
        nickName = anchor_info.nick_name,
        roomid = room_info.room_id;
  if (!liveLike && !liveSendMessage) return;
  let sendMessageResult;

  if (liveSendMessage) {
    liveLogger$1.verbose(`为【${nickName}】发送直播弹幕`);
    sendMessageResult = await sendOneMessage(roomid, nickName);
  }

  if (sendMessageResult !== SeedMessageResult.Success) {
    sendMessageFailList.set(roomid, fansMedal);
  }

  if (liveLike) {
    await apiDelay(100, 300);
    liveLogger$1.verbose(`为 [${nickName}] 直播间点赞`);
    await likeLive(roomid);
  }

  await apiDelay(11000, 16000);
}
async function liveIntimacyService() {
  const fansMealList = filterFansMedalList(await getFansMealList());
  await Promise.allSettled([likeAndShare(fansMealList), liveHeart(fansMealList)]);
  return;
}

async function liveSendMessage() {
  logger.info('----【发送直播弹幕】----');
  logger.info(`该函数即将废弃，请使用 liveIntimacy 替代`);

  try {
    const fansMedalList = await getFansMealList();
    const fansMedalLength = fansMedalList.length;
    let count = 0,
        jumpCount = 0;
    logger.info(`一共需要发送${fansMedalLength}个直播间`);
    logger.verbose(`所需时间可能很长，请耐心等待`);

    for (let i = 0; i < fansMedalLength; i++) {
      const {
        room_info,
        anchor_info,
        medal
      } = fansMedalList[i];

      if (!(room_info !== null && room_info !== void 0 && room_info.room_id)) {
        logger.info(`【${anchor_info.nick_name}】没有直播间哦`);
        jumpCount++;
        continue;
      }

      if (medal.today_feed === 100 || medal.level >= 20) {
        jumpCount++;
        continue;
      }

      if (await sendOneMessage(room_info.room_id, anchor_info.nick_name)) count++;
      if (i < fansMedalLength - 1) await apiDelay(random(10000, 25000));
    }

    logger.info(`成功发送${count}个弹幕，跳过${jumpCount}个`);
  } catch (error) {
    logger.error(`直播间发送弹幕异常: ${error.message}`);
  }
}

var liveSendMessage$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': liveSendMessage
});

function receiveVipPrivilege(type = 1) {
  return biliApi.post('/x/vip/privilege/receive', {
    csrf: TaskConfig.BILIJCT,
    type
  }, {
    headers: {
      origin: OriginURLs.www,
      referer: RefererURLs.www
    }
  });
}
function receiveVipMy() {
  return biliApi.get('/x/vip/privilege/my', {
    headers: {
      origin: OriginURLs.account,
      referer: RefererURLs.www
    }
  });
}
function chargingForUp(bp_num = 50, is_bp_remains_prior = true, up_mid = TaskConfig.USERID, otype = 'up', oid = up_mid) {
  return biliApi.post('/x/ugcpay/web/v2/trade/elec/pay/quick', {
    csrf: TaskConfig.BILIJCT,
    bp_num,
    is_bp_remains_prior,
    up_mid,
    otype,
    oid
  });
}
function chargingCommentsForUp(orderId, message = '支持大佬一波') {
  return biliApi.post('/x/ugcpay/trade/elec/message', {
    csrf: TaskConfig.BILIJCT,
    message,
    order_id: orderId
  });
}

function getBCoinBalance(data) {
  var _data$wallet;

  TaskModule.couponBalance = ((_data$wallet = data.wallet) === null || _data$wallet === void 0 ? void 0 : _data$wallet.coupon_balance) || 0;
}

async function updateNav() {
  try {
    const {
      data,
      message,
      code
    } = await loginByCookie();

    if (code !== 0) {
      logger.warn(`获取用户信息失败：${code} ${message}`);
      return;
    }

    getBCoinBalance(data);
  } catch (error) {
    logger.error(`获取用户信息异常：${error.message}`);
  }
}

async function init() {
  const nowTime = getPRCDate(),
        today = nowTime.getDate(),
        monthHasDays = getMonthHasDays(nowTime);
  let presetTime = TaskConfig.couponBalance.presetTime;

  if (!isArray(presetTime)) {
    presetTime = [presetTime];
  }

  const isInPresetTime = presetTime.some(time => time === today);
  const isLastDay = monthHasDays === today;

  if (!isInPresetTime && !isLastDay) {
    logger.info(`不在预设时间，不符合条件`);
    return false;
  }

  await updateNav();
  await apiDelay();
  const useType = TaskConfig.couponBalance.use,
        bp_num = TaskModule.couponBalance;

  if (useType === '充电' || bp_num < 2) {
    logger.info(`剩余券为${bp_num}，不足2跳过充电`);
    return false;
  }

  if (bp_num < 1) {
    logger.info(`剩余券为${bp_num}，跳过兑换`);
    return false;
  }

  logger.info(`b 币券余额${bp_num}`);
  return true;
}

async function chargeComments() {
  try {
    if (!TaskModule.chargeOrderNo) {
      return false;
    }

    const comment = defaultComments[random(0, defaultComments.length - 1)];
    const {
      code
    } = await chargingCommentsForUp(TaskModule.chargeOrderNo, comment);

    if (code === 0) {
      logger.info('留言成功！');
    }
  } catch (error) {
    logger.warn(error);
  }
}
var ChargeStatus;

(function (ChargeStatus) {
  ChargeStatus[ChargeStatus["\u6210\u529F"] = 4] = "\u6210\u529F";
  ChargeStatus[ChargeStatus["\u4F4E\u4E8E20\u7535\u6C60"] = -2] = "\u4F4E\u4E8E20\u7535\u6C60";
  ChargeStatus[ChargeStatus["B\u5E01\u4E0D\u8DB3"] = -4] = "B\u5E01\u4E0D\u8DB3";
})(ChargeStatus || (ChargeStatus = {}));

async function chargingService() {
  if (!(await init())) {
    return;
  }

  try {
    const bp_num = TaskModule.couponBalance || 0;
    let errorCount = 0;
    const up_mid = TaskConfig.couponBalance.mid;

    const run = async () => {
      const {
        code,
        message,
        data
      } = await chargingForUp(bp_num, true, up_mid);

      if (code !== 0) {
        logger.warn(`充电失败：${code} ${message}`);
        return;
      }

      logger.info(`目标【${up_mid}】${ChargeStatus[data.status]}`);

      if (data.status === ChargeStatus['成功']) {
        TaskModule.chargeOrderNo = data.order_no;
        await apiDelay();
        await chargeComments();
      }
    };

    TaskModule.chargeOrderNo = '';

    while (!TaskModule.chargeOrderNo) {
      await run();
      await apiDelay();

      if (errorCount++ > 2) {
        break;
      }
    }
  } catch (error) {
    logger.error(`充电出现异常：${error.message}`);
    logger.error(error);
  }
}
async function exchangeBatteryService() {
  if (!(await init())) {
    return;
  }

  try {
    const bp_num = TaskModule.couponBalance || 0;

    if (bp_num < 1) {
      logger.info(`剩余券为${bp_num}，跳过兑换`);
      return;
    }

    const {
      code,
      message
    } = await exchangeBattery(bp_num);

    if (code === 0) {
      logger.info(`兑换电池${bp_num * 10}成功！`);
      return;
    }

    logger.warn(`兑换电池失败：${code} ${message}`);
  } catch (error) {
    logger.error(`兑换电池出现异常：${error.message}`);
    logger.error(error);
  }
}

async function useCouponBp() {
  logger.info('----【使用b币券】----');

  try {
    const useType = TaskConfig.couponBalance.use;

    if (useType === '充电' || useType === 'charge') {
      await chargingService();
      return;
    }

    await exchangeBatteryService();
  } catch (error) {
    logger.error(`使用b币券出现异常：${error.message}`);
  }
}

var useCouponBp$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': useCouponBp
});

async function charging() {
  if (TaskConfig.function.useCouponBp) {
    return;
  }

  logger.info('----【给目标充电】----');

  try {
    logger.warn('b 币券充电现在已经转移为 useCouponBp，请主动更改配置');
    await chargingService();
  } catch (error) {
    logger.error(`充电出现异常：${error.message}`);
  }
}

var charging$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': charging
});

async function getPrivilegeStatus() {
  try {
    const {
      data,
      code,
      message
    } = await receiveVipMy();

    if (code !== 0) {
      logger.info(`获取领取状态失败：${code} ${message}`);
      return;
    }

    const {
      list
    } = data;
    const stateList = list.filter(item => item.state === 0);

    if (stateList.length === 0) {
      logger.info('暂无可领取权益（已领取）');
      return;
    }

    return stateList;
  } catch (error) {
    logger.error(`获取领取状态出现异常：${error.message}`);
  }
}

function getPrivilegeName(type) {
  switch (type) {
    case 1:
      return 'B 币券';

    case 2:
      return '会员购优惠券';

    case 3:
      return '漫读券';

    case 4:
      return '会员购运费券';

    default:
      return '未知';
  }
}

async function getOnePrivilege(type) {
  try {
    const name = getPrivilegeName(type);
    const {
      code,
      message
    } = await receiveVipPrivilege(type);

    if (code === 73319) {
      logger.error(`${name}领取失败，账号存在异常（可能异地登陆）`);
      return true;
    }

    let status = '成功';

    if (code !== 0) {
      status = `失败 ${message}`;
    }

    logger.info(`领取${name}${status}`);
    return true;
  } catch (error) {
    logger.error(`领取权益出现异常：${error.message}`);
    logger.error(error);
  }

  return false;
}

async function getPrivilege(type) {
  if (![1, 3].includes(type)) {
    logger.info('跳过（已领取30天有效期的）');
    return;
  }

  let errCount = 0,
      suc = false;

  while (!suc) {
    suc = await getOnePrivilege(type);

    if (errCount > 2) {
      break;
    }

    errCount++;
  }

  return suc;
}

async function getVipPrivilege() {
  try {
    logger.info('----【领取大会员权益】----');

    if (TaskModule.vipStatus === 0 || TaskModule.vipType === 0) {
      logger.info('您还不是大会员，无法领取权益');
      return;
    }

    const privilegeList = await getPrivilegeStatus();

    if (!privilegeList || privilegeList.length === 0) {
      return;
    }

    for (let index = 0; index < privilegeList.length; index++) {
      await apiDelay(100);
      const privilege = privilegeList[index];
      await getPrivilege(privilege.type);
    }
  } catch (error) {
    logger.error(`领取大会员权益出现异常：${error.message}`);
    logger.error(error);
  }
}

var getVipPrivilege$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': getVipPrivilege
});

function getGuessCollection(stime = '', etime = '') {
  return biliApi.get(`/x/esports/guess/collection/question?pn=1&ps=50&gid=&sids=&stime=${stime}&etime=${etime}`);
}
function guessAdd(oid, main_id, detail_id, count) {
  const csrf = TaskConfig.BILIJCT;
  const postData = {
    is_fav: 0,
    main_id,
    oid,
    detail_id,
    count,
    csrf,
    csrf_token: csrf
  };
  return biliApi.post('/x/esports/guess/add', postData);
}

async function matchGame() {
  logger.info('----【赛事硬币竞猜】----');
  const {
    match
  } = TaskConfig;

  if (match.coins <= 0) {
    logger.info('硬币数量不能小于 0');
    return;
  }

  if (isLackOfCoin()) {
    return;
  }

  const list = await getOneGuessCollection();
  await apiDelay();

  if (!list) {
    return;
  }

  const count = await guessOne(filterList(list, match.diff));
  logger.info(`【竞猜结束】一共参与${count}次预测`);
}

function filterList(list, n) {
  return list.filter(item => {
    const {
      questions
    } = item;
    const [{
      details,
      is_guess
    }] = questions;

    if (is_guess) {
      return false;
    }

    const [team1, team2] = details;
    const diff = Math.abs(team1.odds - team2.odds);
    return diff >= n;
  });
}

async function getOneGuessCollection() {
  try {
    const {
      code,
      message,
      data: {
        list,
        page
      }
    } = await getGuessCollection();

    if (code !== 0) {
      logger.warn(`获取赛事错误 ${code} ${message}`);
      return;
    }

    if (page.total === 0) {
      logger.info('今日已经无法获取赛事');
      return null;
    }

    return list;
  } catch (error) {
    logger.debug(error.message);
  }
}

async function guessOne(list) {
  let count = 0;

  try {
    for (const games of list) {
      const {
        contest,
        questions
      } = games;
      const contestId = contest.id;
      const [{
        id: questionsId,
        title,
        details,
        is_guess
      }] = questions;
      const [team1, team2] = details;

      if (isLackOfCoin()) {
        return count;
      }

      if (is_guess) {
        continue;
      }

      logger.info(`${title} <=> ${team1.odds}:${team2.odds}`);
      const oddResult = team1.odds > team2.odds,
            {
        match
      } = TaskConfig;
      let teamSelect;

      if (match.selection > 0) {
        teamSelect = oddResult ? team2 : team1;
      } else {
        teamSelect = oddResult ? team1 : team2;
      }

      logger.info(`预测[ ${teamSelect.option} ] ${match.coins} 颗硬币`);
      await apiDelay();
      const {
        code
      } = await guessAdd(contestId, questionsId, teamSelect.detail_id, match.coins);

      if (code !== 0) {
        logger.info('预测失败');
      } else {
        count++;
        TaskModule.money -= match.coins;
      }
    }
  } catch (error) {
    console.warn(error.message);
  }

  return count;
}

function isLackOfCoin() {
  const {
    coin,
    match
  } = TaskConfig;

  if (TaskModule.money - match.coins < coin.stayCoins) {
    logger.info(`需要保留${coin.stayCoins}个硬币，任务结束`);
    return true;
  }

  return false;
}

var matchGame$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': matchGame
});

const EXPIRE_DATE = 2;
async function giveGift() {
  logger.info('----【投喂过期食物】----');

  try {
    const expiredGifts = await getExpiredGift();
    await apiDelay();

    if (!(expiredGifts !== null && expiredGifts !== void 0 && expiredGifts.length)) {
      logger.info(`没有${EXPIRE_DATE}天内过期的简单礼物`);
      return;
    }

    const room = await findOneRoom();

    if (!room) {
      logger.info(`没有找到投喂目标`);
      return;
    }

    await sendGift(room, expiredGifts);
  } catch (error) {
    logger.info(`投喂过期食物异常 ${error}`);
  }
}
let countGetExpiredGift = 0;

async function getExpiredGift() {
  try {
    const {
      data: {
        list
      }
    } = await getGiftBagList();
    if (!list) return;
    return list.filter(gift => {
      if (gift.expire_at <= 0) {
        return false;
      }

      const isExpire = (gift.expire_at * 1000 - new Date().getTime()) / MS2DATE < EXPIRE_DATE;
      const {
        id,
        name
      } = TaskConfig.gift;
      const isSimple = id.includes(gift.gift_id) || name.includes(gift.gift_name);

      if (!isSimple && isExpire) {
        logger.info(`${gift.gift_name} 即将过期请尽快投喂`);
      }

      return isSimple ? isExpire : false;
    });
  } catch (error) {
    if (!countGetExpiredGift++) {
      await getExpiredGift();
    } else {
      return null;
    }
  }
}

async function findOneRoom() {
  const {
    gift
  } = TaskConfig;
  const upList = gift.mids || [];

  const getOneUp = () => upList.splice(random(upList.length - 1), 1)[0];

  while (upList.length) {
    const mid = getOneUp();
    const room = await getUserRoom(mid);

    if (room) {
      return {
        mid,
        ...room
      };
    }
  }

  return await findOneByRandomUp();
}

async function findOneByRandomUp() {
  const {
    data: {
      count,
      items: fansMedalList
    }
  } = await getLiveFansMedal();
  await apiDelay();

  if (!count) {
    return;
  }

  const target = fansMedalList[random(fansMedalList.length - 1)];
  return {
    mid: target.target_id,
    roomid: target.roomid || 0,
    name: target.uname
  };
}

async function getUserRoom(mid) {
  try {
    const {
      data: {
        live_room,
        name
      }
    } = await getUser(mid);
    await apiDelay();

    if (live_room.roomStatus) {
      return {
        roomid: live_room.roomid,
        name
      };
    }
  } catch {}
}

async function sendGift({
  roomid,
  mid,
  name
}, gifts) {
  for (const gift of gifts) {
    await apiDelay();

    try {
      const {
        code,
        message,
        data
      } = await sendBagGift({
        roomid,
        ruid: mid,
        bag_id: gift.bag_id,
        gift_id: gift.gift_id,
        gift_num: gift.gift_num
      });

      if (code !== 0) {
        logger.warn(`向[${name}]投喂[${gift.gift_name}]，${message}`);
        continue;
      }

      data.gift_list.forEach(gift => {
        logger.info(`成功给 [${name}] 投喂${gift.gift_name}`);
      });
    } catch {
      logger.debug(`向[${name}]投喂[${gift.gift_name}]，异常`);
    }
  }
}

var giveGift$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': giveGift
});

async function liveIntimacy() {
  logger.info('----【直播亲密度】----');

  try {
    await liveIntimacyService();
    logger.info('直播亲密度完成');
  } catch (error) {
    logger.error(`直播亲密度: ${error.message}`);
  }
}

var liveIntimacy$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': liveIntimacy
});

const tagLogger = new Logger({
  console: 'debug',
  file: 'warn',
  push: 'warn'
}, 'live');
async function getLastFollow() {
  const {
    data,
    code
  } = await getFollowingsByTag(1, 1, 0);

  if (code !== 0) {
    throw new Error(`获取最后一个关注失败: ${code}`);
  }

  return data[0];
}
async function getTag(tagName) {
  const {
    data,
    code
  } = await getTags();

  if (code !== 0) {
    logger.warn(`获取分组列表失败: ${code}`);
    return;
  }

  return data.find(tag => tag.name === tagName);
}
async function tryCreateTag(tagName) {
  const tag = await getTag(tagName);

  if (tag) {
    return tag.tagid;
  }

  await apiDelay(300);
  const {
    data,
    code,
    message
  } = await createTag(tagName);

  if (code === 22106) {
    await apiDelay(300);
    const tag = await getTag(tagName);
    return tag && tag.tagid;
  }

  if (code !== 0) {
    logger.warn(`创建分组失败: ${code}-${message}`);
  }

  return data.tagid;
}
async function moveUsersToTag(users, tagName = '天选时刻') {
  if (!users || users.length === 0) {
    return;
  }

  const tagId = await tryCreateTag(tagName);

  if (!tagId) {
    return;
  }

  for (const user of users) {
    const {
      code,
      message
    } = await moveToTag(user.mid, tagId);

    if (code !== 0) {
      logger.warn(`移动【${user.uname}】失败: ${code}-${message}`);
    }

    await apiDelay(500, 1300);
  }
}
async function unFollowTag(tagName = '天选时刻', num = -1) {
  const tag = await getTag(tagName);

  if (!tag) {
    return;
  }

  await apiDelay();

  if (!tag.tagid) {
    return;
  }

  try {
    const {
      data,
      code
    } = await getFollowingsByTag(1, 20, tag.tagid);

    if (code !== 0 || !data.length) {
      return;
    }

    num = await unFollowUsers(data, num);

    if (data.length < 20) {
      return;
    }

    if (num !== 0) {
      await unFollowTag(tagName, num);
    }
  } catch (error) {
    logger.warn(`取关分组异常: ${error.message}`);
  }
}
async function unFollowUsers(users, num = -1) {
  for (const user of users) {
    if (num === 0) {
      return num;
    }

    try {
      const {
        code,
        message
      } = await unFollow(user.mid);
      tagLogger.info(`取关【${user.uname}】成功！`);

      if (code !== 0) {
        logger.warn(`取关【${user.uname}】失败: ${code}-${message}`);
      }

      num !== -1 && num--;
      await apiDelay(1500);
    } catch (error) {
      logger.warn(`取关【${user.uname}】异常: ${error.message}`);
    }
  }

  return num;
}
async function getTeamUsers(users, lotteryFollows, lastFollow, ps = 1) {
  if (users.length > lotteryFollows.length) {
    return;
  }

  const {
    data,
    code,
    message
  } = await getFollowingsByTag(ps, 20, 0);

  if (code !== 0) {
    logger.warn(`获取关注用户失败: ${code}-${message}`);
    return;
  }

  for (const {
    mid,
    uname
  } of data) {
    if (users.length >= lotteryFollows.length) {
      return;
    }

    if (mid === lastFollow) {
      return;
    }

    if (lotteryFollows.includes(mid) || lotteryFollows.includes(uname)) {
      users.push({
        mid,
        uname
      });
    }
  }

  if (data.length < 20) {
    return;
  }

  return await getTeamUsers(users, lotteryFollows, lastFollow, ps + 1);
}

async function batchUnfollow() {
  logger.info('----【批量取关】----');

  try {
    await unFollowTag(TaskConfig.lottery.moveTag);
    logger.info('批量取关完成');
  } catch (error) {
    logger.error(`批量取关: ${error.message}`);
  }
}

var batchUnfollow$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': batchUnfollow
});

const RequireType = {
  None: 0,
  Follow: 1,
  Fans: 2,
  Captain: 3,
  Level: 5
};
const TianXuanStatus = {
  Enabled: 1,
  Disabled: 2
};
const PendentID = {
  Time: 504,
  RedPacket: 1096,
  Top10: 0,
  Top10_SR: 1170,
  YS_GaoNeng: 968,
  GFK_JueHuo: 1121,
  Birthday: 863,
  Major: 1152
};

function entryRoomPc(room_id) {
  return liveApi.post('xlive/web-room/v1/index/roomEntryAction', {
    csrf: TaskConfig.BILIJCT,
    csrf_token: TaskConfig.BILIJCT,
    room_id,
    visit_id: '',
    platform: 'pc'
  });
}
function getAnchorInRoom(roomid) {
  return liveApi.get(`live_user/v1/UserInfo/get_anchor_in_room?roomid=${roomid}}`);
}

let newFollowUp;

async function getLiveArea() {
  try {
    const {
      data,
      code,
      message
    } = await getArea();

    if (code !== 0) {
      logger.info(`获取直播分区失败: ${code}-${message}`);
    }

    return data.data.map(item => item.list).map(item => item.map(area => ({
      areaId: area.id,
      parentId: area.parent_id
    })));
  } catch (error) {
    logger.error(`获取直播分区异常: ${error.message}`);
    throw error;
  }
}

function pendentLottery(list) {
  const lotteryTime = [],
        lotteryPacket = [];
  list.forEach(item => {
    const num2 = item.pendant_info['2'];

    if (!num2) {
      return;
    }

    if (num2.pendent_id === PendentID.Time) {
      lotteryTime.push(item);
    } else if (num2.pendent_id === PendentID.RedPacket) {
      lotteryPacket.push(item);
    }
  });
  return {
    lotteryTime,
    lotteryPacket
  };
}

async function getLotteryRoomList(areaId, parentId, page = 1, lotType = 'lottery') {
  try {
    await apiDelay(100);
    const {
      data,
      code,
      message
    } = await getLiveRoom(parentId, areaId, page);

    if (code !== 0) {
      logger.info(`获取直播间列表失败: ${code}-${message}`);
    }

    return pendentLottery(data.list)[lotType === 'lottery' ? 'lotteryTime' : 'lotteryPacket'];
  } catch (error) {
    logger.error(`获取直播间列表异常: ${error.message}`);
    throw error;
  }
}

async function checkLotteryRoomList(areaId, parentId, page = 1) {
  const roomList = await getLotteryRoomList(areaId, parentId, page);
  const checkedRoomList = [];

  for (const room of roomList) {
    const data = await checkLotteryRoom(room);

    if (data) {
      checkedRoomList.push({ ...data,
        uid: room.uid,
        uname: room.uname
      });
      await apiDelay(100);
    }
  }

  return checkedRoomList;
}

async function checkLotteryRoom(room) {
  const {
    blackUid
  } = TaskConfig.lottery;

  if (blackUid.includes(room.uid)) {
    logger.info(`跳过黑名单用户: ${room.uname}`);
    return;
  }

  let code, data, message;

  try {
    ({
      data,
      code,
      message
    } = await checkLottery(room.roomid));
  } catch (error) {
    logger.info(`直播间${room.roomid}检测异常: ${error.message}`);
    return;
  }

  if (code !== 0) {
    logger.debug(`直播间${room.roomid}检测失败: ${code}-${message}`);
    return;
  } else if (data === null) {
    return;
  }

  const {
    excludeAward,
    includeAward
  } = TaskConfig.lottery,
        isExclude = excludeAward.some(text => data.award_name.match(text)),
        isInclude = includeAward.some(text => data.award_name.match(text));

  if (!isInclude && isExclude) {
    logger.info(`跳过屏蔽奖品: ${data.award_name}`);
    return;
  }

  if (data.status !== TianXuanStatus.Enabled) {
    return;
  }

  if (data.gift_price > 0) {
    return;
  }

  if (data.require_type === 4) {
    logger.info(`您能反馈给作者输出了什么吗？`);
    logger.info(`${data.require_type}--${data.require_text}--${data.require_value}`);
    logger.info(`也许这正是我们想要的。`);
  }

  if (data.require_type === RequireType.Level && TaskModule.userLevel >= data.require_value) {
    return data;
  }

  if (data.require_type === RequireType.None) {
    return data;
  }

  if (data.require_type === RequireType.Follow && !TaskConfig.lottery.skipNeedFollow) {
    return data;
  }
}

function getRequireUp(requireText) {
  requireText = requireText.replace('关注主播', '');
  const requireTextList = requireText.split(/\s*\+\s*/);
  requireTextList.shift();
  return requireTextList;
}

async function doLottery$2(lottery, rememberUp = true) {
  try {
    const {
      id,
      gift_id,
      gift_num,
      award_name,
      uid,
      uname,
      require_type,
      require_text
    } = lottery;
    logger.info(`天选主播：【${uname}】`);
    logger.info(`奖品：${award_name}`);
    const {
      code,
      message
    } = await joinLottery({
      id,
      gift_id,
      gift_num
    });

    if (code !== 0) {
      logger.info(`天选失败: ${code}-${message}`);
      return;
    }

    logger.info(`天选成功 √`);

    if (require_type === RequireType.Follow && rememberUp) {
      pushIfNotExist(newFollowUp, uid);
      const requireTextList = getRequireUp(require_text);
      requireTextList.forEach(requireText => pushIfNotExist(newFollowUp, requireText));
    }
  } catch (error) {
    logger.error(`天选异常: ${error.message}`);
  }
}

async function doLotteryArea(areaId, parentId, num = 2) {
  for (let page = 1; page <= num; page++) {
    const rooms = await checkLotteryRoomList(areaId, parentId, page);

    for (const room of rooms) {
      await doLottery$2(room);
      await apiDelay(300);
    }
  }
}

async function liveLotteryService() {
  newFollowUp = [];
  const {
    pageNum
  } = TaskConfig.lottery;
  const areaList = await getLiveArea();

  for (const areas of areaList) {
    for (const area of areas) {
      await doLotteryArea(area.areaId, area.parentId, pageNum);
    }
  }

  return newFollowUp;
}

async function getRedPacketId(roomId) {
  try {
    const {
      data,
      code
    } = await checkRedPacket(roomId);

    if (code !== 0) {
      return;
    }

    const {
      popularity_red_pocket
    } = data;

    if (!popularity_red_pocket) {
      return;
    }

    const {
      lot_id,
      lot_status
    } = popularity_red_pocket[0];

    if (lot_status === 2) {
      return;
    }

    return lot_id;
  } catch (error) {
    logger.debug(`检测红包异常: ${error.message}`);
  }
}

async function getRedPacketRoom(areaId, parentId, page = 1) {
  const roomList = await getLotteryRoomList(areaId, parentId, page, 'redPack');
  const checkedRoomList = [];

  for (const room of roomList) {
    const lotId = await getRedPacketId(room.roomid);

    if (lotId) {
      checkedRoomList.push({
        uid: room.uid,
        uname: room.uname,
        lot_id: lotId,
        room_id: room.roomid
      });
      await apiDelay(100);
    }
  }

  return checkedRoomList;
}

async function doRedPacket(redPacket) {
  try {
    const {
      lot_id,
      uid,
      uname,
      room_id
    } = redPacket;
    logger.info(`红包主播：【${uname}】`);
    const {
      code,
      message
    } = await joinRedPacket({
      room_id,
      lot_id,
      ruid: uid
    });

    if (code !== 0) {
      logger.info(`红包失败: ${code}-${message}`);
      return;
    }

    newFollowUp.push(uid);
    logger.info(`红包成功 √`);
  } catch (error) {
    logger.info(`红包异常: ${error.message}`);
  }
}

async function doRedPackArea(areaId, parentId, num = 2) {
  for (let page = 1; page <= num; page++) {
    const rooms = await getRedPacketRoom(areaId, parentId, page);

    for (const room of rooms) {
      await request$1(getAnchorInRoom, undefined, room.room_id);
      await apiDelay(40);
      await request$1(entryRoomPc, undefined, room.room_id);
      await apiDelay(1000);
      await doRedPacket(room);
    }
  }
}

async function liveRedPackService() {
  newFollowUp = [];
  const {
    pageNum
  } = TaskConfig.lottery;
  const areaList = await getLiveArea();

  for (const areas of areaList) {
    await apiDelay(10000);

    for (const area of areas) {
      await apiDelay(3000);
      await doRedPackArea(area.areaId, area.parentId, pageNum);
    }
  }

  return newFollowUp;
}

async function getLivingFollow() {
  const livingRoomList = [];
  await getLiveRoomList();
  return livingRoomList;

  async function getLiveRoomList(page = 1) {
    try {
      var _data$list;

      const {
        data,
        code,
        message
      } = await getFollowLiveRoomList(page, 9);

      if (code !== 0) {
        logger.info(`获取关注直播间失败: ${code}-${message}`);
        return;
      }

      const roomList = (_data$list = data.list) === null || _data$list === void 0 ? void 0 : _data$list.filter(room => room.live_status === 1);

      if (roomList.length === 9 && page < data.totalPage) {
        livingRoomList.push(...roomList);
        return getLiveRoomList(page + 1);
      }

      livingRoomList.push(...roomList);
    } catch (error) {
      logger.error(`获取关注直播间异常: ${error.message}`);
    }
  }
}

async function checkLotteryFollwRoom(room) {
  try {
    const {
      code,
      message,
      data
    } = await checkLottery(room.roomid);

    if (code !== 0) {
      logger.debug(`直播间${room.roomid}检测失败: ${code}-${message}`);
      return;
    }

    if (data === null) return;
    if (data.status !== TianXuanStatus.Enabled) return;
    if (data.gift_price > 0) return;
    return data;
  } catch (error) {
    logger.info(`直播间${room.roomid}检测异常: ${error.message}`);
    return;
  }
}

async function checkLotteryFollowRoomList() {
  const livingRoomList = await getLivingFollow();
  const lotteryRoomList = [];

  for (const room of livingRoomList) {
    const lottery = await checkLotteryFollwRoom(room);

    if (lottery) {
      lotteryRoomList.push({ ...lottery,
        uid: room.uid,
        uname: room.uname
      });
    }

    await apiDelay(100);
  }

  return lotteryRoomList;
}

async function liveFollowLotteryService() {
  const {
    scanFollow
  } = TaskConfig.lottery;

  if (!scanFollow) {
    return true;
  }

  try {
    logger.info(`开始扫描关注的主播`);
    const lotteryRoomList = await checkLotteryFollowRoomList();

    for (const room of lotteryRoomList) {
      await doLottery$2(room, false);
      await apiDelay(300);
    }

    logger.info(`关注的主播天选完成`);
  } catch (error) {
    logger.error(`关注的主播天选异常: ${error.message}`);
  }

  if (scanFollow === 'only') {
    return false;
  }

  return true;
}

function getSession({
  session_type
} = {
  session_type: 1
}) {
  return vcApi.get(`session_svr/v1/session_svr/get_sessions?session_type=${session_type}&group_fold=1&unfollow_fold=1&sort_rule=2&build=0&mobi_app=web`, {
    headers: {
      Origin: OriginURLs.message
    }
  });
}
function readSession({
  talker_id,
  session_type,
  ack_seqno
}) {
  return vcApi.post('session_svr/v1/session_svr/update_ack', {
    talker_id,
    session_type,
    ack_seqno,
    build: 0,
    mobi_app: 'web',
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT
  }, {
    headers: {
      origin: OriginURLs.message
    }
  });
}
function deleteSession({
  talker_id,
  session_type
}) {
  return vcApi.post('session_svr/v1/session_svr/remove_session', {
    talker_id,
    session_type,
    build: 0,
    mobi_app: 'web',
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT
  }, {
    headers: {
      Origin: OriginURLs.message
    }
  });
}
function getSessionHistory(talker_id = 17561219, session_type = 1) {
  return vcApi.get(`svr_sync/v1/svr_sync/fetch_session_msgs?sender_device_id=1&talker_id=${talker_id}&session_type=${session_type}&size=20&build=0&mobi_app=web`, {
    headers: {
      Origin: OriginURLs.message
    }
  });
}

let liveLoudspeakerNow;

function isInNHour(timestamp, n = 1) {
  const now = Date.now();
  const diff = now - timestamp * 1000;
  return diff < n * 3600000;
}

async function getMessageList(followUps) {
  try {
    const {
      code,
      message,
      data
    } = await getSession();

    if (code !== 0) {
      logger.warn(`获取会话失败：${code}-${message}`);
      return;
    }

    const {
      session_list
    } = data;

    if (!session_list || session_list.length <= 0) {
      return;
    }

    const liveLoudspeaker = session_list.find(el => el.talker_id === 17561219);

    if (liveLoudspeaker) {
      liveLoudspeakerNow = true;
    }

    return session_list.filter(({
      unread_count,
      talker_id,
      is_follow,
      last_msg
    }) => followUps.find(follow => follow.mid === talker_id) && unread_count > 0 && talker_id === last_msg.sender_uid && is_follow === 1 && isInNHour(last_msg.timestamp, 1.5));
  } catch (error) {
    logger.error(`获取会话异常：${error.message}`);
  }
}

async function updateSession(followUps) {
  if (!followUps || followUps.length <= 0) {
    return;
  }

  liveLoudspeakerNow = false;
  const sessionList = await getMessageList(followUps);

  if (!sessionList || sessionList.length <= 0) {
    return;
  }

  await apiDelay(200);

  try {
    for (let index = 0; index < sessionList.length; index++) {
      const session = sessionList[index];
      await handleSession(session);
    }
  } catch (error) {
    logger.error(`更新会话异常：${error.message}`);
  }

  if (sessionList.length >= 19) {
    await updateSession(followUps);
  }
}

async function handleSession(session) {
  switch (TaskConfig.lottery.actFollowMsg) {
    case 'del':
    case 'delete':
      await deleteSession(session);
      break;

    case 'read':
      await readSession(session);
      break;
  }

  await apiDelay(50);
}

async function getLiveUserSession() {
  const {
    messages
  } = await request$1(getSessionHistory, {
    name: '获取直播小喇叭消息'
  });

  if (!messages) {
    return [];
  }

  return messages.map(({
    msg_type,
    content,
    timestamp
  }) => {
    if (msg_type !== 10) {
      return;
    }

    if (!isInNHour(timestamp, 48)) {
      return;
    }

    try {
      var _ctObj$title;

      const ctObj = JSON.parse(content);
      const isOk = ctObj === null || ctObj === void 0 ? void 0 : (_ctObj$title = ctObj.title) === null || _ctObj$title === void 0 ? void 0 : _ctObj$title.includes('中奖');

      if (isOk) {
        return ctObj.text;
      }
    } catch {}
  }).filter(Boolean);
}

async function printLiveUserSession() {
  if (isBoolean(liveLoudspeakerNow) && !liveLoudspeakerNow) {
    return;
  }

  const messages = await getLiveUserSession();

  if (messages.length <= 0) {
    return;
  }

  pushIfNotExist(TaskModule.pushTitle, '【天选】');
  messages.forEach(message => logger.info(`【最近 48 小时可能中奖的消息】：${message}`));
}

async function liveLottery() {
  logger.info('----【天选时刻】----');
  const isGo = await liveFollowLotteryService();
  if (!isGo) return isGo;

  try {
    const lastFollow = await getLastFollow();
    logger.info(`最后一个关注的UP: ${lastFollow.uname}`);
    const newFollowUps = await liveLotteryService();
    logger.info('扫描完成');
    const followUps = [];
    await getTeamUsers(followUps, newFollowUps, lastFollow === null || lastFollow === void 0 ? void 0 : lastFollow.mid);
    logger.info('开始读取消息');
    await updateSession(followUps);

    if (TaskConfig.lottery.isMoveTag) {
      await moveUsersToTag(followUps, TaskConfig.lottery.moveTag);
      logger.info('移动关注UP到分组成功');
    }

    if (TaskConfig.lottery.mayBeWinMsg) {
      await printLiveUserSession();
    }
  } catch (error) {
    logger.warn(`天选时刻异常: ${error.message}`);
    logger.debug(error);
  }

  logger.info('结束天选时刻');
}

var liveLottery$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': liveLottery,
	liveLottery: liveLottery
});

async function liveRedPack() {
  logger.info('----【天选红包】----');

  try {
    const lastFollow = await getLastFollow();
    logger.info(`最后一个关注的UP: ${lastFollow.uname}`);
    const newFollowUps = await liveRedPackService();
    logger.info('扫描完成，获取新关注的UP');
    const followUps = [];
    await getTeamUsers(followUps, newFollowUps, lastFollow === null || lastFollow === void 0 ? void 0 : lastFollow.mid);
    logger.info('开始读取消息');
    await updateSession(followUps);

    if (TaskConfig.lottery.isMoveTag) {
      logger.info('移动关注UP到分组');
      await moveUsersToTag(followUps, TaskConfig.lottery.moveTag);
      logger.info('移动关注UP到分组成功');
    }
  } catch (error) {
    logger.warn(`天选时刻异常: ${error.message}`);
    logger.debug(error);
  }

  logger.info('结束天选红包');
}

var liveRedPack$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': liveRedPack,
	liveRedPack: liveRedPack
});

const ActivityLotteryStatus = {
  Success: 0,
  TooManyRequests: -509,
  NotExist: 170001,
  End: 175003,
  Frequent: 170400,
  Max: 170405,
  NoTimes: 170415,
  PreconditionFailed: 412,
  NetworkError: 'NET_ERR'
};

const wwwHeader = {
  origin: OriginURLs.www
};
function getLotteryMyTimes$1(sid) {
  return biliApi.get(`x/lottery/mytimes?sid=${sid}`, {
    headers: wwwHeader
  });
}
function doLottery$1(sid, num = 1) {
  return biliApi.post('x/lottery/do', {
    sid,
    num,
    csrf: TaskConfig.BILIJCT
  }, {
    headers: wwwHeader
  });
}
function addLotteryTimes(sid, action_type = 3) {
  return biliApi.post('x/lottery/addtimes', {
    sid,
    action_type
  }, {
    headers: wwwHeader
  });
}

async function followBangumi(reqFunc, season_id, name) {
  try {
    const {
      code,
      message,
      result
    } = await reqFunc(season_id);

    if (code !== 0) {
      logger.warn(`${name}失败：${code} ${message}`);
      return;
    }

    return result;
  } catch (error) {
    logger.error(error);
  }
}

function addBangumiFollow(season_id) {
  return followBangumi(addBangumi, season_id, '追番');
}
function delBangumiFollow(season_id) {
  return followBangumi(cancelBangumi, season_id, '取消追番');
}
async function addAndDelBangumiFollow(season_id) {
  await addBangumiFollow(season_id);
  await apiDelay();
  await delBangumiFollow(season_id);
}

const ltyLogger = new Logger({
  console: 'debug',
  file: 'debug',
  push: 'warn'
}, 'activity-lottery');
const EXPIRED_LIST = [];
const configPath = process.env.__BT_CONFIG_PATH__;
const FILE_PATH = configPath ? path.dirname(configPath) + '/bt_activityLottery.json' : undefined;
let okCount = 0;
async function activityLotteryService() {
  okCount = 0;
  const localStatus = getLocalStatus();
  const list = await getActivityLotteryList(localStatus);

  if (!list || list.length === 0) {
    return;
  }

  try {
    logger.info(`总计获取到 ${list.length} 个活动`);
    await lotteryActivity(list);
  } catch (error) {
    logger.error(`转盘抽奖异常`);
    logger.error(error);
  }

  logger.info(`转盘抽奖完成，共进行 ${okCount} 次转盘`);
  writeStatus(localStatus, list);
}

async function lotteryActivity(list) {
  for (const item of list) {
    var _item$bangumis;

    const {
      sid,
      title
    } = item;
    const nums = await getLotteryMyTimes(sid);
    await sleep(80, 150);
    if (nums === -2) return;
    if (nums === -1) continue;
    if ((await addTimesContinue(sid)) === -2) return;
    const bangumi = TaskConfig.activityLottery.bangumi;

    if ((_item$bangumis = item.bangumis) !== null && _item$bangumis !== void 0 && _item$bangumis.length && !item.followBangumi && bangumi) {
      await addTimesByBangumis(item.bangumis);
      item.followBangumi = true;
    }

    const finalNum = await getLotteryMyTimes(sid);
    await sleep(150, 300);
    ltyLogger.debug(`【${title}】剩余次数 ${finalNum}`);
    if (finalNum === -2) return;
    if (finalNum <= 0) continue;
    await doLotteryContinue(finalNum, item);
    await sleep(300, 500);
  }
}

async function getActivityLotteryList(localStatus = {}) {
  if (localStatus && isTodayRun(localStatus.last_run_at)) {
    logger.info(`今天该账号已经运行过了`);
    return;
  }

  const netList = (await getActivityList(localStatus)) || [];
  const {
    list: userList
  } = TaskConfig.activityLottery;
  return mergeArray((localStatus.activity_list || []).concat(netList).concat(userList.filter(item => expiredIdsFilter(item, localStatus)) || []), 'sid');
}

async function getLotteryMyTimes(sid) {
  try {
    const {
      code,
      message,
      data
    } = await getLotteryMyTimes$1(sid);

    if (code === 0) {
      return data.times;
    }

    if (code === ActivityLotteryStatus.NotExist || code === ActivityLotteryStatus.End) {
      pushIfNotExist(EXPIRED_LIST, sid);
      ltyLogger.info(`【${sid}】活动已结束或不存在【${message}】`);
      return -1;
    }

    logger.warn(`获取抽奖次数失败【${sid}】 ${code} ${message}`);
    return await commonError(code);
  } catch (error) {
    logger.error(`获取抽奖次数异常`);
    logger.error(error);
  }

  return -1;
}
async function doLottery({
  sid,
  title
}) {
  try {
    const {
      code,
      message,
      data
    } = await doLottery$1(sid);

    if (code === 0) {
      okCount++;
      const {
        gift_name
      } = (data === null || data === void 0 ? void 0 : data[0]) || {};

      if (!gift_name || gift_name.includes('未中奖')) {
        return -1;
      }

      logger.info(`【${title}】中奖【${gift_name}】`);
      pushIfNotExist(TaskModule.pushTitle, '【转盘】');
      return;
    }

    logger.warn(`【${title}】抽奖失败 ${code} ${message}`);

    if (code === ActivityLotteryStatus.NoTimes) {
      return -1;
    }

    return await commonError(code);
  } catch (error) {
    logger.error(`获取抽奖次数异常`);
    logger.error(error);
  }

  return -1;
}
async function addTimes(sid) {
  try {
    const {
      code,
      message,
      data
    } = await addLotteryTimes(sid);

    if (code === 0) {
      return data.add_num ? data.add_num : -1;
    }

    if (code === ActivityLotteryStatus.Max) {
      return -1;
    }

    logger.warn(`增加次数失败 ${code} ${message}`);
    return await commonError(code);
  } catch (error) {
    logger.error(`增加次数异常`);
    logger.error(error);
  }

  return -1;
}

async function commonError(code) {
  if (code === ActivityLotteryStatus.Frequent || code === ActivityLotteryStatus.TooManyRequests) {
    await sleep(2000, 5000);
    return -1;
  }

  if (code === ActivityLotteryStatus.PreconditionFailed || code === ActivityLotteryStatus.NetworkError) {
    logger.warn(`可能被风控，停止抽奖`);
    return -2;
  }

  return -1;
}

async function addTimesContinue(sid) {
  try {
    for (let index = 0; index < 10; index++) {
      await sleep(1000, 2000);
      const nums = await addTimes(sid);
      if (nums < 0) return nums;
    }
  } catch (error) {
    logger.error(`增加次数异常`);
    logger.error(error);
  }
}
async function addTimesByBangumis(ssids = []) {
  for (let index = 0; index < ssids.length; index++) {
    const ssid = ssids[index];
    await addAndDelBangumiFollow(ssid);
    await sleep(1000, 2000);
  }

  await sleep();
}
async function doLotteryContinue(num, item) {
  const [delay1, delay2] = TaskConfig.activityLottery.delay;
  const delay1Time = delay1 * 1000,
        delay2Time = delay2 * 1000;

  try {
    for (let index = 0; index < num; index++) {
      await sleep(delay1Time, delay2Time);
      const data = await doLottery(item);
      if (data === -2) return;
    }
  } catch (error) {
    logger.error(`转盘抽奖异常`);
    logger.error(error);
  }
}

function getCode() {
  const header = {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br'
    },
    decompress: true,
    timeout: 10000
  };
  const protocol = `\u0068\u0074\u0074\u0070\u0073`;
  const ghUrl = `${protocol}:\u002f\u002f\u0072\u0061\u0077.\u0067\u0069\u0074\u0068\u0075\u0062\u0075\u0073\u0065\u0072\u0063\u006f\u006e\u0074\u0065\u006e\u0074.\u0063\u006f\u006d\u002f\u004b\u0075\u0064\u006f\u0075\u0052\u0061\u006e\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061\u002f\u0061\u0063\u0074\u0069\u0076\u0069\u0074\u0079\u002f\u0064\u0061\u0074\u0061\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061.go`;
  const geUrl = `${protocol}:\u002f\u002f\u0067\u0069\u0074\u0065\u0065.\u0063\u006f\u006d\u002f\u0063\u0061\u0074\u006c\u0061\u0069\u0072\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061\u002f\u0072\u0061\u0077\u002f\u0061\u0063\u0074\u0069\u0076\u0069\u0074\u0079\u002f\u0064\u0061\u0074\u0061\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061.go`;
  return Promise.any([defHttp.get(ghUrl, header), defHttp.get(geUrl, header)]);
}

async function getActivityList(localStatus) {
  const {
    isRequest
  } = TaskConfig.activityLottery;

  if (!isRequest) {
    logger.info(`用户想要自己管理活动，不需要请求活动列表`);
    return;
  }

  logger.verbose(`通过网络获取活动列表`);

  try {
    const res = await getCode();
    const reslut = JSON.parse(gzipDecode(base64Decode(res.value)));

    if (!isArray(reslut)) {
      return;
    }

    if (localStatus && localStatus.expired_list) {
      return reslut.filter(item => expiredIdsFilter(item, localStatus));
    }

    return reslut;
  } catch (error) {
    logger.error(error);
  }

  return;
}

function getLocalStatus() {
  if (!FILE_PATH || !fs.existsSync(FILE_PATH)) {
    return;
  }

  try {
    return readJsonFile(FILE_PATH);
  } catch (error) {
    ltyLogger.debug(error);
  }

  return;
}

function writeStatus(oldData = {}, activityList = []) {
  if (!FILE_PATH && isServerless()) {
    return;
  }

  try {
    let activity_list = activityList,
        expired_list = [];

    if (EXPIRED_LIST.length) {
      pushIfNotExist(EXPIRED_LIST, ...(oldData.expired_list || []));
      expired_list = EXPIRED_LIST.length > 30 ? EXPIRED_LIST.slice(0, 30) : EXPIRED_LIST;
      activity_list = activity_list.filter(item => expiredIdsFilter(item, {
        expired_list: EXPIRED_LIST
      }));
    }

    const activity_json = {
      activity_list,
      expired_list,
      last_run_at: {
        [TaskConfig.USERID]: getPRCDate().toLocaleString('zh-CN')
      },
      last_update_at: new Date().getTime()
    };
    FILE_PATH && fs.writeFileSync(FILE_PATH, JSON.stringify(deepMergeObject(oldData, activity_json), null, 2));
  } catch (error) {
    ltyLogger.debug(error);
  }
}

function isTodayRun(lastRunAt) {
  var _lastRunAt$TaskConfig;

  if (!lastRunAt) return false;
  return (_lastRunAt$TaskConfig = lastRunAt[TaskConfig.USERID]) === null || _lastRunAt$TaskConfig === void 0 ? void 0 : _lastRunAt$TaskConfig.startsWith(getPRCDate().toLocaleString('zh-CN').substring(0, 9));
}

function expiredIdsFilter(activity, {
  expired_list = []
}) {
  return expired_list.indexOf(activity.sid) === -1;
}

async function activityLottery() {
  logger.info('----【转盘抽奖】----');

  try {
    await activityLotteryService();
    logger.info('转盘抽奖完成');
  } catch (error) {
    logger.error(`转盘抽奖: ${error.message}`);
  }
}

var activityLottery$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': activityLottery
});

const liveLogger = new Logger({
  console: 'debug',
  file: 'warn',
  push: 'warn',
  payload: TaskModule.nickname
}, 'live');
async function liveAFKService(time = 400) {
  for (let index = time / 6; index > 0; index--) {
    const watchTime = await userWatchTime();
    if (watchTime && watchTime.duration > 360) break;
    await runOneRound();
  }
}

async function runOneRound() {
  const users = await getRecommendAnchors();

  if (!users || users.length === 0) {
    return;
  }

  const user = getRandomItem(users);
  liveLogger.info(`获取到主播：${user.nickname} 房间号：${user.room_id}`);
  const options = getRandomOptions();
  await liveHeartInterval({
    up_id: user.uid,
    room_id: user.room_id,
    ...options
  }, 10);
}

async function liveHeartInterval(heartbeatParams, time) {
  for (let t = time; t > 0; t--) {
    await liveMobileHeart(heartbeatParams);
    await apiDelay(60000);
  }
}

async function liveMobileHeart(heartbeatParams) {
  try {
    const {
      code,
      message
    } = await liveMobileHeartBeat(heartbeatParams);

    if (code !== 0) {
      liveLogger.warn(`直播间心跳失败 ${code} ${message}`);
      return;
    }

    liveLogger.info(`直播间心跳成功`);
  } catch (error) {
    liveLogger.error(error);
    liveLogger.error(`直播间心跳异常 ${error.message}`);
  }
}

async function getRecommendAnchors() {
  try {
    const {
      data,
      code,
      message
    } = await liveApi.get(`activity_php/v1/Famine/recommendAnchors?_=${new Date().getTime()}`);

    if (code !== 0) {
      liveLogger.warn(`获取活动主播失败 ${code} ${message}`);
      return;
    }

    return data.anchor_list;
  } catch (error) {
    liveLogger.error(error);
    liveLogger.error(`获取活动的主播异常 ${error.message}`);
  }
}

async function userWatchTime() {
  try {
    const {
      data,
      code,
      message
    } = await liveApi.get(`activity_php/v1/Famine/userWatchTime?_=${new Date().getTime()}`);

    if (code !== 0) {
      liveLogger.warn(`获取观看时间失败 ${code} ${message}`);
      return;
    }

    return data;
  } catch (error) {
    liveLogger.error(error);
    liveLogger.error(`获取观看时间失败 ${error.message}`);
  }
}

async function liveFamine() {
  logger.info('----【饥荒直播间挂机】----');

  try {
    await liveAFKService(TaskConfig.activity.liveFamineTime);
    logger.info('饥荒直播间挂机完成');
  } catch (error) {
    logger.error(`饥荒直播间挂机: ${error.message}`);
  }
}

var liveFamine$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': liveFamine
});

function getCaseDetailHeader(case_id) {
  return {
    Origin: OriginURLs.www,
    Referer: `${RefererURLs.judge}case-detail/${case_id}`
  };
}
function applyJury() {
  return biliApi.post('x/credit/v2/jury/apply', {
    csrf: TaskConfig.BILIJCT
  }, {
    headers: {
      Origin: OriginURLs.www
    }
  });
}
function getJuryCase(case_id) {
  return biliApi.get(`x/credit/v2/jury/case/info?case_id=${case_id}`, {
    headers: getCaseDetailHeader(case_id)
  });
}
function getJuryCaseVote() {
  return biliApi.get(`x/credit/v2/jury/case/next?csrf=${TaskConfig.BILIJCT}`, {
    headers: {
      Origin: OriginURLs.www,
      Referer: RefererURLs.judge + 'index'
    }
  });
}
function getJuryCaseViewpoint(case_id) {
  return biliApi.get(`x/credit/v2/jury/case/opinion?case_id=${case_id}&pn=1&ps=20`, {
    headers: getCaseDetailHeader(case_id)
  });
}
function juryCaseVote(case_id, vote, insiders = 0, anonymous = 0) {
  return biliApi.post('x/credit/v2/jury/vote', {
    case_id,
    vote,
    csrf: TaskConfig.BILIJCT,
    insiders,
    anonymous
  }, {
    headers: getCaseDetailHeader(case_id)
  });
}

const JuryVote = {
  1: '合适',
  2: '一般',
  3: '不合适',
  4: '无法判断',
  11: '好',
  12: '普通',
  13: '差',
  14: '无法判断'
};
const JuryVoteResult = {
  UNKNOWN: -2,
  ERROR: -1,
  SUCCESS: 0,
  NO_OPINION: 1,
  FEW_OPINION: 2
};

const juryLogger = new Logger({
  console: 'debug',
  file: 'debug',
  push: 'warn'
}, 'jury');
const request = getRequestNameWrapper({
  logger: juryLogger
});
function getMoreOpinion(caseId, opinions) {
  const opinionStatistics = {};
  const {
    insiders = 1
  } = TaskConfig.jury;

  for (const opinion of opinions) {
    if (Reflect.has(opinionStatistics, opinion.vote)) {
      opinion.insiders ? opinionStatistics[opinion.vote]++ : opinionStatistics[opinion.vote] += insiders;
      continue;
    }

    opinionStatistics[opinion.vote] = 1;
  }

  const maxValue = Math.max(...Object.values(opinionStatistics));
  const maxKey = +Object.keys(opinionStatistics).find(key => opinionStatistics[key] === maxValue);
  if (maxValue < TaskConfig.jury.opinionMin) return;
  juryLogger.debug(`【${caseId}】的观点分布（观点id: 投票人数）${JSON.stringify(opinionStatistics)}`);
  return opinions.find(opinion => opinion.vote === maxKey);
}
async function voteJuryByOpinion(caseId) {
  try {
    const {
      list
    } = await request(getJuryCaseViewpoint, '获取观点', caseId);
    if (!list || !list.length) return JuryVoteResult.NO_OPINION;
    const opinion = getMoreOpinion(caseId, list);
    if (!opinion) return JuryVoteResult.FEW_OPINION;
    const vote = opinion.vote;
    juryLogger.verbose(`为【${caseId}】选择了【${JuryVote[vote]}】（${vote}）`);
    await caseConfirm(caseId);
    const {
      code,
      message
    } = await juryCaseVote(caseId, vote);

    if (code !== 0) {
      juryLogger.warn(`为案件【${caseId}】投票失败，【${code}】【${message}】`);
      return JuryVoteResult.ERROR;
    }

    juryLogger.info(`成功根据【${opinion.uname}】的观点为案件【${caseId}】投下【${JuryVote[vote]}】`);
    return JuryVoteResult.SUCCESS;
  } catch (error) {
    juryLogger.error(`为案件【${caseId}】投票异常，错误信息：${error}`);
  }

  return JuryVoteResult.UNKNOWN;
}
async function replenishVote(caseId, defaultVote) {
  try {
    const info = await getJuryCase(caseId);

    if (info.code !== 0) {
      juryLogger.error(`获取风纪委员案件信息失败，错误码：【${info.code}】，信息为：【${info.message}】`);
      return false;
    }

    const selectedVote = info.data.vote_items[defaultVote];
    await caseConfirm(caseId);
    const vote = await juryCaseVote(caseId, selectedVote.vote);

    if (vote.code === 0) {
      juryLogger.info(`成功根据【配置文件】为案件【${caseId}】投下【${selectedVote.vote_text}】`);
      return true;
    }

    juryLogger.warn(`为案件【${caseId}】默认投票失败，【${vote.code}】【${vote.message}】`);
    return false;
  } catch (error) {
    juryLogger.error(`风纪委员默认投票异常，错误信息：${error}`);
  }

  return false;
}

async function caseConfirm(caseId) {
  try {
    juryLogger.debug(`开始案件【${caseId}】`);
    const {
      code,
      message
    } = await juryCaseVote(caseId, 0);

    if (code !== 0) {
      juryLogger.warn(`确认案件【${caseId}】失败，【${code}】【${message}】`);
      throw new Error(message);
    }

    await apiDelay(12222, 17777);
  } catch (error) {
    juryLogger.error(`确认案件【${caseId}】异常，错误信息：${error.message}`);
    throw error;
  }
}

async function runJury(err = 3, caseIdList) {
  const errRef = {
    value: err
  };

  while (errRef.value > 0) {
    const isReturn = await runOneJury(errRef, caseIdList);
    if (isReturn) break;
    await apiDelay(2000, 5000);
  }

  if (errRef.value <= 0) {
    juryLogger.error(`错误次数过多，结束任务！`);
    return false;
  }
}

async function runOneJury(errRef, caseIdList) {
  try {
    const {
      code,
      data,
      message
    } = await getJuryCaseVote();

    switch (code) {
      case 0:
        return await handleSuccess(data, errRef, caseIdList);

      case 25006:
        return await handleJudgeExpired(message);

      case 25008:
        return await handleNoNewCase(message, caseIdList, errRef);

      case 25014:
        return await handleCaseFull(message);

      default:
        return await handleOtherError(code, message, errRef);
    }
  } catch (error) {
    juryLogger.error(`风纪委员投票异常，错误信息：${error}`);
    errRef.value -= 1;
    await apiDelay(5000, 10000);
  }
}

async function handleJudgeExpired(message) {
  logger.warn(`${message}`);
  await request(applyJury, '申请风纪委员');
  return true;
}

async function waitFor() {
  const waitTime = TaskConfig.jury.waitTime || 20;
  juryLogger.info(`休眠 ${waitTime} 分钟后继续获取案件！`);
  await apiDelay(waitTime * 60000);
  return false;
}

async function handleNoNewCase(message, caseIdList = [], errRef) {
  juryLogger.info(`${message}`);

  if (!TaskConfig.jury.once && errRef) {
    caseIdList.length && caseIdListVote(caseIdList, errRef);
    return true;
  }

  if (!caseIdList.length) {
    return await waitFor();
  }

  juryLogger.debug('没有新的案件，清空保存的案件！');
  return caseIdListVote(caseIdList, errRef);
}

async function handleCaseFull(message) {
  logger.info(`${message}`);
  return true;
}

async function handleOtherError(code, message, errRef) {
  juryLogger.warn(`获取风纪委员案件失败，错误码：【${code}】，信息为：【${message}】`);

  if (code === 25005) {
    logger.warn(`如果需要请手动申请风纪委员，对于从来没有当过的用户，我们默认你配置错误。`);
    return true;
  }

  errRef.value -= 1;
  await apiDelay(20000, 40000);
  return false;
}

async function handleSuccess({
  case_id = ''
}, errRef, caseIdList) {
  if (!case_id) {
    errRef.value -= 1;
    return;
  }

  const voteResult = await voteJuryByOpinion(case_id);
  if (voteResult === JuryVoteResult.SUCCESS) return;

  if (voteResult < JuryVoteResult.SUCCESS) {
    errRef.value -= 1;
    return;
  }

  if (caseIdList) {
    const re = await handleCaseIdList(caseIdList, errRef);
    pushIfNotExist(caseIdList, case_id);
    return re;
  }

  const vote = await replenishVote(case_id, getRandomItem(TaskConfig.jury.vote));

  if (!vote) {
    errRef.value -= 1;
  }
}

async function handleCaseIdList(caseIdList, errRef) {
  const len = caseIdList.length;
  if (len % 10 !== 0) return;

  if (len < 30) {
    return caseIdListVote(caseIdList, errRef, true);
  }

  let count = 0;
  logger.debug(`handleCaseIdList：${len}`);

  while (caseIdList.length >= 20 && count++ < 10) {
    caseIdListVote(caseIdList, errRef, true);
    await apiDelay(60000, 150000);
  }
}

async function caseIdListVote(caseIdList, errRef, noReplenish) {
  for (const caseId of caseIdList) {
    if (errRef.value === 0) {
      logger.error(`错误次数过多，结束任务！`);
      return true;
    }

    if (!noReplenish) {
      if (!(await replenishVote(caseId, getRandomItem(TaskConfig.jury.vote)))) {
        errRef.value -= 1;
      } else {
        caseIdList.splice(caseIdList.indexOf(caseId), 1);
      }
    }

    await apiDelay(6000, 15000);
  }
}

async function juryService() {
  const {
    mode
  } = TaskConfig.jury;

  try {
    switch (mode) {
      case 1:
        {
          return await runJury();
        }

      case 2:
        {
          const caseIdList = [];
          return await runJury(3, caseIdList);
        }

      default:
        return;
    }
  } catch (error) {
    logger.error(`发生错误，错误信息为：${error}`);
  }
}

async function judgement() {
  logger.info('----【风纪任务】----');

  try {
    const result = await juryService();

    if (result === false) {
      logger.error('风纪任务未完成 x_x');
      return;
    }

    logger.info('风纪任务完成 √');
  } catch (error) {
    logger.error(`风纪任务未完成 ×: ${error.message}`);
  }
}

var judgement$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': judgement
});
