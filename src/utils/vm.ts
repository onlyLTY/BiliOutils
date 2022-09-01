import type { CreateAxiosOptions } from '@/types/axiosTransform';
import type { VGotOptions } from '@/types/got';
import { unzipSync } from 'zlib';
import { defHttp } from './http';
import * as VM from 'vm';
import { defLogger } from './log/def';

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
      `https://raw.githubusercontent.com/KudouRan/BiliTools/gh-release-0.6/gh-release/${name}`,
      options,
    ),
    defHttp.get(
      `https://gitee.com/KudouRan/BiliTools/raw/gh-release-0.6/gh-release/${name}`,
      options,
    ),
  ]);
}

function unzipCode(code: Buffer) {
  return unzipSync(code).toString();
}

export async function runInVM(
  name: string,
  context = { event: {}, context: {} },
): Promise<string | boolean> {
  let code = '';
  try {
    const res = await getCode(`${name}.gz`);
    code = handleCode(res.body || res.data);
    if (!isJavaScriptCode(code)) {
      return false;
    }
  } catch (error) {
    defLogger.warn(`runInVM: ${error.message}`);
    return false;
  }
  return new Promise((resolve, reject) => {
    try {
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
    } catch (error) {
      defLogger.error(`runInVM Script: ${error.stack}`);
      return false;
    }
  });
}

function handleCode(data: any) {
  const code = data.toString();
  if (isJavaScriptCode(code)) {
    return code;
  }
  return unzipCode(data);
}

function isJavaScriptCode(code: string) {
  return code && /^["']use strict["']/.test(code);
}
