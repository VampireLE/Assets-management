FROM node:lts-alpine3.23

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .