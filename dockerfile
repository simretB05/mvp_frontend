# Use a base image that includes Node.js and npm
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entrypoint script to the container at /app
COPY docker-entrypoint.sh /app/

# Grant execute permission to the entrypoint script
RUN chmod +x /app/docker-entrypoint.sh

# Build the Vue.js app
COPY . .

# Set the entry point to your custom script
ENTRYPOINT ["/app/docker-entrypoint.sh"]
