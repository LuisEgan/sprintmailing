FROM node:12-alpine

WORKDIR /usr/src/app

ARG GCP_KEY

LABEL name="backend" version="node:12-alpine"

COPY package*.json ./

RUN ls

RUN apk add --no-cache \
        sudo \
        curl \
        build-base \
        g++ \
        libpng \
        libpng-dev \
        jpeg-dev \
        pango-dev \
        cairo-dev \
        giflib-dev \
        python \
        openssl \
        tzdata

RUN npm install

ENV TZ=America/Santiago

RUN date

COPY . ./

RUN npm run build

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "start:prod" ]