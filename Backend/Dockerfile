

# this step brings node and OS together, this step is always same
FROM node:20-alpine

WORKDIR /app

# here last dot (.) means image, it means "copy package.json in image"
COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm install

# This step brings - /src , server.js , dockerfile
# This only step runs again and again left others are saved in cache becz they do not run over again and again
COPY . /app


CMD ["node", "server.js"]

