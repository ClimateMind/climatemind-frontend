# Build the react app
FROM node:20-alpine AS builder

WORKDIR /opt/web

COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"
COPY . ./
RUN npm run build 
