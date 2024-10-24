FROM webdevops/php-apache-dev:8.3-alpine

RUN apk update && apk add --no-cache nodejs npm

WORKDIR /app
