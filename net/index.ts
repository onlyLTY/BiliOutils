import axios from 'axios';

axios.defaults.headers[
  'Cookie'
] = `DedeUserID=${process.env.USERID};SESSDATA=${process.env.SESSDATA};bili_jct=${process.env.BILIJCT};`;

axios.defaults.headers['User-Agent'] =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';

axios.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';

export default axios;
