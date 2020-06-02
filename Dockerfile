FROM node:10.15.3-jessie AS base
WORKDIR /app
COPY ./server.pro.js .
COPY ./config .
EXPOSE 8080/tcp
COPY . .
# RUN npm install cnpm -g
RUN yarn install
RUN yarn run build
ENTRYPOINT ["node","server.pro.js"]   