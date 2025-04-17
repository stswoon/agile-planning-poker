FROM node:22.11.0
WORKDIR /app

#ARG NGINX_PORT
#EXPOSE $NGINX_PORT

COPY . ./

RUN npm ci
RUN npm run after-ci
RUN npm prod
RUN npm start