#! /usr/bin/env node

const pkg = require('../package.json');
const { resolve } = require('path');

const args = process.argv.slice(2);
process.env.IS_LOCAL = 'true';

const USAGE = `
Usage:
  bilitools [options] [value]

Options:
  --version, -v             输出版本号
  --help, -h                输出帮助信息
  --config, -c              配置文件路径
    eg: --config ./config.json
`;

function isArg(arg: string) {
  return args.some(function (str) {
    return str === arg || str.indexOf(arg + '=') === 0;
  });
}

(async () => {
  if (isArg('--version') || isArg('-v')) {
    process.stdout.write('BiliTools v' + pkg.version + '\n');
  } else if (isArg('--help') || isArg('-h')) {
    process.stdout.write(USAGE);
  } else if (isArg('--config') || isArg('-c')) {
    const configs = await config();
    const { initialize } = await import('./config/globalVar');
    initialize(configs[0]);
    const task = await import('./task/dailyTask');
    process.stdout.write(`正在执行第1个配置\n`);
    await task.dailyTasks();
    process.stdout.write('执行完毕\n');
    for (let index = 1; index < configs.length; index++) {
      process.stdout.write(`正在执行第${index + 1}个配置\n`);
      initialize(configs[index]);
      await task.dailyTasks();
      process.stdout.write('执行完毕\n');
    }
  }
})();

/**
 * 获取配置
 */
async function config() {
  const { getConfigPathFile } = await import('./config/setConfig');
  let index: number;
  if (isArg('--config')) {
    index = args.indexOf('--config');
  } else {
    index = args.indexOf('-c');
  }
  const configs = getConfigPathFile(resolve(process.cwd(), args[index + 1]));
  if (!configs.length) {
    throw new Error('配置文件不存在');
  }
  return configs;
}
