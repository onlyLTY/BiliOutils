/**
 * 用于清理 node_modules 中 package.json 中不必要的字段
 * 由于并不清楚第三方包访问了其 package.json 的什么内容（除常见的 version），所以只能大概清理一些
 * 测试表明该方式减少的大小微乎其微，完全可以忽略不记
 * 本次测试 3.50 降到了 3.42
 */

const { resolve } = require('path');
const { readFileSync, readdirSync, statSync, writeFileSync } = require('fs');

const nodeModulesPath = resolve(__dirname, '../node_modules');
packageClean(nodeModulesPath);
console.log('package.json 清理完成');

function writePackageFile(path) {
  try {
    /**
     * 暂时保留这些
     */
    const { name, version, author, main } = JSON.parse(readFileSync(path));
    const newPKG = { name, version, author, main };
    writeFileSync(path, JSON.stringify(newPKG));
  } catch {}
}

function packageClean(rootPath) {
  // 找出路径下的所有文件和文件夹
  const allPath = readdirSync(rootPath).map(p => resolve(rootPath, p));

  const dirPath = [],
    filePath = [];
  // 判断是文件还是文件夹
  allPath.forEach(p => {
    // 只处理 package.json 文件
    if (statSync(p).isDirectory()) {
      dirPath.push(p);
      return;
    }
    if (p.endsWith('package.json')) {
      filePath.push(p);
    }
  });

  // 处理所有文件
  filePath.forEach(file => writePackageFile(file));
  // 递归处理目录
  dirPath.forEach(dir => packageClean(dir));
}
