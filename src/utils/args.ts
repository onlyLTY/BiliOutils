/**
 * 获取参数
 * 以下四种代码等效
 * --arg value
 * -a value
 * --arg=value
 * -a=value
 */
export function getArg(arg: string, short?: string) {
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
  if (!short) {
    short = arg.at(0);
  }
  // 判断 -a value
  const shortIndex = args.indexOf(`-${short}`);
  if (shortIndex !== -1) {
    return args[shortIndex + 1];
  }
  // 判断 -a=value
  const thisShort = args.find(str => str.startsWith(`-${short}=`));
  if (thisShort) {
    return thisShort.split('=')[1];
  }
}
