FROM node:16

WORKDIR /usr/app

COPY --chmod=744 entrypoint wait-for /

COPY ./src ./src
COPY package.json package-lock.json ./

RUN apt-get update && apt-get install -y netcat bash

ENTRYPOINT [ "/entrypoint" ]