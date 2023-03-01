FROM node:19.7
WORKDIR /

COPY . .

RUN yarn

EXPOSE 23000

CMD ["node", "index.js"]
