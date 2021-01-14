const { writeFileSync, readFileSync } = require('fs');
const { gzipDecode } = require('./gzip');
const { resolve } = require('path');
const rootPath = process.cwd();

const gzipString = readFileSync(
  resolve(rootPath, 'config/config.temp.txt'),
  'utf-8'
);
writeFileSync(
  resolve(rootPath, 'config/config.temp.json'),
  gzipDecode(gzipString)
);
