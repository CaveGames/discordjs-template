FROM node:16

ARG MODE=development
ENV NODE_ENV=${MODE}

WORKDIR /usr/app

RUN apt-get update && apt-get install -y netcat

COPY --chown=node:node --chmod=744 wait-for /
COPY --chown=node:node . .
RUN if [ "${NODE_ENV}" = "production" ]; \
	then npm install --production; \
	else npm install; \
	fi

USER node
CMD /wait-for -t 180 sql:3306 -- npm run env
