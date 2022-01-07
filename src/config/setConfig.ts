import { resolve } from 'path';
import { isQingLongPanel } from '../utils/env';
import { Config } from '../interface/Config';
import { gzipDecode } from '../utils/gzip';

function errorHandle(): never {
  throw new Error('配置文件不存（位置不正确）在或 cookie 不存在！！！');
}

const getCurDirConfig = (configFileName = 'config.json'): Config => {
  try {
    return require(`./${configFileName}`);
  } catch {
    // 暂时兼容旧版本处理
    try {
      return require(`./config.json`);
    } catch {}
  }
  return null;
};

const getRootDirConfig = (configFileName = 'config.json'): Config => {
  try {
    return require(resolve(process.cwd(), `./config/${configFileName}`));
  } catch {
    // 暂时兼容旧版本处理
    try {
      return require(resolve(process.cwd(), `./config/config.json`));
    } catch {}
  }
  return null;
};

const getEnvConfig = (): Config => {
  const BILI_CONFIG = process.env.BILI_SCF_CONFIG || process.env.BILI_CONFIG;
  if (!BILI_CONFIG) {
    return null;
  }
  try {
    return JSON.parse(gzipDecode(BILI_CONFIG));
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

function handleQLPanel(configArr: Config[]): Config {
  const arg2 = process.argv.find(
    arg => arg.includes('--item') || arg.includes('-i') || arg.includes('-I'),
  );
  if (!arg2) {
    return configArr[0];
  }
  // 下标从 1 开始
  const index = Number(arg2.split('=')[1]) - 1;
  if (!index || index >= configArr.length || index < 0) {
    console.log('[WARN] 似乎想要指定一个不存在的用户，我们将指定第一个用户');
    return configArr[0];
  }
  return configArr[index];
}

/**
 * 处理多用户配置
 */
function handleMultiUserConfig(config: Config): Config | undefined {
  // 防止错误的将 account 用在配置中
  // @ts-ignore
  const newConfig = (config.account as Config[]).filter(conf => conf.cookie);

  if (newConfig.length === 0) {
    return undefined;
  }

  if (isQingLongPanel()) {
    return handleQLPanel(newConfig);
  }

  console.log('[WARN] 在单用户场景下配置了多用户，我们将放弃多余的配置');
  // 合并 message 配置
  const conf = newConfig[0];
  conf.message = Object.assign(config.message, conf.message);
  return conf;
}

function setConfigFileName() {
  if (isQingLongPanel()) {
    return 'cat_bili_config.json';
  }
  return 'config.json';
}

export function setConfig(): Config {
  const cfn = setConfigFileName();

  const config = getDevConfig() || getCurDirConfig(cfn) || getRootDirConfig(cfn) || getEnvConfig();
  if (!config) {
    errorHandle();
  }

  // @ts-ignore
  if (config.account && config.account.length) {
    const multiUserConfig = handleMultiUserConfig(config);
    if (multiUserConfig) {
      return multiUserConfig;
    }
    // 多用户配置错误，看单用户是否配置
  }

  if (!config.cookie) {
    errorHandle();
  }

  return config;
}

export const userConfig = setConfig();

export default userConfig;
