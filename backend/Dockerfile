# Dockerfile for Backend

# Use a Node.js base image
FROM node:14-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copying package.json and yarn.lock separately to leverage Docker cache
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Build the TypeScript files
RUN yarn build

# Remove development dependencies
RUN npm prune --production

# Final stage
FROM node:14-alpine
WORKDIR /usr/src/app

# Copy built node modules and build directories
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Use a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "dist/app.js" ]