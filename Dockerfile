FROM node:lts-alpine as build
WORKDIR /usr/src/app
COPY ./ .
# 国内构建
# RUN npm config set registry https://registry.npm.taobao.org \
#     && npm install \
RUN npm install \
    && npm install -g typescript modclean 
RUN npm run build \
    && npm prune --production \
    && npm run modclean \
    && mkdir builddir \
    && chmod +x docker-entrypoint.sh \
    && mv -f dist tools node_modules package.json docker-entrypoint.sh builddir \
    && mkdir builddir/config

FROM node:lts-alpine
WORKDIR /usr/src/app
ENV SERVERLESS_PLATFORM_VENDOR=tencent
COPY --from=build /usr/src/app/builddir .
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "deploy:muilt"]
