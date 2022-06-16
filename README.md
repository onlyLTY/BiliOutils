[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/catlair/BiliTools/blob/main/LICENSE)
[![node-current (scoped)](https://img.shields.io/node/v/@catlair/bilitools)](https://www.npmjs.com/package/@catlair/bilitools)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/catlair/BiliTools)](https://github.com/catlair/BiliTools/releases)
[![欢迎 PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/catlair/BiliTools/pulls)
[![GitHub issues](https://img.shields.io/github/issues/catlair/BiliTools)](https://github.com/catlair/BiliTools/issues)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/catlair/bilitools)](https://hub.docker.com/repository/docker/catlair/bilitools)
[![Docker Pulls](https://img.shields.io/docker/pulls/catlair/bilitools)](https://hub.docker.com/repository/docker/catlair/bilitools)
[![GitHub release (latest by date)](https://img.shields.io/github/downloads/catlair/BiliTools/total)](https://github.com/catlair/BiliTools/releases/latest)

## 支持功能

- [x] 部分方式每日随机时间运行
- [x] 每日签到/分享/播放
- [x] 直播签到
- [x] 漫画签到/自动使用漫读券（测试）
- [x] 每日自动投币（指定数量）
- [x] 银瓜子兑换硬币
- [x] 应援团签到
- [x] 硬币赛事竞猜（不保证胜率，支持正压、反压和随机压）
- [x] 直播间弹幕（每日首次获得 100 亲密度，自动点亮灰色勋章）
- [x] 领取年度大会员权益：b 币券，漫读券（更新为每日检测）
- [x] 自动使用 B 币券充电
- [x] 直播赠送即将过期的礼物（为确保安全，只赠送辣条和小心心）
- [x] 多账号独立配置
- [x] 直播天选时刻（测试）
- [x] 直播礼物红包（停止）
- [x] 粉丝勋章/亲密度
- [x] 支持 Docker 、腾讯 SCF 、阿里 FC、百度 CFC、华为 FG、青龙面板等方式运行，支持执行自定义消息推送
- [x] 代码自动在线更新，发包任你发
- [ ] ~~风纪委员 headless 版（不支持 scf）见 [bili-task-puppeteer](https://github.com/catlair/bili-task-puppeteer)~~（没有资格）

## 使用说明

### 重要提示

新增天选时刻、红包，支持自动读取/删除关注消息。

直播获取小心心改版，且取消直播间弹幕功能，使用 `粉丝勋章/亲密度（测试）`替代。

领取年度大会员权益/B 币券，更新为每日检测，适应新规则。

支持获取在线代码运行，部署一次即可长期更新（逻辑不变的情况下），添加环境变量 `USE_NETWORK_CODE` 尝试，百度云不支持环境变量，可以在附加消息中添加 `USE_NETWORK_CODE` 字段。值为字符串，可以是任意值，但不能为空。

## 使用方法

以上内容以文档为准

**[详细文档查看](https://btdocs.vercel.app/)**

## 参考项目

- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [catlair/bili-task-puppeteer](https://github.com/catlair/bili-task-puppeteer)
- [lzghzr/TampermonkeyJS](https://github.com/lzghzr/TampermonkeyJS)
- [whyour/qinglong](https://github.com/whyour/qinglong)
- [RayWangQvQ/BiliBiliToolPro](https://github.com/RayWangQvQ/BiliBiliToolPro) （推荐转用）
