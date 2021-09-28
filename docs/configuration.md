## 目录

- [目录](#目录)
- [配置文件路径](#配置文件路径)
- [多用户配置](#多用户配置)
- [Message 配置项](#message-配置项)
  - [Email](#email)
- [Account 配置项](#account-配置项)
  - [功能配置](#功能配置)
  - [腾讯云函数（SCF）配置](#腾讯云函数scf配置)
- [Github Actions secrets](#github-actions-secrets)
- [环境变量](#环境变量)

## 配置文件路径

- 全局配置（可配置多个用户）：`config/config.json`
- 单用户配置：`与 index.js (ts) 同目录/config/config.json`。

## 多用户配置

| Key     | Value                     |
| ------- | ------------------------- |
| message | 可选 [↓](#message-配置项) |
| account | 必须 [↓](#account-配置项) |

## Message 配置项

| Key               | 值类型            | 说明                                                 |
| ----------------- | ----------------- | ---------------------------------------------------- |
| email             | Email [↓](#email) |                                                      |
| ~~serverChan~~    | 字符串            | 已过期 [官网](https://sct.ftqq.com/)获取 token       |
| ~~pushplusToken~~ | 字符串            | 即将过期 [官网](http://www.pushplus.plus/)获取 token |

### Email

| Key      | 值类型 | 默认值    | 举例             | 说明             |
| -------- | ------ | --------- | ---------------- | ---------------- |
| **from** | 字符串 |           | `mhtwrnm@qq.com` | 发件邮箱         |
| to       | 字符串 | from 的值 | `mhtwrnm@qq.com` | 接收邮箱         |
| **pass** | 字符串 |           |                  | 发件邮箱的授权码 |
| **host** | 字符串 |           | `smtp.163.com`   |                  |
| port     | 数值   | `465`     |                  | host 的端口      |

- 网易邮箱请参考 [什么是 POP3、SMTP 和 IMAP?](http://help.163.com/09/1223/14/5R7P6CJ600753VB8.html?servCode=6010376)
- QQ 邮箱请参考 [如何打开 POP3/SMTP/IMAP 功能？](https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=166&&id=28)

## Account 配置项

| Key              | 值类型                       | 默认值              | 说明                                           |
| ---------------- | ---------------------------- | ------------------- | ---------------------------------------------- |
| message          | Message [↑](#message-配置项) | 无配置              |                                                |
| **cookie**       | 字符串                       | 无，必须手动添加    | **必须** 完整的 Cookie                         |
| function         | Function [↓](#功能配置)      |                     |                                                |
| targetLevel      | 数值                         | `6`                 | 目标等级，达到或大于将不投币、分享、观看视频   |
| stayCoins        | 数值                         | `0`                 | 账号至少保留的硬币数目，低于或等于将不投币     |
| userAgent        | 字符串                       | 固定 Chrome         | 浏览器用户代理 （建议自行配置）                |
| dailyRunTime     | 字符串                       | `17:30:00-23:40:00` | SCF 随机运行的时间段（随机时间只会在范围内）   |
| targetCoins      | 数值                         | `5`                 | 每日投币目标（超过将不投币）                   |
| customizeUp      | 数值数组                     | `[]`                | 自定义投币 UP， 在所填中随机选取               |
| giftUp           | 数值数组                     | customizeUp         | 自定义投喂礼物 UP， 在所填中随机选取           |
| coinRetryNum     | 数值                         | `4`                 | 投币失败重试次数                               |
| apiDelay         | `[数值, 数值]`或者数值       | `[2, 6]`            | 单位 S，区间中随机，或固定一个值               |
| upperAccMatch    | `true`或者`false`            | `true`              | 自定义投币 UP 时，合作视频的 UP 必须为指定中的 |
| chargeUpId       | 数值                         | 自己的 mid          | 充电目标的 mid（默认自己）                     |
| chargePresetTime | 数值                         | 每月最后一天        | 每月充电的日期                                 |
| sls              | SLS [↓](#腾讯云函数scf配置)  |                     |                                                |

**重要配置说明**

- cookie 详见 [获取 Cookie 的方法](./readme.md#获取-cookie-的方法)
- userAgent - 固定唯一 UA `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36` 请尽量自行设置

### 功能配置

| Key             | 默认值  | 说明                 |
| --------------- | ------- | -------------------- |
| silver2Coin     | `true`  | 银瓜子兑换硬币       |
| addCoins        | `true`  | 投币                 |
| liveSignTask    | `true`  | 直播间签到           |
| shareAndWatch   | `true`  | 观看和分享视频       |
| mangaSign       | `false` | 漫画签到（移动端）   |
| supGroupSign    | `false` | 应援团签到（移动端） |
| judgement       | `false` | 风纪委员任务         |
| liveSendMessage | `false` | 每日直播间发送弹幕   |
| charging        | `false` | 给 UP 充电           |
| getVipPrivilege | `false` | 获取年度大会员权益   |
| giveGift        | `false` | 赠送过期礼物         |

### 腾讯云函数（SCF）配置

- 使用 SCF 每日随机时间运行必须配置
- 使用 Github Action 推送必须配置

| Key         | 值类型 | 默认值                           | 说明                     |
| ----------- | ------ | -------------------------------- | ------------------------ |
| appName     | 字符串 | `cbts_ 加 name`                  | 预留，不配置也行         |
| **name**    | 字符串 |                                  | 必须配置，且每个区域唯一 |
| description | 字符串 | `可以填写识别该函数是哪个账号用` | 描述                     |
| region      | 字符串 | `ap-chengdu` 成都                | 地域                     |

**重要字段说明**

- name - 云函数名称，字段字符需满足 只能包含`字母、数字、下划线、连字符，以字母开头，以数字或字母结尾，2~60 个字符`

**地域参考表**（部分不一定有效，自行尝试）

| 值                 | 地点             |
| ------------------ | ---------------- |
| `ap-shanghai`      | 上海             |
| `ap-beijing`       | 北京             |
| `ap-guangzhou`     | 广州             |
| `ap-chengdu`       | 成都             |
| `ap-hongkong`      | 香港             |
| `ap-mumbai`        | 孟买（南亚）     |
| `ap-singapore`     | 新加坡（东南亚） |
| `na-siliconvalley` | 硅谷（北美）     |
| `na-toronto`       | 多伦多（北美）   |
| `ap-seoul`         | 首尔（东亚）     |
| `eu-frankfurt`     | 法兰克福（中欧） |

## Github Actions secrets

配置地址 `https://github.com/github用户名/仓库名/settings/secrets/actions`

| 名字               | 说明                                           |
| ------------------ | ---------------------------------------------- |
| **BILI_CONFIG**    | Gzip 压缩后的配置                              |
| TENCENT_SECRET_ID  | 使用 SCF 必须的腾讯账号授权 ID                 |
| TENCENT_SECRET_KEY | 使用 SCF 必须的腾讯账号授权 KEY                |
| TIMEOUT_MINUTES    | 部分时机设置的 Action 超时时间（默认 15 分钟） |

## 环境变量

主要用于本地或者 Docker 运行

| 名字                       | 说明                                                                 |
| -------------------------- | -------------------------------------------------------------------- |
| BILI_CONFIG                | Gzip 压缩后的配置（使用 Docker 时必须）                              |
| TENCENT_SECRET_ID          | 使用 SCF 必须的腾讯账号授权 ID                                       |
| TENCENT_SECRET_KEY         | 使用 SCF 必须的腾讯账号授权 KEY                                      |
| SERVERLESS_PLATFORM_VENDOR | Serverless 供应商，本地推送时必须，Docker 默认为`tencent`            |
| ~~PUSHPLUS_TOKEN~~         | ~~[pushplusToken](#message-配置项)~~                                 |
| BILI_SCF_CONFIG            | Gzip 压缩后的单个用户配置（在使用 SCF 时使用）                       |
| RUN_SCF_ALL                | 运行全部云函数（ Docker 推送至 SCF 时使用，值为需要`y`）             |
| SCF_MEMORY_SIZE            | scf 中运行的内存大小（默认 128M，范围为 64 以及 128 的 1-24 整数倍） |
