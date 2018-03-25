FROM nginx
LABEL maintainer "Thomas Bouvier <tomatrocho@gmail.com>"

RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir /var/insapp-web
COPY ./ /var/insapp-web/

EXPOSE 80
