# Use official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install Prisma CLI globally to run migrations
RUN npm install -g prisma

# Copy the entire project into the container
COPY . .

# Install Prisma and generate the client
RUN npm run prisma:generate

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port the app will run on (default Fastify port)
EXPOSE 3333

# Run the Fastify application
CMD ["npm", "run", "start:prod"]
