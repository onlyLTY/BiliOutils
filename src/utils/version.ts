import * as path from 'path';
import * as fs from 'fs';
import { defHttp } from './axios';
import { logger } from './log';

/**
 * 获取最新版本
 */
async function getLatestVersion(): Promise<string> {
  const options = {
    timeout: 6000,
  };
  try {
    const data = await Promise.any([
      defHttp.get('https://api.github.com/repos/catlair/BiliTools/releases/latest', options),
      defHttp.get('https://gitee.com/api/v5/repos/catlair/BiliTools/releases/latest', options),
    ]);
    return data.tag_name;
  } catch (error) {
    return;
  }
}

/**
 * 打印版本
 */
export async function printVersion() {
  let version = '__BILI_VERSION__';
  // 如果 version 被替换，则直接打印
  if (version.includes('.')) {
    printStrVersion();
  } else {
    version = undefined;
  }
  try {
    // 如果没有获取到版本，则尝试获取
    if (!version) {
      version = getVersionByPkg() || getVersionByFile();
      logger.info(`当前版本【v${version}】`);
    }
    const latestTag = await getLatestVersion();
    if (version && latestTag && latestTag !== `v${version}`) {
      logger.info(`可更新：最新版本【${latestTag}】`);
    }
  } catch {}
}

function getVersionByPkg() {
  try {
    return require('../../package.json').version;
  } catch {}
}

function getVersionByFile() {
  try {
    return fs.readFileSync(path.resolve(__dirname, '../version.txt'), 'utf8').trim();
  } catch {}
}

export function printStrVersion() {
  logger.info(`当前版本【__BILI_VERSION__】`);
}
