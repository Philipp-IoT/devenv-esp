#!/bin/sh
cd $IDF_PATH/
. ./export.sh
exec "$@"
