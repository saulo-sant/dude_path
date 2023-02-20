FROM node
WORKDIR /
COPY . .
RUN yarn

CMD ["node", "index.js"]

EXPOSE 23000
