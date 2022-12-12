import type { UserConfig, ConfigArray, CommonConfig } from '@/types';
import * as path from 'path';
import { defLogger, defLogger as logger } from '@/utils/log/def';
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

function readEnvConfig() {
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
 * 多用户转单用户
 */
function multi2SingleUserConfig(config: UserConfig[]) {
  const newConfig = config.filter(Boolean);
  if (newConfig.length === 0) {
    return undefined;
  }
  logger.warn('在单用户场景下配置了多用户，我们将放弃多余的配置');
  return newConfig[0];
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

/**
 * 从配置文件或环境变量中读取配置
 */
function readConfig() {
  if (globalThis.BILITOOLS_CONFIG) {
    return globalThis.BILITOOLS_CONFIG;
  }

  if (SystemConfig.isQingLongPanel) {
    configPathArr.splice(0, 1);
    configPathArr.push(...qlOldConfigArr);
  }
  for (let filepath of configPathArr) {
    const config =
      readJsonFile<UserConfig>(filepath) || readJsonFile<UserConfig>((filepath += '5'));
    if (config) {
      logger.debug(`读取配置文件 ${filepath}`);
      process.env.__BT_CONFIG_PATH__ = filepath;
      return config;
    }
  }
  return readEnvConfig();
}

export function getConfig<T extends boolean>(more?: T): T extends false ? UserConfig : ConfigArray {
  const config = checkConfig(readConfig(), more);
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
    const multiUserConfig = multi2SingleUserConfig(config);
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
function isMultiUserConfig(config: UserConfig[]) {
  return Array.isArray(config);
}

/**
 * 处理无效的多用户配置
 * @param config
 */
function mapMultiUserConfig(config: ConfigArray) {
  return Array.isArray(config) ? mergeCommon(config).map(map) : [];

  function map(conf: UserConfig) {
    if (!isBiliCookie(conf.cookie)) {
      defLogger.error('配置文件中的 cookie 无效！');
      return undefined;
    }
    return conf;
  }
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

  config.forEach(conf => conf && deepSetObject(conf, commonConfig));
  return config as ConfigArray;
}
