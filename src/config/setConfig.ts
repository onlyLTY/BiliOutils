import type { UserConfig, ConfigArray, MultiConfig, CommonConfig } from '@/types';
import * as path from 'path';
import { defLogger as logger } from '@/utils/log/def';
import { gzipDecode } from '@/utils/gzip';
import { SystemConfig } from './systemConfig';
import { readJsonFile } from '@/utils/file';
import { JSON5 } from '@/utils/json5';
import { isArray } from '@/utils/is';
import { isBiliCookie } from '@/utils/cookie';
import { deepSetObject } from '@/utils/pure';

const resolveCWD = (str: string) => path.resolve(process.cwd(), str);
const resolveDir = (str: string) => path.resolve(__dirname, '../', str);

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
    throw new Error('环境中的配置不是有效的 JSON5 字符串！');
  }
}

/**
 * 处理多用户配置
 */
function handleMultiUserConfig(config: MultiConfig | UserConfig[]) {
  let newConfig: UserConfig[];
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
  const config = readJsonFile(filepath);
  if (!config) {
    logger.error('配置文件为空，或配置内容缺失！');
    throw new Error('配置文件为空，或配置内容缺失！');
  }
  logger.debug(`读取配置文件 ${filepath}`);
  process.env.__BT_CONFIG_PATH__ = filepath;
  if (isMultiUserConfig(config)) {
    return mapMultiUserConfig(config);
  }
  return [config];
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
    const config =
      readJsonFile<UserConfig>(filepath) || readJsonFile<UserConfig>((filepath += '5'));
    if (config) {
      logger.debug(`读取配置文件 ${filepath}`);
      process.env.__BT_CONFIG_PATH__ = filepath;
      return config;
    }
  }
  return getEnvConfig();
}

export function getConfig<T extends boolean>(more?: T): T extends false ? UserConfig : ConfigArray {
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
function isMultiUserConfig(config: MultiConfig | UserConfig[]) {
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
function mapMultiUserConfig(config: ConfigArray | MultiConfig) {
  const map = (conf: UserConfig) => (isBiliCookie(conf.cookie) ? conf : undefined);
  if (Array.isArray(config)) {
    return mergeCommon(config).map(map);
  }
  // [兼容]
  return mergeCommon(config.account).map(map);
}

/**
 * 合并公共配置
 */
export function mergeCommon(config: (UserConfig | CommonConfig | undefined)[]): ConfigArray {
  const commonIndex = config.findIndex(conf => conf && Reflect.has(conf, '__common__'));
  if (commonIndex === -1) return config as ConfigArray;
  const commonConfig = config.splice(commonIndex, 1)[0];
  if (!commonConfig || !Reflect.get(commonConfig, '__common__')) return config as ConfigArray;

  // clear commonConfig
  Reflect.deleteProperty(commonConfig, '__common__');
  Reflect.deleteProperty(commonConfig, 'cookie');
  Reflect.deleteProperty(commonConfig, 'accessKey');

  config.forEach(conf => conf && deepSetObject(conf, commonConfig));
  console.log(config);
  return config as ConfigArray;
}
