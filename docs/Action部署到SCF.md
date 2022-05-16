## 创建仓库

参考 [使用 Action 运行](./使用Action运行.md)
`.github/workflows/xxxxxxx.yaml` 内容如下

```yaml
name: bilibili-deploy

on:
  workflow_dispatch: # 手动触发

jobs:
  deploy-bilibili-tool:
    runs-on: ubuntu-latest
    environment: Production
    steps:
      - name: Run Deploy
        timeout-minutes: ${{secrets.TIMEOUT_MINUTES || 15}} # 超时时间(分钟)
        run: |
          sudo docker run \
           --env BILITOOLS_CONFIG="${{ secrets.BILITOOLS_CONFIG }}" \
           --env TENCENT_SECRET_ID="${{ secrets.TENCENT_SECRET_ID }}" \
           --env TENCENT_SECRET_KEY="${{ secrets.TENCENT_SECRET_KEY }}" \
           --env RUN_SCF_ALL=y \
           -i --rm  \
           catlair/bilitools-deploy:latest
```

此处设置环境变量 `RUN_SCF_ALL` 值为 `y`（默认 `n` ）。在部署完成后会运行自动运行一次云函数（所有用户），方便查看配置是否正确

## Github secrets

secrets 配置如下

![setting](images/119254819-25c04b80-bbeb-11eb-9aec-67977eb7ddba.png)

![setting-new](images/119254821-2822a580-bbeb-11eb-8b41-fd5bbac584fc.png)

![setting-new-2](images/119254825-29ec6900-bbeb-11eb-9bea-22b08d402916.png)

**BILITOOLS_CONFIG 是压缩了的** [在这里选择 gzip 压缩](https://www.baidufe.com/fehelper/en-decode/index.html)

## 错误案例

### 偷懒？

自己不会创建仓库？别 fork 本仓库  
请勿直接 fork 本仓库！！！  
请勿直接 fork 本仓库！！！  
请勿直接 fork 本仓库！！！  
请直接创建一个仓库！！！  
请直接创建一个仓库！！！  
请直接创建一个仓库！！！  
你自己还可以创建私有仓库啊！！！  
你自己还可以创建私有仓库啊！！！  
你自己还可以创建私有仓库啊！！！

### 未按要求压缩配置

**再三强调配置需要压缩**  
出现下面这种，BILITOOLS_CONFIG 的配置有好多行，这明显就是没有**压缩**  
`syntax error near unexpected token ('` 错误信息也明确指出是因为特殊符号导致错误

```text
  sudo docker run \
   --env BILITOOLS_CONFIG="***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
    ***
  ***" \
   --env TENCENT_SECRET_ID="***" \
   --env TENCENT_SECRET_KEY="***" \
   --env RUN_SCF_ALL=y \
   -i --rm  \
   catlair/bilitools-deploy:latest
  shell: /usr/bin/bash -e ***0***
/home/runner/work/_temp/5ce701de-530a-4127-8121-94b88d4abe8d.sh: line 13: syntax error near unexpected token `('
Error: Process completed with exit code 2.
```
