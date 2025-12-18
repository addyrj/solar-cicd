#!/bin/sh
set -e

echo "⏳ Waiting for MySQL to be ready..."

# Wait for MySQL to accept connections (TCP check)
MAX_RETRIES=30
RETRY_COUNT=0

while ! nc -z mysql 3306; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "❌ MySQL did not become available after $MAX_RETRIES attempts"
    echo "Attempting to start anyway (backend will retry connection)..."
    break
  fi
  echo "Attempt $RETRY_COUNT/$MAX_RETRIES: Waiting for MySQL on mysql:3306..."
  sleep 2
done

if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
  echo "✅ MySQL port is open. Giving it extra time to fully initialize..."
  sleep 10
fi

echo "🚀 Starting Node.js server...."
exec node index.js