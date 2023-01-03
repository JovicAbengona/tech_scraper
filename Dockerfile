FROM node:18.12.1-alpine3.16

RUN mkdir -p /VIPTechnologyDetector/app

WORKDIR /VIPTechnologyDetector/app

COPY package*.json ./

RUN npm install && npm cache clean --force

EXPOSE 8002

ENV PATH=/VIPTechnologyDetector/app/node_modules/.bin:$PATH

RUN mkdir -p /VIPTechnologyDetector/app/src

WORKDIR /VIPTechnologyDetector/app/src

COPY src .