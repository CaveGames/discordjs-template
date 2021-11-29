FROM node:16

WORKDIR /usr/app

RUN apt-get update && apt-get install -y netcat

COPY --chown=node:node wait-for /
COPY --chown=node:node . .
RUN npm install

USER node
CMD /wait-for -t 180 sql:3306 -- npm run dev
