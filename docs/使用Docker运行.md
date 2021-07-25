## 说明

仓库中包含了相关文件，可自行构建运行  
成品镜像 `catlair/bilitools` [dockerhub 地址](https://registry.hub.docker.com/repository/docker/catlair/bilitools)

## 配置文件

支持现成的配置文件（`config/config.json`）和 gzip 压缩后的配置（`config/config.txt`）  
优先加载**环境变量**中的 gzip 压缩后的配置

### 本地配置文件

挂载目录即可

```bash
docker run -v $(pwd)/config:/usr/src/app/config -i --rm  catlair/bilitools:latest
```

### 压缩后的配置

使用环境变量的方式

```bash
docker run --env BILI_CONFIG="xxxxxxxxxxxxx" -i --rm  catlair/bilitools:latest
```
