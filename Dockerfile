# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:1.27-alpine AS production

# copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# use custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run forces $PORT (default 8080), so expose it
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
