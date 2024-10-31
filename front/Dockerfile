# Use the Node.js base image to build the Angular application
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use Nginx to serve the application
FROM nginx:1.23

# Copy the built application from the previous stage to Nginx's html directory
COPY --from=build /app/dist/kaddem /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
