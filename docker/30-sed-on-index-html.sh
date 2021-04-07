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

replace_global_app_title() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  # Check if variable is set, regardless of empty or not
  if [ ! -z "${GLOBAL_APP_TITLE+x}" ]; then
    sed "s#var GLOBAL_APP_TITLE = '.*'#var GLOBAL_APP_TITLE = '${GLOBAL_APP_TITLE}'#g" -i $index_file
  fi
}

replace_global_replace_org_person_relation() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#var GLOBAL_ORG_PERSON_RELATION = '.*'#var GLOBAL_ORG_PERSON_RELATION = '${GLOBAL_ORG_PERSON_RELATION}'#g" -i $index_file
}

replace_tree_layout() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#var VUE_APP_TREE_LAYOUT = '.*'#var VUE_APP_TREE_LAYOUT = '${VUE_APP_TREE_LAYOUT}'#g" -i $index_file
}

replace_global_url
replace_global_root_uuid
replace_global_app_title
replace_global_replace_org_person_relation
replace_tree_layout

exit 0
