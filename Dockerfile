# Use the official Node.js 18 image as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install --omit=dev

# Copy the rest of the application files to the working directory
COPY . .

# Run prisma
RUN npm run prisma-generate

# Build the Nest.js application
RUN npm run build

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]