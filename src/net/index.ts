import axios from 'axios';
import { TaskConfig } from '../config/globalVar';

const defaultHeaders = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36 Edg/101.0.1210.32',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'accept-language': 'zh-CN,zh;q=0.9',
};

const headers = axios.defaults.headers;

axios.defaults.withCredentials = true;
headers.common['Cookie'] = TaskConfig.COOKIE;
headers.common['User-Agent'] = TaskConfig.USER_AGENT || defaultHeaders['User-Agent'];
headers.post['content-type'] = defaultHeaders['content-type'];
headers.common['accept-language'] = defaultHeaders['accept-language'];

export default axios;

export { axios, defaultHeaders };
