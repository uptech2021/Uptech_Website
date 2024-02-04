# STAGE 1: Build the application IN DEVELOPMENT 

# Using the latest version of Node.js
FROM node:latest

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of your project into the container
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the application in development mode
CMD ["npm", "run", "dev"]

# STAGE 2: Build the application for PRODUCTION
# Using the latest version of Node.js
FROM node:latest

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies in the container
RUN npm install

# Copy the rest of your project into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Command to start the application in production mode
CMD ["npm", "start"]
