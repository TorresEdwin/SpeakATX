# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Step 4: Install the dependencies inside the container
RUN npm install

# Step 5: Copy the rest of the project files into the container
COPY . .

# Step 6: Expose the port that Vite will use (default is 5173)
EXPOSE 5173

# Step 7: Set up the command to run the Vite dev server (or you can build your app with `npm run build` in production)
CMD ["npm", "run", "dev"]