# Build stage
FROM node:14 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy .env file if needed
COPY app/.env .env

# Expose the port the app runs on
EXPOSE 3002

# Start the application
CMD ["npm", "start"]
