.PHONY: help build deploy status logs clean port-forward backup

help:
	@echo "Available commands:"
	@echo "  make build      - Build Docker images locally"
	@echo "  make deploy     - Deploy to Kubernetes"
	@echo "  make status     - Check deployment status"
	@echo "  make logs       - View application logs"
	@echo "  make clean      - Remove all K8s resources"
	@echo "  make port-forward - Port forward to localhost"
	@echo "  make backup     - Backup MySQL database"

build:
	docker build -t solar-frontend ./frontend
	docker build -t solar-backend ./server

deploy:
	cd k8s && ./apply-all.sh

status:
	kubectl get pods,svc,ingress -n solar-system

logs:
	@echo "=== Backend logs ==="
	kubectl logs -l app=backend -n solar-system --tail=20
	@echo ""
	@echo "=== Frontend logs ==="
	kubectl logs -l app=frontend -n solar-system --tail=20

clean:
	kubectl delete -f k8s/ingress/ -n solar-system --ignore-not-found=true
	kubectl delete -f k8s/frontend/ -n solar-system --ignore-not-found=true
	kubectl delete -f k8s/backend/ -n solar-system --ignore-not-found=true
	kubectl delete -f k8s/mysql/ -n solar-system --ignore-not-found=true
	kubectl delete -f k8s/config/ -n solar-system --ignore-not-found=true
	kubectl delete -f k8s/secrets/ -n solar-system --ignore-not-found=true
	kubectl delete -f k8s/namespace.yaml --ignore-not-found=true
	echo "✅ All resources cleaned up"

port-forward:
	@echo "Frontend: http://localhost:8080"
	@echo "Backend API: http://localhost:5001"
	kubectl port-forward svc/frontend-service 8080:80 -n solar-system &
	kubectl port-forward svc/backend-service 5001:5000 -n solar-system

backup:
	kubectl exec -n solar-system deployment/mysql-statefulset -- \
		mysqldump -u root -p$(kubectl get secret mysql-secret -n solar-system -o jsonpath='{.data.mysql-root-password}' | base64 --decode) \
		iot_solar > backup-$(date +%Y%m%d-%H%M%S).sql
	echo "✅ Database backup created"