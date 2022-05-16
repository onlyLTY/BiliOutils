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
    return;
  } else if (isArg('--help') || isArg('-h')) {
    process.stdout.write(USAGE);
    return;
  } else if (isArg('--config') || isArg('-c')) {
    const { getArgsConfigFile } = require('./config/setConfig');
    const { TaskConfig } = require('./config/globalVar');
    let index: number;
    if (isArg('--config')) {
      index = args.indexOf('--config');
    } else {
      index = args.indexOf('-c');
    }
    TaskConfig.config = getArgsConfigFile(resolve(process.cwd(), args[index + 1]));
  }
  const task = await import('./task/dailyTask');
  await task.dailyTasks();
})();
