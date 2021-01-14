const cp = require('child_process');
const { writeFileSync } = require('fs');
const { resolve } = require('path');
const json = require('../config/config.temp.json');
const updateSLS = require('./updateSLS');

json?.account.forEach((el) => {
  new updateSLS()
    .openJuryVote(el.juryVote)
    .randomDailyRunTime(el.dailyRunTime)
    .randomJuryRunTime()
    .updateDescription(el.sls.description)
    .updateRegion(el.sls.region)
    .updateComponentAppName(el.sls.appName)
    .updateSCFName(el.sls.name)
    .update(`serverless.yaml`);

  delete el.sls;

  function setMessage() {
    let message = el.message;
    const dMsg = json.message;
    if (!dMsg) return;
    if (!message) return;
    if (message === true) {
      el.message = dMsg;
      return;
    }
    if (message.email === true) {
      message.email = dMsg.email;
    }
    if (message.serverChan === true) {
      message.serverChan = dMsg.serverChan;
    }
    el.message = message;
  }

  setMessage();

  writeFileSync(
    resolve(process.cwd(), 'dist/config/config.json'),
    JSON.stringify(el)
  );

  cp.execSync('npm run deploy', function (error, stdout, stderr) {
    if (error) {
      console.error('部署失败', error);
      return;
    }
    console.log('部署成功', el.sls.description, el.sls.name, el.sls.region);
    console.log(stdout);
    console.log(stderr);
  });
});
