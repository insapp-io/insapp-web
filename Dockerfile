FROM nginx
LABEL maintainer "Thomas Bouvier <tomatrocho@gmail.com>"

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir /var/insapp-web
COPY ./ /var/insapp-web/

EXPOSE 80
