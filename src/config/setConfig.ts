import { resolve } from 'path';
import { Config } from '../interface/Config';
import { gzipDecode } from '../utils/gzip';

const getCurDirConfig = (): Config => {
  try {
    return require('./config.json');
  } catch {}
  return null;
};

const getRootDirConfig = (): Config => {
  try {
    return require(resolve(process.cwd(), './config/config.json'));
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

const getDevConfig = (): Config => {
  try {
    return require(resolve(process.cwd(), './config/config.dev.json'));
  } catch {}
  return null;
};

export function setConfig(): Config {
  const config = getDevConfig() || getCurDirConfig() || getRootDirConfig() || getEnvConfig();
  // @ts-ignore
  if (config.account && config.account.length) {
    // 防止错误的将 account 用在配置中
    // @ts-ignore
    const newConfig = (config.account as Config[]).find(cfg => cfg.cookie);
    if (newConfig) {
      console.log('[WARN] 在单用户场景下配置了多用户，我们将放弃多余的配置');
      // 合并 message 配置
      newConfig.message = Object.assign(config.message, newConfig.message);
      return newConfig;
    }
  } else if (config?.cookie) {
    return config;
  }
  throw new Error('配置文件不存（位置不正确）在或 cookie 不存在！！！');
}

export const userConfig = setConfig();

export default userConfig;
