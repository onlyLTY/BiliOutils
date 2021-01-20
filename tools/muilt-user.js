const { writeFileSync } = require('fs');
const { resolve } = require('path');
const json = require('../config/config.temp.json');
const updateSLS = require('./updateSLS');

function runMuiltUser(callback, ...arg) {
  json?.account.forEach(el => {
    const sls = JSON.parse(JSON.stringify(el.sls));

    new updateSLS()
      .openJuryVote(el.function?.judgement)
      .randomDailyRunTime(el.dailyRunTime)
      .randomJuryRunTime()
      .updateDescription(sls?.description)
      .updateRegion(sls?.region)
      .updateComponentAppName(sls?.appName)
      .updateSCFName(sls?.name)
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
      //格式化输出
      JSON.stringify(el, null, '\t')
    );

    callback(sls, ...arg);
  });
}

module.exports = runMuiltUser;
