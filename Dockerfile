FROM alekzonder/puppeteer:latest

USER root
RUN apt-get update && apt-get install -y \
    git
USER pptruser

ADD ./index.js /app/index.js
ADD ./package.json /app/package.json

WORKDIR /app

USER root

RUN chown -R node. /app

USER node

RUN npm i

EXPOSE 8080

CMD [ "npm", "start" ]