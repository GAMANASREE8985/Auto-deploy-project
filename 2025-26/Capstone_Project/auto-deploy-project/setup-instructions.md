# Setup Instructions (Ubuntu + VS Code)

Follow these steps in order. Copy commands into your terminal on Ubuntu.

## 1. System prerequisites
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget unzip build-essential apt-transport-https ca-certificates gnupg lsb-release openjdk-11-jdk

## 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# log out & back in or run: newgrp docker

## 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup-lts.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g npm@latest

## 4. Install kubectl, helm, minikube
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

## 5. Local quick run (docker-compose)
# build & run
docker compose up --build

# backend: http://localhost:4000
# frontend: http://localhost:3000

## 6. Run tests locally
cd backend && npm ci && npm test
cd frontend && npm ci && npm test --watchAll=false

## 7. Deploy to minikube (optional)
minikube start --driver=docker
eval $(minikube -p minikube docker-env)
docker build -t auto-deploy-backend:local ./backend
docker build -t auto-deploy-frontend:local ./frontend
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
minikube service frontend -n auto-deploy --url

## 8. CI/CD notes
- Jenkins: use `jenkins/Jenkinsfile`
- GitHub Actions: `.github/workflows/ci.yml`
- Argo CD: create an ArgoCD Application pointing to `gitops/` folder in repo

## 9. Security scanning
Install trivy and run:
trivy image auto-deploy-backend:local


## Prometheus & Monitoring
- Install Prometheus via Helm and it will discover the backend metrics (ensure prometheus scrapes the namespace)
- Example: helm install prometheus prometheus-community/prometheus -n monitoring --create-namespace
- The backend exposes /metrics and has annotations for scraping in k8s/backend-deployment.yaml

## SonarQube
- To run SonarQube locally, use docker-compose with sonarqube image, then set SONAR_TOKEN secret and SONAR_HOST_URL in CI.

## Rollback
- Use scripts/rollback.sh <deployment> to rollback a deployment in the auto-deploy namespace.
