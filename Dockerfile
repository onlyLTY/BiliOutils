# FROM node:lts-alpine as build
# WORKDIR /usr/src/app
# COPY ./ .
# # 国内构建
# # RUN npm config set registry https://registry.npm.taobao.org \
# #     && npm install \
# RUN yarn install --ignore-optional
# RUN npm run build \
#     && npm prune --production \
#     && cp docker/.yarnclean . \
#     && npm run autoclear \
#     && mkdir builddir \
#     && chmod +x docker-entrypoint.sh \
#     && if [ -e src/*.txt ];then cp -rf src/*.txt ./dist ;fi \
#     && if [ -e src/*.json ];then cp -rf src/*.json ./dist ;fi \
#     && mv -f dist tools node_modules package.json serverless.yaml docker-entrypoint.sh builddir \
#     && mkdir builddir/config

FROM node:lts-alpine
WORKDIR /usr/src/app
ENV SERVERLESS_PLATFORM_VENDOR=tencent
# 国内构建
# RUN npm config set registry https://registry.npm.taobao.org
COPY ./docker-entrypoint.sh ./tools/processConfig.js ./
RUN chmod +x docker-entrypoint.sh \
    && npm install -g @catlair/bilitools \
    && npm install pako@1.0.11 \
    && mkdir -p ../dist/utils \
    && cp /usr/local/lib/node_modules/@catlair/bilitools/dist/utils/gzip.js ./ \
    && npm cache clean --force
ENTRYPOINT ["./docker-entrypoint.sh"]
