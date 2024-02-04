# Use the official Node.js image as a base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Command to run your application
CMD ["yarn", "host"]
