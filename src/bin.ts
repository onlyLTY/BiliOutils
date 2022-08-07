#! /usr/bin/env node

import type { Config } from './types/config';
import { getArg, isArg } from './utils/args';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { config, runTask, waitForArgs } from './util';
import * as cron from 'node-cron';

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
  --cron <cronString>       cron 表达式，see：https://github.com/node-cron/node-cron#allowed-fields
    eg: --cron="0 0 0 * * *"
  --delay <time[-time]>     不带单位是延迟 time 分钟后执行，单位可以为 ms（毫秒）、s（秒）、m（分）、h（小时）
    eg: --delay=10 延迟 0-10 分钟后执行
        --delay=10m-2h 延迟 10分钟-2小时 后执行

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
    return await run();
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
async function isTodayRun(jobsPath: string) {
  if (!isArg('once')) {
    return;
  }
  // 读取配置文件同路径 bt_jobs.json
  const jobsObj = JSON.parse(readFileSync(jobsPath, 'utf-8'));
  if (jobsObj.lastRun) {
    // lastRun 是否是今天
    const lastRun = new Date(jobsObj.lastRun);
    const today = new Date();
    const { defLogger } = await import('./utils/Logger');
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

async function run() {
  const configDir = dirname(resolve(process.cwd(), getArg('config')));
  const jobsPath = resolve(configDir, 'bt_jobs.json');
  const configs = await config();
  const cronStr = getArg('cron', false);

  if (cron.validate(cronStr)) {
    process.stdout.write(`等待运行：cron ${cronStr}\n`);
    const cronTask = cron.schedule(
      cronStr,
      async () => {
        await waitForArgs();
        await argTaskHandle(jobsPath, configs);
      },
      { timezone: 'Asia/Shanghai' },
    );
    cronTask.start();
    return;
  }

  await waitForArgs();
  return await argTaskHandle(jobsPath, configs);
}

async function argTaskHandle(jobsPath: string, configs: Config[]) {
  if (isArg('task')) {
    return await runTask(configs, './bin/inputTask', getArg('task'));
  }
  if (await isTodayRun(jobsPath)) return;
  await runTask(configs);
  remember(jobsPath);
}
