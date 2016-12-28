FROM node:6.9.1

RUN mkdir /monitor

MAINTAINER zhuyali

WORKDIR /monitor

COPY . /monitor

RUN npm install --registry=https://registry.npm.taobao.org

CMD node test.js

