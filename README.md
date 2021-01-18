## 支持功能

- [x] 每日签到
- [x] 每日分享
- [x] 每日播放
- [x] 直播签到
- [x] 漫画签到
- [x] 每日自动投币(指定数量)
- [ ] 自动领取会员利益
- [ ] b 币券给 up 主充电
- [x] 银瓜子兑换硬币
- [ ] b 币券对换金瓜子
- [x] 基于瞎扯的风纪委员任务(默认关闭,慎用)
- [x] 应援团签到
- [ ] 直播获取小星星(赠送)
- [ ] 赠送快过期辣条(默认挂着勋章的随机选)

## 使用方法

**多用户版本说明暂缺(原因是除我之外也没人用啊)**

**目前只支持腾讯 serveless**

通过部署多个云函数实现多用户,每日凌晨 action 会重新部署云函数,以此达到随机执行时间的效果

`config/config.demo.jsonc`中进行了三个用户的配置演示,使用单用户可以只配置一个

~~配置格式必须为严格的 json,不能有注释,[点我检测 json 是否合格](https://www.baidufe.com/fehelper/json-format/index.html)~~

~~配置的 json 经过 gzip 压缩后([点我 zip 压缩](https://www.baidufe.com/fehelper/en-decode/index.html))再填入`secrets`配置名为`BILI_CONFIG`~~

填写表单就能够获取配置了`[初步测试版]`<https://catlair.gitee.io/bili-tools-docs-deploy/>

使用时请不要刷新哦(404 警告)

[仓库地址](https://github.com/catlair/BiliTools-docs)

### 腾讯云 serverless

需要在`github secrets`添加腾讯云的 secret

获取 key 参考[腾讯云权限管理](https://cloud.tencent.com/document/product/583/44786)

`.github/workflows/deploy_tencent_sls.yaml`

## API 参考

- [happy888888/BiliExp](https://github.com/happy888888/BiliExp)
- [RayWangQvQ/BiliBiliTool](https://github.com/RayWangQvQ/BiliBiliTool)
- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
