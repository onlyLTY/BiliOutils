const tencentcloud = require('tencentcloud-sdk-nodejs');
const ScfClient = tencentcloud.scf.v20180416.Client;
const config = require('../config/config.temp.json');

const clientConfig = {
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: 'ap-chengdu',
  profile: {
    httpProfile: {
      endpoint: 'scf.tencentcloudapi.com',
    },
  },
};

config.account.forEach(conf => {
  clientConfig.region = conf.sls?.region || 'ap-chengdu';
  console.log(conf.sls?.name, conf.sls?.region);
  const client = new ScfClient(clientConfig);
  const params = {
    FunctionName: conf.sls.name,
    Qualifier: '$DEFAULT',
  };
  client.Invoke(params).then(
    _data => {
      console.log('成功');
    },
    err => {
      console.error('error', err);
    },
  );
  console.log('\n');
});
