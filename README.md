[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KudouRan/BiliTools/blob/main/LICENSE)
[![node-current (scoped)](https://img.shields.io/node/v/@catlair/bilitools)](https://www.npmjs.com/package/@catlair/bilitools)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/KudouRan/BiliTools)](https://github.com/KudouRan/BiliTools/releases)
[![欢迎 PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/KudouRan/BiliTools/pulls)
[![GitHub issues](https://img.shields.io/github/issues/KudouRan/BiliTools)](https://github.com/KudouRan/BiliTools/issues)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/catlair/bilitools)](https://hub.docker.com/repository/docker/catlair/bilitools)
[![Docker Pulls](https://img.shields.io/docker/pulls/catlair/bilitools)](https://hub.docker.com/repository/docker/catlair/bilitools)
[![GitHub release (latest by date)](https://img.shields.io/github/downloads/KudouRan/BiliTools/total)](https://github.com/KudouRan/BiliTools/releases/latest)

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

## 使用方法

以上内容以文档为准

**[详细文档查看](https://btdocs.vercel.app/)**

## 说明

是时候停更了，暂时不会删库，让它留个纪念吧，偶尔修复反馈的 bug。

## 开发

安装依赖

```bash
yarn install
```

开发环境运行

```bash
yarn dev
```

格式化代码

```bash
yarn lint:prettier
yarn lint:eslint
```

开发环境模仿 npm 全局命令

```bash
yarn dev:bin -c ./config/config.json
```

编译

```bash
yarn build
```

## 目录

```bash
.
├── babel.config.mjs # babel 配置文件
├── build # 编译相关脚本或配置目录
│  ├── babel.base.mjs
│  ├── rollup.config.base.ts
│  └── rollup.config.ts
├── config # 配置文件目录
│  ├── bt_activityLottery.json # 活动抽奖配置，自动生成
│  ├── bt_jobs.json # 未定，自动生成
│  ├── config.dev.json5 # 开发环境配置
│  ├── config.json5 # 配置文件
├── dist # 生成文件目录
│  └── xxxx
├── docker-compose.yml
├── docker-entrypoint.sh
├── Dockerfile
├── jest.config.ts # jest 配置文件
├── LICENSE
├── logs # 日志目录
│  └── xxxx
├── package.json # npm 包配置文件
├── README.md
├── rollup.config.ts # rollup 配置文件
├── serverless.yaml # serverless 配置文件
├── src # 源码目录
│  ├── __test__ # 测试目录
│  ├── bin # 命令行目录，npm 全局命令
│  ├── config # 配置目录，处理配置的函数和默认配置文件
│  ├── constant # 常量目录，使用的常量都在这里
│  ├── dto # 数据传输对象目录，用于放请求数据的 TypeScript 的接口
│  ├── enums # 枚举目录
│  ├── net # 网络相关目录，用于放网络请求的接口
│  ├── service # 服务目录，逻辑代码
│  ├── task # 任务目录，用于放最终抛出的任务
│  ├── types # 类型目录，用于放类型定义的 TypeScript 接口
│  ├── utils # 工具目录，放使用到的公共函数
│  ├── vm # 运行网络代码的虚拟机目录
│  ├── util.ts # 入口文件使用的工具函数文件
│  ├── env.d.ts # 环境变量类型文件
│  ├── index.cfc.ts # cfc 入口文件
│  ├── index.fc.ts # fc 入口文件
│  ├── index.ql.ts # ql 入口文件
│  ├── index.scf.ts # scf 入口文件
│  ├── index.ts # 直接运行的入口文件
│  ├── bin.ts # 命令行脚本
│  ├── main.d.ts # npm 导入的类型文件
│  └── main.ts # npm 导入的入口
├── temp # 临时目录
├── tools # 工具目录
│  ├── bilitools_npm.js # 青龙面板的运行脚本
│  └── giteeRelease.ts # 发布到 gitee 的脚本
├── tsconfig.json # TypeScript 配置文件
└── yarn.lock
```

## 参考项目

- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [catlair/bili-task-puppeteer](https://github.com/catlair/bili-task-puppeteer)
- [lzghzr/TampermonkeyJS](https://github.com/lzghzr/TampermonkeyJS)
- [whyour/qinglong](https://github.com/whyour/qinglong)
- [RayWangQvQ/BiliBiliToolPro](https://github.com/RayWangQvQ/BiliBiliToolPro)
