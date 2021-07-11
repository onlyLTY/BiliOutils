module.exports = function (path) {
  let json = {};

  // 兼容老版本的配置文件 config.temp.json
  try {
    json = require(`${path}/config.json`);
    // 暂时使用该方法避免配置为单用户
    if (!json.account) {
      json = { account: [json] };
    }
  } catch (error) {
    try {
      json = require(`${path}/config.temp.json`);
    } catch (error) {
      console.log('未找到配置文件', error);
    }
  }

  return json;
};
