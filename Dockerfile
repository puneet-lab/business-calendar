# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY . .

# Build your Vite React project
RUN npm run build

# Expose the port that your app will run on
EXPOSE 5173

# Define the command to run your app
CMD ["npm", "run", "start"]
