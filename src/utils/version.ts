import * as path from 'path';
import * as fs from 'fs';
import { defHttp } from './http';

/**
 * 获取最新版本
 */
async function getLatestVersion() {
  const options = {
    timeout: 6000,
  };
  try {
    const data = await Promise.any([
      defHttp.get('https://api.github.com/repos/KudouRan/BiliTools/releases/latest', options),
      defHttp.get('https://gitee.com/api/v5/repos/KudouRan/BiliTools/releases/latest', options),
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
  const { logger } = await import('./log');
  let version = '__BILI_VERSION__';
  // 如果 version 被替换，则直接打印
  if (version.includes('.')) {
    logger.info(`当前版本【__BILI_VERSION__】`);
  } else {
    version = '';
  }
  try {
    // 如果没有获取到版本，则尝试获取
    if (!version) {
      version = 'v' + (getVersionByPkg() || getVersionByFile());
      logger.info(`当前版本【${version}】`);
    }
    if (!version) {
      return;
    }
    const latestTag = await getLatestVersion();
    if (latestTag && checkVersion(version, latestTag)) {
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

/**
 * 检查版本是否可更新
 * @param version 当前版本
 * @param latestTag 最新版本
 */
export function checkVersion(version: string, latestTag: string) {
  if (version.startsWith('v')) {
    version = version.substring(1);
  }
  if (latestTag.startsWith('v')) {
    latestTag = latestTag.substring(1);
  }
  if (version === latestTag) {
    return false;
  }
  const versionArr = version.split('.'),
    latestTagArr = latestTag.split('.');
  for (let i = 0; i < versionArr.length; i++) {
    const versionNum = parseInt(versionArr[i]),
      latestTagNum = parseInt(latestTagArr[i]);
    if (isNaN(versionNum) || isNaN(latestTagNum)) {
      return true;
    }
    if (versionNum < latestTagNum) {
      return true;
    }
  }
  return false;
}
