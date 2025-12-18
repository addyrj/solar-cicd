FROM node:18-alpine

# Install both for flexibility (netcat is very small)
RUN apk update && apk add --no-cache netcat-openbsd mysql-client

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Make entrypoint executable
RUN chmod +x entrypoint.sh

EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]