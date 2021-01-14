const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const envFile = resolve(process.cwd(), '.env');

let envString = readFileSync(envFile).toString();

envString = envString.replace(/\w+=\s*\B\s*/g, '');

writeFileSync(envFile, envString);
