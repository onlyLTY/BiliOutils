import * as VM from 'vm';
import { defLogger } from '../log/def';

process.once('message', async (code: string) => {
  try {
    process.send?.(await createScript(code));
  } catch (error) {
    if (typeof error === 'number') {
      process.exit(error);
    }
    if (typeof error === 'string') {
      defLogger.error(`createScript: ${error}`);
    }
    process.exit(1);
  }
});

function createScript(code: string) {
  if (!code) process.exit(1);
  return new Promise((resolve, reject) => {
    try {
      const context = JSON.parse(process.env.__BT_VM_CONTEXT__ || '{"event":{},"context":{}}');
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
      defLogger.error(`runInNewContext: ${error.stack}`);
      reject(false);
      return false;
    }
  });
}
