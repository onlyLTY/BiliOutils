const { randomInt } = require('crypto');

module.exports = function () {
  /**
   * 更新组件名
   * @param {string} componentName
   */
  this.updateComponentName = componentName => {
    process.env.COMPONENT_NAME = `cbts_${componentName}`;
    return this;
  };

  /**
   * 函数名
   * @param {string} scfName (必须参数)
   */
  this.updateSCFName = scfName => {
    if (!scfName) {
      throw new Error('没有设置serverless函数名,无法进行部署');
    }
    process.env.SCF_NAME = scfName;
    return this;
  };

  /**
   * 函数运行地域(默认成都)
   * @param {string} region
   */
  this.updateRegion = region => {
    process.env.SCF_REGION = region || 'ap-chengdu';
    return this;
  };

  /**
   * 函数描述
   * @param {string} description
   */
  this.updateDescription = description => {
    process.env.SCF_DESCRIPTION = description || '可以填写识别该函数是哪个账号用';
    return this;
  };

  /**
   * 是否执行任务
   * @param {any} isRun
   */
  this.isRunTask = isRun => {
    process.env.BILI_IS_RUN = isRun === false ? 'false' : 'true';
    return this;
  };

  /**
   * 提交时设置执行时间
   * @param {string} dailyRunTime 每日任务时间
   */
  this.randomRunTime = dailyRunTime => {
    const BILI_RUN_TIME = dailyRunTime || '17:30:00-23:40:00';
    const taskTime = BILI_RUN_TIME.split('-');
    const startTime = taskTime[0].split(':');
    const endTime = taskTime[1].split(':');

    const hours = randomInt(+startTime[0] ?? 19, +endTime[0] + 1 ?? 24);
    let minutes = 0;
    if (hours === +startTime[0]) {
      minutes = randomInt(+startTime[1], 60);
    } else if (hours === +endTime[0]) {
      minutes = randomInt(+endTime[1] + 1);
    } else {
      minutes = randomInt(60);
    }
    let seconds = 0;
    if (hours === +startTime[0]) {
      seconds = randomInt(+startTime[2], 60);
    } else if (hours === +endTime[0]) {
      seconds = randomInt(+endTime[2] + 1);
    } else {
      seconds = randomInt(60);
    }

    process.env.BILI_CRON_EXPRESSION = `${seconds} ${minutes} ${hours} * * * *`;
    return this;
  };

  /** 设置内存默认值 */
  this.setMemorySize = (num = '128') => {
    const SCF_MEMORY_SIZE = process.env.SCF_MEMORY_SIZE;
    process.env.SCF_MEMORY_SIZE = SCF_MEMORY_SIZE ? SCF_MEMORY_SIZE : String(num);
    return this;
  };

  /**
   * 设置入口函数
   * @param {String} handler
   */
  this.setHandler = (handler = 'index.main_handler') => {
    process.env.SCF_HANDLER = handler;
    return this;
  };

  /**
   * 设置超时
   * @param {Number} timeout
   */
  this.setTimeout = (timeout = 900) => {
    process.env.SCF_TIMEOUT = String(timeout);
    return this;
  };

  /**
   * 设置定时触发器名字
   * @param {String} timerName
   */
  this.setTimerName = (timerName = 'daily_bili_timer') => {
    process.env.SCF_TIMER_NAME = timerName;
    return this;
  };
};
