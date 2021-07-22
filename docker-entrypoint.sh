#!/bin/sh
set -e

node tools/processConfig.js

if [ "$3" == "--scf" ]
then
  npm install -g serverless modclean
fi

if [ "$3" == "deploy:muilt" ]
then
  npm install -g serverless modclean
  node tools/bootstrap.js --scf
fi

exec "$@"
