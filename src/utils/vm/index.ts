import type { CreateAxiosOptions } from '@/types/axiosTransform';
import type { VGotOptions } from '@/types/got';
import { unzipSync } from 'zlib';
import { defHttp } from '../http';
import { ChildProcess, fork } from 'child_process';
import { defLogger } from '../log/def';
import path from 'path';

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

export async function runInVM(name: string, context = { event: {}, context: {} }) {
  let code = '';
  try {
    const res = await getCode(`${name}`);
    code = handleCode(res.body || res.data);
    if (!isJavaScriptCode(code)) {
      return false;
    }
  } catch (error) {
    defLogger.warn(`runInVM: ${error.message}`);
    return false;
  }

  return await runFork(code, context);
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

function runFork(code: string, context = { event: {}, context: {} }) {
  return new Promise((resolve, reject) => {
    const child = fork(path.resolve(__dirname, './run-script'), process.argv, {
      env: {
        ...process.env,
        __BT_VM_CONTEXT__: JSON.stringify(context || null),
      },
      detached: true,
    });
    // 通过发送消息的方式，将代码发送给子进程，子进程执行代码并返回结果
    child.send(code);

    child.once('exit', code => {
      if (code === 0) {
        resolve(true);
        return;
      }
      reject(code);
    });

    child.once('message', msg => {
      killChildProcess(child);
      if (msg === false) {
        reject(false);
        return;
      }
      resolve(msg);
    });

    child.once('error', err => {
      killChildProcess(child);
      reject(err);
    });
  });
}

function killChildProcess(child: ChildProcess) {
  child;
  child.unref();
  child.pid && process.kill(-child.pid);
}
