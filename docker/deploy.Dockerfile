FROM catlair/bilitools:latest
WORKDIR /usr/src/app
ENV SERVERLESS_PLATFORM_VENDOR=tencent
RUN npm install serverless serverless-tencent -g \
    && cd dist \
    && mv index.js index.local.js \
    && mv index.scf.js index.js
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["deploy"]
