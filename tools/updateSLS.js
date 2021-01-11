require('dotenv').config();

const { randomInt } = require('crypto');
const { copyFileSync, writeFileSync, readFileSync } = require('fs');
const { resolve } = require('path');

const rootPath = process.cwd();
const dest = resolve(rootPath, 'serverless.yaml');

copyFileSync(resolve(rootPath, 'serverless/serverless.yaml'), dest);

/*** 时候开启风纪委员任务执行 */
writeFileSync(
  dest,
  readFileSync(dest)
    .toString()
    .replace(
      /\B\${env\.BILI_JURY_VOTE}\B/g,
      `${process.env.BILI_JURY_VOTE === 'true' ? true : false}`
    )
);

/** 提交时设置执行时间 */
(() => {
  const BILI_DAILY_RUN_TIME =
    process.env.BILI_DAILY_RUN_TIME || '17:30:00-23:40:00';
  const taskTime = BILI_DAILY_RUN_TIME.split('-');
  const startTime = taskTime[0].split(':');
  const endTime = taskTime[1].split(':');

  const hours = randomInt(+startTime[0] || 19, +endTime[0] + 1 || 24);
  let minutes = 0;
  if (hours == startTime[0]) {
    minutes = randomInt(+startTime[1], 60);
  } else if (hours == endTime[0]) {
    minutes = randomInt(+endTime[1] + 1);
  } else {
    minutes = randomInt(60);
  }
  let seconds = 0;
  if (hours == startTime[0]) {
    seconds = randomInt(+startTime[2], 60);
  } else if (hours == endTime[0]) {
    seconds = randomInt(+endTime[2] + 1);
  } else {
    seconds = randomInt(60);
  }

  const DAILY_CRON_EXPRESSION = `${seconds} ${minutes} ${hours} * * * *`;
  writeFileSync(
    dest,
    readFileSync(dest)
      .toString()
      .replace(
        /(?<=')\${env.BILI_DAILY_CRON_EXPRESSION}(?=')/g,
        `${DAILY_CRON_EXPRESSION}`
      )
  );
})();
