'use strict';

var require$$0 = require('zlib');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
var got = require('got');
var require$$0$1 = require('stream');
var require$$0$2 = require('events');
var require$$2 = require('http');
var require$$1 = require('https');
var require$$3 = require('net');
var require$$4 = require('tls');
var require$$7 = require('url');
var util = require('util');

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

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var crypto__namespace = /*#__PURE__*/_interopNamespace(crypto);
var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var path__namespace = /*#__PURE__*/_interopNamespace(path);
var fs__namespace = /*#__PURE__*/_interopNamespace(fs);
var got__default = /*#__PURE__*/_interopDefaultLegacy(got);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$3__default = /*#__PURE__*/_interopDefaultLegacy(require$$3);
var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
var require$$7__default = /*#__PURE__*/_interopDefaultLegacy(require$$7);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

const timerMap$1 = new Map();
process.stdout.write('请尽快主动手动更新程序，以免出现意外情况。\n');
commonjsGlobal.setInterval = function (fn, t) {
  let timer;
  function interval() {
    timer = setTimeout(() => {
      fn();
      interval();
    }, t);
  }
  interval();
  timerMap$1.set(timer, () => {
    clearTimeout(timer);
  });
  return timer;
};
commonjsGlobal.clearInterval = function (t) {
  const clear = timerMap$1.get(t);
  clear && clear();
  timerMap$1.delete(t);
};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$e =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$d = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$c = fails$d;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$c(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$b = fails$d;

var functionBindNative = !fails$b(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$c = Function.prototype.call;

var functionCall = NATIVE_BIND$3 ? call$c.bind(call$c) : function () {
  return call$c.apply(call$c, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
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
var call$b = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$b, call$b);

var functionUncurryThisRaw = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$b.apply(fn, arguments);
  };
};

var uncurryThisRaw$1 = functionUncurryThisRaw;

var toString$6 = uncurryThisRaw$1({}.toString);
var stringSlice$2 = uncurryThisRaw$1(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$2(toString$6(it), 8, -1);
};

var classofRaw$1 = classofRaw$2;
var uncurryThisRaw = functionUncurryThisRaw;

var functionUncurryThis = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw$1(fn) === 'Function') return uncurryThisRaw(fn);
};

var uncurryThis$c = functionUncurryThis;
var fails$a = fails$d;
var classof$6 = classofRaw$2;

var $Object$4 = Object;
var split = uncurryThis$c(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$a(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$6(it) == 'String' ? split(it, '') : $Object$4(it);
} : $Object$4;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$4 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$3 = isNullOrUndefined$4;

var $TypeError$c = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$4 = function (it) {
  if (isNullOrUndefined$3(it)) throw $TypeError$c("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;

var toIndexedObject$5 = function (it) {
  return IndexedObject$1(requireObjectCoercible$3(it));
};

var documentAll$2 = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA: IS_HTMLDDA
};

var $documentAll$1 = documentAll_1;

var documentAll$1 = $documentAll$1.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$g = $documentAll$1.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll$1;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$f = isCallable$g;
var $documentAll = documentAll_1;

var documentAll = $documentAll.all;

var isObject$a = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable$f(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable$f(it);
};

var global$d = global$e;
var isCallable$e = isCallable$g;

var aFunction = function (argument) {
  return isCallable$e(argument) ? argument : undefined;
};

var getBuiltIn$6 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$d[namespace]) : global$d[namespace] && global$d[namespace][method];
};

var uncurryThis$b = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$b({}.isPrototypeOf);

var getBuiltIn$5 = getBuiltIn$6;

var engineUserAgent = getBuiltIn$5('navigator', 'userAgent') || '';

var global$c = global$e;
var userAgent = engineUserAgent;

var process$1 = global$c.process;
var Deno = global$c.Deno;
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

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$9 = fails$d;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$9(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$4 = getBuiltIn$6;
var isCallable$d = isCallable$g;
var isPrototypeOf$5 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$4('Symbol');
  return isCallable$d($Symbol) && isPrototypeOf$5($Symbol.prototype, $Object$3(it));
};

var $String$3 = String;

var tryToString$4 = function (argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$c = isCallable$g;
var tryToString$3 = tryToString$4;

var $TypeError$b = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$5 = function (argument) {
  if (isCallable$c(argument)) return argument;
  throw $TypeError$b(tryToString$3(argument) + ' is not a function');
};

var aCallable$4 = aCallable$5;
var isNullOrUndefined$2 = isNullOrUndefined$4;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$4 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$2(func) ? undefined : aCallable$4(func);
};

var call$a = functionCall;
var isCallable$b = isCallable$g;
var isObject$9 = isObject$a;

var $TypeError$a = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$b(fn = input.toString) && !isObject$9(val = call$a(fn, input))) return val;
  if (isCallable$b(fn = input.valueOf) && !isObject$9(val = call$a(fn, input))) return val;
  if (pref !== 'string' && isCallable$b(fn = input.toString) && !isObject$9(val = call$a(fn, input))) return val;
  throw $TypeError$a("Can't convert object to primitive value");
};

var shared$3 = {exports: {}};

var global$b = global$e;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$5 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$5(global$b, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$b[key] = value;
  } return value;
};

var global$a = global$e;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$a[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.26.0',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.26.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$2 = requireObjectCoercible$4;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$6 = function (argument) {
  return $Object$2(requireObjectCoercible$2(argument));
};

var uncurryThis$a = functionUncurryThis;
var toObject$5 = toObject$6;

var hasOwnProperty = uncurryThis$a({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$5(it), key);
};

var uncurryThis$9 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$5 = uncurryThis$9(1.0.toString);

var uid$3 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
};

var global$9 = global$e;
var shared$2 = shared$3.exports;
var hasOwn$b = hasOwnProperty_1;
var uid$2 = uid$3;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$9.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

