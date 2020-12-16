require('dotenv').config();

const fs = require('fs');
const { resolve } = require('path');

const rootPath = process.cwd();
const dest = resolve(rootPath, 'serverless.yaml');

fs.copyFileSync(resolve(rootPath, 'serverless/serverless.yaml'), dest);

fs.writeFileSync(
  dest,
  fs
    .readFileSync(dest)
    .toString()
    .replace(
      /\B\${env\.BILI_JURY_VOTE}\B/g,
      `${process.env.BILI_JURY_VOTE === 'true' ? true : false}`
    )
);
