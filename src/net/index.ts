import axios from 'axios';
import { TaskConfig } from '../config/globalVar';

const USER_AGENT =
  TaskConfig.USER_AGENT ||
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62';

const defaultHeaders = {
  'User-Agent': USER_AGENT,
  'content-type': 'application/x-www-form-urlencoded',
  'accept-language': 'accept-language: zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7',
};

axios.defaults.headers.common['Cookie'] = TaskConfig.COOKIE;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['User-Agent'] = defaultHeaders['User-Agent'];
axios.defaults.headers.post['content-type'] = defaultHeaders['content-type'];
axios.defaults.headers.common['accept-language'] = defaultHeaders['accept-language'];

export default axios;

export { axios, defaultHeaders };
