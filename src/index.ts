require('dotenv').config();

import { apiDelay, random } from './utils';
import bili, { doOneJuryVote, loginTask, taskReward } from './service';
import { offFunctions } from './config/envConfigOffFun';
import { JuryTask } from './config/globalVar';

const biliArr = offFunctions([...Object.values(bili)]);

// {
//   "Type":"timer",
//   "TriggerName":"EveryDay",
//   "Time":"2019-02-21T11:49:00Z",
//   "Message":"您输入的附加信息"
// }

exports.main_handler = async (event, _context) => {
  // 只有serverless才有event
  if (event === undefined) event = {};
  if (event.TriggerName === 'jury-timer') {
    if (!JuryTask.isRun) {
      console.log(JuryTask.noRunMessage);
      return;
    }
    try {
      await doOneJuryVote(random(30000, 60000));
    } catch (error) {
      console.log(error);
    }
    return '评审任务';
  }
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
