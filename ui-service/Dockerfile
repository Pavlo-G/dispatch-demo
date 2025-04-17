FROM public/baseimage/node:20-alpine as build
USER root

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY .npmrc ./
RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npmjs.org/
RUN npm install

# add app
COPY . ./

# Override build-time env vars so they're all easily-replaceable placeholders.
COPY .env.docker .env
# create build environment
RUN npm run build

# temporary work-around to allow runtime substitutions
RUN chmod -R a+w dist/index.html dist/assets/*.js dist/sw.js

##################################################
# Non-development environment
FROM public/baseimage/nginx:stable-alpine