FROM node
WORKDIR /

COPY . .

RUN yarn

EXPOSE 23000

CMD ["node", "index.js"]
