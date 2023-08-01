# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port that your Nest.js application listens on
EXPOSE 4000

# Set the PORT environment variable
ENV PORT 4000

# Build the Nest.js application
RUN npm run build

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]