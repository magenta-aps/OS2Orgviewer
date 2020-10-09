#!/bin/sh

set -e

sed "s#var GLOBAL_API_URL = '.*'#var GLOBAL_API_URL = '${GLOBAL_API_URL}'#g" -i /usr/share/nginx/html/index.html
