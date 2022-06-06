#! /usr/bin/env node

import { getArg, isArg } from './utils/args';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const pkg = require('../package.json');

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
  if (isArg('version')) {
    process.stdout.write('BiliTools v' + pkg.version + '\n');
    process.stdout.write(`node ${process.version}\n`);
    process.stdout.write(`platform ${process.platform} ${process.arch}\n`);
    return;
  }
  if (isArg('help')) {
    process.stdout.write(USAGE);
    return;
  }
  if (isArg('config')) {
    const configDir = dirname(resolve(process.cwd(), getArg('config')));
    const jobsPath = resolve(configDir, 'bt_jobs.json');
    if (isTodayRun(jobsPath)) return;
    await runTask();
    remember(jobsPath);
    return;
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
export async function runTask() {
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

/**
 * 记住本次运行情况
 */
function remember(jobsPath: string) {
  // 写进 config 同级 bt_jobs.json
  const jobsObj = {
    lastRun: new Date().getTime(),
  };
  writeFileSync(jobsPath, JSON.stringify(jobsObj));
}

/**
 * 判断今日是否已经运行过
 */
function isTodayRun(jobsPath: string) {
  if (!isArg('once')) {
    return;
  }
  // 读取配置文件同路径 bt_jobs.json
  const jobsObj = JSON.parse(readFileSync(jobsPath, 'utf-8'));
  if (jobsObj.lastRun) {
    // lastRun 是否是今天
    const lastRun = new Date(jobsObj.lastRun);
    const today = new Date();
    if (
      lastRun.getFullYear() === today.getFullYear() &&
      lastRun.getMonth() === today.getMonth() &&
      lastRun.getDate() === today.getDate()
    ) {
      process.stdout.write('今日已经运行过\n');
      return true;
    }
  }
}
