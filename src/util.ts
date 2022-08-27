import type { Config } from './types';
import { resolve } from 'path';
import { fork } from 'child_process';
import * as path from 'path';
import { getArg } from './utils/args';
import { getDelayTime, random, Sleep } from './utils/pure';
import { deleteLogFile } from './utils/log/file';

/**
 * 获取配置
 */
export async function config() {
  const { getConfigPathFile } = await import('./config/setConfig');
  const configPath = getArg('config') as string;
  try {
    const configs = getConfigPathFile(resolve(process.cwd(), configPath));
    if (!configs.length) {
      process.stderr.write('配置文件不存在');
      throw new Error('配置文件不存在');
    }
    const itemIndex = getArg('item');
    if (itemIndex) {
      return getConfigByItem(configs, itemIndex);
    }
    return configs;
  } catch (error) {
    process.stderr.write('配置路径可能存在问题');
    process.stderr.write(error.message);
  }
}

/**
 * 通过 item 列表获取配置
 */
export function getConfigByItem(configs: Config[], item: string) {
  const len = configs.length;
  return item
    .split(',')
    .filter(el => el)
    .map(item => configs.at(getItemIndex(item, len))!)
    .filter(el => el);
}

export function runForkSync(config: Config, index: number, forkPath = './bin/fork', tasks = '') {
  return new Promise((resolve, reject) => {
    const child = fork(path.resolve(__dirname, forkPath), [], {
      env: {
        ...process.env,
        __BT_CONFIG__: JSON.stringify(config),
        __BT_TASKS_STRING__: tasks,
        __BT_CONFIG_ITEM__: index.toString(),
      },
    });
    child.once('exit', code => {
      if (code === 0) {
        resolve(code);
        return;
      }
      reject(code);
    });
    child.on('message', msg => {
      if (msg === true) {
        resolve(true);
      }
    });
    child.once('error', err => {
      reject(err);
    });
  });
}

export async function runTask(configs?: Config[], forkPath = './bin/fork', tasks = '') {
  deleteLogFile();
  if (!configs) {
    const { getConfig } = await import('./config/setConfig');
    configs = getConfig(true);
  }
  const length = configs.length;
  if (process.env.BILITOOLS_IS_ASYNC) {
    return await runTaskAsync(
      configs.map((config, index) => runForkSync(config, index, forkPath, tasks)),
    );
  }
  for (let index = 0; index < length; index++) {
    const config = configs[index];
    process.stdout.write(`正在执行第${index + 1}/${length}个配置\n`);
    try {
      await runForkSync(config, index, forkPath, tasks);
    } catch (error) {
      process.stdout.write(`${error.message}`);
    }
    process.stdout.write('执行完毕\n\n');
  }
}

function getItemIndex(item: string, len: number) {
  const itemNum = Number(item);
  // 超出范围的返回第一个
  if (itemNum > len || itemNum < -len) return 0;
  if (itemNum < 0) return itemNum;
  // 下标从 1 开始，所以 -1
  if (itemNum > 0) return itemNum - 1;
  return 0;
}

async function runTaskAsync(forkPromises: Promise<any>[]) {
  try {
    return await Promise.all(forkPromises);
  } catch (error) {
    process.stdout.write(`${error.message}`);
  }
  process.stdout.write('执行完毕\n\n');
}

/** 运行前休眠 */
export async function waitForArgs() {
  const delay = getArg('delay', false);
  if (delay) {
    const [delay1, delay2] = getDelayTime(delay);
    const delayTime = random(delay1, delay2);
    await printWaitTime(delayTime);
    await Sleep.wait(delayTime);
    return true;
  }
}

async function printWaitTime(delayTime: number) {
  const { defLogger } = await import('./utils/log/def');
  if (delayTime < 1000) {
    defLogger.info(`休眠 ${delayTime} 毫秒`);
    return;
  }
  const endTime = new Date(new Date().getTime() + delayTime),
    endTimeString = endTime.toLocaleTimeString('zh-CN');
  if (delayTime < 60000) {
    // 输出预计运行时间
    defLogger.info(`休眠大约 ${delayTime} 毫秒，预计运行时间 ${endTimeString}`);
    return;
  }
  defLogger.info(`休眠大约 ${delayTime} 毫秒，预计运行时间 ${endTimeString}`);
}
