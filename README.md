## 支持功能

- [x] SCF 每日随机时间运行（可能多运行 n 次 SCF 但该 n 次运行不会调用任何 api）
- [x] 每日签到/分享/播放
- [x] 直播签到
- [x] 漫画签到
- [x] 每日自动投币（指定数量）
- [x] 银瓜子兑换硬币
- [x] 基于瞎扯的风纪委员任务（默认关闭，慎用）
- [x] 应援团签到
- [x] 直播间弹幕（每日首次获得 100 亲密度，自动点亮灰色勋章）
- [x] 领取年度大会员权益/B 币券（无测试条件，待测试）
- [x] 自动使用 B 币券充电
- [ ] 支持 Docker 、 SCF 等方式运行，支持执行消息推送

## 使用说明

访问 Github 有困难？ 可以使用 [Gitee](https://gitee.com/catlair/BiliTools) 查看文档

个人使用：消息推送除邮箱暂时不再支持其他 （新增 [pushplus](http://www.pushplus.plus/)）

SCF 每日随机时间运行多运行 n 次的原因是：随机生成的下次运行时间可能是在此次运行时间的后面，导致再次运行，目前只是将后面的运行都进行了跳过处理。

本地开发时 `typescript` 和 `serverless` 需自行安装。  
当需要自行添加功能时，由于判断是否执行函数的机制，默认导出的 `service` 函数不能为匿名，该函数名必须和配置文件一致。

## 使用方法

为了和 Gitee 同步，文档转移至 [docs 目录](./docs)  
**若 Github 无法查看图片，请访问 [Gitee](https://gitee.com/catlair/BiliTools/tree/main/docs)**

- [手动部署到 SCF](./docs/手动部署到SCF.md) #18（推荐）
- [Action 部署到 SCF](./docs/Action部署到SCF.md) #20（推荐）
- [使用 Docker 运行](./docs/使用Docker运行.md) #25
- [使用 Action 测试运行](./docs/使用Action运行.md) #24（体验，不推荐）

### Docker 镜像

- `catlair/bilitools-deploy` 用于部署到 SCF
- `catlair/bilitools` 用于直接运行

## API 参考

- [RayWangQvQ/BiliBiliTool](https://github.com/RayWangQvQ/BiliBiliTool)
- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [catlair/bili-task-puppeteer](https://github.com/catlair/bili-task-puppeteer)

## 责任声明

1. 本项目旨在学习 Github、Git 及 TypeScript 的使用，若存在损害您合法权益的内容，请联系本人处理（hub 主页有邮箱）。
2. bug 是不可避免的，我们尽量减少 bug 所带来得损失，**但这并不意味着我们要为此负责**，选择权在您，望周知。
3. 使用 bilibili.com （以下简称 B 站） 进行测试，不会提供的内容**包括但不限于** B 站抢辣条、转发抽奖、下载 VIP 视频等内容，**请在阅读代码后删除源码及相关工具**。
4. 不会以任何方式收集用户 mid、Cookies、关注列表、收藏记录等信息。
5. 项目只向 B 站提供 Cookies ，故任何方式的泄露都与该仓库**无直接关系**。请不要将 Cookies 上传到 Github 等**开放平台**以及其他任何**不可信**平台。
6. 本仓库只使用 Actions 进行 Releases 构建、项目测试等操作。**请您务必遵守 Github 服务条款，不要滥用 Actions 工作流**。
7. 仓库中不含内置的任何 B 站相关用户信息，任何您不清楚的投币、充电、打赏都与本仓库无关。
