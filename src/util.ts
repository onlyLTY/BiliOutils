import type { Config } from './types';
import { fork } from 'child_process';
import * as path from 'path';

export function runForkSync(config: Config) {
  return new Promise((resolve, reject) => {
    const child = fork(path.resolve(__dirname, './fork'), [], {
      env: {
        ...process.env,
        __BT_CONFIG__: JSON.stringify(config),
      },
    });
    child.on('exit', code => {
      if (code === 0) {
        resolve(code);
        return;
      }
      reject(code);
    });
  });
}

export async function runTask(configs?: Config[]) {
  if (!configs) {
    const { getConfig } = await import('./config/setConfig');
    configs = getConfig(true);
  }
  const length = configs.length;
  for (let index = 0; index < length; index++) {
    const config = configs[index];
    process.stdout.write(`正在执行第${index + 1}/${length}个配置\n`);
    try {
      await runForkSync(config);
    } catch (error) {
      process.stdout.write(`${error.message}`);
    }
    process.stdout.write('执行完毕\n\n');
  }
}
