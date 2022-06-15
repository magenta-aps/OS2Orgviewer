#!/usr/bin/env sh

# Now this is *good* engineering.
#
# We have not learned how to manage keycloak tokens yet, and since orgviewer
# has this half-baked-RBAC-in-nginx-implementation, we only get a fresh token
# on startup. Well, the tokens expire so we just do the obvious thing; crash
# approximately every 10 minutes and let k8s/docker restart the process!
# NOTE: do not set the CRASH_RESTART_BASE_TIME too low as this will lead to
# CrashLoopBackoff issues in Kubernetes
# (see https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy)
# since the backoff delay will increase if the container is running less than 10 minutes

(sleep $(($CRASH_RESTART_BASE_TIME + $RANDOM % 100)) && kill 1)&
