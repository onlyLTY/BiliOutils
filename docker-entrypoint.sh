#!/bin/sh
set -e

node tools/processConfig.js

scfHandle(){
  which "sls" &> /dev/null
  if [ $? -ne 0 ]
  then
  npm install serverless -g
  fi
  mv node_modules dist
}

if [ "$3" == "--scf" ]
then
  scfHandle
fi

if [ "$3" == "deploy:muilt" ]
then
  scfHandle
  node tools/bootstrap.js --scf
  # 将参数后移 3 个
  shift 3
fi

exec "$@"
