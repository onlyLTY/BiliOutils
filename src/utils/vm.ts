import type { CreateAxiosOptions } from '@/types/axiosTransform';
import type { VGotOptions } from '@/types/got';
import { unzipSync } from 'zlib';
import { defHttp } from './http';
import * as VM from 'vm';
import { logger } from './log';

const options = {
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
  },
  decompress: true,
  requestOptions: {
    retry: 0,
    isReturnNativeResponse: true,
  },
  timeout: 5000,
};

if (defHttp.name === 'VAxios') {
  (options as CreateAxiosOptions).responseType = 'arraybuffer';
} else {
  (options as VGotOptions).responseType = 'buffer';
}

function getCode(name: string) {
  return Promise.any([
    defHttp.get(
      `https://raw.githubusercontent.com/KudouRan/BiliTools/gh-release-0.5/gh-release/${name}`,
      options,
    ),
    defHttp.get(
      `https://gitee.com/KudouRan/BiliTools/raw/gh-release-0.5/gh-release/${name}`,
      options,
    ),
  ]);
}

function unzipCode(code: Buffer) {
  return unzipSync(code).toString();
}

export async function runInVM(name: string, context = { event: {}, context: {} }) {
  let code = '';
  try {
    const res = await getCode(`${name}.gz`);
    const contentType = res.headers['content-type'];
    if (
      contentType?.includes('application/gzip') ||
      contentType?.includes('application/octet-stream')
    ) {
      code = unzipCode(res.body || res.data);
    } else {
      code = (res.body || res.data).toString();
    }
    if (
      !code ||
      !code.startsWith('"use strict"') ||
      code.startsWith('<!DOCTYPE') ||
      code.startsWith('<!doctype')
    ) {
      return false;
    }
  } catch (error) {
    logger.warn(`runInVM: ${error.message}`);
    return false;
  }
  return new Promise((resolve, reject) => {
    const script = new VM.Script(code, {
      filename: 'bilitools/index.js',
    });
    global.VMThis = {
      resolve,
      reject,
    };
    script.runInNewContext({
      console,
      require,
      process,
      __dirname,
      __filename,
      setTimeout,
      clearTimeout,
      Buffer,
      URLSearchParams,
      global,
      VMThis,
      BILITOOLS_CONFIG: global.BILITOOLS_CONFIG,
      ...context,
    });
  });
}
