import { getArg } from '../utils/args';

const nowArgv = [...process.argv];
const initArgv = () => (process.argv = [...nowArgv]);

describe('node 参数处理', () => {
  test('获取参数值', () => {
    initArgv();
    process.argv.push('--config=./config.json');
    expect(getArg('config')).toBe(`./config.json`);
    initArgv();
    process.argv.push('--config', './config.json');
    expect(getArg('config')).toBe(`./config.json`);
    initArgv();
    process.argv.push('-c=./config.json');
    expect(getArg('config')).toBe(`./config.json`);
    initArgv();
    process.argv.push('-c', './config.json');
    expect(getArg('config')).toBe(`./config.json`);
  });
});
