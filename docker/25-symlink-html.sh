#!/bin/sh

set -e

ME=$(basename $0)

symlink_html() {
  ln -s -f /code/dist/* /usr/share/nginx/html
}

symlink_html

exit 0
