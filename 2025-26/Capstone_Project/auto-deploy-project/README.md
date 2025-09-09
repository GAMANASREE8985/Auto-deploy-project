# Automated Deployment + Integrated Testing Pipelines
This repository implements the project described in the research paper: **Automated Software Deployment System with Integrated Testing Pipelines**.

It contains:
- Frontend (React) with Jest tests
- Backend (Node + Express) with Jest + Supertest tests and Postgres connection
- Dockerfiles for frontend & backend
- docker-compose for local dev
- Kubernetes manifests and Helm skeleton
- Jenkinsfile (pipeline)
- GitHub Actions CI workflow
- Trivy scan example script
- Terraform skeleton for cloud infra
- Prometheus/Grafana deployment notes
- setup scripts to run locally (minikube + docker-compose)

**How to use**: see `setup-instructions.md` for step-by-step commands for Ubuntu (tailored for VS Code).

## Additional features added
- Prometheus metrics endpoint at /metrics (backend)
- Prometheus scrape annotations in k8s manifests
- Trivy and SonarQube steps added to GitHub Actions
- DB init SQL and npm script
- Simple anomaly detection stub (backend/ml/anomaly.js)
- Rollback script scripts/rollback.sh
