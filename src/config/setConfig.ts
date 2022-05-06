import type { Config } from '../types';
import * as path from 'path';
import { logger } from '../utils/log';
import { gzipDecode } from '../utils/gzip';
import { SystemConfig } from './systemConfig';

const resolveCWD = (str: string) => path.resolve(process.cwd(), str);

function errorHandle(msg?: string): never {
  throw new Error(msg || '获取配置失败！');
}

const configArr = [
  () => require(resolveCWD('./config/config.dev.json')),
  () => require(`./${SystemConfig.configFileName}`),
  () => require(resolveCWD(`./config/${SystemConfig.configFileName}`)),
];

/**
 * 兼容，随时删除
 */
const qlOldConfigArr = [
  () => require('./config.json'),
  () => require(resolveCWD('./config/config.json')),
];

const getEnvConfig = (): Config => {
  const { BILITOOLS_CONFIG, BILI_SCF_CONFIG, BILI_CONFIG } = process.env;
  const config = BILITOOLS_CONFIG || BILI_SCF_CONFIG || BILI_CONFIG;
  if (!config) {
    return undefined;
  }
  try {
    return JSON.parse(gzipDecode(config));
  } catch {
    errorHandle('环境中的配置不是有效的 JSON 字符串！');
  }
};

/**
 * 处理青龙面板的配置，根据参数获取第几个配置
 */
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
    logger.warn('似乎想要指定一个不存在的用户，我们将指定第一个用户');
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

  if (SystemConfig.isQingLongPanel) {
    return handleQLPanel(newConfig);
  }
  logger.warn('在单用户场景下配置了多用户，我们将放弃多余的配置');
  // 合并 message 配置
  const conf = newConfig[0];
  conf.message = Object.assign(config.message || {}, conf.message);
  return conf;
}

/** 设置 config */
function setConfig() {
  if (SystemConfig.isQingLongPanel) {
    configArr.splice(0, 1, ...qlOldConfigArr);
  }
  let hasTag = false;
  for (const fn of configArr) {
    try {
      const config = fn();
      if (config) {
        return config;
      }
      hasTag = true;
    } catch (error) {
      const { message = '' } = error;
      if (message.includes && message.includes('in JSON at position')) {
        errorHandle('配置文件存在，但是无法解析！可能 JSON 格式不正确！');
      }
    }
  }
  if (hasTag) {
    errorHandle('配置文件存在，但是无法解析！可能 JSON 格式不正确！');
  }
  return getEnvConfig();
}

export function getConfig(): Config {
  return checkConfig(setConfig());
}

/** 检查 config */
export function checkConfig(config: Config) {
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
    errorHandle('配置文件中没有 cookie！');
  }

  return config;
}
