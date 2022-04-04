#!/usr/bin/env sh

REALM=${KEYCLOAK_REALM:-mo}
BASEURL=${KEYCLOAK_BASEURL:-http://keycloak:8080/auth}
if [[ -z "${KEYCLOAK_CLIENT_SECRET}" ]]; then
  printf "Error: missing 'KEYCLOAK_CLIENT_SECRET' env var.\n"
  exit 1
else
  CLIENT_SECRET="${KEYCLOAK_CLIENT_SECRET}"
fi

KEYCLOAK_URL=$(printf "%s/realms/%s/protocol/openid-connect/token" "$BASEURL" "$REALM" )

json=$(curl -d "grant_type=client_credentials&client_id=orgviewer&client_secret=$CLIENT_SECRET" -X POST "$KEYCLOAK_URL")
access_token=$(printf "%s" "$json" | jq -r '.access_token')

sed -i "s/ACCESS_TOKEN/$access_token/g" /etc/nginx/conf.d/default.conf
