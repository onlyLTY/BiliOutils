## 支持功能

- [x] SCF 每日随机时间运行（可能多运行 n 次 SCF 但该 n 次运行不会调用任何 api）
- [x] 每日签到/分享/播放
- [x] 直播签到
- [x] 漫画签到
- [x] 每日自动投币（指定数量）
- [x] 银瓜子兑换硬币
- [x] 硬币赛事竞猜（不保证胜率，支持正压、反压和随机压）（test）
- [x] 直播挂机获取小心心 （scf 和 docker 运行）
- [x] 应援团签到
- [x] 直播间弹幕（每日首次获得 100 亲密度，自动点亮灰色勋章）
- [x] 领取年度大会员权益/B 币券（无测试条件，待测试）
- [x] 自动使用 B 币券充电
- [ ] 风纪委员 headless 版（不支持 scf）见 [bili-task-puppeteer](https://github.com/catlair/bili-task-puppeteer)
- [x] 直播赠送即将过期的礼物（为确保安全，只赠送辣条和小心心）（test）
- [ ] 支持 Docker 、 SCF 、青龙面板等方式运行，支持执行消息推送

## 使用说明

消息推送直接使用了 `青龙面板` 中的消息推送

### 云函数额度调整

<https://cloud.tencent.com/document/product/583/17299>

## 使用方法

详细文档查看 [docs 目录](./docs)  
**若 Github 无法查看图片，请访问 [Gitee](https://gitee.com/catlair/BiliTools/tree/main/docs)**

使用必读：

- [Cookies/UA 获取方法](./docs/readme.md)
- [配置详情（必看）](./docs/configuration.md)
- [参考配置](./config/config.example.json)

运行方法：

- [手动部署到 SCF](./docs/手动部署到SCF.md)
- [Action 部署到 SCF](./docs/Action部署到SCF.md)
- [使用 Docker 运行](./docs/使用Docker运行.md)
- [本地运行](./docs/本地运行.md)
- [gzip 在线压缩](https://www.baidufe.com/fehelper/en-decode/index.html)
- [青龙面板](https://github.com/whyour/qinglong): 自行添加 Node 依赖 `pako axios qs`, 自行创建 `config.json` 文件（脚本管理中）。参考 [#46](https://github.com/catlair/BiliTools/issues/46)。

### 直播心跳（新增）

入口函数（执行方法）不是 `index.main_handler` 而是 `liveHeart.main_handler`，手动部署到 SCF 时需要注意

### Docker 镜像

- `catlair/bilitools-deploy` 用于部署到 SCF
- `catlair/bilitools` 用于直接运行

## 参考项目

- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [catlair/bili-task-puppeteer](https://github.com/catlair/bili-task-puppeteer)
- [lzghzr/TampermonkeyJS](https://github.com/lzghzr/TampermonkeyJS)
- [whyour/qinglong](https://github.com/whyour/qinglong)

以下项目已经不存在：

- [RayWangQvQ/BiliBiliTool](https://github.com/RayWangQvQ/BiliBiliTool)
- [JunzhouLiu/BILIBILI-HELPER-PRE](https://github.com/JunzhouLiu/BILIBILI-HELPER-PRE)

## 责任声明

1. 本项目旨在学习 Github、Git 及 TypeScript 的使用，若存在损害您合法权益的内容，请联系本人处理。
2. bug 是不可避免的，我们尽量减少 bug 所带来得损失，**但这并不意味着我们要为此负责**，选择权在您，望周知。
3. 不会以任何方式收集用户 mid、Cookies、关注列表、收藏记录等信息。
4. 项目只向 B 站提供 Cookies ，故任何方式的泄露都与该仓库**无直接关系**。请不要将 Cookies 上传到 Github 等**开放平台**以及其他任何**不可信**平台。
5. 本仓库只使用 Actions 进行 Releases 构建、项目测试等操作。**请您务必遵守 Github 服务条款，不要滥用 Actions 工作流**。
6. 仓库中内置的任何 B 站相关用户信息，都不会影响你的投币、充电、打赏，权利掌握在使用者手中。
