require('dotenv').config();

import { apiDelay } from './util';
import bili, { loginTask } from './service';

const biliArr = [...Object.values(bili)];

exports.main_handler = async (_event, _context, _callback) => {
  try {
    await loginTask();
  } catch (error) {
    console.log('登录失败: ', error.message);
    return '未完成';
  }

  for (const asyncfun of biliArr) {
    await asyncfun();
    await apiDelay();
  }
  return '完成';
};
