FROM catlair/bilitools:latest
WORKDIR /usr/src/app
ENV SERVERLESS_PLATFORM_VENDOR=tencent
COPY ./serverless.yaml .
RUN npm install serverless -g
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "tools/bootstrap.js", "--scf"]
