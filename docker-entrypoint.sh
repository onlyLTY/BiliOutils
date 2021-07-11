#!/bin/sh
set -e

node tools/processConfig.js

exec "$@"
