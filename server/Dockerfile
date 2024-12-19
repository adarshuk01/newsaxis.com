FROM node:18-slim

# Install required dependencies for Chromium
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libdrm2 \
    libdbus-glib-1-2 \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
