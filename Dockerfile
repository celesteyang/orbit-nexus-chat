# ---- Build Stage ----
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build the app (Vite: npm run build / CRA: npm run build)
RUN npm run build


# ---- Production Stage ----
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
