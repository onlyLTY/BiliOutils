import { Config } from '../interface/Config';
import { gzipDecode } from '../utils';

const getCurDirConfig = (): Config => {
  try {
    return require('./config.json');
  } catch {}
  return null;
};

const getRootDirConfig = (): Config => {
  try {
    return require('../../config/config.json');
  } catch {}
  return null;
};

const getEnvConfig = (): Config => {
  const BILI_SCF_CONFIG = process.env.BILI_SCF_CONFIG;
  if (!BILI_SCF_CONFIG) {
    return null;
  }
  try {
    return JSON.parse(gzipDecode(BILI_SCF_CONFIG));
  } catch {
    throw new Error('BILI_SCF_CONFIG 配置不正确');
  }
};

export function setConfig(): Config {
  const config = getCurDirConfig() || getRootDirConfig() || getEnvConfig();
  if (config?.cookie) {
    return config;
  }
  throw new Error('配置文件不存在或不正确！！！');
}

export const userConfig = setConfig();

export default userConfig;
