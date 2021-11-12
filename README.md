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

由于只是个人使用，所以消息推送除邮箱暂时不再支持其他（基于微信公众号的推送总是不稳定，目前存在的暂时能用）

### 云函数额度调整

<https://cloud.tencent.com/document/product/583/17299>

100 万次调用调整为 10 万次（事件函数只有 5 万次）  
40 万 GBs 资源使用量调整为 2 万 GBs  
外出流量 0.5 GB

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
- [青龙面板](https://github.com/whyour/qinglong)

### 直播心跳（新增）

入口函数（执行方法）不是 `index.main_handler` 而是 `liveHeart.main_handler`，手动部署到 SCF 时需要注意

使用 scf 时，直播心跳要获取 24 个小心心需要消耗至少 6 次 scf api 调用（粉丝勋章 24 以上时）， 最多 144 次 scf api 调用（粉丝勋章 1 个）。每次调用不超过 30s（极限）

使用其它方式时，至少 5 分钟，至多 144 分钟。

### 风纪委员任务（删除）

因为 B 站改革，以前的不能使用了，对于获取风纪委员资格，也增加了人工审核。为了避免不必要的麻烦，暂时不会增加该功能。
如果你想使用此功能且使用 docker 或在本地执行，可以尝试 **[风纪委员 headless 版](https://github.com/catlair/bili-task-puppeteer)**

### Docker 镜像

- `catlair/bilitools-deploy` 用于部署到 SCF
- `catlair/bilitools` 用于直接运行

## 参考项目

- [RayWangQvQ/BiliBiliTool](https://github.com/RayWangQvQ/BiliBiliTool)
- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [catlair/bili-task-puppeteer](https://github.com/catlair/bili-task-puppeteer)
- [JunzhouLiu/BILIBILI-HELPER-PRE](https://github.com/JunzhouLiu/BILIBILI-HELPER-PRE)
- [lzghzr/TampermonkeyJS](https://github.com/lzghzr/TampermonkeyJS)

## 责任声明

1. 本项目旨在学习 Github、Git 及 TypeScript 的使用，若存在损害您合法权益的内容，请联系本人处理。
2. bug 是不可避免的，我们尽量减少 bug 所带来得损失，**但这并不意味着我们要为此负责**，选择权在您，望周知。
3. 不会以任何方式收集用户 mid、Cookies、关注列表、收藏记录等信息。
4. 项目只向 B 站提供 Cookies ，故任何方式的泄露都与该仓库**无直接关系**。请不要将 Cookies 上传到 Github 等**开放平台**以及其他任何**不可信**平台。
5. 本仓库只使用 Actions 进行 Releases 构建、项目测试等操作。**请您务必遵守 Github 服务条款，不要滥用 Actions 工作流**。
6. 仓库中内置的任何 B 站相关用户信息，都不会影响你的投币、充电、打赏，权利掌握在使用者手中。

## 提示

- 小心保管 Bilibil Cookies。 泄露最后别人用你 Cookie 登录，你还看不见登录记录。
- 别把 Bilibil Cookies 随便乱传，小心任何非 B 站官方程序，包括本项目（所以你可以选择不用），且应该特别注意闭源的软件。
- 之前比较火的 JunzhouLiu/BILIBILI-HELPER-PRE，就因为不想被黑产品利用而删库跑路。（让黑产自己开发去吧）

点名批评类似以下行为，不过还好不是本仓库发生的
![image](https://user-images.githubusercontent.com/44313800/139539087-16bbacc7-b6b1-456a-8579-144664266ecc.png)
