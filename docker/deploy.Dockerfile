FROM catlair/bilitools:latest
WORKDIR /usr/src/app
ENV SERVERLESS_PLATFORM_VENDOR=tencent
RUN npm install serverless -g
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["deploy"]
