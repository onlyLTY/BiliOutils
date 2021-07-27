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
           --env BILI_CONFIG="${{ secrets.BILI_CONFIG }}" \
           --env TENCENT_SECRET_ID="${{ secrets.TENCENT_SECRET_ID }}" \
           --env TENCENT_SECRET_KEY="${{ secrets.TENCENT_SECRET_KEY }}" \
           -i --rm  \
           catlair/bilitools-deploy:latest
```

## Github secrets

secrets 配置如下

![setting](images/119254819-25c04b80-bbeb-11eb-9aec-67977eb7ddba.png)

![setting-new](images/119254821-2822a580-bbeb-11eb-8b41-fd5bbac584fc.png)

![setting-new-2](images/119254825-29ec6900-bbeb-11eb-9bea-22b08d402916.png)
