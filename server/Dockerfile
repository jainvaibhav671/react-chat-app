# Use the official Node.js image as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Command to run your application
CMD ["yarn", "start"]
