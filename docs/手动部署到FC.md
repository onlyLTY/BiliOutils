## 新增 fc

[点击进入云函数控制台](https://fcnext.console.aliyun.com/cn-chengdu/services)

![services](images/fc-services.png)

创建一个服务，日志可有可无，过程略

然后在服务下创建一个函数

### 基础配置

- 运行环境选择最新的 `Nodejs`（最低请选择 14）

![FC基础配置](images/fc-base-config.png)

### 触发器配置

- 直播心跳的触发器名必须为`heart_bili_timer`，否则无法调用

![fc-create-trigger](images/fc-create-trigger.png)

### 高级配置

设置超时时间

![fc-timeout](images/fc-timeout.png)

## 安装或更新

![fc-npm](images/fc-npm.png)

云函数使用了镜像加速，但是镜像不是实时更新的，如果想要今天刚更新的模块，请设置源为默认。

```bash
npm config set registry https://registry.npmjs.org/
```

安装/更新依赖，都是同样的

```bash
yarn add @catlair/bilitools
```

修改 index.js 的代码

```javascript
exports.handler = require('@catlair/bilitools').fc_handler();
```

最后参考图中位置，添加配置文件，再点击部署

## 随机时间运行（可选）

liveHeart 必选

获取 ARM ID 和 KEY

[跳转到创建 RAM 子用户](https://ram.console.aliyun.com/users)

创建用户

![ali-create-user](images/ali-create-user.png)

添加 FC 的权限，并在此复制 ID 和 KEY

![images/ali-ram-new](images/ali-ram-new.png)

将 ID 和 KEY 添加到云函数的配置中（[位置参考](#高级配置)）

![fc-ali-sercret](images/fc-ali-secret.png)
