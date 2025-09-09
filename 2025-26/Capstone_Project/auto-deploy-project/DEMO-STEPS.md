# Demo Steps (what to show to faculty)

1. Start local environment:
   - docker compose up --build
   - Visit frontend at http://localhost:3000 and backend at http://localhost:4000/health

2. Run tests locally:
   - cd backend && npm ci && npm test
   - cd frontend && npm ci && npm test --watchAll=false

3. Build images and load into minikube (optional):
   - minikube start --driver=docker
   - eval $(minikube -p minikube docker-env)
   - docker build -t auto-deploy-backend:local ./backend
   - docker build -t auto-deploy-frontend:local ./frontend
   - kubectl apply -f k8s/namespace.yaml
   - kubectl apply -f k8s/postgres-deployment.yaml
   - kubectl apply -f k8s/backend-deployment.yaml
   - kubectl apply -f k8s/frontend-deployment.yaml
   - minikube service frontend -n auto-deploy --url

4. Show CI logs (use Jenkins or GitHub Actions)
5. Show Trivy scan output (scripts/trivy-scan.sh)
6. Show Argo CD (if installed) and Grafana dashboards (if installed)
