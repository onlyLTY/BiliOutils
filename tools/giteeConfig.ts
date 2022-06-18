// 加载 .env 文件
require('dotenv').config();

export const files = [
  'tencent_scf.zip',
  'huawei_agc.zip',
  'baidu_cfc.zip',
  'aliyun_fc.zip',
  'index.js',
  'cat_bili_ql.js',
];

export const dir = 'temp';

export const proxyUrl = 'https://ghproxy.com/';
export const githubUrl = 'https://github.com/KudouRan/BiliTools/releases/download/';

export const tag = process.env.TAG;

export const input = {
  username: process.env.GITEE_USERNAME || '',
  password: process.env.GITEE_PASSWORD || '',
  tag: '',
  repo: 'catlair/BiliTools',
  files,
  prerelease: false,
  title: '来自 Github BiliTools 的备份',
  description: '来自 Github BiliTools 的备份',
};
