#!/bin/sh
set -e

node processConfig.js

bilitools -v

bilitools -c /usr/src/app/config/config.json
