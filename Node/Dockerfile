# Base image to pull from 
# !Make sure as small as possible
FROM node:lts-alpine

# Default dir context for application 
WORKDIR /app

##### Copy all files inside to Image #####

# Copy package.json and package-lock.json to save data 
# when not adding new packages but making source code changes.
COPY package.json .
COPY package-lock.json .

# NPM install initally to then copy source code
# Used to execute commands that will be persistent in image
RUN npm install

# Copy the other source files
COPY . .

# Application port to be exposed inside Docker
EXPOSE 3000 

# The main run command for the server
CMD node ./main.js
