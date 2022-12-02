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

replace_org_unit_hierarchy_uuids() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_ORG_UNIT_HIERARCHY_UUIDS: '.*'#VUE_ORG_UNIT_HIERARCHY_UUIDS: '${GLOBAL_ORG_UNIT_HIERARCHY_UUIDS}'#g" -i $index_file
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
    sed "s#<title>.*</title>#<title>${GLOBAL_APP_TITLE}</title>#g" -i $index_file
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

replace_hide_org_unit_uuids() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_APP_HIDE_ORG_UNIT_UUIDS: '.*'#VUE_APP_HIDE_ORG_UNIT_UUIDS: '${VUE_APP_HIDE_ORG_UNIT_UUIDS}'#g" -i $index_file
}

replace_hide_manager_org_units() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_APP_HIDE_MANAGER_ORG_UNITS: '.*'#VUE_APP_HIDE_MANAGER_ORG_UNITS: '${VUE_APP_HIDE_MANAGER_ORG_UNITS}'#g" -i $index_file
}

replace_use_autocomplete_api() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#VUE_APP_USE_AUTOCOMPLETE_API: '.*'#VUE_APP_USE_AUTOCOMPLETE_API: '${VUE_APP_USE_AUTOCOMPLETE_API}'#g" -i $index_file
}

replace_keycloak_client_secret() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#KEYCLOAK_CLIENT_SECRET: '.*'#KEYCLOAK_CLIENT_SECRET: '${KEYCLOAK_CLIENT_SECRET}'#g" -i $index_file
}

replace_favicon_path() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#<link href=\".*\" rel=\"icon\" >#<link href=\"${VUE_APP_FAVICON_PATH}\" rel=\"icon\" >#g" -i $index_file
}

replace_css_path() {
  local index_file="/usr/share/nginx/html/index.html"

  if [ ! -f $index_file ]; then
    echo >&3 "$ME: ERROR: $index_file does not exist"
    exit 1
  fi
  sed "s#<link id=\"oc-custom-style\" href=\".*\" rel=\"stylesheet\">#<link id=\"oc-custom-style\" href=\"${VUE_APP_THEME_CSS}\" rel=\"stylesheet\">#g" -i $index_file
}

replace_global_url
replace_global_root_uuid
replace_org_unit_hierarchy_uuids
replace_global_app_title
replace_global_replace_org_person_relation
replace_tree_layout
replace_logo_path
replace_hide_org_unit_uuids
replace_hide_manager_org_units
replace_keycloak_client_secret
replace_favicon_path
replace_css_path

exit 0
