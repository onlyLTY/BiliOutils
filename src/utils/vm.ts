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
      `https://raw.githubusercontent.com/catlair/BiliTools/gh-release-0.5/gh-release${name}`,
      options,
    ),
    defHttp.get(
      `https://gitee.com/catlair/BiliTools/raw/gh-release-0.5/gh-release/${name}`,
      options,
    ),
  ]);
}

function unzipCode(code: Buffer) {
  return unzipSync(code).toString();
}

export async function runInVM(name: string, context = { event: {}, context: {} }) {
  let code: string;
  try {
    const res = await getCode(`${name}.gz`);
    if (res.headers['content-type']?.includes('application/gzip')) {
      code = unzipCode(res.body || res.data);
    } else {
      code = (res.body || res.data).toString();
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
    script.runInNewContext(
      {
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
      },
      {
        timeout: 600000,
      },
    );
  });
}
