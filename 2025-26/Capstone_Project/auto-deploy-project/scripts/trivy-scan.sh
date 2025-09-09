#!/bin/bash
# Example: scan images after build
IMAGE_BACKEND=$1
IMAGE_FRONTEND=$2
if ! command -v trivy &> /dev/null; then
  echo "Trivy not found. Install from https://aquasecurity.github.io/trivy/"
  exit 1
fi
trivy image --severity CRITICAL,HIGH $IMAGE_BACKEND || true
trivy image --severity CRITICAL,HIGH $IMAGE_FRONTEND || true
