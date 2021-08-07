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

runScfAll(){
  if [ "$RUN_SCF_ALL" == "y" ] || [ "$RUN_SCF_ALL" == "Y" ]
  then
    node tools/runScfAll.js
  fi
}

if [ "$1" == "deploy" ]
then
  scfHandle
  node tools/bootstrap.js --scf
  runScfAll
else
  node tools/bootstrap.js --start
fi

# 下面兼容老配置 随时删除
if [ "$3" == "--scf" ] || [ "$3" == "deploy:muilt" ]
then
  scfHandle
  node tools/bootstrap.js --scf
  runScfAll 
fi
