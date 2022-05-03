#!/usr/bin/env sh

# Now this is *good* engineering.
#
# We have not learned how to manage keycloak tokens yet, and since orgviewer
# has this half-baked-RBAC-in-nginx-implementation, we only get a fresh token
# on startup. Well, the tokens expire so we just do the obvious thing; crash
# every 10 minutes and let k8s/docker restart the process!

(sleep $((500 + $RANDOM % 100)) && kill 1)&
