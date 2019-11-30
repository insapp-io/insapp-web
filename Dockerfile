# Docker builder for Node.js
FROM alpine:3.10 AS builder-app
LABEL maintainer="Thomas Bouvier <contact@thomas-bouvier.io>"

RUN apk add --no-cache nodejs nodejs-npm tini

WORKDIR /var/insapp-web/app
COPY app .

ENTRYPOINT ["/sbin/tini", "--"]

# Dependencies
FROM builder-app AS dependencies-app
LABEL maintainer="Thomas Bouvier <contact@thomas-bouvier.io>"

RUN npm set progress=false && npm config set depth 0
RUN npm install
RUN npx gulp dist

# Nginx application
FROM nginx
LABEL maintainer "Thomas Bouvier <contact@thomas-bouvier.io>"

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/insapp-web

COPY --from=dependencies-app /var/insapp-web/app/dist /var/insapp-web/app

COPY welcome /var/insapp-web/welcome
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
