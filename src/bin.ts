#! /usr/bin/env node

import { getArg } from './utils/args';

const pkg = require('../package.json');
const { resolve } = require('path');

process.env.IS_LOCAL = 'true';

const USAGE = `
Usage:
  bilitools [options] [value]

Options:
  --version, -v             输出版本号
  --help, -h                输出帮助信息
  --config, -c              配置文件路径
    eg: --config ./config.json
  --once, -o                每日任务只执行一次
`;

(async () => {
  if (getArg('version')) {
    process.stdout.write('BiliTools v' + pkg.version + '\n');
    return;
  }
  if (getArg('help')) {
    process.stdout.write(USAGE);
    return;
  }
  if (getArg('config')) {
    await runTask();
  }
  process.stdout.write(USAGE);
})();

/**
 * 获取配置
 */
async function config() {
  const { getConfigPathFile } = await import('./config/setConfig');
  const configPath = getArg('config');
  try {
    const configs = getConfigPathFile(resolve(process.cwd(), configPath));
    if (!configs.length) {
      throw new Error('配置文件不存在');
    }
    return configs;
  } catch (error) {
    process.stderr.write('配置路径可能存在问题' + '\n');
    process.stderr.write(error.message + '\n');
  }
}

/**
 * 运行任务
 */
async function runTask() {
  const configs = await config(),
    { initialize } = await import('./config/globalVar'),
    length = configs.length;
  initialize(configs[0]);
  const task = await import('./task/dailyTask');
  process.stdout.write(`正在执行第1/${length}个配置\n`);
  await task.dailyTasks();
  process.stdout.write('执行完毕\n\n');
  for (let index = 1; index < configs.length; index++) {
    process.stdout.write(`正在执行第${index + 1}/${length}个配置\n`);
    initialize(configs[index]);
    await task.dailyTasks();
    process.stdout.write('执行完毕\n\n');
  }
  return;
}
