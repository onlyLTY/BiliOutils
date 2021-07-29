import { Config } from '../interface/Config';
import { gzipDecode } from '../utils';

export function setConfig(): Config {
  let config: Config;
  try {
    // 从当前目录寻找
    config = require('./config.json');
  } catch (error) {
    // 寻找外层目录
    try {
      config = require('../../config/config.json');
    } catch {}
  }
  if (!config && process.env.BILI_SCF_CONFIG) {
    try {
      // 是否可以从环境变量中获取
      config = JSON.parse(gzipDecode(process.env.BILI_SCF_CONFIG));
    } catch {}
  }
  if (config?.cookie) {
    return config;
  }
  throw new Error('没有找到配置');
}

export default { setConfig };
