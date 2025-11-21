FROM node:22-alpine

WORKDIR /app

# Enable corepack to use pnpm
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Expose the requested port
EXPOSE 8888

# Run the development server on port 8888 and bind to all interfaces
CMD ["pnpm", "dev", "--port", "8888", "--host"]
