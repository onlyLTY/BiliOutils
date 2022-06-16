import type { Config, MultiConfig } from '../types';
import * as path from 'path';
import { logger } from '../utils/log';
import { gzipDecode } from '../utils/gzip';
import { SystemConfig } from './systemConfig';
import { readJsonFile } from '@/utils/file';
import { JSON5 } from '../utils/json5';

const resolveCWD = (str: string) => path.resolve(process.cwd(), str);
const resolveDir = (str: string) => path.resolve(__dirname, '../', str);

function jsonErrorHandle(message: string) {
  if (message.includes && message.includes('in JSON at position')) {
    throw new Error('配置文件存在，但是无法解析！可能 JSON 格式不正确！');
  }
}

const configPathArr = Array.from(
  new Set([
    resolveCWD('./config/config.dev.json'),
    resolveCWD(`./config/${SystemConfig.configFileName}`),
    resolveCWD(`./${SystemConfig.configFileName}`),
    resolveDir(`./config/${SystemConfig.configFileName}`),
    resolveDir(`./${SystemConfig.configFileName}`),
  ]),
);

/**
 * 兼容，随时删除
 */
const qlOldConfigArr = ['./config.json', resolveCWD('./config/config.json')];

const getEnvConfig = (): Config => {
  const { BILITOOLS_CONFIG, BILI_SCF_CONFIG, BILI_CONFIG } = process.env;
  const config = BILITOOLS_CONFIG || BILI_SCF_CONFIG || BILI_CONFIG;
  if (!config) {
    return undefined;
  }
  try {
    return JSON5.parse(gzipDecode(config));
  } catch (error) {
    logger.error(error);
    throw new Error('环境中的配置不是有效的 JSON 字符串！');
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
function handleMultiUserConfig(config: MultiConfig | Config[]): Config {
  let newConfig: Config[];
  const isArray = Array.isArray(config);
  if (isArray) {
    newConfig = config;
  } else {
    // [兼容]
    // 防止错误的将 account 用在配置中
    newConfig = config.account.filter(conf => conf.cookie);
  }

  if (newConfig.length === 0) {
    return undefined;
  }

  if (SystemConfig.isQingLongPanel) {
    return handleQLPanel(newConfig);
  }
  logger.warn('在单用户场景下配置了多用户，我们将放弃多余的配置');
  // [兼容]
  // 合并 message 配置
  const conf = newConfig[0];
  if (!isArray) {
    conf.message = Object.assign(config.message || {}, conf.message);
  }
  return conf;
}

export function getConfigPathFile(filepath: string): Config[] {
  try {
    const config = readJsonFile(filepath);
    if (isMultiUserConfig(config)) {
      return filterMultiUserConfig(config);
    }
    return [config];
  } catch (error) {
    logger.error(error);
    jsonErrorHandle(error.message);
    throw new Error(error.message || '配置文件不存在！');
  }
}

/** 设置 config */
function setConfig() {
  if (globalThis.BILITOOLS_CONFIG) {
    return globalThis.BILITOOLS_CONFIG;
  }

  if (SystemConfig.isQingLongPanel) {
    configPathArr.splice(0, 1, ...qlOldConfigArr);
  }
  for (let index = 0; index < configPathArr.length; index++) {
    const config = readJsonFile<Config>(configPathArr[index]);
    if (config) {
      return config;
    }
  }
  return getEnvConfig();
}

export function getConfig<T extends boolean>(more?: T): T extends false ? Config : Config[] {
  return checkConfig(setConfig(), more);
}

/** 检查 config */
export function checkConfig(config: any, more = false) {
  if (!config) {
    throw new Error('获取配置失败！未找到配置文件！');
  }

  if (more) {
    return filterMultiUserConfig(isMultiUserConfig(config) ? config : [config]);
  }

  if (isMultiUserConfig(config)) {
    const multiUserConfig = handleMultiUserConfig(config);
    if (multiUserConfig) {
      return multiUserConfig;
    }
    // 多用户配置错误，看单用户是否配置
  }

  if (!config.cookie) {
    throw new Error('配置文件中没有 cookie！');
  }

  return config;
}

/**
 * 判断 config 是否是多用户配置
 * @param config
 */
function isMultiUserConfig(config: MultiConfig | Config[]) {
  if (Array.isArray(config)) {
    return true;
  }
  // [兼容]
  return Boolean(config.account && config.account.length);
}

/**
 * 过滤出有效的多用户配置
 * @param config
 */
function filterMultiUserConfig(config: MultiConfig | Config[]) {
  const filter = (conf: Config) =>
    conf.cookie &&
    conf.cookie.length > 90 &&
    ['bili_jct', 'SESSDATA', 'DedeUserID'].every(str => conf.cookie.includes(str));
  if (Array.isArray(config)) {
    return config.filter(filter);
  }
  // [兼容]
  return config.account.filter(filter);
}
