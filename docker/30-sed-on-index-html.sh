#!/bin/sh

set -e

ME=$(basename $0)

replace_global_url() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#var GLOBAL_API_URL = '.*'#var GLOBAL_API_URL = '${GLOBAL_API_URL}'#g" -i $index_file
}

replace_global_root_uuid() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#var GLOBAL_API_ROOT_UUID = '.*'#var GLOBAL_API_ROOT_UUID = '${GLOBAL_API_ROOT_UUID}'#g" -i $index_file
}

replace_global_url
replace_global_root_uuid

exit 0
