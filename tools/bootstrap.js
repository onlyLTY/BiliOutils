const { writeFileSync } = require('fs');
const { resolve } = require('path');
const updateSLS = require('./updateSLS');
const cp = require('child_process');

const json = require('./cfgCompatibility')('../config');

if (json.isRun === false) {
  console.log('不需要运行');
  return;
}

/**
 * 提取一个配置
 */
function baseConfig(el) {
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
    if (message.pushplusToken === true) {
      message.pushplusToken = dMsg.pushplusToken;
    }
    el.message = message;
  }

  setMessage();

  writeFileSync(
    resolve(process.cwd(), 'dist/config/config.json'),
    //格式化输出
    JSON.stringify(el, null, '\t'),
  );
}

function scfConfig(el) {
  const sls = el.sls;
  const memorySize = json?.memorySize || el?.memorySize || '128';
  new updateSLS()
    .isRunDailyTask(el.isRun)
    .openJuryVote(el.function?.judgement)
    .randomDailyRunTime(el.dailyRunTime)
    .randomJuryRunTime(el.juryRunTime)
    .updateDescription(sls?.description)
    .updateRegion(sls?.region)
    .updateComponentName(sls?.name)
    .updateSCFName(sls?.name)
    .setMemorySize(memorySize);
}

function scfDeploy(sls) {
  console.log('开始部署', sls?.name);
  console.log('地区', sls?.region);
  console.log('描述', sls?.description);
  try {
    let stdout = cp.execSync('npm run deploy');
    console.log(stdout.toString());
    console.log('部署成功\n\n');
  } catch (error) {
    console.error(error.toString());
  }
}

(async () => {
  if (process.argv.includes('--scf')) {
    json.account?.forEach(el => {
      const sls = JSON.parse(JSON.stringify(el.sls));
      scfConfig(el);
      baseConfig(el);
      scfDeploy(sls);
    });
    return;
  }

  if (process.argv.includes('--start')) {
    json.account?.forEach(el => {
      if (el.isRun === false) {
        console.log('跳过');
        return;
      }
      baseConfig(el);
      console.log('开始运行\n');
      try {
        let stdout = cp.execSync('npm run start');
        let out = stdout.toString();
        console.log(out);
        console.log('运行成功\n\n');
      } catch (error) {
        console.error(error);
        console.log('\n\n');
      }
    });
    return;
  }
})();
