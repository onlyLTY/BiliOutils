require('dotenv').config();

import { apiDelay } from './util';
import bili, { loginTask, taskReward } from './service';
import { offFunctions } from './config/envConfigOffFun';

const biliArr = offFunctions([...Object.values(bili)]);

exports.main_handler = async (_event, _context) => {
  try {
    await loginTask();
  } catch (error) {
    console.log('登录失败: ', error);
    return '未完成';
  }

  //获取每日任务状态(出现异常不用担心,投币会有多重逻辑)
  await taskReward();

  for (const asyncfun of biliArr) {
    await asyncfun();
    await apiDelay();
  }
  return '完成';
};
