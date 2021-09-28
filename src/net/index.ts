import axios from 'axios';
import { TaskConfig } from '../config/globalVar';

axios.defaults.headers['Cookie'] = TaskConfig.COOKIE;

axios.defaults.withCredentials = true;

axios.defaults.headers['User-Agent'] =
  TaskConfig.USER_AGENT ||
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36';

axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['accept-language'] = 'accept-language: zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7';

export default axios;
