## supply the base image
FROM node:14-alpine

## set the working directory
WORKDIR /quiz

## copy package.json
COPY package.json .

## copy lock file
COPY yarn.lock .

## install dependencies
RUN yarn install

## copy the rest of files
COPY . .

## start the application
CMD ["yarn", "start"]