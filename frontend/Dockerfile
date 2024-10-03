# Dockerfile for Frontend

# Use a Node.js base image
FROM node:14-alpine as builder

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies by copying package.json and yarn.lock first
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the React application
RUN yarn build

# Remove development dependencies
RUN yarn install --production --ignore-scripts --prefer-offline

# Use nginx to serve the React application
FROM nginx:alpine

# Set a non-root user to run our application
RUN addgroup -g 1001 -S nginxgroup && \
    adduser -u 1001 -D -S -G nginxgroup nginxuser
USER nginxuser

# Copy the built assets from the builder stage and place them in the nginx serving directory
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80

# The last instruction is the command to run when the container starts.
CMD ["nginx", "-g", "daemon off;"]