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
  try {
    const version = getVersionByPkg() || getVersionByFile();
    if (version) {
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
