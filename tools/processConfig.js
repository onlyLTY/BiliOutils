const { unzipSync } = require('zlib');
const { writeFileSync, readFileSync, existsSync } = require('fs');
const { resolve } = require('path');

function gzipDecode(str) {
  try {
    const result = unzipSync(Buffer.from(str, 'base64')).toString();
    try {
      return decodeURIComponent(unicode2str(result));
    } catch (error) {
      // 兼容百度的在线压缩
      return unescape(result);
    }
  } catch (e) {
    process.stderr.write(e);
    throw new Error('Error: 当前字符串不能被Gzip解压');
  }
}

function unicode2str(str) {
  return str.replace(/\\u([\d\w]{4})/gi, (_match, grp) => String.fromCodePoint(parseInt(grp, 16)));
}

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
    process.stdout.write('使用环境变量 BILITOOLS_CONFIG\n');
    return (BILITOOLS_CONFIG || BILI_CONFIG)?.trim();
  }
  const tempTxtPath = resolveRootPath('config/config.txt');
  if (existsSync(tempTxtPath)) {
    process.stdout.write('使用本地文件 config.txt\n');
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
  process.stdout.write('配置转化完成\n\n');
} else {
  process.stdout.write('没有可以转化的内容\n\n');
}
