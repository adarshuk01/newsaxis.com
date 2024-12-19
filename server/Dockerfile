# Use the official Node.js 14 image as the base
FROM node:14

# Install necessary system packages
RUN apt-get update && apt-get install -y \
  libnss3 \
  unzip \
  && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Start the application
CMD [ "npm", "start" ]
