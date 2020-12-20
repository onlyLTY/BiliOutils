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

### 获取自己的 Cookie

- 浏览器打开并登录[bilibili 网站](https://www.bilibili.com/)
- 按 **F12** 打开"开发者工具"，依次点击 **应用程序/Application** -> **存储**-> **Cookies**
- 找到`DEDEUSERID`、`SESSDATA`、`bili_jct`三项，复制保存它们到记事本，待会儿会用到。

![获取Cookie图示](https://cdn.jsdelivr.net/gh/catlair/BiliTools@main/images/get-bilibili-web-cookie.jpg)

**Token 有效期为 1 月，更改密码或过期失效,失效后需要重新登录获取**

### 变量说明

在自己的设备使用时,按照`.env.example`的格式填写变量,并保存为`.env`文件。在 github action 使用时直接更改`.env.example`中的内容,不需要更名为`.env`  
在`github`上使用时,`.env`中不要包含隐私信息,`USERID`,`SESSDATA`,`BILIJCT`以及 severless 运营商的 SECRET 都应该使用`github secrets`保存  
变量优先级`系统环境变量(包括github secrets)` >> `.env变量`

![github secrets](https://cdn.jsdelivr.net/gh/catlair/BiliTools@main/images/secrets.png)

| 变量名              | 说明                                                                            | 举例        |
| ------------------- | ------------------------------------------------------------------------------- | ----------- |
| USERID              | 【必选】b 站用户 uid                                                            | -           |
| SESSDATA            | 【必选】                                                                        | -           |
| BILIJCT             | 【必选】                                                                        | -           |
| TENCENT_SECRET_ID   | 【腾讯 serverless 必选】                                                        | -           |
| TENCENT_SECRET_KEY  | 【腾讯 serverless 必选】                                                        | -           |
| BILI_TARGET_COINS   | 每日投币目标(包括自己通过其他方式投的)                                          | 5           |
| BILI_CUSTOMIZE_UP   | 视频转发、播放、投币优先考虑的 up 主 uid(英文逗号分隔)                          | xxx,xxx,xxx |
| BILI_API_DELAY      | 调用 api 的时间间隔(单位秒)，可填一个数字，或逗号分隔的两个数字(最小值及最大值) | 6           |
| BILI_COIN_RETRY_NUM | 投币任务,每种获取视频方式的重试次数(默认 4 次)                                  | 6           |

可以把变量设置`false`关闭部分功能,`true`开启指定功能

| 变量名             | 说明                                  | 默认值 |
| ------------------ | ------------------------------------- | ------ |
| BILI_SILVER_2_COIN | 银瓜子兑换硬币                        | true   |
| BILI_LIVE_SIGN     | 直播签到                              | true   |
| BILI_ADD_COINS     | 每日投币(将投币数设置成 0 也可以关闭) | true   |
| BILI_MANGA_SIGN    | 漫画签到                              | true   |
| BILI_SHARE_WATCH   | 每日视频分享/播放(懒得分开写)         | true   |
| BILI_JURY_VOTE     | 风纪投票                              | false  |

## 消息推送

### server 酱

去 server 酱官网申请 sckey,并设置环境变量`SERVER_SCKEY`存放 sckey

### email

去邮箱官网开启`SMTP`服务,并保存获得的授权密码

设置如下格式的环境变量(英文逗号分割选项,163 邮箱举例)  
`NODE_MAIL=发送邮箱@163.com,smtp授权密码,接收邮箱@qq.com,smtp.163.com`  
`smtp.163.com` ssl 加密默认端口`465`

如果不采用安全模式发送,需要在最后加上端口  
`NODE_MAIL=发送邮箱@163.com,smtp授权密码,接收邮箱@qq.com,smtp.163.com,端口`

收件邮箱最好将发件邮箱设置为白名单,或者收件邮箱和发件邮箱一致  
暂不支持多个接收邮箱

### 本地/服务器使用

需要安装 typescript

```bash
  npm run build
```

```bash
  npm run start
```

也可以从计算机部署 serverless

### github action

`.github/workflows/bilibili-task.yaml`

### 腾讯云 serverless

需要在`github secrets`添加腾讯云的 secret

获取 key 参考[腾讯云权限管理](https://cloud.tencent.com/document/product/583/44786)

`.github/workflows/deploy_tencent_sls.yaml`

## 关于多用户

个人没有需求  
暂时可以直接复制 serverless 达成多用户需求

## API 参考

- [happy888888/BiliExp](https://github.com/happy888888/BiliExp)
- [RayWangQvQ/BiliBiliTool](https://github.com/RayWangQvQ/BiliBiliTool)
- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
