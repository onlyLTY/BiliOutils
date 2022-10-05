import type { Config, ConfigArray, MultiConfig } from '@/types';
import * as path from 'path';
import { defLogger as logger } from '@/utils/log/def';
import { gzipDecode } from '@/utils/gzip';
import { SystemConfig } from './systemConfig';
import { readJsonFile } from '@/utils/file';
import { JSON5 } from '@/utils/json5';
import { isArray } from '@/utils/is';
import { isBiliCookie } from '@/utils/cookie';

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

function getEnvConfig() {
  const { BILITOOLS_CONFIG, BILI_SCF_CONFIG, BILI_CONFIG } = process.env;
  const config = BILITOOLS_CONFIG || BILI_SCF_CONFIG || BILI_CONFIG;
  if (!config) {
    return undefined;
  }
  try {
    return JSON5.parse(gzipDecode(config.trim()));
  } catch (error) {
    logger.error(error);
    throw new Error('环境中的配置不是有效的 JSON 字符串！');
  }
}

/**
 * 处理多用户配置
 */
function handleMultiUserConfig(config: MultiConfig | Config[]) {
  let newConfig: Config[];
  const isArrayConf = isArray(config);
  if (isArrayConf) {
    newConfig = config.filter(Boolean);
  } else {
    // [兼容]
    // 防止错误的将 account 用在配置中
    newConfig = config.account.filter(conf => conf.cookie);
  }

  if (newConfig.length === 0) {
    return undefined;
  }

  logger.warn('在单用户场景下配置了多用户，我们将放弃多余的配置');
  // [兼容]
  // 合并 message 配置
  const conf = newConfig[0];
  if (!isArrayConf && Reflect.has(conf, 'account')) {
    conf.message = Object.assign(config.message || {}, conf.message);
  }
  return conf;
}

export function getConfigPathFile(filepath: string): ConfigArray {
  try {
    const config = readJsonFile(filepath);
    if (!config) {
      logger.error('配置文件为空，或配置内容缺失！');
      throw new Error('配置文件为空，或配置内容缺失！');
    }
    logger.verbose(`读取配置文件 ${filepath}`);
    process.env.__BT_CONFIG_PATH__ = filepath;
    if (isMultiUserConfig(config)) {
      return mapMultiUserConfig(config);
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
    configPathArr.splice(0, 1);
    configPathArr.push(...qlOldConfigArr);
  }
  for (let index = 0; index < configPathArr.length; index++) {
    let filepath = configPathArr[index];
    const config = readJsonFile<Config>(filepath) || readJsonFile<Config>((filepath += '5'));
    if (config) {
      logger.verbose(`读取配置文件 ${filepath}`);
      process.env.__BT_CONFIG_PATH__ = filepath;
      return config;
    }
  }
  return getEnvConfig();
}

export function getConfig<T extends boolean>(more?: T): T extends false ? Config : ConfigArray {
  const config = checkConfig(setConfig(), more);
  if (isArray(config) && config.length === 0) {
    logger.error('配置文件为空，或配置的cookie缺少三要素（bili_jct, SESSDATA, DedeUserID）！');
  }
  return config;
}

/** 检查 config */
export function checkConfig(config: any, more = false) {
  if (!config) {
    throw new Error('获取配置失败！未找到配置文件！');
  }

  if (more) {
    return mapMultiUserConfig(isMultiUserConfig(config) ? config : [config]);
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
 * 处理无效的多用户配置
 * @param config
 */
function mapMultiUserConfig(config: MultiConfig | Config[]) {
  const map = (conf: Config) => (isBiliCookie(conf.cookie) ? conf : undefined);
  if (Array.isArray(config)) {
    return config.map(map);
  }
  // [兼容]
  return config.account.map(map);
}
