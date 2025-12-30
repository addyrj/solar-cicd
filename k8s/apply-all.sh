#!/bin/bash
set -e

echo "🚀 Deploying Solar System to Kubernetes..."

# Create namespace
echo "📦 Creating namespace..."
kubectl apply -f namespace.yaml

# Wait a moment
sleep 2

# Create configmaps
echo "⚙️ Creating configmaps..."
kubectl apply -f config/ -n solar-system

# Create secrets
echo "🔐 Creating secrets..."
kubectl apply -f secrets/ -n solar-system

# Deploy MySQL
echo "🗄️ Deploying MySQL..."
kubectl apply -f mysql/ -n solar-system

echo "⏳ Waiting for MySQL to be ready..."
kubectl wait --for=condition=ready pod -l app=mysql -n solar-system --timeout=300s

# Deploy backend
echo "⚡ Deploying backend..."
kubectl apply -f backend/ -n solar-system

echo "⏳ Waiting for backend to initialize..."
sleep 15

# Deploy frontend
echo "🌐 Deploying frontend..."
kubectl apply -f frontend/ -n solar-system

# Deploy ingress
echo "🌍 Deploying ingress..."
kubectl apply -f ingress/ -n solar-system

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Current status:"
kubectl get pods -n solar-system
echo ""
echo "🌐 Services:"
kubectl get svc -n solar-system
echo ""
echo "🔗 Ingress:"
kubectl get ingress -n solar-system
echo ""
echo "To access your application:"
echo "1. Add to /etc/hosts: 147.93.30.6 147.93.30.6.nip.io"
echo "2. Access at: http://147.93.30.6.nip.io"
echo ""
echo "📝 Logs:"
echo "  kubectl logs -l app=backend -n solar-system"
echo "  kubectl logs -l app=frontend -n solar-system"