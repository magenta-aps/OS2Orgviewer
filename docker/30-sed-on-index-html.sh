#!/bin/sh

set -e

ME=$(basename $0)

replace_global_url() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_APP_API_BASEURL: '.*'#VUE_APP_API_BASEURL: '${GLOBAL_API_URL}'#g" -i $index_file
}

replace_global_root_uuid() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_APP_ROOT_UUID: '.*'#VUE_APP_ROOT_UUID: '${GLOBAL_API_ROOT_UUID}'#g" -i $index_file
}

replace_global_app_title() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  # Check if variable is set, regardless of empty or not
  if [ ! -z "${GLOBAL_APP_TITLE+x}" ]; then
    sed "s#VUE_APP_TITLE: '.*'#VUE_APP_TITLE: '${GLOBAL_APP_TITLE}'#g" -i $index_file
  fi
}

replace_global_replace_org_person_relation() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_APP_ORG_PERSON_RELATION: '.*'#VUE_APP_ORG_PERSON_RELATION: '${GLOBAL_ORG_PERSON_RELATION}'#g" -i $index_file
}

replace_tree_layout() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_APP_TREE_LAYOUT: '.*'#VUE_APP_TREE_LAYOUT: '${VUE_APP_TREE_LAYOUT}'#g" -i $index_file
}

replace_logo_path() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_APP_LOGO_PATH: '.*'#VUE_APP_LOGO_PATH: '${VUE_APP_LOGO_PATH}'#g" -i $index_file
}

replace_favicon_path() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#link rel=\"icon\" href=\".*\"#link rel=\"icon\" href=\"${VUE_APP_FAVICON_PATH}\"#g" -i $index_file
}

replace_css_path() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#link id=\"oc-custom-style\" href=\".*\"#link rel=\"stylesheet\" href=\"${VUE_APP_THEME_CSS}\"#g" -i $index_file
}

replace_global_url
replace_global_root_uuid
replace_global_app_title
replace_global_replace_org_person_relation
replace_tree_layout
replace_logo_path
replace_favicon_path
replace_css_path

exit 0
