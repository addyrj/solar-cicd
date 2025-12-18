# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build arguments
ARG REACT_APP_BASE_URL
ARG REACT_APP_IMAGE_URL

# Create .env.production file
RUN echo "REACT_APP_BASE_URL=${REACT_APP_BASE_URL}" > .env.production && \
    echo "REACT_APP_IMAGE_URL=${REACT_APP_IMAGE_URL}" >> .env.production

# Show what we're building with
RUN echo "=== Build Configuration ===" && \
    cat .env.production

# Build React app
RUN npm run build

# Show what was built
RUN echo "=== Build Output ===" && \
    ls -la /app/build/

# Stage 2: Production
FROM nginx:alpine

# Copy built React files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Show what was copied
RUN echo "=== Files copied to nginx ===" && \
    ls -la /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]