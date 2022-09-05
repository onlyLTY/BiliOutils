import * as VM from 'vm';
import { JSON5 } from '../json5';
import { defLogger } from '../log/def';

process.once('message', async (code: string) => {
  const msg = await createScript(code);
  process.send?.(msg);
});

function createScript(code: string) {
  if (!code) process.exit(1);
  return new Promise((resolve, reject) => {
    try {
      const context = JSON5.parse(process.env.__BT_VM_CONTEXT__ || '{"event":{},"context":{}}');
      const script = new VM.Script(code, {
        filename: 'bilitools/index.js',
      });
      script.runInNewContext({
        ...global,
        console,
        require,
        process,
        __dirname,
        __filename,
        Buffer,
        URLSearchParams,
        BILITOOLS_CONFIG: global.BILITOOLS_CONFIG,
        __BT_context__: { ...context, resolve, reject },
      });
    } catch (error) {
      defLogger.error(`runInNewContext: ${error.stack}`);
      reject(false);
      return false;
    }
  });
}
