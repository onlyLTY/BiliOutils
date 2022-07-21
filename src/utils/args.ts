/**
 * 获取参数
 * 以下四种代码等效
 * --arg value
 * -a value
 * --arg=value
 * -a=value
 */
export function getArg(arg: string, shortStr?: string | false) {
  const args = process.argv.slice(2);

  // 判断 --arg value
  const argIndex = args.indexOf(`--${arg}`);
  if (argIndex !== -1) {
    return args[argIndex + 1];
  }
  // 判断 --arg=value
  const thisArg = args.find(str => str.startsWith(`--${arg}=`));
  if (thisArg) {
    return thisArg.split('=')[1];
  }
  if (shortStr === false) return;
  if (!shortStr) {
    shortStr = arg.at(0);
  }
  // 判断 -a value
  const shortIndex = args.indexOf(`-${shortStr}`);
  if (shortIndex !== -1) {
    return args[shortIndex + 1];
  }
  // 判断 -a=value
  const thisShort = args.find(str => str.startsWith(`-${shortStr}=`));
  if (thisShort) {
    return thisShort.split('=')[1];
  }
}

/**
 * 是否存在参数（有的参数并不需要值）
 */
export function isArg(arg: string, shortStr?: string | false) {
  const args = process.argv.slice(2);
  const longArg = Boolean(
    args.indexOf(`--${arg}`) !== -1 || args.find(str => str.startsWith(`--${arg}=`)),
  );
  if (shortStr === false) return;
  shortStr = shortStr || arg.at(0);
  const shortArg = Boolean(
    args.indexOf(`-${shortStr}`) !== -1 || args.find(str => str.startsWith(`-${shortStr}=`)),
  );
  return longArg || shortArg;
}
