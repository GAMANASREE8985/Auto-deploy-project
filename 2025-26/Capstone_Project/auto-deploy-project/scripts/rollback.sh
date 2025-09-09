#!/bin/bash
# usage: ./scripts/rollback.sh <deployment> [namespace]
DEPLOYMENT=$1
NAMESPACE=${2:-auto-deploy}
if [ -z "$DEPLOYMENT" ]; then
  echo "Usage: $0 <deployment> [namespace]"
  exit 1
fi
echo "Rolling back deployment $DEPLOYMENT in namespace $NAMESPACE"
kubectl rollout undo deployment/$DEPLOYMENT -n $NAMESPACE
kubectl rollout status deployment/$DEPLOYMENT -n $NAMESPACE
