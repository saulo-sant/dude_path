FROM node:19.7
WORKDIR /

COPY . .

RUN yarn

EXPOSE 23000

WORKDIR /src


CMD ["node", "index.js"]
