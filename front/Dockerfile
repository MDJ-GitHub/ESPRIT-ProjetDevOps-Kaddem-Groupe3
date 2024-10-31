# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:1.23
COPY --from=build /app/dist/kaddem /usr/share/nginx/html

# Optionally expose port 5000
EXPOSE 5000
