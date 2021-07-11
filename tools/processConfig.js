const { writeFileSync, readFileSync, existsSync } = require('fs');
const { gzipDecode } = require('./gzip');
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
  if (process.env.BILI_CONFIG) {
    return process.env.BILI_CONFIG;
  }
  const tempTxtPath = resolveRootPath('config/config.txt');
  if (existsSync(tempTxtPath)) {
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
}

console.log('配置转化完成');
