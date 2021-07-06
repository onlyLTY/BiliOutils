## 支持功能

- [x] scf 每日随机时间运行（可能多运行 n 次 scf 但该 n 次运行不会调用任何 api）
- [x] 每日签到/分享/播放
- [x] 直播签到
- [x] 漫画签到
- [x] 每日自动投币（指定数量）
- [x] 银瓜子兑换硬币
- [x] 基于瞎扯的风纪委员任务（默认关闭，慎用）
- [x] 应援团签到
- [x] 直播间弹幕（每日首次获得 100 亲密度，自动点亮灰色勋章）
- [ ] 领取会员权益（请催更）
- [ ] 自动使用 b 币券（请催更）

## 使用说明

个人使用：消息推送除邮箱暂时不再支持其他

scf 每日随机时间运行多运行 n 次的原因是：随机生成的下次运行时间可能是在此次运行时间的后面，导致再次运行，目前只是将后面的运行都进行了跳过处理

本地开发时 `typescript` 和 `serverless` 需自行安装

## 使用方法

`config/config.demo.jsonc`中进行了三个用户的配置演示，使用单用户可以只配置一个。

- [手动部署到 SCF](https://github.com/catlair/BiliTools/issues/18)
- [Action 部署到 SCF](https://github.com/catlair/BiliTools/issues/20) （不推荐）

### 腾讯云 serverless

获取 key 参考[腾讯云权限管理](https://cloud.tencent.com/document/product/583/44786)

## API 参考

- [RayWangQvQ/BiliBiliTool](https://github.com/RayWangQvQ/BiliBiliTool)
- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [catlair/bili-task-puppeteer](https://github.com/catlair/bili-task-puppeteer)

## 责任声明

1. 本项目旨在学习 Github、Git 及 TypeScript 的使用，若存在损害您合法权益的内容，请联系本人处理（hub 主页有邮箱）。
2. bug 是不可避免的，我们尽量减少 bug 所带来得损失，**但这并不意味着我们要为此负责**，选择权在您，望周知。
3. 使用 Bilibili （以下简称 b 站） 进行测试，不会提供的内容**包括但不限于** b 站抢辣条、转发抽奖、下载 VIP 视频等内容，**请在阅读代码后删除源码及相关工具**。
4. 不会以任何方式收集用户 ID、cookie、关注列表、收藏记录等信息。
5. 任何方式的 cookie 泄露都与我无关。请不要将 cookie 上传到 Github 等开放平台以及其他任何不可信平台。
6. 除仓库和本仓库 Releases 中开发下载的内容，其余皆与本人无关。
7. 本仓库只使用 Actions 进行 Releases 构建、项目测试等操作。**请您务必遵守 Github 服务条款，不要滥用 Actions 工作流**。
8. 仓库中不含本人任何 b 站相关信息，任何您不清楚的投币、充电、打赏都与本仓库无关。
