FROM node:12-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 443 80

CMD [ "npm", "run",  "start"]

