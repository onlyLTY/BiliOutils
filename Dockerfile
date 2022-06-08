FROM node:lts-alpine
WORKDIR /usr/src/app
ENV SERVERLESS_PLATFORM_VENDOR=tencent
# 国内构建
# RUN npm config set registry https://registry.npm.taobao.org
COPY ./docker-entrypoint.sh ./tools/processConfig.js ./
RUN chmod +x docker-entrypoint.sh \
    && npm install -g @catlair/bilitools \
    && npm cache clean --force
ENTRYPOINT ["./docker-entrypoint.sh"]
