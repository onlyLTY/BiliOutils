## 1. 下载最新版的 [baidu_cfc.zip 压缩包](https://github.com/catlair/BiliTools/releases/latest)

[Gitee 备份下载地址](https://gitee.com/catlair/BiliTools/releases/)

加速下载：
<https://ghproxy.com/https://github.com/catlair/BiliTools/releases/download/v0.4.5/baidu_cfc.zip>

把 v0.4.5 替换成最新版本号即可

详细过程略，请参考 [手动部署到 SCF](./手动部署到SCF.md)

[点击访问百度 CFC](https://cloud.baidu.com/product/cfc.html)

- Nodejs 版本请选择 12.x 及以上
- 暂时只支持每日任务
- 暂时不支持随机时间运行

## 配置

由于百度云函数的编辑器只能看到入口文件，所有配置直接在入口文件中写入即可。

入口文件中有如下代码：

```javascript
var _globalVar = require('./config/globalVar');

_globalVar.TaskConfig.config = null;

var _dailyTask = require('./task/dailyTask');
```

配置方式如下：

```javascript
var _globalVar = require('./config/globalVar');

_globalVar.TaskConfig.config = {
  cookie: '',
  function: {
    liveSignTask: true,
  },
};

var _dailyTask = require('./task/dailyTask');
```
