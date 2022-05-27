import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import * as VM from 'vm';
import { logger } from './log';

const options: AxiosRequestConfig = {
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
  },
  decompress: true,
  responseType: 'arraybuffer',
};

async function getCode(name: string) {
  const { data } = await Promise.any([
    axios.get(
      `https://raw.githubusercontent.com/catlair/BiliTools/gh-release/gh-release${name}`,
      options,
    ),
    axios.get(`https://gitee.com/catlair/BiliTools/raw/gh-release/gh-release/${name}`, options),
  ]);
  return data;
}

export async function runInVM(name: string, context = {}) {
  let code: string;
  try {
    code = await getCode(name);
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
