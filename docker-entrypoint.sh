#!/bin/sh
set -e

node tools/processConfig.js

function scfHandle(){
  npm install -g serverless
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
fi

exec "$@"
