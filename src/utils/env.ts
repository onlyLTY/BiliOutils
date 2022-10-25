import type { SLSType } from '@/types';

type ENVType = {
  qinglong: boolean;
  fc: boolean;
  scf: boolean;
  cfc: boolean;
  agc: boolean;
  serverless: boolean;
  type: SLSType | 'local';
};

const ENV_BASE = {
  qinglong: isQingLongPanel(),
  fc: isFC(),
  scf: isSCF(),
  cfc: isCFC(),
  agc: isAGC(),
};

export const ENV: ENVType = {
  ...ENV_BASE,
  serverless: isServerless(),
  type: getEnvType(),
};

/**
 * 是否是青龙面板
 */
export function isQingLongPanel() {
  // @ts-ignore
  return Boolean(process.env.IS_QING_LONG || '__IS_QINGLONG__' === 'true' || process.env.QL_BRANCH);
}

/**
 * 是否是 CFC
 */
export function isCFC() {
  // @ts-ignore
  return global.IS_CFC || '__IS_CFC__' === 'true';
}

/**
 * 是否是 AGC
 */
export function isAGC() {
  // @ts-ignore
  // @TODO: IS_CFC 是因为，代码使用的同一套
  return global.IS_CFC || '__IS_AGC__' === 'true';
}

export function setConfigFileName() {
  const defaultConfigFileName = ENV_BASE.qinglong ? 'cat_bili_config' : 'config',
    ext = '.json';

  const { BILITOOLS_FILE_NAME } = process.env;

  if (BILITOOLS_FILE_NAME) {
    if (BILITOOLS_FILE_NAME.endsWith(ext)) {
      return BILITOOLS_FILE_NAME;
    }
    return `${BILITOOLS_FILE_NAME}${ext}`;
  }

  return defaultConfigFileName + ext;
}

/**
 * 判断是否是 FC
 */
export function isFC() {
  const keys = Object.keys(process.env);
  const tags = [
    'securityToken',
    'accessKeyID',
    'accessKeySecret',
    'FC_FUNCTION_MEMORY_SIZE',
    'FC_FUNC_CODE_PATH',
    'FC_RUNTIME_VERSION',
  ];
  // @ts-ignore
  return keys.filter(key => tags.includes(key)).length >= 3 || '__IS_FC__' === 'true';
}

/**
 * 判断是否是 SCF
 */
export function isSCF() {
  const keys = Object.keys(process.env);
  const isSCF = keys.filter(key => key.startsWith('SCF_')).length >= 10;
  const isTENCENTCLOUD = keys.filter(key => key.startsWith('TENCENTCLOUD_')).length >= 3;
  // @ts-ignore
  return (isSCF && isTENCENTCLOUD) || '__IS_SCF__' === 'true';
}

export function isServerless() {
  return ENV_BASE.fc || ENV_BASE.scf || ENV_BASE.cfc || ENV_BASE.agc;
}

export function getEnvType(): SLSType | 'local' {
  if (ENV_BASE.scf) {
    return 'scf';
  }
  if (ENV_BASE.fc) {
    return 'fc';
  }
  if (ENV_BASE.agc) {
    return 'agc';
  }
  if (ENV_BASE.cfc) {
    return 'cfc';
  }
  return 'local';
}
