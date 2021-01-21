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

通过部署多个云函数实现多用户,每日凌晨 action 会重新部署云函数,以此达到随机执行时间的效果

fork 项目,开启 action(略)

## 配置

`config/config.demo.jsonc`中进行了三个用户的配置演示,使用单用户可以只配置一个

填写表单就能够获取配置了`[初步测试版]`<https://catlair.gitee.io/bili-tools-docs-deploy/>

[仓库地址](https://github.com/catlair/BiliTools-docs)

消息推送配置(可选)
![消息推送配置](./images/message-push.png)

账号配置(必填),可以多次配置,使用多账号
![账号配置](./images/config.png)

获取压缩的配置
![获取压缩的配置](./images/getGzip.png)

打开 github fork 的项目
![设置](./images/setting.png)

![设置](./images/setting-new.png)

![设置](./images/setting-new-2.png)

### 腾讯云 serverless

需要在`github secrets`添加腾讯云的 secret

获取 key 参考[腾讯云权限管理](https://cloud.tencent.com/document/product/583/44786)

`.github/workflows/deploy_tencent_sls.yaml`

## API 参考

- [happy888888/BiliExp](https://github.com/happy888888/BiliExp)
- [RayWangQvQ/BiliBiliTool](https://github.com/RayWangQvQ/BiliBiliTool)
- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
