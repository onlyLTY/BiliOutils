const { writeFileSync, readFileSync, existsSync } = require('fs');
const { gzipDecode } = require('../dist/utils/gzip');
const { resolve } = require('path');

/**
 *
 * @param {String} targetPath
 */
function resolveRootPath(targetPath) {
  const rootPath = process.cwd();
  return resolve(rootPath, targetPath);
}

function getConfig() {
  const { BILI_CONFIG, BILITOOLS_CONFIG } = process.env;
  if (BILITOOLS_CONFIG || BILI_CONFIG) {
    console.log('使用环境变量 BILITOOLS_CONFIG');
    return BILITOOLS_CONFIG || BILI_CONFIG;
  }
  const tempTxtPath = resolveRootPath('config/config.txt');
  if (existsSync(tempTxtPath)) {
    console.log('使用本地文件 config.txt');
    return readFileSync(tempTxtPath, 'utf-8');
  }
  return '';
}

function setConfig(gzipString) {
  writeFileSync(resolveRootPath('config/config.json'), gzipDecode(gzipString));
}

const gzipString = getConfig();
if (gzipString) {
  setConfig(gzipString);
  console.log('配置转化完成');
} else {
  console.log('没有可以转化的内容');
}
