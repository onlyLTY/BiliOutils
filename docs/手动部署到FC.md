## 1. 下载最新版的 [aliyun_fc.zip 压缩包](https://github.com/catlair/BiliTools/releases/latest)

[Gitee 备份下载地址](https://gitee.com/catlair/BiliTools/releases/)

加速下载：
<https://ghproxy.com/https://github.com/catlair/BiliTools/releases/download/v0.4.5/aliyun_fc.zip>

把 v0.4.5 替换成最新版本号即可

![aliyun_fc](./images/aliyun_fc.png)

## 2. 新增 fc

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

## 3. 上传代码

选择上传刚才下载的压缩包

![fc-upload-zip](images/fc-upload-zip.png)

修改配置文件

![fc-set-config](images/fc-set-config.png)

点击测试运行一下

## 4. 随机时间运行（可选）

liveHeart 必选

获取 ARM ID 和 KEY

[跳转到创建 RAM 子用户](https://ram.console.aliyun.com/users)

创建用户

![ali-create-user](images/ali-create-user.png)

添加 FC 的权限，并在此复制 ID 和 KEY

![images/ali-ram-new](images/ali-ram-new.png)

将 ID 和 KEY 添加到云函数的配置中（[位置参考](#高级配置)）

![fc-ali-sercret](images/fc-ali-secret.png)
