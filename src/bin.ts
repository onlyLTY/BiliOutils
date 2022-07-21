#! /usr/bin/env node

import { getArg, isArg } from './utils/args';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { defLogger } from './utils/Logger';
import { config, runTask } from './util';

const pkg = require('../package.json');

process.env.IS_LOCAL = 'true';

const USAGE = `
Usage:
  bilitools [options] [value]
  bilitools [options]=[value]

Options:
  --version, -v             输出版本号
  --help, -h                输出帮助信息
  --config, -c <path>       配置文件路径
    eg: --config=./config.json
  --once, -o                每日任务只执行一次
  --task, -t <taskString>   执行指定的 task，使用英文逗号（,）分隔
    eg: --task=loginTask,judgement
  --item, -i <item>         多用户配置执行指定的配置，下标 1 开始（倒数 -1 开始），使用英文逗号（,）分隔
    eg: --item=2
    
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
    const configs = await config();
    if (isArg('task')) {
      return await runTask(configs, './bin/inputTask', getArg('task'));
    }
    if (isTodayRun(jobsPath)) return;
    await runTask(configs);
    remember(jobsPath);
    return;
  }
  process.stdout.write(USAGE);
})();

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
      defLogger.info('今日已经运行过');
      return true;
    }
  }
}