var wellKnownSymbol$b = function (name) {
  if (!hasOwn$b(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$b(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var call$9 = functionCall;
var isObject$8 = isObject$a;
var isSymbol$1 = isSymbol$2;
var getMethod$3 = getMethod$4;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$a = wellKnownSymbol$b;

var $TypeError$9 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$a('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$8(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$9(exoticToPrim, input, pref);
    if (!isObject$8(result) || isSymbol$1(result)) return result;
    throw $TypeError$9("Can't convert object to primitive value");
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

var global$8 = global$e;
var isObject$7 = isObject$a;

var document$1 = global$8.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$7(document$1) && isObject$7(document$1.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$a = descriptors;
var fails$8 = fails$d;
var createElement = documentCreateElement$1;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$a && !fails$8(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$9 = descriptors;
var call$8 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$3 = createPropertyDescriptor$4;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$a = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$4(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$a(O, P)) return createPropertyDescriptor$3(!call$8(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$8 = descriptors;
var fails$7 = fails$d;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$7(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$6 = isObject$a;

var $String$2 = String;
var $TypeError$8 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$9 = function (argument) {
  if (isObject$6(argument)) return argument;
  throw $TypeError$8($String$2(argument) + ' is not an object');
};

var DESCRIPTORS$7 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$8 = anObject$9;
var toPropertyKey = toPropertyKey$2;

var $TypeError$7 = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
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
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$7('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$6 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$4;

var createNonEnumerableProperty$6 = DESCRIPTORS$6 ? function (object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor$2(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$2 = {exports: {}};

var DESCRIPTORS$5 = descriptors;
var hasOwn$9 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$9(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$8 = functionUncurryThis;
var isCallable$a = isCallable$g;
var store$1 = sharedStore;

var functionToString = uncurryThis$8(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$a(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$1 = store$1.inspectSource;

var global$7 = global$e;
var isCallable$9 = isCallable$g;

var WeakMap$1 = global$7.WeakMap;

var weakMapBasicDetection = isCallable$9(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$1 = shared$3.exports;
var uid$1 = uid$3;

var keys = shared$1('keys');

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid$1(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$6 = global$e;
var isObject$5 = isObject$a;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$6;
var hasOwn$8 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$2 = global$6.TypeError;
var WeakMap = global$6.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$8(it, STATE)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$5(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$8(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$8(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var fails$6 = fails$d;
var isCallable$8 = isCallable$g;
var hasOwn$7 = hasOwnProperty_1;
var DESCRIPTORS$4 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule$1 = internalState;

var enforceInternalState$1 = InternalStateModule$1.enforce;
var getInternalState$1 = InternalStateModule$1.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$4 = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS$4 && !fails$6(function () {
  return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$7(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS$4) defineProperty$4(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$7(options, 'arity') && value.length !== options.arity) {
    defineProperty$4(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$7(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$4) defineProperty$4(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState$1(value);
  if (!hasOwn$7(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$8(this) && getInternalState$1(this).source || inspectSource(this);
}, 'toString');

var isCallable$7 = isCallable$g;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$2 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$7(value)) makeBuiltIn(value, name, options);
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
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$1 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$6 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$5 = toIntegerOrInfinity$6;

var max$1 = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$1 = function (index, length) {
  var integer = toIntegerOrInfinity$5(index);
  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity$4 = toIntegerOrInfinity$6;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$7 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike$6 = lengthOfArrayLike$7;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$6(O);
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
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false)
};

var uncurryThis$7 = functionUncurryThis;
var hasOwn$6 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$2 = uncurryThis$7([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$6(hiddenKeys$2, key) && hasOwn$6(O, key) && push$2(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$6(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$2(result, key);
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
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$3 = getBuiltIn$6;
var uncurryThis$6 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$7 = anObject$9;

var concat$2 = uncurryThis$6([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$3('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$7(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$5 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;

var copyConstructorProperties$3 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$1.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$5(target, key) && !(exceptions && hasOwn$5(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$5 = fails$d;
var isCallable$6 = isCallable$g;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$6(detection) ? fails$5(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var global$5 = global$e;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$6;
var defineBuiltIn$1 = defineBuiltIn$2;
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
    target = global$5;
  } else if (STATIC) {
    target = global$5[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$5[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
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
      createNonEnumerableProperty$4(sourceProperty, 'sham', true);
    }
    defineBuiltIn$1(target, key, sourceProperty, options);
  }
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$1 = FunctionPrototype.apply;
var call$7 = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$7.bind(apply$1) : function () {
  return call$7.apply(apply$1, arguments);
});

var isCallable$5 = isCallable$g;

var $String$1 = String;
var $TypeError$6 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$5(argument)) return argument;
  throw $TypeError$6("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$5 = functionUncurryThis;
var anObject$6 = anObject$9;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
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

var defineProperty$3 = objectDefineProperty.f;

var proxyAccessor$1 = function (Target, Source, key) {
  key in Target || defineProperty$3(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

var isCallable$4 = isCallable$g;
var isObject$4 = isObject$a;
var setPrototypeOf$3 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$1 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$3 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$4(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject$4(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$3($this, NewTargetPrototype);
  return $this;
};

var wellKnownSymbol$9 = wellKnownSymbol$b;

var TO_STRING_TAG$4 = wellKnownSymbol$9('toStringTag');
var test = {};

test[TO_STRING_TAG$4] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$3 = isCallable$g;
var classofRaw = classofRaw$2;
var wellKnownSymbol$8 = wellKnownSymbol$b;

var TO_STRING_TAG$3 = wellKnownSymbol$8('toStringTag');
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
var classof$5 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$3)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$3(O.callee) ? 'Arguments' : result;
};

var classof$4 = classof$5;

var $String = String;

var toString$4 = function (argument) {
  if (classof$4(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var toString$3 = toString$4;

var normalizeStringArgument$2 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$3(argument);
};

var isObject$3 = isObject$a;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$6;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$2 = function (O, options) {
  if (isObject$3(options) && 'cause' in options) {
    createNonEnumerableProperty$3(O, 'cause', options.cause);
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

var fails$4 = fails$d;
var createPropertyDescriptor$1 = createPropertyDescriptor$4;

var errorStackInstallable = !fails$4(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor$1(1, 7));
  return error.stack !== 7;
});

var getBuiltIn$2 = getBuiltIn$6;
var hasOwn$4 = hasOwnProperty_1;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$6;
var isPrototypeOf$4 = objectIsPrototypeOf;
var setPrototypeOf$2 = objectSetPrototypeOf;
var copyConstructorProperties$1 = copyConstructorProperties$3;
var proxyAccessor = proxyAccessor$1;
var inheritIfRequired = inheritIfRequired$1;
var normalizeStringArgument$1 = normalizeStringArgument$2;
var installErrorCause$1 = installErrorCause$2;
var clearErrorStack$1 = errorStackClear;
var ERROR_STACK_INSTALLABLE$1 = errorStackInstallable;
var DESCRIPTORS$3 = descriptors;

var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$2.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn$4(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn$2('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument$1(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$2(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE$1) createNonEnumerableProperty$2(result, 'stack', clearErrorStack$1(result.stack, 2));
    if (this && isPrototypeOf$4(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause$1(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf$2) setPrototypeOf$2(WrappedError, BaseError);
    else copyConstructorProperties$1(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$3 && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties$1(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$2(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */

var $$7 = _export;
var global$4 = global$e;
var apply = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly$1 = global$4[WEB_ASSEMBLY];

var FORCED$1 = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$1);
  $$7({ global: true, constructor: true, arity: 1, forced: FORCED$1 }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly$1 && WebAssembly$1[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$1);
    $$7({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$1 }, O);
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
    return require$$0.gzipSync(encodeURIComponent(str)).toString('base64');
  } catch (e) {
    return 'Error: 当前字符串不能被Gzip压缩';
  }
}
function gzipDecode(str) {
  try {
    const result = require$$0.unzipSync(Buffer.from(str, 'base64')).toString();
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

var defineProperty$2 = objectDefineProperty.f;
var hasOwn$3 = hasOwnProperty_1;
var wellKnownSymbol$7 = wellKnownSymbol$b;

var TO_STRING_TAG$2 = wellKnownSymbol$7('toStringTag');

var setToStringTag$1 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$3(target, TO_STRING_TAG$2)) {
    defineProperty$2(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
  }
};

var $$6 = _export;
var global$3 = global$e;
var setToStringTag = setToStringTag$1;

$$6({ global: true }, { Reflect: {} });

// Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
setToStringTag(global$3.Reflect, 'Reflect', true);

var classof$3 = classofRaw$2;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$2 = Array.isArray || function isArray(argument) {
  return classof$3(argument) == 'Array';
};

var DESCRIPTORS$2 = descriptors;
var isArray$1 = isArray$2;

var $TypeError$5 = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$2 && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray$1(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw $TypeError$5('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};

var $TypeError$4 = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$1 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError$4('Maximum allowed index exceeded');
  return it;
};

var $$5 = _export;
var toObject$4 = toObject$6;
var lengthOfArrayLike$5 = lengthOfArrayLike$7;
var setArrayLength = arraySetLength;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
var fails$3 = fails$d;

var INCORRECT_TO_LENGTH = fails$3(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var SILENT_ON_NON_WRITABLE_LENGTH = !function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
}();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$$5({ target: 'Array', proto: true, arity: 1, forced: INCORRECT_TO_LENGTH || SILENT_ON_NON_WRITABLE_LENGTH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject$4(this);
    var len = lengthOfArrayLike$5(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});

const ENV_BASE = {
  qinglong: isQingLongPanel(),
  fc: isFC(),
  scf: isSCF(),
  cfc: isCFC(),
  agc: isAGC()
};
const ENV = {
  ...ENV_BASE,
  serverless: isServerless(),
  type: getEnvType()
};
function isQingLongPanel() {
  return Boolean(process.env.IS_QING_LONG || '__IS_QINGLONG__' === 'true' || process.env.QL_BRANCH);
}
function isCFC() {
  return global.IS_CFC || '__IS_CFC__' === 'true';
}
function isAGC() {
  return global.IS_CFC || '__IS_AGC__' === 'true';
}
function setConfigFileName() {
  const defaultConfigFileName = ENV_BASE.qinglong ? 'cat_bili_config' : 'config',
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
  return keys.filter(key => tags.includes(key)).length >= 3 || '__IS_FC__' === 'true';
}
function isSCF() {
  const keys = Object.keys(process.env);
  const isSCF = keys.filter(key => key.startsWith('SCF_')).length >= 10;
  const isTENCENTCLOUD = keys.filter(key => key.startsWith('TENCENTCLOUD_')).length >= 3;
  return isSCF && isTENCENTCLOUD || 'true' === 'true';
}
function isServerless() {
  return ENV_BASE.fc || ENV_BASE.scf || ENV_BASE.cfc || ENV_BASE.agc;
}
function getEnvType() {
  if (ENV_BASE.scf) {
    return 'scf';
  }
  if (ENV_BASE.fc) {
    return 'fc';
  }
  if (ENV_BASE.agc) {
    return 'agc';
  }
  if (ENV_BASE.cfc) {
    return 'cfc';
  }
  return 'local';
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
function isObject$2(val) {
  return val !== null && is(val, 'Object');
}
function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }
  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }
  if (isObject$2(val)) {
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
  return is(val, 'Promise') && isObject$2(val) && isFunction(val.then) && isFunction(val.catch);
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
function isMap(val) {
  return is(val, 'Map');
}
function isUrl(path) {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
function isEmail(val) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(val);
}
function isHexString(val) {
  return /^[01]+$/.test(val);
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
  let minutes;
  if (hours == startTime[0]) {
    minutes = random(startTime[1], MAX_MINUTES);
  } else if (hours == endTime[0]) {
    minutes = random(endTime[1]);
  } else {
    minutes = random(MAX_MINUTES);
  }
  let seconds;
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
  if (minutes >= 60) {
    minutes = minutes % 60;
    hours++;
  }
  if (hours >= 24) {
    minutes = minutes % 24;
  }
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
function createVisitId() {
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
  if (!isObject$2(object)) {
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
  if (!isObject$2(target) || !isObject$2(source)) {
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
function deepSetObject(target, source) {
  if (target === undefined || source === undefined) {
    return target || source;
  }
  if (!isObject$2(target) || !isObject$2(source)) {
    return source;
  }
  if (Array.isArray(target) && Array.isArray(source)) {
    return target.concat(source);
  }
  return Object.keys(source).reduce((result, key) => {
    if (result[key] === undefined) {
      result[key] = source[key];
    } else if (isObject$2(result[key]) && isObject$2(source[key])) {
      result[key] = deepSetObject(result[key], source[key]);
    }
    return result;
  }, target);
}
function stringify(entries) {
  if (!isObject$2(entries) && !isArray(entries)) {
    return entries;
  }
  const searchParams = new URLSearchParams();
  if (!Array.isArray(entries)) {
    entries = Object.entries(entries);
  }
  entries.forEach(([key, value]) => {
    if (isObject$2(value)) {
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
function createBuvid(prefix = 'XY') {
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
async function getOnceFunc(cb) {
  let flag = true;
  return async (...args) => {
    if (flag) {
      await cb(...args);
      flag = false;
    }
  };
}
function pad(num, length = 8, char = '0') {
  return num.padStart(length, char);
}
function radixConvert(num, fromRadix, toRadix) {
  return parseInt(num + '', fromRadix).toString(toRadix);
}

function writeOut(message) {
  process.stdout.write(message);
}
function writeError(message) {
  if (ENV.fc) {
    process.stdout.write(message);
    return;
  }
  process.stderr.write(message);
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
  error(message, error) {
    if (message instanceof Error) {
      error = message;
      message = '';
    }
    if (!error) {
      this.log({
        level: 'error'
      }, message);
      return;
    }
    if (Reflect.has(error, 'message')) {
      this.log({
        level: 'error'
      }, `${message} ${error.message}`);
    }
    if (Reflect.has(error, 'stack')) {
      this.log({
        level: 'debug'
      }, error.stack);
    }
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
      writeError(message);
      return;
    }
    writeOut(message);
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

var isObject$1 = isObject$a;
var classof$2 = classofRaw$2;
var wellKnownSymbol$6 = wellKnownSymbol$b;

var MATCH = wellKnownSymbol$6('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$1(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof$2(it) == 'RegExp');
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

var call$6 = functionCall;
var hasOwn$2 = hasOwnProperty_1;
var isPrototypeOf$3 = objectIsPrototypeOf;
var regExpFlags = regexpFlags;

var RegExpPrototype = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn$2(R, 'flags') && isPrototypeOf$3(RegExpPrototype, R)
    ? call$6(regExpFlags, R) : flags;
};

var uncurryThis$3 = functionUncurryThis;
var toObject$3 = toObject$6;

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
    namedCaptures = toObject$3(namedCaptures);
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
var call$5 = functionCall;
var uncurryThis$2 = functionUncurryThis;
var requireObjectCoercible$1 = requireObjectCoercible$4;
var isCallable$2 = isCallable$g;
var isNullOrUndefined$1 = isNullOrUndefined$4;
var isRegExp = isRegexp;
var toString$1 = toString$4;
var getMethod$2 = getMethod$4;
var getRegExpFlags = regexpGetFlags;
var getSubstitution = getSubstitution$1;
var wellKnownSymbol$5 = wellKnownSymbol$b;

var REPLACE = wellKnownSymbol$5('replace');
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
        return call$5(replacer, searchValue, O, replaceValue);
      }
    }
    string = toString$1(O);
    searchString = toString$1(searchValue);
    functionalReplace = isCallable$2(replaceValue);
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
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$1 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$1 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$4 = anObject$9;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys = objectKeys$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$4(O);
  var props = toIndexedObject$1(Properties);
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
// eslint-disable-next-line es/no-object-create -- safe
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

var wellKnownSymbol$4 = wellKnownSymbol$b;
var create$1 = objectCreate;
var defineProperty$1 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$4('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty$1(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$1(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var $$3 = _export;
var toObject$2 = toObject$6;
var lengthOfArrayLike$4 = lengthOfArrayLike$7;
var toIntegerOrInfinity$3 = toIntegerOrInfinity$6;
var addToUnscopables = addToUnscopables$1;

// `Array.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$$3({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject$2(this);
    var len = lengthOfArrayLike$4(O);
    var relativeIndex = toIntegerOrInfinity$3(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

addToUnscopables('at');

var $$2 = _export;
var uncurryThis$1 = functionUncurryThis;
var requireObjectCoercible = requireObjectCoercible$4;
var toIntegerOrInfinity$2 = toIntegerOrInfinity$6;
var toString = toString$4;
var fails$2 = fails$d;

var charAt = uncurryThis$1(''.charAt);

var FORCED = fails$2(function () {
  // eslint-disable-next-line es/no-array-string-prototype-at -- safe
  return '𠮷'.at(-2) !== '\uD842';
});

// `String.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$$2({ target: 'String', proto: true, forced: FORCED }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity$2(index);
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
const JSON5 = getJSON5();

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
function writeJsonFile(filepath, obj) {
  try {
    const oldObj = readJsonFile(filepath);
    fs.writeFileSync(filepath, JSON.stringify({
      ...oldObj,
      ...obj
    }));
  } catch (err) {
    defLogger.debug(err);
  }
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
  return getCookieString({
    ...getCookieJSON(cookie),
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
    throw new Error('环境中的配置不是有效的 JSON5 字符串！');
  }
}
function handleMultiUserConfig(config) {
  let newConfig;
  const isArrayConf = isArray(config);
  if (isArrayConf) {
    newConfig = config.filter(Boolean);
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
      defLogger.debug(`读取配置文件 ${filepath}`);
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
    return mapMultiUserConfig(isMultiUserConfig(config) ? config : [config]);
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
function mapMultiUserConfig(config) {
  const map = conf => isBiliCookie(conf.cookie) ? conf : undefined;
  if (Array.isArray(config)) {
    return mergeCommon(config).map(map);
  }
  return mergeCommon(config.account).map(map);
}
function mergeCommon(config) {
  const commonIndex = config.findIndex(conf => conf && Reflect.has(conf, '__common__'));
  if (commonIndex === -1) return config;
  const commonConfig = config.splice(commonIndex, 1)[0];
  if (!commonConfig || !Reflect.get(commonConfig, '__common__')) return config;
  Reflect.deleteProperty(commonConfig, '__common__');
  Reflect.deleteProperty(commonConfig, 'cookie');
  Reflect.deleteProperty(commonConfig, 'accessKey');
  config.forEach(conf => conf && deepSetObject(conf, commonConfig));
  return config;
}

var _process$env$PUSHPLUS;
const defaultConfig = {
  cookie: '',
  accessKey: '',
  createCookieDay: undefined,
  message: {
    br: '\n',
    onlyError: false,
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
    activityLottery: false,
    dailyBattery: false
  },
  log: {
    pushLevel: 'verbose',
    consoleLevel: 'debug',
    fileLevel: 'debug',
    useEmoji: true,
    fileSplit: 'day'
  },
  limit: {
    level6: true,
    coins5: true
  },
  apiDelay: [2, 6],
  userAgent: '',
  dailyRunTime: DAILY_RUN_TIME,
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
    name: [],
    all: false
  },
  coin: {
    customizeUp: [],
    targetLevel: 6,
    stayCoins: 0,
    targetCoins: 5,
    upperAccMatch: false,
    src: ['自定义UP', '特别关注', '关注', '首页推荐', '分区排行']
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
    moveTag: '天选时刻',
    pageNum: 2,
    actFollowMsg: 'read',
    scanFollow: undefined,
    skipNeedFollow: false,
    mayBeWinMsg: true
  },
  redPack: {
    source: 0,
    uri: '',
    intervalActive: 60,
    restTime: [-1, -1],
    riskTime: [-1, -1],
    riskSleepTime: -1,
    linkRoomNum: 1,
    totalNum: -1,
    dmNum: [10],
    moveUpInWait: true,
    moveTag: 'rp关注',
    actFollowMsg: 'read',
    noWinNum: 10,
    riskNum: 5
  },
  unFollow: {
    delay: 3,
    restTime: [20, -1],
    totalNum: -1,
    tags: ['天选时刻', 'rp关注']
  },
  intimacy: {
    liveSendMessage: true,
    liveLike: true,
    liveHeart: false,
    whiteList: [],
    blackList: [],
    limitFeed: TODAY_MAX_FEED,
    skipNum: 10,
    isRetryHeart: false
  },
  jury: {
    once: true,
    vote: [0, 0, 1],
    opinion: true,
    opinionMin: 3,
    notOpinion: [3],
    waitTime: 20,
    insiderWeight: 0.8,
    insiders: [0, 1],
    anonymous: [0, 1],
    newTrigger: true
  },
  manga: {
    sign: true,
    buy: false,
    read: false,
    mc: [],
    name: [],
    love: true
  },
  exchangeCoupon: {
    num: 1,
    delay: 2000
  },
  activity: {
    liveFamineTime: 400
  },
  bigPoint: {
    isRetry: 20,
    isWatch: true,
    epids: [],
    watchDelay: 40
  },
  activityLottery: {
    list: [],
    isRequest: true,
    delay: [1.8, 3.2],
    bangumi: false,
    follow: false,
    proxyPrefix: 'https://ghproxy.com/',
    customUrl: ''
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
function oldConfigHandle(config) {
  var _config$couponBalance, _config$couponBalance2;
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
  coin.customizeUp = arr2numArr(coin.customizeUp);
  gift.mids = arr2numArr(gift.mids);
  const couponBalanceUse = couponBalance.use;
  switch (couponBalanceUse) {
    case 'battery':
    case '电池':
      couponBalance.use = '电池';
      break;
    case 'charge':
    case '充电':
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
  const {
    redPack
  } = config;
  if (redPack && Reflect.has(redPack, 'riskSleepTime') && !Reflect.has(redPack, 'riskTime')) {
    redPack.riskTime = [1, redPack.riskSleepTime];
  }
  const {
    jury
  } = config;
  if (jury) {
    if (isNumber(jury.insiders) && isUnDef(jury.insiderWeight)) {
      jury.insiderWeight = jury.insiders;
    }
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
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36 Edg/106.0.1370.34',
  'content-type': ContentTypeEnum.FORM_URLENCODED,
  'accept-language': 'zh-CN,zh;q=0.9',
  'accept-encoding': 'gzip, deflate, br'
};
function getAndroidUA({
  version = '6.79.0',
  phone = 'MI 10 Pro',
  build = '6790300',
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
    if (key === 'cookie' && value) {
      _taskConfig.cookie = getCookie(_taskConfig.cookie, value === null || value === void 0 ? void 0 : value.split(';'));
      setCookieValue(_taskConfig, value);
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
  static hasError = false;
}
let TaskModule;
function initialize(config) {
  if (!config) {
    config = getConfig(false);
  }
  const userConfig = mergeConfig(config);
  const buvid = getCookieBuvid(userConfig.cookie);
  _taskConfig = {
    ...userConfig,
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
  return createBuvid();
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

function clearLogs() {
  if (isServerless()) return;
  const day = Number(process.env.BILIOUTILS_LOG_CLEAR_DAY || 15);
  deleteLogLineByDay(day);
  deleteLogFile(day);
}
function deleteLogFile(day = 15) {
  try {
    const filePath = resolvePath(`./logs`);
    const allLogFiles = fs__namespace.readdirSync(filePath).map(file => {
      var _file$match;
      return ((_file$match = file.match(/^bt_(?:combined|error)-\d{4}-\d{1,2}(?:-\d{1,2})?\.log$/)) === null || _file$match === void 0 ? void 0 : _file$match[0]) || '';
    }).filter(Boolean);
    allLogFiles.forEach(file => {
      var _file$match2;
      const timeStr = (_file$match2 = file.match(/\d{4}-\d{1,2}(?:-\d{1,2})?/)) === null || _file$match2 === void 0 ? void 0 : _file$match2[0].split('-').map(i => i.padStart(2, '0')).join('-').padEnd(10, '-28');
      if (!timeStr) return;
      const time = new Date(timeStr),
        now = new Date();
      if (now.getTime() - time.getTime() > day * MS2DATE) {
        fs__namespace.unlinkSync(`${filePath}/${file}`);
      }
    });
  } catch {}
}
function deleteLogLineByDay(day = 15) {
  try {
    const filePath = resolvePath(`./logs/bt_combined-def.log`);
    const file = fs__namespace.readFileSync(filePath, 'utf-8');
    const br = getBrChar(filePath);
    const lines = file.split(br);
    const index = lines.findIndex(line => {
      const linePrefix = line.match(/\[\w+\s(\d{4}\/\d{1,2}\/\d{1,2}\s\d{2}:\d{2}:\d{2})]/);
      if (!linePrefix) return false;
      return new Date().getTime() - new Date(linePrefix[1]).getTime() < day * MS2DATE;
    });
    fs__namespace.writeFileSync(filePath, lines.slice(index).join(br));
  } catch {}
}
function getBrChar(file) {
  var _fileContent$match;
  const fileContent = fs__namespace.readFileSync(file, 'utf-8');
  return ((_fileContent$match = fileContent.match(/\r?\n/)) === null || _fileContent$match === void 0 ? void 0 : _fileContent$match[0]) || `\r\n`;
}

const emptyLogger = new EmptyLogger();
class Logger extends SimpleLogger {
  constructor(options = {}, name = 'default') {
    super(options);
    this.options = options;
    this.name = name;
    this.mergeOptions({
      ...options,
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
  error(message, error) {
    super.error(message, error);
    TaskModule.hasError = true;
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
  static async push(title = '日志推送') {
    const {
      sendMessage
    } = await Promise.resolve().then(function () { return sendNotify$1; });
    return sendMessage(title, this.pushValue);
  }
}
const logger = new Logger({
  console: TaskConfig.log.consoleLevel,
  file: TaskConfig.log.fileLevel,
  push: TaskConfig.log.pushLevel,
  payload: process.env.BILITOOLS_IS_ASYNC && TaskConfig.USERID
});
const _logger = new Logger({
  console: 'debug',
  file: false,
  push: false,
  payload: 'cat'
});
function notPush() {
  return TaskConfig.message.onlyError && !TaskModule.hasError && TaskModule.pushTitle.length === 0;
}

var index$3 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	defLogger: defLogger,
	clearLogs: clearLogs,
	emptyLogger: emptyLogger,
	Logger: Logger,
	logger: logger,
	_logger: _logger,
	notPush: notPush
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
	ENV: ENV,
	isQingLongPanel: isQingLongPanel,
	isCFC: isCFC,
	isAGC: isAGC,
	setConfigFileName: setConfigFileName,
	isFC: isFC,
	isSCF: isSCF,
	isServerless: isServerless,
	getEnvType: getEnvType,
	defLogger: defLogger,
	clearLogs: clearLogs,
	emptyLogger: emptyLogger,
	Logger: Logger,
	logger: logger,
	_logger: _logger,
	notPush: notPush,
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
	createVisitId: createVisitId,
	pushIfNotExist: pushIfNotExist,
	getNewObject: getNewObject,
	cloneObject: cloneObject,
	deepMergeObject: deepMergeObject,
	deepSetObject: deepSetObject,
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
	createBuvid: createBuvid,
	uniqueObjectArray: uniqueObjectArray,
	Sleep: Sleep,
	getDelayTime: getDelayTime,
	mergeArray: mergeArray,
	getOnceFunc: getOnceFunc,
	pad: pad,
	radixConvert: radixConvert,
	is: is,
	isDef: isDef,
	isUnDef: isUnDef,
	isObject: isObject$2,
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
	isMap: isMap,
	isUrl: isUrl,
	isEmail: isEmail,
	isHexString: isHexString
});

const notice = async msg => {
  defLogger.warn(msg || `SCF从9月开始会对日志进行收费！`);
};
async function dailyMain() {
  notice();
  const {
    dailyHandler
  } = await Promise.resolve().then(function () { return index$1; });
  return await dailyHandler.run();
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
  let isReturn = false;
  if (__BT_context__.event.Message) {
    isReturn = await runTasks(__BT_context__.event.Message);
  }
  if (isReturn) return __BT_context__.resolve('success');
  try {
    const message = await dailyMain();
    __BT_context__.resolve(message);
    return;
  } catch (error) {
    __BT_context__.reject(error);
  }
})();

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
  params = {
    ...params,
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
  params = {
    ...params,
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
    if (isObject$2(params[key])) {
      objectValueToString(params[key]);
      return;
    }
    if (isArray(params[key])) {
      params[key] = params[key].map(item => isObject$2(item) ? objectValueToString(item) : item.toString());
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
  if (isObject$2(options.params) && !isString(options.searchParams)) {
    options.searchParams = {
      ...options.searchParams,
      ...options.params
    };
  }
  handleData(options);
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
function handleData(options) {
  options.headers || (options.headers = {});
  const contentType = options.headers['content-type'],
    isFormUrlencoded = contentType === null || contentType === void 0 ? void 0 : contentType.startsWith('application/x-www-form-urlencoded'),
    isObjectData = isObject$2(options.data);
  if (isFormUrlencoded && isObjectData) {
    options.form = options.data;
    return;
  }
  if (isFormUrlencoded) {
    options.body = options.data;
    return;
  }
  if (isObjectData) {
    options.json = options.data;
    return;
  }
  options.body = options.data;
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
      return this.request({
        ...config,
        method: 'GET',
        url: options
      });
    }
    return this.request({
      ...options,
      method: 'GET'
    });
  }
  post(options, data, config) {
    if (isString(options)) {
      return this.request({
        ...config,
        method: 'POST',
        url: options,
        data
      });
    }
    return this.request({
      ...options,
      method: 'POST'
    });
  }
  put(url, data, config) {
    return this.request({
      ...config,
      method: 'PUT',
      url,
      data
    });
  }
  delete(url, data, config) {
    return this.request({
      ...config,
      method: 'DELETE',
      url,
      data
    });
  }
  patch(url, data, config) {
    return this.request({
      ...config,
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
      url: '',
      data: null
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
    if (Object.keys(data).length) {
      const str = JSON.stringify(data).replace(/{title}/g, title).replace(/{text}/g, text).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
      options.data = JSON.parse(str);
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
                url: 'https://github.com/catlair/BiliOutils',
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
  if (TaskConfig.log.pushLevel === false) {
    logger.info('消息推送已关闭');
    return;
  }
  if (notPush()) {
    logger.info('仅在任务出错时发送消息');
    return;
  }
  title = `Bili-${conciseNickname(TaskModule === null || TaskModule === void 0 ? void 0 : TaskModule.nickname) || TaskConfig.USERID}-${title}`;
  if (TaskModule.pushTitle.length) {
    title = `${title}-${TaskModule.pushTitle.join('')}`;
  }
  if (TaskModule.hasError) {
    title = `【Err】${title}`;
  }
  await sendNotify(title, text, undefined, '');
}

var sendNotify$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	sendMessage: sendMessage$1
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
function takeSeasonGift$1(season_id = '31') {
  return mangaApi.post(`twirp/user.v1.Season/TakeSeasonGifts`, {
    id: 0,
    is_teenager: 0,
    no_recommend: 0,
    season_id,
    take_type: 1,
    mobi_app: 'android_comic',
    ts: new Date().getTime()
  });
}
function getSeasonInfo$1() {
  return mangaApi.post(`twirp/user.v1.Season/GetSeasonInfo`, {
    is_teenager: 0,
    no_recommend: 0,
    take_type: 1,
    mobi_app: 'android_comic',
    ts: new Date().getTime()
  });
}
function shareComic() {
  return mangaApi.post(`twirp/activity.v1.Activity/ShareComic`, {
    platform: 'android',
    ts: new Date().getTime()
  });
}
function sendRealtime(buffer) {
  return biliHttp.post('https://dataflow.biliapi.com/log/pbmobile/realtime?android', buffer, {
    headers: {
      'Content-Type': 'application/octet-stream'
    },
    requestOptions: {
      withBiliCookie: false
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
    thatlogger.error(`${name || reqFunc.name}请求出现异常`, error);
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
  return (reqFunc, name, ...args) => request$1(reqFunc, {
    ...options,
    name
  }, ...args);
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
    return disable_coupon_amount ? ep_list.slice(disable_coupon_amount) : ep_list;
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
  const epList = filterLocked(await getMangaEpList(comic_id));
  if (epList.length === 0) {
    return false;
  }
  for (let index = 0; index < epList.length; index++) {
    await apiDelay(100);
    if (await buyOneEpManga(epList[index].id)) return true;
  }
  function filterLocked(epList = []) {
    return epList.filter(ep => ep.is_locked);
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
}
async function mangaSign$2() {
  const {
    sign
  } = TaskConfig.manga;
  if (!sign) {
    return;
  }
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
async function getSeasonInfo() {
  try {
    const {
      code,
      data,
      msg
    } = await getSeasonInfo$1();
    if (code === 0) {
      return data;
    }
    logger.warn(`获取赛季信息失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`获取赛季异常: ${error.message}`);
  }
}
async function takeSeasonGift() {
  try {
    const seasonInfo = await getSeasonInfo();
    if (!seasonInfo) return;
    const {
      code,
      msg
    } = await takeSeasonGift$1(seasonInfo.season_id);
    if (code === 0) return;
    if (code === 7) {
      return;
    }
    logger.warn(`获取任务礼包失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`获取任务礼包异常: ${error.message}`);
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
async function shareComicService() {
  try {
    const {
      code,
      msg
    } = await shareComic();
    if (code === 0) {
      logger.info(msg || '每日分享成功！');
      return;
    }
    logger.warn(`每日分享失败：${code} ${msg}`);
  } catch (error) {
    logger.error(`每日分享异常: ${error.message}`);
  }
}
function getKeyTaskItem(today_tasks) {
  const task30min = today_tasks.find(el => el.type === 17 && el.sub_id === 5),
    task15min = today_tasks.find(el => el.type === 22 && el.comics.length > 0);
  return {
    task15min,
    task30min
  };
}
async function getTaskInfo() {
  try {
    const seasonInfo = await getSeasonInfo();
    if (!seasonInfo) {
      logger.error('跳过每日阅读');
      return false;
    }
    const {
      task15min,
      task30min
    } = getKeyTaskItem(seasonInfo.today_tasks);
    if (!task30min || !task15min) {
      logger.warn('未知异常');
      return false;
    }
    const task30minProgress = task30min.progress,
      task15minProgress = task15min.progress;
    if (task30minProgress === 30 && task15minProgress === 15) {
      logger.info('每日阅读任务已完成');
      return true;
    }
    const time = Math.max(30 - task30minProgress, 15 - task15minProgress);
    return {
      comicId: task15min === null || task15min === void 0 ? void 0 : task15min.comics[0].comic_id,
      time
    };
  } catch (error) {
    logger.error(`获取每日阅读进度异常：${error.message}`);
  }
  return false;
}
async function readManga(buffer, needTime) {
  let time = needTime;
  for (let index = 0; index < 3; index++) {
    logger.debug(`开始阅读漫画第${index + 1}轮`);
    const add = Math.ceil(time / 10);
    for (let count = 0; count < time * 2 + add; count++) {
      await sendRealtime(buffer);
      await apiDelay(1000);
    }
    await apiDelay(5000);
    const taskInfo = await getTaskInfo();
    if (isBoolean(taskInfo)) {
      return taskInfo;
    }
    time = taskInfo.time;
    if (time === needTime) break;
  }
  return false;
}
async function readMangaService(isNoLogin) {
  if (!TaskConfig.manga.read) {
    return;
  }
  logger.debug('开始每日阅读');
  try {
    const taskInfo = await getTaskInfo();
    if (isBoolean(taskInfo)) {
      return taskInfo;
    }
    const {
      comicId,
      time
    } = taskInfo;
    const eplist = await getMangaEpList(comicId);
    if (!eplist) {
      return;
    }
    const {
      createDataFlow
    } = await (await Promise.resolve().then(function () { return manga; })).wasmInit();
    const buffer = createDataFlow(comicId + '', eplist[0].id + '', TaskConfig.USERID + '');
    const result = await readManga(Buffer.from(buffer), time);
    if (isNoLogin) {
      logger.info('非登录状态，不判断阅读结果');
      return;
    }
    if (!result) {
      logger.warn('每日漫画阅读未完成×_×');
    }
  } catch (error) {
    logger.error(`每日漫画阅读任务异常`, error);
  }
}

async function noLoginTask() {
  logger.info('账号未登录，将仅执行无需登录的任务');
  if (TaskConfig.function.mangaTask) {
    logger.info('----【漫画阅读】----');
    await readMangaService(true);
  }
}

async function dailyTasks(cb, ...cbArg) {
  const {
    getBiliTasks
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
    printVersion
  } = await Promise.resolve().then(function () { return version; });
  await Logger.init();
  await printVersion();
  try {
    const {
      beforeTask,
      loginTask
    } = await getBiliTasks(['beforeTask', 'loginTask']);
    await beforeTask();
    await loginTask();
  } catch (error) {
    logger.error(`登录失败:`, error);
    await noLoginTask();
    await Logger.push('【登录失败】');
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
  await Logger.push('每日完成');
  return '完成';
}

function getPayload(slsType, event) {
  return slsType === 'scf' ? event.Message : event.payload;
}
async function getUpdateTrigger(slsType, event) {
  const caller = slsType === 'scf' ? (await Promise.resolve().then(function () { return updateScfTrigger$1; })).default : (await Promise.resolve().then(function () { return updateFcTrigger$1; })).default;
  return slsOptions => caller(event, slsOptions);
}
async function getClinet(slsType) {
  if (slsType === 'scf') {
    return (await Promise.resolve().then(function () { return updateScfTrigger$1; })).scfClient;
  }
  return (await Promise.resolve().then(function () { return updateFcTrigger$1; })).fcClient;
}
async function initClient(slsType, context) {
  const client = await getClinet(slsType);
  if (!client) {
    return false;
  }
  return client.init(context);
}
class DailyHandler {
  init({
    event,
    context,
    slsType
  }) {
    this.context = context;
    this.event = event;
    this.slsType = slsType;
    this.payload = getPayload(slsType, event);
    initClient(slsType, context);
    return this;
  }
  async run() {
    let message;
    try {
      if (this.payload) {
        message = JSON5.parse(this.payload);
      }
    } catch {}
    if (message && message.lastTime === getPRCDate().getDate().toString()) {
      return '今日重复执行';
    }
    const updateTrigger = await getUpdateTrigger(this.slsType, this.event);
    return await dailyTasks(updateTrigger);
  }
}
const dailyHandler = new DailyHandler();

var index$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getUpdateTrigger: getUpdateTrigger,
	getClinet: getClinet,
	dailyHandler: dailyHandler
});

const biliTaskArray = [['beforeTask', () => Promise.resolve().then(function () { return beforeTask$1; })], ['loginTask', () => Promise.resolve().then(function () { return loginTask$1; })], ['exchangeCoupon', () => Promise.resolve().then(function () { return exchangeCoupon$1; })], ['liveSignTask', () => Promise.resolve().then(function () { return liveSignTask$1; })], ['addCoins', () => Promise.resolve().then(function () { return addCoins$1; })], ['bigPoint', () => Promise.resolve().then(function () { return bigPoint$1; })], ['shareAndWatch', () => Promise.resolve().then(function () { return shareAndWatch$1; })], ['silver2Coin', () => Promise.resolve().then(function () { return silver2Coin$1; })], ['mangaSign', () => Promise.resolve().then(function () { return mangaSign$1; })], ['mangaTask', () => Promise.resolve().then(function () { return mangaTask$1; })], ['supGroupSign', () => Promise.resolve().then(function () { return supGroupSign$1; })], ['liveSendMessage', () => Promise.resolve().then(function () { return liveSendMessage$1; })], ['getVipPrivilege', () => Promise.resolve().then(function () { return getVipPrivilege$1; })], ['useCouponBp', () => Promise.resolve().then(function () { return useCouponBp$1; })], ['charging', () => Promise.resolve().then(function () { return charging$1; })], ['matchGame', () => Promise.resolve().then(function () { return matchGame$1; })], ['giveGift', () => Promise.resolve().then(function () { return giveGift$1; })], ['liveIntimacy', () => Promise.resolve().then(function () { return liveIntimacy$1; })], ['batchUnfollow', () => Promise.resolve().then(function () { return batchUnfollow$1; })], ['liveLottery', () => Promise.resolve().then(function () { return liveLottery$1; })], ['liveRedPack', () => Promise.resolve().then(function () { return liveRedPack$1; })], ['dailyBattery', () => Promise.resolve().then(function () { return dailyBattery$1; })], ['activityLottery', () => Promise.resolve().then(function () { return activityLottery$1; })], ['liveFamine', () => Promise.resolve().then(function () { return liveFamine$1; })], ['judgement', () => Promise.resolve().then(function () { return judgement$1; })]];
const biliTasks = new Map(biliTaskArray);
async function getBiliTask(funcName) {
  const biliTask = biliTasks.get(funcName);
  if (!biliTask) {
    return () => Promise.resolve(0);
  }
  return (await biliTask()).default;
}
async function getBiliTasks(funcNames) {
  const tasks = {};
  for (const funcName of funcNames) {
    const biliTask = biliTasks.get(funcName);
    if (!biliTask) continue;
    tasks[funcName] = (await biliTask()).default;
  }
  return tasks;
}
function getInputBiliTask(taskNameStr) {
  const taskNameArr = taskNameStr.split(',');
  const taskArr = [biliTaskArray[0][1]];
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
    Logger,
    clearLogs
  } = await Promise.resolve().then(function () { return index$3; });
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
  if (taskNameStr.includes('noPush')) {
    logger.info(`已设置不推送通知`);
  } else {
    await Logger.push('自定义任务完成');
  }
  clearLogs();
}

var index = /*#__PURE__*/Object.freeze({
	__proto__: null,
	biliTaskArray: biliTaskArray,
	biliTasks: biliTasks,
	'default': biliTasks,
	getBiliTask: getBiliTask,
	getBiliTasks: getBiliTasks,
	getInputBiliTask: getInputBiliTask,
	runInputBiliTask: runInputBiliTask
});

// eslint-disable-next-line es/no-typed-arrays -- safe
var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

var fails$1 = fails$d;

var correctPrototypeGetter = !fails$1(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$1 = hasOwnProperty_1;
var isCallable$1 = isCallable$g;
var toObject$1 = toObject$6;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype$1 = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject$1(O);
  if (hasOwn$1(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$1(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype$1 : null;
};

var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;
var DESCRIPTORS = descriptors;
var global$2 = global$e;
var isCallable = isCallable$g;
var isObject = isObject$a;
var hasOwn = hasOwnProperty_1;
var classof$1 = classof$5;
var tryToString$2 = tryToString$4;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$6;
var defineBuiltIn = defineBuiltIn$2;
var defineProperty = objectDefineProperty.f;
var isPrototypeOf$2 = objectIsPrototypeOf;
var getPrototypeOf$1 = objectGetPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var wellKnownSymbol$3 = wellKnownSymbol$b;
var uid = uid$3;
var InternalStateModule = internalState;

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array$1 = global$2.Int8Array;
var Int8ArrayPrototype$1 = Int8Array$1 && Int8Array$1.prototype;
var Uint8ClampedArray$1 = global$2.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
var TypedArray = Int8Array$1 && getPrototypeOf$1(Int8Array$1);
var TypedArrayPrototype = Int8ArrayPrototype$1 && getPrototypeOf$1(Int8ArrayPrototype$1);
var ObjectPrototype = Object.prototype;
var TypeError$1 = global$2.TypeError;

var TO_STRING_TAG$1 = wellKnownSymbol$3('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf$1 && classof$1(global$2.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof$1(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = getPrototypeOf$1(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof$1(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray$4 = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError$1('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf$1 || isPrototypeOf$2(TypedArray, C))) return C;
  throw TypeError$1(tryToString$2(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod$4 = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global$2[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype$1[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf$1) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$2[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global$2[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global$2[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global$2[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError$1('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global$2[NAME]) setPrototypeOf$1(global$2[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global$2[NAME]) setPrototypeOf$1(global$2[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf$1(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf$1(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG$1)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG$1, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global$2[NAME]) {
    createNonEnumerableProperty$1(global$2[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray$4,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod$4,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};

var ArrayBufferViewCore$3 = arrayBufferViewCore;
var lengthOfArrayLike$3 = lengthOfArrayLike$7;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$6;

var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
var exportTypedArrayMethod$3 = ArrayBufferViewCore$3.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod$3('at', function at(index) {
  var O = aTypedArray$3(this);
  var len = lengthOfArrayLike$3(O);
  var relativeIndex = toIntegerOrInfinity$1(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});

var uncurryThis = functionUncurryThis;
var aCallable$3 = aCallable$5;
var NATIVE_BIND = functionBindNative;

var bind$2 = uncurryThis(uncurryThis.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$3(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$2(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var bind$1 = functionBindContext;
var IndexedObject = indexedObject;
var toObject = toObject$6;
var lengthOfArrayLike$2 = lengthOfArrayLike$7;

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE == 1;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind$1(callbackfn, that);
    var index = lengthOfArrayLike$2(self);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

var arrayIterationFromLast = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod(1)
};

var ArrayBufferViewCore$2 = arrayBufferViewCore;
var $findLast = arrayIterationFromLast.findLast;

var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
var exportTypedArrayMethod$2 = ArrayBufferViewCore$2.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod$2('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray$2(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var ArrayBufferViewCore$1 = arrayBufferViewCore;
var $findLastIndex = arrayIterationFromLast.findLastIndex;

var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
var exportTypedArrayMethod$1 = ArrayBufferViewCore$1.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod$1('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray$1(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});

var toIntegerOrInfinity = toIntegerOrInfinity$6;

var $RangeError$1 = RangeError;

var toPositiveInteger$1 = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw $RangeError$1("The argument can't be less than 0");
  return result;
};

var toPositiveInteger = toPositiveInteger$1;

var $RangeError = RangeError;

var toOffset$1 = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw $RangeError('Wrong offset');
  return offset;
};

var global$1 = global$e;
var call$4 = functionCall;
var ArrayBufferViewCore = arrayBufferViewCore;
var lengthOfArrayLike$1 = lengthOfArrayLike$7;
var toOffset = toOffset$1;
var toIndexedObject = toObject$6;
var fails = fails$d;

var RangeError$1 = global$1.RangeError;
var Int8Array = global$1.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call$4($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});

// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
  var array = new Int8Array(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call$4($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike$1(src);
  var index = 0;
  if (len + offset > length) throw RangeError$1('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

async function instantiate(module, imports = {}) {
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
      'console.log': console.log
    })
  };
  const {
    instance: {
      exports
    }
  } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    createDataFlow(mangaId, mangaNum, u) {
      mangaId = __retain(__lowerString(mangaId) || __notnull());
      mangaNum = __retain(__lowerString(mangaNum) || __notnull());
      u = __lowerString(u) || __notnull();
      try {
        return __liftArray(pointer => new Int32Array(memory.buffer)[pointer >>> 2], 2, exports.createDataFlow(mangaId, mangaNum, u) >>> 0);
      } finally {
        __release(mangaId);
        __release(mangaNum);
      }
    }
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let start = pointer >>> 1,
      string = '';
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
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
      dataStart = memoryU32[pointer + 4 >>> 2],
      length = memoryU32[pointer + 12 >>> 2],
      values = new Array(length);
    for (let i = 0; i < length; ++i) values[i] = liftElement(dataStart + (i << align >>> 0));
    return values;
  }
  const refcounts = new Map();
  function __retain(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount) refcounts.set(pointer, refcount + 1);else refcounts.set(exports.__pin(pointer), 1);
    }
    return pointer;
  }
  function __release(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount === 1) exports.__unpin(pointer), refcounts.delete(pointer);else if (refcount) refcounts.set(pointer, refcount - 1);else throw Error(`invalid refcount '${refcount}' for reference '${pointer}'`);
    }
  }
  function __notnull() {
    throw TypeError('value must not be null');
  }
  return adaptedExports;
}
async function wasmInit() {
  return await instantiate(Buffer.from(`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IAByAGEAZABpAHgAIABhAHIAZwB1AG0AZQBuAHQAIABtAHUAcwB0ACAAYgBlACAAYgBlAHQAdwBlAGUAbgAgADIAIABhAG4AZAAgADMANgBB3CsLATwAQegrCy0BAAAAJgAAAH4AbABpAGIALwB1AHQAaQBsAC8AbgB1AG0AYgBlAHIALgB0AHMAQZwsCwEcAEGoLAsJAQAAAAIAAAAwAEG8LAuPAzAAMAAwADEAMAAyADAAMwAwADQAMAA1ADAANgAwADcAMAA4ADAAOQAxADAAMQAxADEAMgAxADMAMQA0ADEANQAxADYAMQA3ADEAOAAxADkAMgAwADIAMQAyADIAMgAzADIANAAyADUAMgA2ADIANwAyADgAMgA5ADMAMAAzADEAMwAyADMAMwAzADQAMwA1ADMANgAzADcAMwA4ADMAOQA0ADAANAAxADQAMgA0ADMANAA0ADQANQA0ADYANAA3ADQAOAA0ADkANQAwADUAMQA1ADIANQAzADUANAA1ADUANQA2ADUANwA1ADgANQA5ADYAMAA2ADEANgAyADYAMwA2ADQANgA1ADYANgA2ADcANgA4ADYAOQA3ADAANwAxADcAMgA3ADMANwA0ADcANQA3ADYANwA3ADcAOAA3ADkAOAAwADgAMQA4ADIAOAAzADgANAA4ADUAOAA2ADgANwA4ADgAOAA5ADkAMAA5ADEAOQAyADkAMwA5ADQAOQA1ADkANgA5ADcAOQA4ADkAOQBBzC8LAhwEAEHYLwuHCAEAAAAABAAAMAAwADAAMQAwADIAMAAzADAANAAwADUAMAA2ADAANwAwADgAMAA5ADAAYQAwAGIAMABjADAAZAAwAGUAMABmADEAMAAxADEAMQAyADEAMwAxADQAMQA1ADEANgAxADcAMQA4ADEAOQAxAGEAMQBiADEAYwAxAGQAMQBlADEAZgAyADAAMgAxADIAMgAyADMAMgA0ADIANQAyADYAMgA3ADIAOAAyADkAMgBhADIAYgAyAGMAMgBkADIAZQAyAGYAMwAwADMAMQAzADIAMwAzADMANAAzADUAMwA2ADMANwAzADgAMwA5ADMAYQAzAGIAMwBjADMAZAAzAGUAMwBmADQAMAA0ADEANAAyADQAMwA0ADQANAA1ADQANgA0ADcANAA4ADQAOQA0AGEANABiADQAYwA0AGQANABlADQAZgA1ADAANQAxADUAMgA1ADMANQA0ADUANQA1ADYANQA3ADUAOAA1ADkANQBhADUAYgA1AGMANQBkADUAZQA1AGYANgAwADYAMQA2ADIANgAzADYANAA2ADUANgA2ADYANwA2ADgANgA5ADYAYQA2AGIANgBjADYAZAA2AGUANgBmADcAMAA3ADEANwAyADcAMwA3ADQANwA1ADcANgA3ADcANwA4ADcAOQA3AGEANwBiADcAYwA3AGQANwBlADcAZgA4ADAAOAAxADgAMgA4ADMAOAA0ADgANQA4ADYAOAA3ADgAOAA4ADkAOABhADgAYgA4AGMAOABkADgAZQA4AGYAOQAwADkAMQA5ADIAOQAzADkANAA5ADUAOQA2ADkANwA5ADgAOQA5ADkAYQA5AGIAOQBjADkAZAA5AGUAOQBmAGEAMABhADEAYQAyAGEAMwBhADQAYQA1AGEANgBhADcAYQA4AGEAOQBhAGEAYQBiAGEAYwBhAGQAYQBlAGEAZgBiADAAYgAxAGIAMgBiADMAYgA0AGIANQBiADYAYgA3AGIAOABiADkAYgBhAGIAYgBiAGMAYgBkAGIAZQBiAGYAYwAwAGMAMQBjADIAYwAzAGMANABjADUAYwA2AGMANwBjADgAYwA5AGMAYQBjAGIAYwBjAGMAZABjAGUAYwBmAGQAMABkADEAZAAyAGQAMwBkADQAZAA1AGQANgBkADcAZAA4AGQAOQBkAGEAZABiAGQAYwBkAGQAZABlAGQAZgBlADAAZQAxAGUAMgBlADMAZQA0AGUANQBlADYAZQA3AGUAOABlADkAZQBhAGUAYgBlAGMAZQBkAGUAZQBlAGYAZgAwAGYAMQBmADIAZgAzAGYANABmADUAZgA2AGYANwBmADgAZgA5AGYAYQBmAGIAZgBjAGYAZABmAGUAZgBmAEHsNwsBXABB+DcLTwEAAABIAAAAMAAxADIAMwA0ADUANgA3ADgAOQBhAGIAYwBkAGUAZgBnAGgAaQBqAGsAbABtAG4AbwBwAHEAcgBzAHQAdQB2AHcAeAB5AHoAQcw4CwEcAEHsOAsBHABB+DgLCQEAAAACAAAAMQBBjDkLARwAQZg5CwkHAAAACAAAAAIAQaw5CwF8AEG4OQtlAQAAAF4AAABFAGwAZQBtAGUAbgB0ACAAdAB5AHAAZQAgAG0AdQBzAHQAIABiAGUAIABuAHUAbABsAGEAYgBsAGUAIABpAGYAIABhAHIAcgBhAHkAIABpAHMAIABoAG8AbABlAHkAQaw6CwEcAEG4OgsJBwAAAAgAAAADAEHMOgsBHABB2DoLCQYAAAAIAAAABABB7DoLARwAQfg6CwkIAAAACAAAAAUAQYw7CwE8AEGYOwsxAQAAACoAAABPAGIAagBlAGMAdAAgAGEAbAByAGUAYQBkAHkAIABwAGkAbgBuAGUAZABBzDsLATwAQdg7Cy8BAAAAKAAAAE8AYgBqAGUAYwB0ACAAaQBzACAAbgBvAHQAIABwAGkAbgBuAGUAZABBkDwLDQkAAAAgAAAAAAAAACAAQaw8CxICCQAAAAAAABAJggAAAAAAAkEAJBBzb3VyY2VNYXBwaW5nVVJMEi4vcmVsZWFzZS53YXNtLm1hcA==`, 'base64'));
}

var manga = /*#__PURE__*/Object.freeze({
	__proto__: null,
	wasmInit: wasmInit
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

var iterators = {};

var wellKnownSymbol$2 = wellKnownSymbol$b;
var Iterators$1 = iterators;

var ITERATOR$1 = wellKnownSymbol$2('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$1] === it);
};

var classof = classof$5;
var getMethod$1 = getMethod$4;
var isNullOrUndefined = isNullOrUndefined$4;
var Iterators = iterators;
var wellKnownSymbol$1 = wellKnownSymbol$b;

var ITERATOR = wellKnownSymbol$1('iterator');

var getIteratorMethod$2 = function (it) {
  if (!isNullOrUndefined(it)) return getMethod$1(it, ITERATOR)
    || getMethod$1(it, '@@iterator')
    || Iterators[classof(it)];
};

var call$3 = functionCall;
var aCallable$2 = aCallable$5;
var anObject$2 = anObject$9;
var tryToString$1 = tryToString$4;
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
var tryToString = tryToString$4;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike = lengthOfArrayLike$7;
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
var createNonEnumerableProperty = createNonEnumerableProperty$6;
var createPropertyDescriptor = createPropertyDescriptor$4;
var clearErrorStack = errorStackClear;
var installErrorCause = installErrorCause$2;
var iterate$1 = iterate$2;
var normalizeStringArgument = normalizeStringArgument$2;
var wellKnownSymbol = wellKnownSymbol$b;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Error = Error;
var push$1 = [].push;

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
  iterate$1(errors, push$1, { that: errorsArray });
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
  let version = 'v0.6.221113';
  if (version.includes('.')) {
    logger.info(`当前版本【v0.6.221113】`);
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
class SCF {
  params = {
    FunctionName: '',
    TriggerName: '',
    Type: 'timer',
    TriggerDesc: '',
    Qualifier: '$DEFAULT'
  };
  async init(context) {
    var _process$env$TENCENT_, _process$env$TENCENT_2;
    const sdk = await getSDK$1();
    if (!sdk) {
      return false;
    }
    this.params.FunctionName = context.function_name;
    const clientConfig = {
      credential: {
        secretId: (_process$env$TENCENT_ = process.env.TENCENT_SECRET_ID) === null || _process$env$TENCENT_ === void 0 ? void 0 : _process$env$TENCENT_.trim(),
        secretKey: (_process$env$TENCENT_2 = process.env.TENCENT_SECRET_KEY) === null || _process$env$TENCENT_2 === void 0 ? void 0 : _process$env$TENCENT_2.trim()
      },
      region: context.tencentcloud_region,
      profile: {
        httpProfile: {
          endpoint: 'scf.tencentcloudapi.com'
        }
      }
    };
    const ScfClient = sdk.scf.v20180416.Client;
    this.client = new ScfClient(clientConfig);
    return this.client;
  }
  async deleteTrigger(TriggerName) {
    try {
      var _this$client;
      return await ((_this$client = this.client) === null || _this$client === void 0 ? void 0 : _this$client.DeleteTrigger({
        ...this.params,
        TriggerName: TriggerName || this.params.TriggerName
      }));
    } catch ({
      code,
      message
    }) {
      logger.warn(`删除trigger失败 ${code} => ${message}`);
      return false;
    }
  }
  async getHasTrigger(triggerName) {
    try {
      var _this$client2;
      const {
        Triggers
      } = (await ((_this$client2 = this.client) === null || _this$client2 === void 0 ? void 0 : _this$client2.ListTriggers({
        FunctionName: this.params.FunctionName
      }))) || {};
      const triggerIndex = Triggers === null || Triggers === void 0 ? void 0 : Triggers.findIndex(trigger => trigger.TriggerName === triggerName);
      return triggerIndex !== -1;
    } catch ({
      code,
      message
    }) {
      logger.error(`获取trigger失败 ${code} => ${message}`);
      return false;
    }
  }
  async createTrigger(params, customArg = {}) {
    const today = getPRCDate();
    const CustomArgument = JSON.stringify({
      ...customArg,
      lastTime: today.getDate().toString()
    });
    try {
      var _this$client3;
      return await ((_this$client3 = this.client) === null || _this$client3 === void 0 ? void 0 : _this$client3.CreateTrigger({
        ...this.params,
        ...params,
        CustomArgument
      }));
    } catch ({
      code,
      message
    }) {
      logger.error(`创建trigger失败 ${code} => ${message}`);
      return false;
    }
  }
}
const scfClient = new SCF();
async function updateScfTrigger (event, {
  customArg,
  triggerDesc,
  triggerName
} = {}) {
  if (!event.TriggerName && !triggerName) {
    return false;
  }
  if (!process.env.TENCENT_SECRET_ID || !process.env.TENCENT_SECRET_KEY) {
    _logger.info('环境变量不存在TENCENT_SECRET_ID和TENCENT_SECRET_KEY');
    return false;
  }
  const TRIGGER_NAME = triggerName || event.TriggerName || 'daily';
  if (!scfClient.client) return false;
  async function aSingleUpdate() {
    const runTime = triggerDesc || randomDailyRunTime(TaskConfig.dailyRunTime, 'scf');
    const params = {
      TriggerName: TRIGGER_NAME,
      TriggerDesc: runTime.value
    };
    const hasTrigger = await scfClient.getHasTrigger(TRIGGER_NAME);
    logger.info(`修改时间为：${runTime.string}`);
    if (hasTrigger) {
      const deleteResult = await scfClient.deleteTrigger(TRIGGER_NAME);
      if (!deleteResult) {
        return false;
      }
    }
    return !!(await scfClient.createTrigger(params, customArg));
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
	SCF: SCF,
	scfClient: scfClient,
	'default': updateScfTrigger
});

async function getSDK() {
  try {
    return await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@alicloud/fc2')); });
  } catch {
    logger.warn('@alicloud/fc2 not found，运行 yarn add @alicloud/fc2');
  }
}
class FC {
  params = {
    TriggerName: '',
    TriggerDesc: ''
  };
  async init(context, event) {
    var _process$env$ALI_SECR, _process$env$ALI_SECR2;
    const sdk = await getSDK();
    if (!sdk) {
      return false;
    }
    const clientConfig = {
      accessKeyID: (_process$env$ALI_SECR = process.env.ALI_SECRET_ID) === null || _process$env$ALI_SECR === void 0 ? void 0 : _process$env$ALI_SECR.trim(),
      accessKeySecret: (_process$env$ALI_SECR2 = process.env.ALI_SECRET_KEY) === null || _process$env$ALI_SECR2 === void 0 ? void 0 : _process$env$ALI_SECR2.trim(),
      region: context.region
    };
    this.functionName = context.function.name;
    this.sericeName = context.service.name;
    this.params.TriggerName = (event === null || event === void 0 ? void 0 : event.triggerName) || '';
    const FcClient = sdk.default;
    this.client = new FcClient(context.accountId, clientConfig);
    return this.client;
  }
  async updateTrigger(cron, customArg = {}, triggerName) {
    const today = getPRCDate();
    const cronExpression = `CRON_TZ=Asia/Shanghai ${cron}`;
    try {
      var _this$client;
      return await ((_this$client = this.client) === null || _this$client === void 0 ? void 0 : _this$client.updateTrigger(this.sericeName, this.functionName, triggerName || this.params.TriggerName, {
        triggerConfig: {
          cronExpression,
          payload: JSON.stringify({
            ...customArg,
            lastTime: today.getDate().toString()
          })
        }
      }));
    } catch (error) {
      logger.error(`更新trigger失败 ${error.message}`);
      return false;
    }
  }
  async createTrigger(params, customArg = {}) {
    var _this$client2;
    params = {
      ...this.params,
      ...params
    };
    const cronExpression = `CRON_TZ=Asia/Shanghai ${params.TriggerDesc}`;
    return await ((_this$client2 = this.client) === null || _this$client2 === void 0 ? void 0 : _this$client2.createTrigger(this.sericeName, this.functionName, {
      triggerName: params.TriggerName,
      triggerType: 'timer',
      triggerConfig: {
        cronExpression,
        enable: true,
        payload: JSON.stringify({
          ...customArg,
          lastTime: getPRCDate().getDate().toString()
        })
      }
    }));
  }
  deleteTrigger(TriggerName) {
    var _this$client3;
    return (_this$client3 = this.client) === null || _this$client3 === void 0 ? void 0 : _this$client3.deleteTrigger(this.sericeName, this.functionName, TriggerName || this.params.TriggerName);
  }
}
const fcClient = new FC();
async function updateFcTrigger (event, {
  customArg,
  triggerDesc,
  triggerName
} = {}) {
  if (!event.triggerName && !triggerName) {
    return false;
  }
  if (!process.env.ALI_SECRET_ID || !process.env.ALI_SECRET_KEY) {
    _logger.info('环境变量不存在ALI_SECRET_ID和ALI_SECRET_KEY');
    return false;
  }
  if (!fcClient.client) return false;
  async function aSingleUpdate() {
    const runTime = triggerDesc || randomDailyRunTime(TaskConfig.dailyRunTime, 'fc');
    logger.info(`修改时间为：${runTime.string}`);
    return !!(await fcClient.updateTrigger(runTime.value, customArg, triggerName || event.triggerName));
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
	FC: FC,
	fcClient: fcClient,
	'default': updateFcTrigger
});

async function accessKey2Cookie(access_key) {
  const cookieJar = new CookieJar();
  await defHttp.get(`https://passport.bilibili.com/api/login/sso?${appSignString({
    access_key,
    gourl: 'https://account.bilibili.com/account/home'
  })}`, {
    cookieJar,
    requestOptions: {
      withCredentials: true
    }
  });
  return cookieJar.getCookieString();
}
async function getAcgTvLogin(cookieJar) {
  try {
    const {
      data
    } = await defHttp.get('https://passport.bilibili.com/login/app/third?appkey=27eb53fc9058f8c3&api=http://link.acg.tv/forum.php&sign=67ec798004373253d60114caaad89a8c', {
      cookieJar
    });
    return data === null || data === void 0 ? void 0 : data.confirm_uri;
  } catch (error) {
    defLogger.error(error);
  }
}
async function cookie2AccessKey(cookie) {
  const cookieJar = new CookieJar(cookie);
  const confirm_uri = await getAcgTvLogin(cookieJar);
  if (!confirm_uri) {
    return;
  }
  try {
    await defHttp.get(confirm_uri, {
      cookieJar
    });
  } catch (error) {
    if (error instanceof got.RequestError) {
      var _error$request, _url$split;
      const url = (_error$request = error.request) === null || _error$request === void 0 ? void 0 : _error$request.requestUrl;
      if (!url) {
        return;
      }
      const usp = new URLSearchParams((_url$split = url.split('?')) === null || _url$split === void 0 ? void 0 : _url$split[1]);
      return usp.get('access_key');
    }
  }
}
async function getNewCookie$1(cookie) {
  const access_key = await cookie2AccessKey(cookie);
  if (!access_key) {
    defLogger.error('获取 access_key 失败！');
    return;
  }
  return await accessKey2Cookie(access_key);
}

async function getNewCookie() {
  const day = TaskConfig.createCookieDay;
  if (!day || day < 1) {
    return false;
  }
  const btJonPath = getBtJonPath();
  if (!btJonPath) {
    return false;
  }
  const btJob = readJsonFile(btJonPath);
  if (!isNeedCreateCookie(btJob === null || btJob === void 0 ? void 0 : btJob.lastNewCookie, day)) {
    return;
  }
  const newCookie = await getNewCookie$1(TaskConfig.cookie);
  if (!newCookie) {
    return;
  }
  TaskConfig.cookie = newCookie;
  logger.debug('cookie 使用新 cookie');
  writeJsonFile(btJonPath, {
    lastNewCookie: Date.now()
  });
}
function getBtJonPath() {
  if (!process.env.__BT_CONFIG_PATH__) {
    return undefined;
  }
  const configDir = path.dirname(process.env.__BT_CONFIG_PATH__);
  return path.resolve(configDir, 'bt_jobs.json');
}
function isNeedCreateCookie(timestamp, day) {
  if (!timestamp) {
    return true;
  }
  const dayDiff = (Date.now() - timestamp) / MS2DATE;
  return dayDiff > day;
}

async function beforeTask() {
  await getNewCookie();
}

var beforeTask$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': beforeTask
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
    logger.error(`[${TaskConfig.USERID}]登录错误 ${code} ${message}`);
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
    context_id: 13142548,
    context_type: 1,
    goods_id: 1,
    goods_num: couponBalance,
    goods_type: 2,
    ios_bp: 0,
    common_bp: pay_bp,
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT,
    visit_id: createVisitId()
  });
}
function exchangeStatus() {
  return liveApi.get('/xlive/revenue/v1/wallet/getStatus');
}
function getMyWallet() {
  return liveApi.get('/xlive/revenue/v1/wallet/myWallet?need_bp=1&need_metal=1&platform=pc');
}
function sendMessage(roomid, msg, dm_type) {
  const csrf = TaskConfig.BILIJCT;
  const csrf_token = csrf;
  msg || (msg = random(10).toString());
  const data = {
    bubble: 0,
    msg,
    color: 5566168,
    mode: 1,
    fontsize: 25,
    rnd: getUnixTime(),
    roomid,
    csrf,
    csrf_token
  };
  dm_type && (data.dm_type = dm_type);
  return liveApi.post('/msg/send', data);
}
function getFansMedalPanel(page = 1, pageSize = 50) {
  return liveApi.get(`xlive/app-ucenter/v1/fansMedal/panel?${appSignString({
    page,
    page_size: pageSize
  })}`);
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
  return liveApi.post(`/xlive/lottery-interface/v1/Anchor/Join`, {
    ...options,
    csrf: TaskConfig.BILIJCT,
    csrf_token: TaskConfig.BILIJCT,
    visit_id: createVisitId(),
    platform: 'pc'
  });
}
function checkRedPacket(roomId) {
  return liveApi.get(`/xlive/lottery-interface/v1/lottery/getLotteryInfoWeb?roomid=${roomId}`);
}
function joinRedPacket(params) {
  return liveApi.post(`/xlive/lottery-interface/v1/popularityRedPocket/RedPocketDraw`, {
    ...params,
    spm_id: '444.8.red_envelope.extract',
    jump_from: '26000',
    c_locale: 'en_US',
    device: 'android',
    mobi_app: 'android',
    platform: 'android',
    channel: 'xiaomi',
    version: '6.79.0',
    statistics: {
      appId: 1,
      platform: 3,
      version: '6.79.0',
      abtest: ''
    },
    session_id: '',
    csrf_token: TaskConfig.BILIJCT,
    csrf: TaskConfig.BILIJCT,
    visit_id: ''
  }, {
    headers: {
      'user-agent': TaskConfig.mobileUA
    }
  });
}
function getFollowLiveRoomList(page = 1, page_size = 9) {
  return liveApi.get(`/xlive/web-ucenter/user/following?page=${page}&page_size=${page_size}`);
}
function getDanmuInfo(room_id) {
  return liveApi.get(`xlive/web-room/v1/index/getDanmuInfo?id=${room_id}`);
}
function getOnlineGoldRank(ruid, room_id) {
  return liveApi.get(`xlive/general-interface/v1/rank/getOnlineGoldRank?ruid=${ruid}&roomId=${room_id}&page=1&pageSize=1`);
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
function getTodayAccountExp() {
  return biliHttp.get('https://www.bilibili.com/plus/account/exp.php');
}

const TypeEnum = {
  video: '视频',
  audio: '音乐',
  article: '专栏',
  视频: 'video',
  音乐: 'audio',
  专栏: 'article'
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
      total: video,
      ...getPageInfo(30, tempNum)
    };
  }
  const mid = video + audio;
  tempNum = num - video;
  if (num < mid) {
    return {
      coinType: TypeEnum.audio,
      total: audio,
      ...getPageInfo(30, tempNum)
    };
  }
  tempNum = num - mid;
  return {
    coinType: TypeEnum.article,
    total: article,
    ...getPageInfo(12, tempNum)
  };
  function getPageInfo(ps, tempNum) {
    return {
      page: getPageNum(ps, tempNum + 1),
      index: tempNum % ps
    };
  }
}
async function getAidByFollowing(types, special = false) {
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
      return await getIdByRandom(mid, types);
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
async function getAidByCustomizeUp(types) {
  const customizeUp = TaskConfig.coin.customizeUp;
  if (customizeUp.length === 0) {
    return {
      code: 1,
      msg: '没有自定义up主'
    };
  }
  return await getIdByRandom(getRandomItem(customizeUp), types);
}
async function getIdByRandom(mid, types) {
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
    const randmonNumData = getRandmonNumData(data, types);
    if (!randmonNumData) {
      return {
        msg: '用户没有投稿',
        code: 1
      };
    }
    const handleData = await getRandomInfo(mid, randmonNumData);
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
function getRandmonNumData(navData, types = []) {
  types = types.length === 0 ? ['video', 'audio', 'article'] : types;
  return getRandmonNum(['video', 'audio', 'article'].map(item => types.includes(item) ? navData[item] : 0));
}
async function getRandomInfo(mid, data) {
  const {
      coinType,
      page,
      index,
      total
    } = data,
    handle = {
      [TypeEnum.video]: getVideoByRandom,
      [TypeEnum.audio]: getAudioByRandom,
      [TypeEnum.article]: getArticleByRandom
    };
  return await handle[coinType](mid, page, index, total);
}
let countVideo = 0;
async function getVideoByRandom(mid, page, index, total) {
  if (countVideo >= 5) return {
    message: '获取 upperAccMatch 视频失败'
  };
  const {
    code,
    data,
    message
  } = await searchVideosByUpId(mid, 30, page);
  if (code) return {
    message
  };
  countVideo++;
  const {
    aid,
    title,
    author,
    copyright,
    mid: upperMid
  } = data.list.vlist[index];
  if (upperMid !== mid && TaskConfig.coin.upperAccMatch) {
    console.log('upperMid', upperMid, 'mid', mid);
    console.log(author, title, '不是指定up主的视频，跳过');
    const {
      page,
      index
    } = getRandmonNum([total, 0, 0]) || {
      page: 1,
      index: 0
    };
    return await getVideoByRandom(mid, page, index, total);
  }
  countVideo = 0;
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
function getAidBySpecialFollowing(types) {
  return getAidByFollowing(types, true);
}
const idFuncObject = {
  自定义UP: getAidByCustomizeUp,
  特别关注: getAidBySpecialFollowing,
  关注: getAidByFollowing,
  首页推荐: getAidByRecommend,
  分区排行: getAidByRegionRank
};
const idFuncArray = [];
TaskConfig.coin.src.forEach(name => idFuncArray.push([name, idFuncObject[name]]));
const idFuncMap = new Map(idFuncArray);
const aidFuncName = new class {
  srcs = TaskConfig.coin.src || [];
  value = this.srcs[0] || '首页推荐';
  next() {
    const index = this.srcs.indexOf(this.value) + 1;
    if (index === this.srcs.length) {
      return this.value = '首页推荐';
    }
    return this.value = this.srcs[index];
  }
}();
async function getAidByByPriority(types) {
  const idFunc = idFuncMap.get(aidFuncName.value);
  await apiDelay();
  return (idFunc === null || idFunc === void 0 ? void 0 : idFunc(types && types.map(el => TypeEnum[el]))) || getAidByRecommend();
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
  return (await getTodayAccountCoin()) || (await getTodayCoin()) || (await getTodayExpenseCoin()) || defCoin || 0;
}
async function getTodayCoin() {
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
async function getTodayAccountCoin() {
  try {
    const {
      number,
      code
    } = await getTodayAccountExp();
    if (code === 0) {
      return number / 10;
    }
  } catch (error) {
    logger.debug(`获取投币数量异常[exp.php] ${error.message}`);
  }
}
async function getTodayExpenseCoin() {
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
  console.log(code);
  console.log(msg);
  console.log(data);
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
  logger.debug(`当前稿件[${id}]不能再投币了`);
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
  logger.info(`给${aidFuncName.value}【${author}】的${coinType}：${id} 投币${coin}颗`);
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
  logger.warn(`给${aidFuncName.value}的${coinType} ${id} 投币失败 ${coinData.code} ${coinData.message}`);
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
    headers: {
      ...baseHeader,
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
async function getTaskStatus$1() {
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
  const taskStatus = await getTaskStatus$1();
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
    await apiDelay(isBoolean(cfgIsRetry) ? 20000 : cfgIsRetry * 1000);
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
    return await doDailyTask(await getTaskStatus$1());
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
  logger.warn(`今日获取积分【${todayPoint}】, 部分任务未成功 ×`);
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
    const biliav = await getAidByByPriority(['视频']);
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
    await shareComicService();
    await readMangaService();
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
  buvid = createBuvid(),
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
  const data = {
    ...baseData,
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
const liveLogger$2 = new Logger({
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
      } = await getFansMedalPanel(pageNumber + 1, 50);
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
    return !(blackList && (blackList.includes(room_info.room_id) || blackList.includes(medal.target_id)));
  }
  return whiteList.includes(room_info.room_id) || whiteList.includes(medal.target_id);
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
    liveLogger$2.info(`直播心跳成功 ${heartbeatParams.uname}（${countRef.value}/${needTime}）`);
  } catch (error) {
    liveLogger$2.error(error);
    logger.error(`直播间心跳异常 ${error.message}`);
  }
}
async function likeAndShare(fansMealList, doneNumber = 0) {
  const fansLength = fansMealList.length,
    skipNum = TaskConfig.intimacy.skipNum;
  if (skipNum >= 0 && fansLength === doneNumber && doneNumber > skipNum) {
    return;
  }
  for (let index = 0; index < fansLength; index++) {
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
      value: 0,
      increase: true
    };
  }
  return {
    value: Math.ceil(needFeed / 100) * 5 + 1,
    increase: today_feed < 200
  };
}
async function liveHeartPromise(resolve, roomList) {
  const retryLiveHeartOnce = await getOnceFunc(retryLiveHeart);
  for (const fansMedal of roomList) {
    const timerRef = {
      value: undefined
    };
    const runOptions = {
      fansMedal,
      options: getRandomOptions(),
      countRef: {
        value: 0
      },
      needTime: getLiveHeartNeedTime(fansMedal.medal),
      timerRef
    };
    run(runOptions);
    timerRef.value = setInterval(run, 60030, runOptions);
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
    await retryLiveHeartOnce();
  }
}
async function liveHeartPromiseSync(roomList) {
  await Promise.all(roomList.map(fansMedal => allLiveHeart(fansMedal, getRandomOptions(), {
    value: 0
  })));
  return await retryLiveHeart();
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
    liveLogger$2.verbose(`为【${nickName}】发送直播弹幕`);
    sendMessageResult = await sendOneMessage(roomid, nickName);
  }
  if (sendMessageResult !== SeedMessageResult.Success) {
    sendMessageFailList.set(roomid, fansMedal);
  }
  if (liveLike) {
    await apiDelay(100, 300);
    liveLogger$2.verbose(`为 [${nickName}] 直播间点赞`);
    await likeLive(roomid);
  }
  await apiDelay(11000, 16000);
}
async function retryLiveHeart() {
  if (!TaskConfig.intimacy.isRetryHeart) {
    return;
  }
  liveLogger$2.debug('尝试检查直播心跳');
  await liveIntimacyService();
}
async function liveIntimacyService() {
  const fansMealList = filterFansMedalList(await getFansMealList()),
    doneLength = fansMealList.filter(fans => {
      var _fans$medal;
      return ((_fans$medal = fans.medal) === null || _fans$medal === void 0 ? void 0 : _fans$medal.today_feed) > 200;
    }).length;
  await Promise.allSettled([likeAndShare(fansMealList, doneLength), liveHeart(fansMealList)]);
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
    const stateList = list.filter(item => item.state === 0 && [1, 3].includes(item.type));
    if (stateList.length === 0) {
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
      logger.error(`${name}领取失败，需要手机验证（可能异地登陆），跳过`);
      return true;
    }
    if (code !== 0) {
      logger.info(`领取${name}失败：${code} ${message}`);
    }
    logger.info(`领取${name}成功！`);
    return true;
  } catch (error) {
    logger.error(`领取权益出现异常：${error.message}`);
    logger.error(error);
  }
  return false;
}
async function getPrivilege(type) {
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
      logger.info('暂无可领取权益（除保留）');
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

async function init$1() {
  const nowTime = getPRCDate(),
    today = nowTime.getDate(),
    monthHasDays = getMonthHasDays(nowTime);
  let presetTime = TaskConfig.couponBalance.presetTime;
  if (!isArray(presetTime)) {
    presetTime = [presetTime];
  }
  const isInPresetTime = presetTime.some(time => time === today) || presetTime.length === 0;
  const isLastDay = monthHasDays === today;
  if (!isInPresetTime && !isLastDay) {
    logger.info(`不在预设时间，不符合条件`);
    return false;
  }
  await updateNav();
  await apiDelay();
  const useType = TaskConfig.couponBalance.use,
    bp_num = TaskModule.couponBalance;
  if (useType === '充电' && bp_num < 2) {
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
  if (!(await init$1())) {
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
  if (!(await init$1())) {
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
    return list.filter(isExpiredFilter);
  } catch (error) {
    if (!countGetExpiredGift++) {
      await getExpiredGift();
    } else {
      return null;
    }
  }
}
function isExpiredFilter(gift) {
  if (gift.expire_at <= 0) {
    return false;
  }
  const isExpire = (gift.expire_at * 1000 - new Date().getTime()) / MS2DATE < EXPIRE_DATE;
  const {
    id,
    name,
    all
  } = TaskConfig.gift;
  if (all) return isExpire;
  const isSimple = id.includes(gift.gift_id) || name.includes(gift.gift_name);
  if (!isSimple && isExpire) {
    logger.info(`${gift.gift_name} 即将过期请尽快投喂`);
  }
  return isSimple ? isExpire : false;
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
        logger.info(`成功给 【${name}】 投喂${gift.gift_name}`);
      });
    } catch {
      logger.warn(`向【${name}】投喂[${gift.gift_name}]，异常`);
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
async function updateSession(followUps, actFollowMsg) {
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
      await handleSession(session, actFollowMsg);
    }
  } catch (error) {
    logger.error(`更新会话异常：${error.message}`);
  }
  if (sessionList.length >= 19) {
    await updateSession(followUps, actFollowMsg);
  }
}
async function handleSession(session, actFollowMsg) {
  switch (actFollowMsg) {
    case 'del':
    case 'delete':
      await deleteSession(session);
      break;
    case 'read':
    default:
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

const tagLogger = new Logger({
  console: 'debug',
  file: 'warn',
  push: 'warn'
}, 'live');
let unCount = 0;
async function getLastFollow() {
  try {
    const {
      data,
      code
    } = await getFollowingsByTag(1, 1, 0);
    if (code !== 0) {
      logger.warn(`获取最后一个关注失败: ${code}`);
    }
    return data === null || data === void 0 ? void 0 : data[0];
  } catch (error) {
    logger.warn(error);
  }
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
async function unFollowTag(tagName = '天选时刻', restNum = -1) {
  const tag = await getTag(tagName);
  if (!tag) {
    return restNum;
  }
  await apiDelay();
  if (!tag.tagid) {
    return restNum;
  }
  try {
    const {
      data,
      code
    } = await getFollowingsByTag(1, 20, tag.tagid);
    if (code !== 0 || !data.length) {
      return restNum;
    }
    restNum = await unFollowUsers(data, restNum);
    if (data.length < 20) {
      return restNum;
    }
    if (restNum !== 0) {
      return await unFollowTag(tagName, restNum);
    }
  } catch (error) {
    logger.warn(`取关分组异常: ${error.message}`);
  }
  return restNum;
}
async function unFollowUsers(users, restNum = -1) {
  const [unNum, sleepTime] = TaskConfig.unFollow.restTime;
  for (const user of users) {
    if (restNum === 0) {
      return restNum;
    }
    try {
      const {
        code,
        message
      } = await unFollow(user.mid);
      tagLogger.debug(`取关【${user.uname}】成功！`);
      if (code !== 0) {
        logger.warn(`取关【${user.uname}】失败: ${code} ${message}`);
      }
      restNum > 0 && restNum--;
      unCount++;
      if (unNum > 0 && unCount >= unNum && sleepTime > 0) {
        unCount = 0;
        await sleep(sleepTime * 60000);
        continue;
      }
      await sleep(TaskConfig.unFollow.delay * 1000);
    } catch (error) {
      logger.warn(`取关【${user.uname}】异常: ${error.message}`);
    }
  }
  return restNum;
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
async function handleFollowUps(newFollowUps, lastFollow, moveTag, actFollowMsg = 'read', log = true) {
  const followUps = [];
  await getTeamUsers(followUps, newFollowUps, lastFollow === null || lastFollow === void 0 ? void 0 : lastFollow.mid);
  log && logger.debug(`开始处理消息：${actFollowMsg}`);
  await updateSession(followUps, actFollowMsg);
  if (moveTag) {
    log && logger.debug(`移动关注UP${followUps.length}个到分组${moveTag}`);
    await moveUsersToTag(followUps, moveTag);
    log && logger.debug('移动关注UP到分组成功');
  }
}

async function batchUnfollow() {
  logger.info('----【批量取关】----');
  const {
    tags,
    totalNum
  } = TaskConfig.unFollow;
  let restNum = totalNum;
  try {
    for (const tag of tags) {
      restNum = await unFollowTag(tag, restNum);
    }
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

let newFollowUp$1;
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
    await sleep(100);
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
      checkedRoomList.push({
        ...data,
        uid: room.uid,
        uname: room.uname
      });
      await sleep(100);
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
      pushIfNotExist(newFollowUp$1, uid);
      const requireTextList = getRequireUp(require_text);
      requireTextList.forEach(requireText => pushIfNotExist(newFollowUp$1, requireText));
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
      await sleep(300);
    }
  }
}
async function liveLotteryService() {
  newFollowUp$1 = [];
  const {
    pageNum
  } = TaskConfig.lottery;
  const areaList = await getLiveArea();
  for (const areas of areaList) {
    for (const area of areas) {
      await doLotteryArea(area.areaId, area.parentId, pageNum);
    }
  }
  return newFollowUp$1;
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
      lotteryRoomList.push({
        ...lottery,
        uid: room.uid,
        uname: room.uname
      });
    }
    await sleep(100);
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
      await sleep(300);
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

async function liveLottery() {
  logger.info('----【天选时刻】----');
  const isGo = await liveFollowLotteryService();
  if (!isGo) return isGo;
  try {
    const {
      moveTag,
      actFollowMsg,
      mayBeWinMsg
    } = TaskConfig.lottery;
    const lastFollow = await getLastFollow();
    logger.verbose(`最后一个关注的UP: ${lastFollow === null || lastFollow === void 0 ? void 0 : lastFollow.uname}`);
    const newFollowUps = await liveLotteryService();
    logger.verbose('扫描完成');
    await handleFollowUps(newFollowUps, lastFollow, moveTag, actFollowMsg);
    if (mayBeWinMsg) {
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

var bufferUtil$1 = {exports: {}};

var constants = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
  kListener: Symbol('kListener'),
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  NOOP: () => {}
};

var unmask$1;
var mask;

const { EMPTY_BUFFER: EMPTY_BUFFER$3 } = constants;

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat$1(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER$3;
  if (list.length === 1) return list[0];

  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) return target.slice(0, offset);

  return target;
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function _mask(source, mask, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer$1(buf) {
  if (buf.byteLength === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */
function toBuffer$2(data) {
  toBuffer$2.readOnly = true;

  if (Buffer.isBuffer(data)) return data;

  let buf;

  if (data instanceof ArrayBuffer) {
    buf = Buffer.from(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer$2.readOnly = false;
  }

  return buf;
}

bufferUtil$1.exports = {
  concat: concat$1,
  mask: _mask,
  toArrayBuffer: toArrayBuffer$1,
  toBuffer: toBuffer$2,
  unmask: _unmask
};

/* istanbul ignore else  */
if (!process.env.WS_NO_BUFFER_UTIL) {
  try {
    const bufferUtil = require('bufferutil');

    mask = bufferUtil$1.exports.mask = function (source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bufferUtil.mask(source, mask, output, offset, length);
    };

    unmask$1 = bufferUtil$1.exports.unmask = function (buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bufferUtil.unmask(buffer, mask);
    };
  } catch (e) {
    // Continue regardless of the error.
  }
}

const kDone = Symbol('kDone');
const kRun = Symbol('kRun');

/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */
class Limiter$1 {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(concurrency) {
    this[kDone] = () => {
      this.pending--;
      this[kRun]();
    };
    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }

  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(job) {
    this.jobs.push(job);
    this[kRun]();
  }

  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [kRun]() {
    if (this.pending === this.concurrency) return;

    if (this.jobs.length) {
      const job = this.jobs.shift();

      this.pending++;
      job(this[kDone]);
    }
  }
}

var limiter = Limiter$1;

const zlib = require$$0__default["default"];

const bufferUtil = bufferUtil$1.exports;
const Limiter = limiter;
const { kStatusCode: kStatusCode$2 } = constants;

const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError$1 = Symbol('error');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
let zlibLimiter;

/**
 * permessage-deflate implementation.
 */
class PerMessageDeflate$3 {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold =
      this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new Limiter(concurrency);
    }
  }

  /**
   * @type {String}
   */
  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(configurations) {
    configurations = this.normalizeParams(configurations);

    this.params = this._isServer
      ? this.acceptAsServer(configurations)
      : this.acceptAsClient(configurations);

    return this.params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate) {
      this._inflate.close();
      this._inflate = null;
    }

    if (this._deflate) {
      const callback = this._deflate[kCallback];

      this._deflate.close();
      this._deflate = null;

      if (callback) {
        callback(
          new Error(
            'The deflate stream was closed while data was being processed'
          )
        );
      }
    }
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }

  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(response) {
    const params = response[0];

    if (
      this._options.clientNoContextTakeover === false &&
      params.client_no_context_takeover
    ) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (
      this._options.clientMaxWindowBits === false ||
      (typeof this._options.clientMaxWindowBits === 'number' &&
        params.client_max_window_bits > this._options.clientMaxWindowBits)
    ) {
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    }

    return params;
  }

  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(configurations) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (!this._isServer) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;
          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
          value = num;
        } else if (
          key === 'client_no_context_takeover' ||
          key === 'server_no_context_takeover'
        ) {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._inflate = zlib.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits
      });
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError$1];

      if (err) {
        this._inflate.close();
        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(
        this._inflate[kBuffers],
        this._inflate[kTotalLength]
      );

      if (this._inflate._readableState.endEmitted) {
        this._inflate.close();
        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.reset();
        }
      }

      callback(null, data);
    });
  }

  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._deflate = zlib.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits
      });

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kCallback] = callback;

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // The deflate stream was closed while data was being processed.
        //
        return;
      }

      let data = bufferUtil.concat(
        this._deflate[kBuffers],
        this._deflate[kTotalLength]
      );

      if (fin) data = data.slice(0, data.length - 4);

      //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //
      this._deflate[kCallback] = null;

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.reset();
      }

      callback(null, data);
    });
  }
}

var permessageDeflate = PerMessageDeflate$3;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (
    this[kPerMessageDeflate]._maxPayload < 1 ||
    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
  ) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError$1] = new RangeError('Max payload size exceeded');
  this[kError$1].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
  this[kError$1][kStatusCode$2] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode$2] = 1007;
  this[kCallback](err);
}

var validation = {exports: {}};

var isValidUTF8_1;

//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars$1 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
function isValidStatusCode$2(code) {
  return (
    (code >= 1000 &&
      code <= 1014 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
}

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0) {
      // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {
      // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0 // Overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
        buf[i] > 0xf4 // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

validation.exports = {
  isValidStatusCode: isValidStatusCode$2,
  isValidUTF8: _isValidUTF8,
  tokenChars: tokenChars$1
};

/* istanbul ignore else  */
if (!process.env.WS_NO_UTF_8_VALIDATE) {
  try {
    const isValidUTF8 = require('utf-8-validate');

    isValidUTF8_1 = validation.exports.isValidUTF8 = function (buf) {
      return buf.length < 150 ? _isValidUTF8(buf) : isValidUTF8(buf);
    };
  } catch (e) {
    // Continue regardless of the error.
  }
}

const { Writable } = require$$0__default$1["default"];

const PerMessageDeflate$2 = permessageDeflate;
const {
  BINARY_TYPES: BINARY_TYPES$1,
  EMPTY_BUFFER: EMPTY_BUFFER$2,
  kStatusCode: kStatusCode$1,
  kWebSocket: kWebSocket$1
} = constants;
const { concat, toArrayBuffer, unmask } = bufferUtil$1.exports;
const { isValidStatusCode: isValidStatusCode$1, isValidUTF8 } = validation.exports;

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */
class Receiver$1 extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(options = {}) {
    super();

    this._binaryType = options.binaryType || BINARY_TYPES$1[0];
    this._extensions = options.extensions || {};
    this._isServer = !!options.isServer;
    this._maxPayload = options.maxPayload | 0;
    this._skipUTF8Validation = !!options.skipUTF8Validation;
    this[kWebSocket$1] = undefined;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    let err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(
        RangeError,
        'RSV2 and RSV3 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_2_3'
      );
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate$2.extensionName]) {
      this._loop = false;
      return error(
        RangeError,
        'RSV1 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_1'
      );
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          'invalid opcode 0',
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          `invalid opcode ${this._opcode}`,
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(
          RangeError,
          'FIN must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_FIN'
        );
      }

      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      }
    } else {
      this._loop = false;
      return error(
        RangeError,
        `invalid opcode ${this._opcode}`,
        true,
        1002,
        'WS_ERR_INVALID_OPCODE'
      );
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(
          RangeError,
          'MASK must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_MASK'
        );
      }
    } else if (this._masked) {
      this._loop = false;
      return error(
        RangeError,
        'MASK must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_MASK'
      );
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009,
        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(
          RangeError,
          'Max payload size exceeded',
          false,
          1009,
          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        );
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER$2;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);

      if (
        this._masked &&
        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
      ) {
        unmask(data, this._mask);
      }
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its length is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate$2.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(
              RangeError,
              'Max payload size exceeded',
              false,
              1009,
              'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
            )
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        let data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data, true);
      } else {
        const buf = concat(fragments, messageLength);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          this._loop = false;
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('message', buf, false);
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, EMPTY_BUFFER$2);
        this.end();
      } else if (data.length === 1) {
        return error(
          RangeError,
          'invalid payload length 1',
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode$1(code)) {
          return error(
            RangeError,
            `invalid status code ${code}`,
            true,
            1002,
            'WS_ERR_INVALID_CLOSE_CODE'
          );
        }

        const buf = data.slice(2);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('conclude', code, buf);
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

var receiver = Receiver$1;

/**
 * Builds an error object.
 *
 * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @param {String} errorCode The exposed error code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode, errorCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err.code = errorCode;
  err[kStatusCode$1] = statusCode;
  return err;
}

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls$" }] */
const { randomFillSync } = crypto__default["default"];

const PerMessageDeflate$1 = permessageDeflate;
const { EMPTY_BUFFER: EMPTY_BUFFER$1 } = constants;
const { isValidStatusCode } = validation.exports;
const { mask: applyMask, toBuffer: toBuffer$1 } = bufferUtil$1.exports;

const kByteLength = Symbol('kByteLength');
const maskBuffer = Buffer.alloc(4);

/**
 * HyBi Sender implementation.
 */
class Sender$1 {
  /**
   * Creates a Sender instance.
   *
   * @param {(net.Socket|tls.Socket)} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(socket, extensions, generateMask) {
    this._extensions = extensions || {};

    if (generateMask) {
      this._generateMask = generateMask;
      this._maskBuffer = Buffer.alloc(4);
    }

    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(data, options) {
    let mask;
    let merge = false;
    let offset = 2;
    let skipMasking = false;

    if (options.mask) {
      mask = options.maskBuffer || maskBuffer;

      if (options.generateMask) {
        options.generateMask(mask);
      } else {
        randomFillSync(mask, 0, 4);
      }

      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
      offset = 6;
    }

    let dataLength;

    if (typeof data === 'string') {
      if (
        (!options.mask || skipMasking) &&
        options[kByteLength] !== undefined
      ) {
        dataLength = options[kByteLength];
      } else {
        data = Buffer.from(data);
        dataLength = data.length;
      }
    } else {
      dataLength = data.length;
      merge = options.mask && options.readOnly && !skipMasking;
    }

    let payloadLength = dataLength;

    if (dataLength >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (dataLength > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(dataLength, 2);
    } else if (payloadLength === 127) {
      target[2] = target[3] = 0;
      target.writeUIntBE(dataLength, 4, 6);
    }

    if (!options.mask) return [target, data];

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (skipMasking) return [target, data];

    if (merge) {
      applyMask(data, mask, target, offset, dataLength);
      return [target];
    }

    applyMask(data, mask, data, 0, dataLength);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER$1;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || !data.length) {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);

      if (typeof data === 'string') {
        buf.write(data, 2);
      } else {
        buf.set(data, 2);
      }
    }

    const options = {
      [kByteLength]: buf.length,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x08,
      readOnly: false,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, buf, false, options, cb]);
    } else {
      this.sendFrame(Sender$1.frame(buf, options), cb);
    }
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x09,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender$1.frame(data, options), cb);
    }
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x0a,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender$1.frame(data, options), cb);
    }
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(data, options, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate$1.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (this._firstFragment) {
      this._firstFragment = false;
      if (
        rsv1 &&
        perMessageDeflate &&
        perMessageDeflate.params[
          perMessageDeflate._isServer
            ? 'server_no_context_takeover'
            : 'client_no_context_takeover'
        ]
      ) {
        rsv1 = byteLength >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        [kByteLength]: byteLength,
        fin: options.fin,
        generateMask: this._generateMask,
        mask: options.mask,
        maskBuffer: this._maskBuffer,
        opcode,
        readOnly,
        rsv1
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, data, this._compress, opts, cb]);
      } else {
        this.dispatch(data, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender$1.frame(data, {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1: false
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender$1.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate$1.extensionName];

    this._bufferedBytes += options[kByteLength];
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const params = this._queue[i];
          const callback = params[params.length - 1];

          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= options[kByteLength];
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender$1.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[3][kByteLength];
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[3][kByteLength];
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

var sender = Sender$1;

const { kForOnEventAttribute: kForOnEventAttribute$1, kListener: kListener$1 } = constants;

const kCode = Symbol('kCode');
const kData = Symbol('kData');
const kError = Symbol('kError');
const kMessage = Symbol('kMessage');
const kReason = Symbol('kReason');
const kTarget = Symbol('kTarget');
const kType = Symbol('kType');
const kWasClean = Symbol('kWasClean');

/**
 * Class representing an event.
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(type) {
    this[kTarget] = null;
    this[kType] = type;
  }

  /**
   * @type {*}
   */
  get target() {
    return this[kTarget];
  }

  /**
   * @type {String}
   */
  get type() {
    return this[kType];
  }
}

Object.defineProperty(Event.prototype, 'target', { enumerable: true });
Object.defineProperty(Event.prototype, 'type', { enumerable: true });

/**
 * Class representing a close event.
 *
 * @extends Event
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(type, options = {}) {
    super(type);

    this[kCode] = options.code === undefined ? 0 : options.code;
    this[kReason] = options.reason === undefined ? '' : options.reason;
    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
  }

  /**
   * @type {Number}
   */
  get code() {
    return this[kCode];
  }

  /**
   * @type {String}
   */
  get reason() {
    return this[kReason];
  }

  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[kWasClean];
  }
}

Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });

/**
 * Class representing an error event.
 *
 * @extends Event
 */
class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(type, options = {}) {
    super(type);

    this[kError] = options.error === undefined ? null : options.error;
    this[kMessage] = options.message === undefined ? '' : options.message;
  }

  /**
   * @type {*}
   */
  get error() {
    return this[kError];
  }

  /**
   * @type {String}
   */
  get message() {
    return this[kMessage];
  }
}

Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });

/**
 * Class representing a message event.
 *
 * @extends Event
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(type, options = {}) {
    super(type);

    this[kData] = options.data === undefined ? null : options.data;
  }

  /**
   * @type {*}
   */
  get data() {
    return this[kData];
  }
}

Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {(Function|Object)} handler The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, handler, options = {}) {
    for (const listener of this.listeners(type)) {
      if (
        !options[kForOnEventAttribute$1] &&
        listener[kListener$1] === handler &&
        !listener[kForOnEventAttribute$1]
      ) {
        return;
      }
    }

    let wrapper;

    if (type === 'message') {
      wrapper = function onMessage(data, isBinary) {
        const event = new MessageEvent('message', {
          data: isBinary ? data : data.toString()
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'close') {
      wrapper = function onClose(code, message) {
        const event = new CloseEvent('close', {
          code,
          reason: message.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'error') {
      wrapper = function onError(error) {
        const event = new ErrorEvent('error', {
          error,
          message: error.message
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'open') {
      wrapper = function onOpen() {
        const event = new Event('open');

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else {
      return;
    }

    wrapper[kForOnEventAttribute$1] = !!options[kForOnEventAttribute$1];
    wrapper[kListener$1] = handler;

    if (options.once) {
      this.once(type, wrapper);
    } else {
      this.on(type, wrapper);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {(Function|Object)} handler The listener to remove
   * @public
   */
  removeEventListener(type, handler) {
    for (const listener of this.listeners(type)) {
      if (listener[kListener$1] === handler && !listener[kForOnEventAttribute$1]) {
        this.removeListener(type, listener);
        break;
      }
    }
  }
};

var eventTarget = {
  CloseEvent,
  ErrorEvent,
  Event,
  EventTarget,
  MessageEvent
};

/**
 * Call an event listener
 *
 * @param {(Function|Object)} listener The listener to call
 * @param {*} thisArg The value to use as `this`` when calling the listener
 * @param {Event} event The event to pass to the listener
 * @private
 */
function callListener(listener, thisArg, event) {
  if (typeof listener === 'object' && listener.handleEvent) {
    listener.handleEvent.call(listener, event);
  } else {
    listener.call(thisArg, event);
  }
}

const { tokenChars } = validation.exports;

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];
  else dest[name].push(elem);
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse$1(header) {
  const offers = Object.create(null);
  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let code = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (
        i !== 0 &&
        (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
      ) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = Object.create(null);
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format$1(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      let configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                let values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

var extension = { format: format$1, parse: parse$1 };

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Readable$" }] */

const EventEmitter = require$$0__default$2["default"];
const https = require$$1__default["default"];
const http = require$$2__default["default"];
const net = require$$3__default["default"];
const tls = require$$4__default["default"];
const { randomBytes, createHash } = crypto__default["default"];
const { URL } = require$$7__default["default"];

const PerMessageDeflate = permessageDeflate;
const Receiver = receiver;
const Sender = sender;
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID,
  kForOnEventAttribute,
  kListener,
  kStatusCode,
  kWebSocket,
  NOOP
} = constants;
const {
  EventTarget: { addEventListener, removeEventListener }
} = eventTarget;
const { format, parse } = extension;
const { toBuffer } = bufferUtil$1.exports;

const closeTimeout = 30 * 1000;
const kAborted = Symbol('kAborted');
const protocolVersions = [8, 13];
const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER;
    this._closeTimer = null;
    this._extensions = {};
    this._paused = false;
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;

    return this._socket._writableState.length + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }

  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }

  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(socket, head, options) {
    const receiver = new Receiver({
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: options.maxPayload,
      skipUTF8Validation: options.skipUTF8Validation
    });

    this._sender = new Sender(socket, this._extensions, options.generateMask);
    this._receiver = receiver;
    this._socket = socket;

    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);

    this._readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this._readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (
        this._closeFrameSent &&
        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
      ) {
        this._socket.end();
      }

      return;
    }

    this._readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;

      if (
        this._closeFrameReceived ||
        this._receiver._writableState.errorEmitted
      ) {
        this._socket.end();
      }
    });

    //
    // Specify a timeout for the closing handshake to complete.
    //
    this._closeTimer = setTimeout(
      this._socket.destroy.bind(this._socket),
      closeTimeout
    );
  }

  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = true;
    this._socket.pause();
  }

  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = false;
    if (!this._receiver._writableState.needDrain) this._socket.resume();
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake(this, this._req, msg);
    }

    if (this._socket) {
      this._readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
}

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

[
  'binaryType',
  'bufferedAmount',
  'extensions',
  'isPaused',
  'protocol',
  'readyState',
  'url'
].forEach((property) => {
  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    enumerable: true,
    get() {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) return listener[kListener];
      }

      return null;
    },
    set(handler) {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) {
          this.removeListener(method, listener);
          break;
        }
      }

      if (typeof handler !== 'function') return;

      this.addEventListener(method, handler, {
        [kForOnEventAttribute]: true
      });
    }
  });
});

WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;

var websocket = WebSocket;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|URL)} address The URL to which to connect
 * @param {Array} protocols The subprotocols
 * @param {Object} [options] Connection options
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Function} [options.generateMask] The function used to generate the
 *     masking key
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
 *     not to skip UTF-8 validation for text and close messages
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: 'GET',
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  let parsedUrl;

  if (address instanceof URL) {
    parsedUrl = address;
    websocket._url = address.href;
  } else {
    try {
      parsedUrl = new URL(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }

    websocket._url = address;
  }

  const isSecure = parsedUrl.protocol === 'wss:';
  const isIpcUrl = parsedUrl.protocol === 'ws+unix:';
  let invalidUrlMessage;

  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isIpcUrl) {
    invalidUrlMessage =
      'The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"';
  } else if (isIpcUrl && !parsedUrl.pathname) {
    invalidUrlMessage = "The URL's pathname is empty";
  } else if (parsedUrl.hash) {
    invalidUrlMessage = 'The URL contains a fragment identifier';
  }

  if (invalidUrlMessage) {
    const err = new SyntaxError(invalidUrlMessage);

    if (websocket._redirects === 0) {
      throw err;
    } else {
      emitErrorAndClose(websocket, err);
      return;
    }
  }

  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const request = isSecure ? https.request : http.request;
  const protocolSet = new Set();
  let perMessageDeflate;

  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = {
    ...opts.headers,
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket'
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols.length) {
    for (const protocol of protocols) {
      if (
        typeof protocol !== 'string' ||
        !subprotocolRegex.test(protocol) ||
        protocolSet.has(protocol)
      ) {
        throw new SyntaxError(
          'An invalid or duplicated subprotocol was specified'
        );
      }

      protocolSet.add(protocol);
    }

    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isIpcUrl) {
    const parts = opts.path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req;

  if (opts.followRedirects) {
    if (websocket._redirects === 0) {
      websocket._originalIpc = isIpcUrl;
      websocket._originalSecure = isSecure;
      websocket._originalHostOrSocketPath = isIpcUrl
        ? opts.socketPath
        : parsedUrl.host;

      const headers = options && options.headers;

      //
      // Shallow copy the user provided options so that headers can be changed
      // without mutating the original object.
      //
      options = { ...options, headers: {} };

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          options.headers[key.toLowerCase()] = value;
        }
      }
    } else if (websocket.listenerCount('redirect') === 0) {
      const isSameHost = isIpcUrl
        ? websocket._originalIpc
          ? opts.socketPath === websocket._originalHostOrSocketPath
          : false
        : websocket._originalIpc
        ? false
        : parsedUrl.host === websocket._originalHostOrSocketPath;

      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
        //
        // Match curl 7.77.0 behavior and drop the following headers. These
        // headers are also dropped when following a redirect to a subdomain.
        //
        delete opts.headers.authorization;
        delete opts.headers.cookie;

        if (!isSameHost) delete opts.headers.host;

        opts.auth = undefined;
      }
    }

    //
    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
    // If the `Authorization` header is set, then there is nothing to do as it
    // will take precedence.
    //
    if (opts.auth && !options.headers.authorization) {
      options.headers.authorization =
        'Basic ' + Buffer.from(opts.auth).toString('base64');
    }

    req = websocket._req = request(opts);

    if (websocket._redirects) {
      //
      // Unlike what is done for the `'upgrade'` event, no early exit is
      // triggered here if the user calls `websocket.close()` or
      // `websocket.terminate()` from a listener of the `'redirect'` event. This
      // is because the user can also call `request.destroy()` with an error
      // before calling `websocket.close()` or `websocket.terminate()` and this
      // would result in an error being emitted on the `request` object with no
      // `'error'` event listeners attached.
      //
      websocket.emit('redirect', websocket.url, req);
    }
  } else {
    req = websocket._req = request(opts);
  }

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (req === null || req[kAborted]) return;

    req = websocket._req = null;
    emitErrorAndClose(websocket, err);
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      let addr;

      try {
        addr = new URL(location, address);
      } catch (e) {
        const err = new SyntaxError(`Invalid URL: ${location}`);
        emitErrorAndClose(websocket, err);
        return;
      }

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the
    // `'upgrade'` event.
    //
    if (websocket.readyState !== WebSocket.CONNECTING) return;

    req = websocket._req = null;

    if (res.headers.upgrade.toLowerCase() !== 'websocket') {
      abortHandshake(websocket, socket, 'Invalid Upgrade header');
      return;
    }

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    let protError;

    if (serverProt !== undefined) {
      if (!protocolSet.size) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (!protocolSet.has(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }
    } else if (protocolSet.size) {
      protError = 'Server sent no subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;

    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

    if (secWebSocketExtensions !== undefined) {
      if (!perMessageDeflate) {
        const message =
          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
          'was requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      let extensions;

      try {
        extensions = parse(secWebSocketExtensions);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      const extensionNames = Object.keys(extensions);

      if (
        extensionNames.length !== 1 ||
        extensionNames[0] !== PerMessageDeflate.extensionName
      ) {
        const message = 'Server indicated an extension that was not requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      try {
        perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      websocket._extensions[PerMessageDeflate.extensionName] =
        perMessageDeflate;
    }

    websocket.setSocket(socket, head, {
      generateMask: opts.generateMask,
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });

  req.end();
}

/**
 * Emit the `'error'` and `'close'` events.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {Error} The error to emit
 * @private
 */
function emitErrorAndClose(websocket, err) {
  websocket._readyState = WebSocket.CLOSING;
  websocket.emit('error', err);
  websocket.emitClose();
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
 *     abort or the socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake(websocket, stream, message) {
  websocket._readyState = WebSocket.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream[kAborted] = true;
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    process.nextTick(emitErrorAndClose, websocket, err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */
function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer(data).length;

    //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //
    if (websocket._socket) websocket._sender._bufferedBytes += length;
    else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket.readyState} ` +
        `(${readyStates[websocket.readyState]})`
    );
    cb(err);
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {Buffer} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (websocket._socket[kWebSocket] === undefined) return;

  websocket._socket.removeListener('data', socketOnData);
  process.nextTick(resume, websocket._socket);

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  const websocket = this[kWebSocket];

  if (!websocket.isPaused) websocket._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket];

  if (websocket._socket[kWebSocket] !== undefined) {
    websocket._socket.removeListener('data', socketOnData);

    //
    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
    // https://github.com/websockets/ws/issues/1940.
    //
    process.nextTick(resume, websocket._socket);

    websocket.close(err[kStatusCode]);
  }

  websocket.emit('error', err);
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
 * @param {Boolean} isBinary Specifies whether the message is binary or not
 * @private
 */
function receiverOnMessage(data, isBinary) {
  this[kWebSocket].emit('message', data, isBinary);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket];

  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}

/**
 * Resume a readable stream
 *
 * @param {Readable} stream The readable stream
 * @private
 */
function resume(stream) {
  stream.resume();
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket];

  this.removeListener('close', socketOnClose);
  this.removeListener('data', socketOnData);
  this.removeListener('end', socketOnEnd);

  websocket._readyState = WebSocket.CLOSING;

  let chunk;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk.
  //
  if (
    !this._readableState.endEmitted &&
    !websocket._closeFrameReceived &&
    !websocket._receiver._writableState.errorEmitted &&
    (chunk = websocket._socket.read()) !== null
  ) {
    websocket._receiver.write(chunk);
  }

  websocket._receiver.end();

  this[kWebSocket] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket];

  websocket._readyState = WebSocket.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError() {
  const websocket = this[kWebSocket];

  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket.CLOSING;
    this.destroy();
  }
}

const PacketCmdEnum = {
  节奏风暴: 'NOTICE_MSG',
  弹幕消息: 'DANMU_MSG',
  红包开始: 'POPULARITY_RED_POCKET_START',
  红包中奖名单: 'POPULARITY_RED_POCKET_WINNER_LIST'
};
const ReturnStatus = {
  退出: 0,
  中场休眠: -1,
  风控休眠: -2,
  未获取到房间: -3
};

const noWinRef = {
  value: 0
};

function isRedPackWs(body) {
  return !isNumber(body) && body.cmd === PacketCmdEnum.红包中奖名单 && body.data.lot_id;
}
const wsMap = new Map();
const timerMap = new Map();
function closeWs(roomid) {
  var _wsMap$get;
  (_wsMap$get = wsMap.get(roomid)) === null || _wsMap$get === void 0 ? void 0 : _wsMap$get.close();
  wsMap.delete(roomid);
  clearWsTimer(roomid);
}
function clearWs() {
  wsMap.forEach((ws, roomid) => {
    ws.close();
    clearWsTimer(roomid);
  });
  wsMap.clear();
  timerMap.clear();
}
function addWs(room_id, ws) {
  var _wsMap$get2;
  (_wsMap$get2 = wsMap.get(room_id)) === null || _wsMap$get2 === void 0 ? void 0 : _wsMap$get2.close();
  wsMap.set(room_id, ws);
}
function clearWsTimer(roomid) {
  const options = timerMap.get(roomid);
  if (options) {
    clearTimer(options);
    timerMap.delete(roomid);
  }
}
function clearTimer(options) {
  const {
    timer,
    timeout
  } = options || {};
  timer && clearInterval(timer);
  timeout && clearTimeout(timeout);
}
async function getWsLink(room_id) {
  try {
    var _data$host_list;
    const {
      data
    } = await getDanmuInfo(room_id);
    return {
      token: data.token,
      uri: (_data$host_list = data.host_list) === null || _data$host_list === void 0 ? void 0 : _data$host_list[0].host
    };
  } catch (error) {
    logger.error(error);
  }
}
async function biliDmWs(room_id, time = 0) {
  const wsLink = await getWsLink(room_id);
  if (!wsLink) return;
  const json = {
    uid: TaskConfig.USERID,
    roomid: room_id,
    protover: 1,
    platform: 'web',
    clientver: '1.6.3',
    key: wsLink.token
  };
  const ws = new websocket(`wss://${wsLink.uri || 'broadcastlv.chat.bilibili.com'}/sub`);
  ws.addEventListener('open', () => {
    ws.send(getCertification(JSON.stringify(json)).buffer);
    timerMap.set(room_id, sendInterval());
  });
  ws.addEventListener('close', () => {
    clearWsTimer(room_id);
  });
  ws.addEventListener('error', () => {
    closeWs(room_id);
  });
  function sendInterval() {
    let timeout = undefined;
    const timer = setInterval(() => {
      ws.send(formatDataView().buffer);
    }, 30000);
    if (time > 0) {
      timeout = setTimeout(() => {
        closeWs(room_id);
      }, time);
    }
    return {
      timer,
      timeout
    };
  }
  return ws;
}
function bindMessageForRedPacket(ws, room_id, msgCallback) {
  ws.addEventListener('message', evt => {
    const packet = decode(evt.data);
    if (packet.op === 5) {
      packet === null || packet === void 0 ? void 0 : packet.body.forEach(body => {
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
function str2bytes(str) {
  return Array.from(new util.TextEncoder().encode(str));
}
function readInt(buffer, start, len) {
  let result = 0;
  for (let i = len - 1; i >= 0; i--) {
    result += Math.pow(256, len - i - 1) * buffer[start + i];
  }
  return result;
}
function decode(buffer) {
  const textDecoder = new util.TextDecoder('utf-8');
  const result = {
    packetLen: readInt(buffer, 0, 4),
    headerLen: readInt(buffer, 4, 2),
    ver: readInt(buffer, 6, 2),
    op: readInt(buffer, 8, 4),
    seq: readInt(buffer, 12, 4),
    body: []
  };
  if (result.op === 5) {
    result.body = [];
    let offset = 0;
    while (offset < buffer.length) {
      var _body, _body$split;
      const packetLen = readInt(buffer, offset, 4);
      const dataSlice = buffer.slice(offset + 16, offset + packetLen);
      let body;
      if (result.ver === 2) {
        body = textDecoder.decode(require$$0.unzipSync(dataSlice));
      } else {
        body = textDecoder.decode(dataSlice);
      }
      (_body = body) === null || _body === void 0 ? void 0 : (_body$split = _body.split(/[\x00-\x1f]+/)) === null || _body$split === void 0 ? void 0 : _body$split.forEach(item => {
        try {
          result.body.push(JSON.parse(item));
        } catch {}
      });
      offset += packetLen;
    }
  }
  return result;
}
function getCertification(json) {
  const bytes = str2bytes(json);
  return formatDataView({
    byteOffset: bytes.length,
    op: 7
  }, bytes);
}
function formatDataView({
  byteOffset,
  packVer = 1,
  op = 2,
  seq = 1
} = {}, body) {
  let totalSize = 16;
  if (body && !byteOffset) {
    totalSize += body.length;
  } else if (byteOffset) {
    totalSize += byteOffset;
  }
  const dv = new DataView(new ArrayBuffer(totalSize));
  dv.setUint32(0, totalSize), dv.setUint16(4, 16), dv.setUint16(6, packVer), dv.setUint32(8, op), dv.setUint32(12, seq);
  body && body.forEach((d, i) => dv.setUint8(16 + i, d));
  return dv;
}

const DMEmoji = [{
  emoji: '赞',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/bbd9045570d0c022a984c637e406cb0e1f208aa9.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 150,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_147',
  emoticon_id: 147
}, {
  emoji: '妙啊',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/7b7a2567ad1520f962ee226df777eaf3ca368fbc.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 138,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_109',
  emoticon_id: 109
}, {
  emoji: '有点东西',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/39e518474a3673c35245bf6ef8ebfff2c003fdc3.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 186,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_113',
  emoticon_id: 113
}, {
  emoji: '离谱',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/9029486931c3169c3b4f8e69da7589d29a8eadaa.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 159,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_120',
  emoticon_id: 120
}, {
  emoji: '很有精神',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/e91cbe30b2db1e624bd964ad1f949661501f42f8.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 201,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_150',
  emoticon_id: 150
}, {
  emoji: '泪目',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/aa93b9af7ba03b50df23b64e9afd0d271955cd71.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 144,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_103',
  emoticon_id: 103
}, {
  emoji: '赢麻了',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/1d4c71243548a1241f422e90cd8ba2b75c282f6b.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 156,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_128',
  emoticon_id: 128
}, {
  emoji: '钝角',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/38cf68c25d9ff5d364468a062fc79571db942ff3.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 153,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_133',
  emoticon_id: 133
}, {
  emoji: '干杯',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/8fedede4028a72e71dae31270eedff5f706f7d18.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 162,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_149',
  emoticon_id: 149
}, {
  emoji: '2333',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/a98e35996545509188fe4d24bd1a56518ea5af48.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 183,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_124',
  emoticon_id: 124
}, {
  emoji: '打call',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/fa1eb4dce3ad198bb8650499830560886ce1116c.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 195,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_146',
  emoticon_id: 146
}, {
  emoji: '多谢款待',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/4609dad97c0dfa61f8da0b52ab6fff98e0cf1e58.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 207,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_148',
  emoticon_id: 148
}, {
  emoji: 'awsl',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/328e93ce9304090f4035e3aa7ef031d015bbc915.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 162,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_102',
  emoticon_id: 102
}, {
  emoji: '笑死',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/aa48737f877cd328162696a4f784b85d4bfca9ce.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 168,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_121',
  emoticon_id: 121
}, {
  emoji: '鸡汤来咯',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/b371151503978177b237afb85185b0f5431d0106.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 198,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_137',
  emoticon_id: 137
}, {
  emoji: '雀食',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/7251dc7df587388a3933743bf38394d12a922cd7.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 159,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_118',
  emoticon_id: 118
}, {
  emoji: '烦死了',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/2af0e252cc3082384edf8165751f6a49eaf76d94.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 174,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_129',
  emoticon_id: 129
}, {
  emoji: '禁止套娃',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/6a644577437d0bd8a314990dd8ccbec0f3b30c92.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 204,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_108',
  emoticon_id: 108
}, {
  emoji: '暗中观察',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/18af5576a4582535a3c828c3ae46a7855d9c6070.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 156,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_104',
  emoticon_id: 104
}, {
  emoji: '保熟吗',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/0e28444c8e2faef3169e98e1a41c487144d877d4.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 162,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_105',
  emoticon_id: 105
}, {
  emoji: '比心',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/1ba5126b10e5efe3e4e29509d033a37f128beab2.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 132,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_106',
  emoticon_id: 106
}, {
  emoji: 'what',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/40db7427f02a2d9417f8eeed0f71860dfb28df5a.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 195,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_114',
  emoticon_id: 114
}, {
  emoji: '好耶',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/4cf43ac5259589e9239c4e908c8149d5952fcc32.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 144,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_107',
  emoticon_id: 107
}, {
  emoji: '咸鱼翻身',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/7db4188c050f55ec59a1629fbc5a53661e4ba780.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 180,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_110',
  emoticon_id: 110
}, {
  emoji: 'mua',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/08f1aebaa4d9c170aa79cbafe521ef0891bdf2b5.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 165,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_111',
  emoticon_id: 111
}, {
  emoji: '打扰了',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/a9e2acaf72b663c6ad9c39cda4ae01470e13d845.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 219,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_136',
  emoticon_id: 136
}, {
  emoji: '来了来了',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/61e790813c51eab55ebe0699df1e9834c90b68ba.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 168,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_115',
  emoticon_id: 115
}, {
  emoji: '贴贴',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/88b49dac03bfd5d4cb49672956f78beb2ebd0d0b.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 162,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_116',
  emoticon_id: 116
}, {
  emoji: '牛牛牛',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/343f7f7e87fa8a07df63f9cba6b776196d9066f0.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 168,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_117',
  emoticon_id: 117
}, {
  emoji: '颠个勺',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/625989e78079e3dc38d75cb9ac392fe8c1aa4a75.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 195,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_119',
  emoticon_id: 119
}, {
  emoji: '好家伙',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/c2650bf9bbc79b682a4b67b24df067fdd3e5e9ca.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 165,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_122',
  emoticon_id: 122
}, {
  emoji: '那我走',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/c3326ceb63587c79e5b4106ee4018dc59389b5c0.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 168,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_123',
  emoticon_id: 123
}, {
  emoji: '下次一定',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/cc2652cef69b22117f1911391567bd2957f27e08.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 177,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_125',
  emoticon_id: 125
}, {
  emoji: '不上Ban',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/eff44c1fc03311573e8817ca8010aca72404f65c.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 231,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_126',
  emoticon_id: 126
}, {
  emoji: '就这',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/ff840c706fffa682ace766696b9f645e40899f67.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 135,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_127',
  emoticon_id: 127
}, {
  emoji: '上热榜',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/83d5b9cdaaa820c2756c013031d34dac1fd4156b.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 168,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_134',
  emoticon_id: 134
}, {
  emoji: '中奖喷雾',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/9640c6ab1a848497b8082c2111d44493c6982ad3.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 192,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_135',
  emoticon_id: 135
}, {
  emoji: '我不理解',
  descript: '',
  url: 'http://i0.hdslb.com/bfs/live/fdefb600cf40d8e5a7e566cc97058b47d946cad6.png',
  is_dynamic: 1,
  in_player_area: 1,
  width: 210,
  height: 60,
  identity: 99,
  unlock_need_gift: 0,
  perm: 1,
  unlock_need_level: 0,
  emoticon_value_type: 0,
  bulge_display: 0,
  unlock_show_text: '',
  unlock_show_color: '',
  emoticon_unique: 'official_138',
  emoticon_id: 138
}];

async function getRedPacketController() {
  try {
    const resp = await biliHttp.get(TaskConfig.redPack.uri);
    const {
      code,
      message,
      data
    } = getRedPacket$1(resp) || {};
    if (code !== 0) {
      logger.debug(`${code} ${message}`);
      return;
    }
    return data === null || data === void 0 ? void 0 : data.list;
  } catch (error) {
    logger.error(`获取红包列表异常: ${error.message}`);
  }
}
function getRedPacket$1(resp) {
  if (Reflect.has(resp, '_ts_rpc_return_')) {
    return resp._ts_rpc_return_;
  }
  if (Reflect.has(resp, 'data') && Reflect.has(resp, 'code')) {
    return resp;
  }
  return;
}

const liveLogger$1 = new Logger({
  console: 'debug',
  file: 'warn',
  push: 'warn',
  payload: TaskModule.nickname
}, 'redPacket');
let newFollowUp, joinCount, restCount, riskCount, riskTotalCount;
const waitting = {
  value: false
};
async function getRedPacket(roomId) {
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
      lot_status,
      end_time
    } = popularity_red_pocket[0];
    if (lot_status === 2 || end_time - getUnixTime() < 5) {
      return;
    }
    return popularity_red_pocket[0];
  } catch (error) {
    logger.debug(`检测红包异常: ${error.message}`);
  }
}
async function getRoomListByLink() {
  const roomList = await getRedPacketController();
  if (!(roomList !== null && roomList !== void 0 && roomList.length)) {
    return;
  }
  return roomList === null || roomList === void 0 ? void 0 : roomList.filter(room => room.countDown >= 20).reverse();
}
async function doRedPacket(redPacket) {
  const {
    end_time,
    ws_time
  } = redPacket;
  const wsTime = end_time ? end_time - getUnixTime() : ws_time;
  if (!wsTime || wsTime < 4) return;
  joinCount++;
  restCount++;
  return await joinRedPacketHandle(redPacket, wsTime);
}
function initCount$1() {
  restCount = 0;
  riskCount = 0;
}
async function returnStatusHandle() {
  const {
    restTime,
    totalNum,
    riskNum,
    noWinNum,
    riskTime
  } = TaskConfig.redPack;
  if (totalNum > 0 && joinCount >= totalNum) {
    liveLogger$1.debug(`已经参与了${totalNum}次，停止运行`);
    return ReturnStatus.退出;
  }
  if (restTime[0] > 0 && restCount >= restTime[0]) {
    initCount$1();
    liveLogger$1.debug(`中场休息时间到，暂停运行${restTime[1]}分`);
    return ReturnStatus.中场休眠;
  }
  if (riskNum > 0 && riskTotalCount >= riskNum) {
    logger.warn(`疑似风控连续${riskTotalCount}次，停止运行`);
    return ReturnStatus.退出;
  }
  if (riskTime[0] > 0 && riskCount >= riskTime[0]) {
    liveLogger$1.warn(`疑似风控连续${riskCount}次，暂停运行${riskTime[1]}分`);
    initCount$1();
    return ReturnStatus.风控休眠;
  }
  if (noWinNum > 0 && noWinRef.value >= noWinNum) {
    logger.warn(`连续未中奖${noWinRef.value}次，停止运行`);
    return ReturnStatus.退出;
  }
}
async function joinRedPacketHandle(redPacket, wsTime) {
  const {
    lot_id,
    uid,
    uname,
    room_id
  } = redPacket;
  try {
    const ws = await createRedPacketDmWs(redPacket, wsTime);
    if (!ws) return;
    addWs(room_id, ws);
    await sleep(2000);
    noWinRef.value++;
    const {
      code,
      message
    } = await joinRedPacket({
      room_id,
      lot_id,
      ruid: uid
    });
    pushIfNotExist(newFollowUp, uid);
    if (code !== 0) {
      closeWs(room_id);
      return joinErrorHandle(uname, code, message);
    }
    liveLogger$1.debug(`【${uname}】红包成功 √`);
    return biliDmHandle(redPacket, wsTime);
  } catch (error) {
    logger.error(`红包异常: ${error.message}`);
  }
}
async function createRedPacketDmWs({
  room_id,
  wait_num,
  uid,
  uname
}, wsTime) {
  const ws = await biliDmWs(room_id, (wsTime + 20) * 1000);
  if (!ws) return;
  bindMessageForRedPacket(ws, room_id, async () => {
    if (!wait_num || wait_num > 0) return;
    await sleep(20000);
    if (waitting.value === false && wsMap.size < TaskConfig.redPack.linkRoomNum) {
      const redPacket = await getRedPacket(room_id);
      redPacket && (await doRedPacket({
        ...redPacket,
        uid,
        uname,
        room_id
      }));
    }
  });
  return ws;
}
async function biliDmHandle({
  room_id,
  uid
}, wsTime) {
  const clearDmTimes = sendDm(room_id, wsTime);
  await sleep(5000);
  const {
    ownInfo
  } = await request$1(getOnlineGoldRank, undefined, uid, room_id);
  if ((ownInfo === null || ownInfo === void 0 ? void 0 : ownInfo.score) === 0) {
    addRiskCount();
    closeWs(room_id);
    clearDmTimes();
    return;
  }
  clearRiskCount();
}
function joinErrorHandle(uname, code, message) {
  switch (code) {
    case 1009109:
      logger.info(message);
      return ReturnStatus.退出;
    case 1009114:
    case 1009108:
      return;
    default:
      logger.info(`【${uname}】红包失败 ${code} ${message}`);
      return;
  }
}
function sendDm(room_id, wsTime) {
  const [dm1, dm2] = TaskConfig.redPack.dmNum,
    danmuNum = dm2 ? random(dm1, dm2) : dm1,
    times = Math.min(10, Math.ceil(wsTime / 5), danmuNum);
  const timers = [];
  for (let i = 0; i < times; i++) {
    timers.push(setTimeout(() => {
      sendMessage(room_id, getRandomItem(DMEmoji).emoticon_unique, 1).catch(err => {
        logger.warn(`发送红包消息异常: ${err.message}`);
      });
    }, i * 5000));
  }
  return () => timers.forEach(timer => timer && clearTimeout(timer));
}
async function doRedPackArea(areaId, parentId) {
  const linkRoomNum = TaskConfig.redPack.linkRoomNum;
  const rooms = await getLotteryRoomList(areaId, parentId, 2, 'redPack');
  await waitForWebSocket(linkRoomNum);
  for (const room of rooms) {
    const redPacket = await getRedPacket(room.roomid);
    if (!redPacket) continue;
    const status = await doRedPacket({
      uid: room.uid,
      uname: room.uname,
      lot_id: redPacket.lot_id,
      room_id: room.roomid,
      end_time: redPacket.end_time,
      wait_num: redPacket.wait_num
    });
    const returnStatus = status || (await returnStatusHandle());
    await waitForWebSocket(linkRoomNum);
    if (returnStatus !== undefined) return returnStatus;
  }
}
function waitForWebSocket(conditions = 2) {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      if (wsMap.size < conditions) {
        clearInterval(timer);
        resolve(true);
      }
    }, 1000);
  });
}
async function waitForStatus(status) {
  const {
    riskTime,
    restTime
  } = TaskConfig.redPack;
  switch (status) {
    case ReturnStatus.风控休眠:
      {
        if (riskTime[1] < 1) {
          logger.debug(`不执行风控休眠，直接退出！`);
          return ReturnStatus.退出;
        }
        return await handleSleep(riskTime[1]);
      }
    case ReturnStatus.中场休眠:
      {
        if (restTime[1] < 1) {
          logger.debug(`不执行中场休眠，直接退出！`);
          return ReturnStatus.退出;
        }
        return await handleSleep(restTime[1]);
      }
    default:
      return status;
  }
  async function handleSleep(time) {
    if (TaskConfig.redPack.moveUpInWait) {
      const {
        moveTag,
        actFollowMsg
      } = TaskConfig.redPack;
      await handleFollowUps(newFollowUp, undefined, moveTag, actFollowMsg, false);
      newFollowUp = [];
    }
    waitting.value = true;
    await sleep(time * 60000);
    waitting.value = false;
  }
}
async function liveRedPackService() {
  init();
  await run();
  await waitForWebSocket(1);
  return newFollowUp;
}
async function run() {
  const {
    source
  } = TaskConfig.redPack;
  switch (source) {
    case 1:
      return await runByActivity();
    case 2:
      return await runByScanArea();
    default:
      {
        if ((await runByActivity()) === ReturnStatus.未获取到房间) {
          return await runByScanArea();
        }
      }
  }
}
async function runByScanArea() {
  const areaList = await getLiveArea();
  for (const areas of areaList) {
    await sleep(3000);
    for (const area of areas) {
      const status = await waitForStatus(await doRedPackArea(area.areaId, area.parentId));
      if (status === undefined) continue;
      if (status === ReturnStatus.退出) return;
    }
  }
  return await runByScanArea();
}
async function runByActivity() {
  const roomList = await getRoomListByLink();
  if (!roomList || !roomList.length) {
    return ReturnStatus.未获取到房间;
  }
  const {
    linkRoomNum,
    intervalActive
  } = TaskConfig.redPack;
  for (const room of roomList) {
    const status = await doRedPacket({
      uid: +room.ruid,
      uname: room.runame,
      lot_id: +room.lotId,
      room_id: +room.roomId,
      ws_time: room.countDown
    });
    const returnStatus = await waitForStatus(status || (await returnStatusHandle()));
    if (returnStatus !== undefined) return returnStatus;
    await waitForWebSocket(linkRoomNum);
  }
  await sleep(intervalActive * 1000);
  return await runByActivity();
}
function init() {
  newFollowUp = [];
  clearWs();
  joinCount = 0;
  restCount = 0;
  clearRiskCount();
  noWinRef.value = 0;
  waitting.value = false;
}
function addRiskCount() {
  riskCount++;
  riskTotalCount++;
}
function clearRiskCount() {
  riskCount = 0;
  riskTotalCount = 0;
}

async function liveRedPack() {
  logger.info('----【天选红包】----');
  try {
    const {
      moveTag
    } = TaskConfig.redPack;
    const lastFollow = await getLastFollow();
    lastFollow && logger.verbose(`最后一个关注的UP: ${lastFollow.uname}`);
    const newFollowUps = await liveRedPackService();
    await handleFollowUps(newFollowUps, lastFollow, moveTag);
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

function getUserTaskProgress() {
  return liveApi.get('xlive/app-ucenter/v1/userTask/GetUserTaskProgress');
}
function receiveTaskReward$1() {
  return liveApi.post('xlive/app-ucenter/v1/userTask/UserTaskReceiveRewards', {
    task_id: TaskConfig.USERID,
    csrf: TaskConfig.BILIJCT
  });
}

async function getTaskStatus() {
  try {
    const {
      code,
      message,
      data
    } = await getUserTaskProgress();
    if (code !== 0) {
      logger.warn(`获取任务进度失败：${code}-${message}`);
      return -1;
    }
    const {
      status,
      progress
    } = data;
    if (status === 0 || status === 1) {
      logger.debug(`任务进度：${progress}`);
      return progress + 10;
    }
    return status;
  } catch (error) {
    logger.error('获取任务进度异常', error);
    return -1;
  }
}
async function receiveTaskReward() {
  try {
    const {
      code,
      message
    } = await receiveTaskReward$1();
    if (code !== 0) {
      logger.warn(`领取任务奖励失败：${code}-${message}`);
      return false;
    }
    logger.info('领取任务奖励成功');
    return true;
  } catch (error) {
    logger.error('领取任务奖励异常', error);
    return false;
  }
}
async function dailyBattery$2() {
  const status = await getTaskStatus();
  switch (status) {
    case -1:
      {
        return false;
      }
    case 2:
      {
        return await receiveTaskReward();
      }
    case 3:
      {
        logger.info('任务已完成');
        return true;
      }
    default:
      {
        logger.debug(`发送弹幕`);
        for (let index = 0; index < 15 - status; index++) {
          await sendOneMessage(7734200, 'bili官方');
          await apiDelay(10000, 15000);
        }
        return false;
      }
  }
}
async function dailyBatteryService() {
  for (let index = 0; index < 2; index++) {
    const result = await dailyBattery$2();
    if (result) return;
    await apiDelay();
  }
}

async function dailyBattery() {
  logger.info('----【获取每日电池】----');
  try {
    await dailyBatteryService();
  } catch (error) {
    logger.error(`获取每日电池出现异常`, error);
  }
}

var dailyBattery$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': dailyBattery
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
  const {
    customUrl,
    proxyPrefix
  } = TaskConfig.activityLottery;
  const header = {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br'
    },
    decompress: true,
    timeout: 10000
  };
  const protocol = `\u0068\u0074\u0074\u0070\u0073`;
  let ghUrl = `${protocol}:\u002f\u002f\u0072\u0061\u0077.\u0067\u0069\u0074\u0068\u0075\u0062\u0075\u0073\u0065\u0072\u0063\u006f\u006e\u0074\u0065\u006e\u0074.\u0063\u006f\u006d\u002f\u004b\u0075\u0064\u006f\u0075\u0052\u0061\u006e\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061\u002f\u0061\u0063\u0074\u0069\u0076\u0069\u0074\u0079\u002f\u0064\u0061\u0074\u0061\u002f\u0065\u0039\u0062\u0034\u0037\u0035\u0066\u0032\u0061\u0061.go`;
  if (proxyPrefix) {
    ghUrl = `${proxyPrefix}${ghUrl}`;
  }
  return Promise.any([ghUrl, customUrl].map(url => defHttp.get(url, header)));
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
  return (_lastRunAt$TaskConfig = lastRunAt[TaskConfig.USERID]) === null || _lastRunAt$TaskConfig === void 0 ? void 0 : _lastRunAt$TaskConfig.startsWith(getPRCDate().toLocaleString('zh-CN').split(' ')[0]);
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
  FEW_OPINION: 2,
  被排除: 3,
  不参考: 4
};
const VoteResCode = {
  成功: 0,
  没有资格: 25005,
  资格过期: 25006,
  没有新案件: 25008,
  已完成: 25014
};

const juryLogger = new Logger({
  console: 'debug',
  file: 'debug',
  push: 'warn'
}, 'jury');
const request = getRequestNameWrapper({
  logger: juryLogger
});
const Count = {
  tatol: 0,
  confirm: 0,
  def: 0,
  opinion: 0,
  view: 0,
  error: 0
};
function initCount() {
  Count.tatol = 0;
  Count.confirm = 0;
  Count.def = 0;
  Count.opinion = 0;
  Count.view = 0;
  Count.error = 0;
}
function voteCase(caseId, vote) {
  try {
    Count.tatol++;
    return juryCaseVote(caseId, vote, getRandomItem(TaskConfig.jury.insiders), getRandomItem(TaskConfig.jury.anonymous));
  } catch (error) {
    Count.error++;
    throw error;
  }
}
function getMoreOpinion(caseId, opinions) {
  const opinionStatistics = {};
  const {
    insiderWeight = 1
  } = TaskConfig.jury;
  for (const opinion of opinions) {
    if (Reflect.has(opinionStatistics, opinion.vote)) {
      opinion.insiders ? opinionStatistics[opinion.vote]++ : opinionStatistics[opinion.vote] += insiderWeight;
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
    if (TaskConfig.jury.notOpinion.includes(vote2Option(opinion.vote))) {
      juryLogger.debug(`配置已经排除掉${JuryVote[opinion.vote]}，转为默认投票`);
      return JuryVoteResult.被排除;
    }
    const vote = opinion.vote;
    juryLogger.verbose(`为【${caseId}】选择了【${JuryVote[vote]}】（${vote}）`);
    await caseConfirm(caseId);
    Count.opinion++;
    const {
      code,
      message
    } = await voteCase(caseId, vote);
    if (code !== 0) {
      logger.warn(`为案件【${caseId}】投票失败，【${code}】【${message}】`);
      return JuryVoteResult.ERROR;
    }
    juryLogger.info(`成功根据【${opinion.uname}】的观点为案件【${caseId}】投下【${JuryVote[vote]}】`);
    return JuryVoteResult.SUCCESS;
  } catch (error) {
    logger.error(`为案件【${caseId}】投票异常，错误信息：${error}`);
  }
  return JuryVoteResult.UNKNOWN;
}
function vote2Option(vote) {
  if (vote < 10) return vote - 1;
  return vote - 11;
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
    Count.def++;
    const vote = await voteCase(caseId, selectedVote.vote);
    if (vote.code === 0) {
      juryLogger.info(`成功根据【配置文件】为案件【${caseId}】投下【${selectedVote.vote_text}】`);
      return true;
    }
    logger.warn(`为案件【${caseId}】默认投票失败，【${vote.code}】【${vote.message}】`);
    return false;
  } catch (error) {
    logger.error(`风纪委员默认投票异常，错误信息：${error}`);
  }
  return false;
}
async function caseConfirm(caseId) {
  try {
    juryLogger.debug(`开始案件【${caseId}】`);
    Count.confirm++;
    const {
      code,
      message
    } = await voteCase(caseId, 0);
    if (code !== 0) {
      logger.warn(`确认案件【${caseId}】失败，【${code}】【${message}】`);
      throw new Error(message);
    }
    await apiDelay(12222, 17777);
  } catch (error) {
    logger.error(`确认案件【${caseId}】异常，错误信息：${error.message}`);
    throw error;
  }
}
async function runJury(err = 3) {
  const errRef = {
    value: err
  };
  while (errRef.value > 0) {
    if (await runOneJury(errRef)) break;
    await apiDelay(2000, 5000);
  }
  await debugInfo();
  if (errRef.value <= 0) {
    logger.error(`错误次数过多，结束任务！`);
    return false;
  }
}
async function debugInfo() {
  logger.verbose(`\n[debug] ${JSON5.stringify(Count, null, 2)}`);
  const vote = Count.def + Count.opinion;
  if (vote !== Count.confirm) {
    logger.warn(`[debug] 最终投票数（${Count.def},${Count.opinion}）与确认案件数（${Count.confirm}）不一致`);
  }
  if (vote + Count.confirm !== Count.tatol) {
    logger.warn(`[debug] 获取到案件信息的次数与投票次数不一致！`);
  }
  if (Count.error > 0) {
    logger.warn(`[debug] 投票过程中出现了${Count.error}次错误`);
  }
}
async function runOneJury(errRef) {
  try {
    const {
      code,
      data,
      message
    } = await getJuryCaseVote();
    switch (code) {
      case VoteResCode.成功:
        Count.view++;
        return await handleSuccess(data, errRef);
      case VoteResCode.资格过期:
        return await handleJudgeExpired(message);
      case VoteResCode.没有新案件:
        return await handleNoNewCase(message, errRef);
      case VoteResCode.已完成:
        return await handleCaseFull(message);
      default:
        return await handleOtherError(code, message, errRef);
    }
  } catch (error) {
    logger.error(`风纪委员投票异常，错误信息：${error}`);
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
async function handleNoNewCase(message, errRef) {
  juryLogger.info(`${message}`);
  if (!TaskConfig.jury.once && errRef) {
    return true;
  }
  if (ENV.fc || ENV.scf) {
    const r = await waitForServerless();
    if (r) {
      logger.info(`通过新建云函数休眠！`);
      return true;
    }
  }
  return await waitFor();
}
async function waitForServerless() {
  if (!TaskConfig.jury.newTrigger) {
    return false;
  }
  const {
    dailyHandler,
    getClinet
  } = await Promise.resolve().then(function () { return index$1; });
  const client = await getClinet(dailyHandler.slsType);
  if (!client.client) return false;
  const now = getPRCDate(),
    nowMinutes = now.getMinutes() + (TaskConfig.jury.waitTime || 20),
    minutes = nowMinutes % 60,
    hours = now.getHours() + (nowMinutes >= 60 ? 1 : 0);
  const triggerTime = formatCron({
    hours,
    minutes
  }, dailyHandler.slsType);
  juryLogger.info(`更新云函数定时器为：${triggerTime.string}`);
  try {
    return await (client === null || client === void 0 ? void 0 : client.createTrigger({
      TriggerDesc: triggerTime.value,
      TriggerName: 'jury_wait'
    }, {
      task: 'loginTask,judgement,noPush'
    }));
  } catch (error) {
    juryLogger.debug(error.message);
  }
  return false;
}
async function deleteServerless() {
  if (!(ENV.fc || ENV.scf)) return false;
  if (!TaskConfig.jury.newTrigger) return false;
  try {
    const {
      dailyHandler,
      getClinet
    } = await Promise.resolve().then(function () { return index$1; });
    const client = await getClinet(dailyHandler.slsType);
    if (!client.client) return false;
    return await (client === null || client === void 0 ? void 0 : client.deleteTrigger('jury_wait'));
  } catch (error) {
    juryLogger.debug(error.message);
  }
  return false;
}
async function handleCaseFull(message) {
  logger.info(`${message}`);
  await deleteServerless();
  return true;
}
async function handleOtherError(code, message, errRef) {
  logger.warn(`获取风纪委员案件失败，错误码：【${code}】，信息为：【${message}】`);
  if (code === VoteResCode.没有资格) {
    logger.warn(`如果需要请手动申请风纪委员，对于从来没有当过的用户，我们默认你配置错误。`);
    return true;
  }
  errRef.value -= 1;
  await apiDelay(20000, 40000);
  return false;
}
async function isByOpinion(case_id) {
  if (TaskConfig.jury.opinion) {
    return await voteJuryByOpinion(case_id);
  }
  return JuryVoteResult.不参考;
}
async function handleSuccess({
  case_id = ''
}, errRef) {
  if (!case_id) {
    errRef.value -= 1;
    return;
  }
  const voteResult = await isByOpinion(case_id);
  if (voteResult === JuryVoteResult.SUCCESS) return;
  if (voteResult < JuryVoteResult.SUCCESS) {
    errRef.value -= 1;
    return;
  }
  const suc = await replenishVote(case_id, getRandomItem(TaskConfig.jury.vote));
  if (!suc) {
    errRef.value -= 1;
  }
}
async function juryService() {
  try {
    initCount();
    return await runJury();
  } catch (error) {
    logger.error(`jury 错误信息为：${error}`);
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
