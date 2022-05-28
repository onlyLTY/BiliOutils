import * as fs from 'fs';

/**
 * 获取当前目录下的所有 .test.ts 文件
 */
function getTestFiles(dir: string) {
  const files = fs.readdirSync(dir);
  return files.filter(file => file.endsWith('.test.ts'));
}

function importTest() {
  getTestFiles(__dirname).map(file => import(`./${file}`));
}

importTest();
