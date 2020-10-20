#!/bin/sh

set -e

ME=$(basename $0)

symlink_html() {
  CUSTOMER_OPTIONS=$(ls /code/dist/ | tr '\n' ' ')
  if [ -z "$CUSTOMER" ]; then
    echo >&3 "$ME: WARNING: \$CUSTOMER not set! Using default"
    echo >&3 "$ME: WARNING: \$CUSTOMER should be one of: $CUSTOMER_OPTIONS"
    CUSTOMER="default"
  fi
  CUSTOMER_FOLDER=/code/dist/$CUSTOMER
  if [ ! -d "$CUSTOMER_FOLDER" ]; then
    echo >&3 "$ME: ERROR: $CUSTOMER_FOLDER does not exist!"
    echo >&3 "$ME: ERROR: \$CUSTOMER should be one of: $CUSTOMER_OPTIONS"
    exit 1
  fi

  ln -s -f $CUSTOMER_FOLDER/* /usr/share/nginx/html
}

symlink_html

exit 0
