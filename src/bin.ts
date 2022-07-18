#! /usr/bin/env node

import { getArg, isArg } from './utils/args';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { logger } from './utils/log';
import { runTask } from './util';

const pkg = require('../package.json');

process.env.IS_LOCAL = 'true';

const USAGE = `
Usage:
  bilitools [options] [value]

Options:
  --version, -v             输出版本号
  --help, -h                输出帮助信息
  --config, -c <path>       配置文件路径
    eg: --config ./config.json
  --once, -o                每日任务只执行一次
  --task, -t <taskString>   执行指定的 task
    
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
    if (isArg('task')) {
      return await runCmdTask();
    }
    const configDir = dirname(resolve(process.cwd(), getArg('config')));
    const jobsPath = resolve(configDir, 'bt_jobs.json');
    if (isTodayRun(jobsPath)) return;
    await runTask(await config());
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
      logger.error('配置文件不存在');
      throw new Error('配置文件不存在');
    }
    return configs;
  } catch (error) {
    logger.error('配置路径可能存在问题');
    logger.error(error.message);
  }
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
      logger.info('今日已经运行过');
      return true;
    }
  }
}

/**
 * 执行命令行参数的 task
 */
async function runCmdTask() {
  const task = getArg('task');
  const { runInputBiliTask } = await import('./task');
  await runInputBiliTask(task);
}
