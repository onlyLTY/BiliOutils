[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/KudouRan/BiliTools/blob/main/LICENSE)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/KudouRan/BiliTools)](https://github.com/KudouRan/BiliTools/releases)
[![欢迎 PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/KudouRan/BiliTools/pulls)
[![GitHub issues](https://img.shields.io/github/issues/KudouRan/BiliTools)](https://github.com/KudouRan/BiliTools/issues)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/catlair/bilitools)](https://hub.docker.com/repository/docker/catlair/bilitools)
[![Docker Pulls](https://img.shields.io/docker/pulls/catlair/bilitools)](https://hub.docker.com/repository/docker/catlair/bilitools)
[![GitHub release (latest by date)](https://img.shields.io/github/downloads/KudouRan/BiliTools/total)](https://github.com/KudouRan/BiliTools/releases/latest)

## 使用方法

支持功能和使用方法请查看文档：

**[详细文档查看](https://btdocs.vercel.app/)**

**[备用文档](https://catlair.github.io/BiliOutils/)**

## 说明

停更了（即使这样他也是 Github 上最全的之一），暂时不会删库，让它留个纪念吧，偶尔修复反馈的 bug。

反馈 bug 或提意见时，请务必清晰的描述你的问题或想法，写 100 行代码很容易，但是弄清楚一个逻辑很难，何况功能是给所有用户用的。如果你觉得这一切理所应当，那么希望你不要打扰我。

## 开发

安装依赖

```bash
yarn install
```

开发环境运行

```bash
yarn dev
```

检查和格式化代码

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

## 相关链接

- [@catlair/bilicomic-dataflow](https://www.npmjs.com/package/@catlair/bilicomic-dataflow)：哔哩哔哩漫画阅读数据流生成器
- [@catlair/node-got](https://www.npmjs.com/package/@catlair/node-got)：got 的简单封装
